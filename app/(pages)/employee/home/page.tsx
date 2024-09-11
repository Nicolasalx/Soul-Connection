'use client';

import React, { useEffect, useState } from "react";
import { Divider, Table } from 'antd';
import { fillCoachStatistic } from "../../../lib/dbhelper/statistics_data";
import { getSelfId, isManager } from "../../../lib/user";
import { DonutChart } from "@/components/DonutChart";
import { getEvents } from '../../../lib/dbhelper/events';
import { getEmployees } from '../../../lib/dbhelper/employees';
import { getCustomers, getCustomerPayments } from '../../../lib/dbhelper/customers';
import { getEncounters } from '../../../lib/dbhelper/encounters';
import VerticalBarChart from "@/components/VerticalBarChart";
import ScrollingList from "@/components/ScrollingList";
//import cron from "node-cron";


async function AverageRatingsByCustomer() {
  try {
    const userId = await getSelfId();
    const customers = await getCustomers();
    const encounters = await getEncounters();

    const coachClients = customers.filter(customer => customer.coach_id === userId);
    const clientIds = coachClients.map(client => client.id);
    const clientEncounters = encounters.filter(encounter => clientIds.includes(encounter.customer_id));

    const ratings = clientEncounters.reduce((acc, encounter) => {
      if (!acc[encounter.customer_id]) {
        acc[encounter.customer_id] = { total: 0, count: 0 };
      }
      acc[encounter.customer_id].total += encounter.rating; 
      acc[encounter.customer_id].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    const averageRatings = coachClients.map(client => {
      const ratingData = ratings[client.id] || { total: 0, count: 0 };
      return {
        coach: client.name,
        value: ratingData.count ? ratingData.total / ratingData.count : 0
      };
    });

    return averageRatings;
  } catch (error) {
    console.error("error: ", error);
    throw new Error();
  }
}


async function mergeEventsAndCoachData() {
  try {
    const events = await getEvents();
    const employees = await getEmployees();
    const userId = await getSelfId();

    const userEmployee = employees.filter(employee => employee.id === userId);

    const mergedData = userEmployee.map(employee => {
      const {
        _id,
        birth_date,
        gender,
        last_connection,
        password,
        ...employeeDataWithoutSensitiveInfo
      } = employee;

      const eventForEmployee = events.find(event => event.employee_id === userId);

      if (eventForEmployee) {
        const { _id, location_x, location_y, ...eventDataWithoutLocation } = eventForEmployee;
        return {
          ...employeeDataWithoutSensitiveInfo,
          ...eventDataWithoutLocation
        };
      }

      return employeeDataWithoutSensitiveInfo;
    });

    return mergedData;
  } catch (error) {
    throw new Error();
  }
}

async function mergeCustomerPayments() {
  try {
    const customers = await getCustomers();
    const userId = await getSelfId();

    const filteredCustomers = customers.filter(customer => customer.coach_id === userId);

    const customerPaymentsData = await Promise.all(
      filteredCustomers.map(async (customer) => {
        const customerPayments = await getCustomerPayments(customer.id);
        const totalAmount = customerPayments.reduce((sum, payment) => sum + payment.amount, 0);

        return {
          coach: customer.name,
          value: parseFloat(totalAmount.toFixed(2)),
        };
      })
    );
    const sortedCustomerPayments = customerPaymentsData.sort((a, b) => b.value - a.value);
    return sortedCustomerPayments;
  } catch (error) {
    console.error("error: ", error);
    throw new Error();
  }
}

async function mergeCustomersAndEncountersData() {
  try {
    const customers = await getCustomers();
    const encounters = await getEncounters();
    const userId = await getSelfId();

    const filteredCustomers = customers.filter(customer => customer.coach_id === userId);

    const filteredCustomerIds = filteredCustomers.map(customer => customer.id);
    const filteredEncounters = encounters.filter(encounter => filteredCustomerIds.includes(encounter.customer_id));

    const encounterCounts = filteredEncounters.reduce((acc, encounter) => {
      if (!acc[encounter.customer_id]) {
        acc[encounter.customer_id] = { count: 0, amount: 0 };
      }
      acc[encounter.customer_id].count += 1;
      return acc;
    }, {} as Record<string, { count: number; amount: number }>);

    const CustomersNbEncountersMoney = await Promise.all(filteredCustomers.map(async customer => {
      const encountersData = encounterCounts[customer.id] || { count: 0, amount: 0 };

      const customerPayments = await getCustomerPayments(customer.id);
      const totalAmountPaid = customerPayments.reduce((sum, payment) => sum + payment.amount, 0);

      return {
        userId: userId,
        coachId: customer.coach_id,
        customerId: customer.id,
        customerName: customer.name,
        numberOfEncounters: encountersData.count,
        amount: parseFloat(totalAmountPaid.toFixed(2))
      };
    }));

    return CustomersNbEncountersMoney;
  } catch (error) {
    console.error("error: ", error);
    throw new Error();
  }
}

async function mergeEventsAndEmployeesData() {
  try {
    const events = await getEvents();
    const employees = await getEmployees();

    const coachEmployees = employees.filter(employee => employee.work === "Coach");

    const mergedData = coachEmployees.map(employee => {
      const {
        _id,
        birth_date,
        gender,
        last_connection,
        password,
        ...employeeDataWithoutSensitiveInfo
      } = employee;

      const eventForEmployee = events.find(event => event.id === employee.id);

      if (eventForEmployee) {
        const { _id, location_x, location_y, ...eventDataWithoutLocation } = eventForEmployee;
        return {
          ...employeeDataWithoutSensitiveInfo,
          ...eventDataWithoutLocation
        };
      }

      return employeeDataWithoutSensitiveInfo;
    });

    return mergedData;
  } catch (error) {
    throw new Error('error: ');
  }
}

interface CoachData {
  index: number;
  coach: string;
  encounterCount: number;
  ca: number;
}

interface CustomerData {
  userId: number,
  coachId: number,
  customerId: number,
  customerName: string,
  numberOfEncounters: number,
  amount: number,
}

function HomeDashboard() {
  // cron.schedule('0 0 * * *', async () => {
  //   try {
  //     await update_full_db();
  //     console.log("DB updated !!!");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
  const [nbCustomersByCoach, setNbCustomersByCoach] = useState<{ coach: string; value: number }[]>([]);
  const [chartConfigCustomers, setChartConfigCustomers] = useState<Record<string, { color: string }>>({});
  const [nbGainByCoach, setNbGainByCoach] = useState<{ coach: string; value: number }[]>([]);
  const [CoachNamesNbEncountersCA, setCoachNamesNbEncountersCA] = useState<CoachData[]>([]);
  const [scrollingListManagerData, setScrollingListManagerData] = useState<{ [key: string]: any }[]>([]);
  const [CustomersNbEncountersMoney, setCustomersNbEncountersMoney] = useState<CustomerData[]>([]);
  const [customerPaymentsData, setMergeCustomerPaymentsData] = useState<{ coach: string; value: number }[]>([]);
  const [scrollingListCoachesData, setscrollingListCoachesData] = useState<{ [key: string]: any }[]>([]);
  const [averageRatingsByCustomer, setAverageRatingsByCustomer] = useState<{ coach: string; value: number }[]>([]);
  const [hasRights, setHasRights] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const managerRights = await isManager();
      setHasRights(managerRights);

      if (managerRights) {
        const makeStatistics = async () => {
          const coachsStatistics = await fillCoachStatistic();

          const nbCustomerData = coachsStatistics.coach_list
            .map((coach, index) => ({
              coach,
              value: coachsStatistics.coach_nb_client[index],
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);
          setNbCustomersByCoach(nbCustomerData);

          const colorPalette = ['#1f2a38', '#4b545f', '#787f87', '#a5a9af', '#e8e9eb'];

          const config = nbCustomerData.reduce((configAcc, item, index) => {
            configAcc[item.coach] = { color: colorPalette[index] };
            return configAcc;
          }, {} as Record<string, { color: string }>);

          setChartConfigCustomers(config);

          const encounterData = coachsStatistics.coach_list.map((coach, index) => ({
            index,
            coach,
            encounterCount: coachsStatistics.coach_encounter[index],
            ca: coachsStatistics.coach_gain[index],
          }));
          setCoachNamesNbEncountersCA(encounterData);

          const nbGainData = coachsStatistics.coach_list
            .map((coach, index) => ({
              coach,
              value: coachsStatistics.coach_gain[index],
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5)
            .reverse();
          setNbGainByCoach(nbGainData);

          try {
            const scrollingListManagerData = await mergeEventsAndEmployeesData();
            setScrollingListManagerData(scrollingListManagerData);
          } catch (error) {
            console.error("error: ", error);
          }
          
          const customerPaymentsData = await mergeCustomerPayments();
          setMergeCustomerPaymentsData(customerPaymentsData);
        };
        
        makeStatistics();
      } else {
        try {
          const customerPaymentsData = await mergeCustomerPayments();
          setMergeCustomerPaymentsData(customerPaymentsData);
        } catch (error) {
          console.error("error: ", error);
        }

        try {
          const CustomersNbEncountersMoney = await mergeCustomersAndEncountersData();
          setCustomersNbEncountersMoney(CustomersNbEncountersMoney);
        } catch (error) {
          console.error("error: ", error);
        }

        try {
          const scrollingListCoachesData = await mergeEventsAndCoachData();
          setscrollingListCoachesData(scrollingListCoachesData);
        } catch (error) {
          console.error("error: ", error);
        }

        try {
          const averageRatings = await AverageRatingsByCustomer();
          setAverageRatingsByCustomer(averageRatings);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchData();
  }, []);


  const managerColumns = [
    { title: 'Index', dataIndex: 'index', key: 'index' },
    { title: 'Coach', dataIndex: 'coach', key: 'coach' },
    { title: 'Encounters', dataIndex: 'encounterCount', key: 'encounterCount' },
    { title: 'CA', dataIndex: 'ca', key: 'ca' },
  ];

  const coachColumns = [
    { title: 'Index', dataIndex: 'index', key: 'index' },
    { title: 'Client', dataIndex: 'coach', key: 'customerName' },
    { title: 'Encounters', dataIndex: 'encounterCount', key: 'encounterCount' },
    { title: 'Total Payments', dataIndex: 'ca', key: 'ca' },
  ];


  const convertCustomerDataToCoachData = (data: CustomerData[]): CoachData[] => {
    return data.map((item, index) => ({
      index,
      coach: item.customerName,
      encounterCount: item.numberOfEncounters,
      ca: item.amount,
    }));
  };

  return (
    <>
      <h1 className="font-bold text-gray-600 mb-2 text-5xl md:text-3xl">
        Dashboard
      </h1>
        <h2 className="text-gray-400 mb-5 text-xl" style={{ fontSize: "1rem" }}>
          Welcome!
        </h2>
      <Divider style={{ borderColor: '#d3d3d3' }} />

      <div className="flex space-x-4 mb-6">
        <div className="w-1/3 h-100">
          {hasRights ? (
            <DonutChart
              data={nbCustomersByCoach}
              title="Number of customers by coach"
              description=""
              dataKey="value"
              nameKey="coach"
              config={chartConfigCustomers}
              observation="Top 5 Coaches by Customer Count"
            />
          ) : (
            <VerticalBarChart 
              data={averageRatingsByCustomer}
              title="Average encounters rating by each client"
              yAxisKey="coach"
              barKey="value"
            />
          )}
        </div>
        <div className="w-1/3 h-100">
          {hasRights ? (
            <VerticalBarChart
              data={nbGainByCoach}
              title="Number of encounters by coach"
              yAxisKey="coach"
              barKey="value"
            />
          ) : (
            <VerticalBarChart
              data={customerPaymentsData}
              title="Each client total paid amount"
              yAxisKey="coach"
              barKey="value"
            />
          )}
        </div>
        <div className="w-1/3 h-100">
            <ScrollingList 
            data={hasRights ? scrollingListManagerData : scrollingListCoachesData}
            /> 
        </div>
      </div>
      <div className="mt-2">
        <Table
          columns={hasRights ? managerColumns : coachColumns}
          dataSource={hasRights ? CoachNamesNbEncountersCA : convertCustomerDataToCoachData(CustomersNbEncountersMoney)}
          rowKey="index"
          pagination={{ pageSize: 8 }}
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-grey">
          For more details, go to the <a href="/statistics" className="text-blue-500 underline">Statistics page</a>.
        </p>
      </div>
    </>
  );
}

export default HomeDashboard;
