'use client'
import React, { useEffect, useState } from "react";
import { Divider, Table } from 'antd';
import { fillCoachStatistic } from "../../../lib/dbhelper/statistics_data";
import { isManager } from "../../../lib/user";
import { DonutChart } from "@/components/DonutChart";
import { getEvents } from '../../../lib/dbhelper/events';
import { getEmployees } from '../../../lib/dbhelper/employees';
import VerticalBarChart from "@/components/VerticalBarChart";
import ScrollingList from "@/components/ScrollingList";

export async function mergeEventsAndEmployees() {
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

    //console.log("Event+Employees list:", mergedData);
    return mergedData;
  } catch (error) {
    //console.error("Failed to merge events and employees:", error);
    throw new Error('Failed to merge data');
  }
}

function HomeDashboard() {
  const [nbCustomersByCoach, setNbCustomersByCoach] = useState<{ coach: string; value: number }[]>([]);
  const [chartConfigCustomers, setChartConfigCustomers] = useState<Record<string, { color: string }>>({});
  const [nbGainByCoach, setNbGainByCoach] = useState<{ coach: string; value: number }[]>([]);
  const [CoachNamesNbEncountersCA, setCoachNamesNbEncountersCA] = useState<
    { index: number; coach: string; encounterCount: number; ca: number }[]>([]);
  const [scrollingListData, setScrollingListData] = useState<{ [key: string]: any }[]>([]);
  const [hasRights, setHasRights] = useState(false);

  useEffect(() => {
    const checkManagerRights = async () => {
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
            const mergedData = await mergeEventsAndEmployees();
            setScrollingListData(mergedData);
          } catch (error) {
            console.error("Erreur lors de la récupération des données fusionnées :", error);
          }
        };

        makeStatistics();
      }
    };

    checkManagerRights();
  }, []);

  if (!hasRights) {
    return null;
  }

  const columns = [
    { title: 'Index', dataIndex: 'index', key: 'index' },
    { title: 'Coach', dataIndex: 'coach', key: 'coach' },
    { title: 'Encounters', dataIndex: 'encounterCount', key: 'encounterCount' },
    { title: 'CA', dataIndex: 'ca', key: 'ca' },
  ];

  return (
    <>
      <h1 className="font-bold text-gray-600 mb-10 mt-10 text-center text-5xl md:text-6xl">
        SOUL CONNECTION
      </h1>
      <h2 className="text-gray-400 mb-5 text-center text-xl" style={{ fontSize: "2rem" }}>
        Dashboard
      </h2>
      <Divider style={{ borderColor: '#d3d3d3' }} />

      <div className="flex space-x-4 mb-6">
        <div className="w-1/3 h-100">
          <DonutChart
            data={nbCustomersByCoach}
            title="Number of customers by coach"
            description=""
            dataKey="value"
            nameKey="coach"
            config={chartConfigCustomers}
            observation="Top 5 Coaches by Customer Count"
          />
        </div>
        <div className="w-1/3 h-100">
          <VerticalBarChart
            data={nbGainByCoach}
            title="Number of encounters by coach"
            yAxisKey="coach"
            barKey="value"
          />
        </div>
        <div className="w-1/3 h-100">
          <ScrollingList data={scrollingListData} />
        </div>
      </div>
      <div className="mt-2">
        <Table
          columns={columns}
          dataSource={CoachNamesNbEncountersCA}
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
