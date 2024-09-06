import React from "react";
import { BarrChart } from "@/components/BarChart";
import { Divider } from 'antd';

import Table from "@/components/Table";

const chartDataSalesEv = [
  { month: "January", amount: 600 },
  { month: "February", amount: 1000 },
  { month: "March", amount: 450 },
  { month: "April", amount: 3000 },
];

const chartDataCoachNbEncounters = [
  { coach: "Coach01", value: 2 },
  { coach: "Coach02", value: 12 },
  { coach: "Coach03", value: 7 },
  { coach: "Coach04", value: 9 },
];

const chartDataCoachesAverageDateRating = [
  { coach: "Coach01", grade: 10 },
  { coach: "Coach02", grade: 5 },
  { coach: "Coach03", grade: 2 },
  { coach: "Coach04", grade: 8 },
];

function HomeDashboard() {
  return (
    <div className="flex flex-col h-screen w-screen p-6">
      <div className="bg-white border border-gray-300 p-12 rounded-lg flex-1">
        <h1 className="font-bold text-gray-600 mb-10 mt-10 text-center text-5xl md:text-6xl">
          SOUL CONNECTION
        </h1>
        <h2 className="text-gray-400 mb-5 text-center text-xl" style={{ fontSize: "2rem" }}>
          Dashboard
        </h2>
        <Divider style={{ borderColor: '#d3d3d3' }} />

        <div className="flex space-x-4 mb-6">
          <div className="w-1/3">
            <BarrChart
              data={chartDataCoachNbEncounters}
              title="Coaches total performances"
              yAxisKey="coach"
              barKey="value"
            />
          </div>
          <div className="w-1/3">
            <BarrChart
              data={chartDataCoachesAverageDateRating}
              title="Coaches Average Dates Rating"
              yAxisKey="coach"
              barKey="grade"
            />
          </div>
          <div className="w-1/3">
            <BarrChart
              data={chartDataSalesEv}
              title="Sales Revenus Evolution"
              yAxisKey="month"
              barKey="amount"
            />
          </div>
        </div>

        <div className="mt-2">
          <Table />
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-white">
          For more details, go to the <a href="/statistics" className="text-blue-500 underline">Statistics page</a>.
        </p>
      </div>
    </div>
  );
}

export default HomeDashboard;
