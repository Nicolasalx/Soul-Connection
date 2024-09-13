import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { ClipLoader } from 'react-spinners';
import NumberStat from "./NumberStat";
import { getCustomers } from "@/app/lib/dbhelper/customers";
import { getEncounters } from "@/app/lib/dbhelper/encounters";
import { getCoachs } from "@/app/lib/dbhelper/employees";

const data = [
  { month: "Jan", customers: 100, meetings: 20, clientsPerCoach: 5 },
  { month: "Feb", customers: 120, meetings: 30, clientsPerCoach: 6 },
  { month: "Mar", customers: 150, meetings: 40, clientsPerCoach: 7 },
  { month: "Apr", customers: 180, meetings: 50, clientsPerCoach: 8 },
];

const AreaChartDashboard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [meetingPercentage, setMeetingPercentage] = useState(0);
  const [averageClientsPerCoach, setAverageClientsPerCoach] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashBoardData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const customers = await getCustomers();
        const totalCustomers = customers.length;
        setTotalCustomers(totalCustomers);

        const encounters = await getEncounters();
        const totalMeetings = encounters.length;

        const meetingPercentage = (totalMeetings / totalCustomers) * 6.12;
        setMeetingPercentage(meetingPercentage);

        const coaches = await getCoachs();
        const averageClientsPerCoach = totalCustomers / coaches.length;
        setAverageClientsPerCoach(averageClientsPerCoach);
      } catch (error) {
        console.error("Dashboard Chart Loading Failure", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashBoardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#000000" size={50} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="stats flex justify-around mb-4">
        <NumberStat title="Customers" value={totalCustomers} />
        <NumberStat title="Doing Meetings" value={meetingPercentage} />
        <NumberStat title="Customers by Coach" value={averageClientsPerCoach} />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="customers"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartDashboard;
