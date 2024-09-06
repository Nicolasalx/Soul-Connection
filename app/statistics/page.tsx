'use client';

import React, { useEffect } from "react";
import { Divider } from 'antd';
import { BarrChart } from "@/components/BarChart";
import { DotChart } from "@/components/DotChart";
import { PiieChart } from "@/components/PieChart";
import { getCoachs, getEmployees } from "../lib/dbhelper/employees";
import { fillCoachStatistic } from "../lib/dbhelper/statistics_data";

const chartDataCoachNbEncounters = [
  { coach: "Coach01", value: 2 },
  { coach: "Coach02", value: 12 },
  { coach: "Coach03", value: 7 },
  { coach: "Coach04", value: 9 },
  { coach: "Coach05", value: 23 },
  { coach: "Coach06", value: 15 },
];

const chartDataCoachesAverageDateRating = [
  { coach: "Coach01", grade: 10 },
  { coach: "Coach02", grade: 5 },
  { coach: "Coach03", grade: 2 },
  { coach: "Coach04", grade: 8 },
  { coach: "Coach05", grade: 7 },
  { coach: "Coach06", grade: 3 },
];

const chartConfigAge = {
  "18-25": {
    label: "18-25",
    color: "hsl(187, 68%, 83%)",
  },
  "26-35": {
    label: "26-35",
    color: "hsl(0, 0%, 50%)",
  },
  "35-65": {
    label: "35-65",
    color: "hsl(323, 100%, 88%)",
  },
  "65-80": {
    label: "65-80",
    color: "hsl(38, 100%, 67%)",
  },
};

const chartDataAgeProportion = [
  { age: "18-25", value: 186 },
  { age: "26-35", value: 305 },
  { age: "35-65", value: 237 },
  { age: "65-80", value: 73 },
];

const chartDataSalesEv = [
  { month: "January", amount: 186 },
  { month: "February", amount: 305 },
  { month: "March", amount: 237 },
  { month: "April", amount: 73 },
  { month: "May", amount: 209 },
  { month: "June", amount: 214 },
];

async function Statistics() {

  useEffect(() => {
    // Fill 
    const coachsStatistics = fillCoachStatistic();


  }, [])

  return (
    <div className="flex flex-col h-screen w-screen p-6">
      <div className="bg-white border border-gray-300 p-12 rounded-lg">
        <h1 className="font-bold text-gray-600 mb-10 mt-10 text-2xl" style={{ fontSize: "4rem" }}>
          Statistics
          <Divider style={{ borderColor: '#d3d3d3' }} />
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="col-span-1">
            <BarrChart
              data={chartDataCoachNbEncounters}
              title="Coaches Total Performances"
              yAxisKey="coach"
              barKey="value"
            />
          </div>
          <div className="col-span-1">
            <BarrChart
              data={chartDataCoachesAverageDateRating}
              title="Coaches Average Dates Rating"
              yAxisKey="coach"
              barKey="grade"
            />
          </div>
          <div className="col-span-1">
            <PiieChart
              data={chartDataAgeProportion}
              title="Age Ranges Present on SC"
              description="Distribution of Age Ranges"
              dataKey="value"
              nameKey="age"
              config={chartConfigAge}
              observation="None"
            />
          </div>
          <div className="col-span-1">
            <PiieChart
              data={chartDataAgeProportion}
              title="Age Ranges Present on SC"
              description="Distribution of Age Ranges"
              dataKey="value"
              nameKey="age"
              config={chartConfigAge}
              observation="None"
            />
          </div>
          <div className="col-span-1">
            <DotChart
              data={chartDataSalesEv}
              title="Sales Revenus Evolution"
              description="Evolution from January to June 2024"
              lineKey="amount"
              xAxisKey="month"
              observation="None"
            />
          </div>
          <div className="col-span-1">
            <DotChart
              data={chartDataSalesEv}
              title="Sales Revenus Evolution"
              description="Evolution from January to June 2024"
              lineKey="amount"
              xAxisKey="month"
              observation="None"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
