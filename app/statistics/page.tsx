import React from "react";
import NumberStat from "@/components/statistics-numbers";
import { BarrChart } from "@/components/bar-charts";
import { DotChart } from "@/components/dot-charts";
import { AreaaChart } from "@/components/area-charts";
import { PiieChart } from "@/components/pie-charts";
import { getCoachs, getEmployees } from "../lib/dbhelper/employees";

const chartData01 = [
  { coach: "Coach01", value: 186 },
  { coach: "Coach02", value: 305 },
  { coach: "Coach03", value: 237 },
  { coach: "Coach04", value: 73 },
  { coach: "Coach05", value: 209 },
  { coach: "Coach06", value: 214 },
];

const chartData02 = [
  { month: "January", value: 186 },
  { month: "February", value: 305 },
  { month: "March", value: 237 },
  { month: "April", value: 73 },
  { month: "May", value: 209 },
  { month: "June", value: 214 },
];

const chartData03 = [
  { month: "January", value: 186 },
  { month: "February", value: 305 },
  { month: "March", value: 237 },
  { month: "April", value: 73 },
  { month: "May", value: 209 },
  { month: "June", value: 214 },
];

const chartData04 = [
  { coach: "01", value: 275, fill: "var(--color-chrome)" },
  { coach: "02", value: 200, fill: "var(--color-safari)" },
  { coach: "03", value: 187, fill: "var(--color-firefox)" },
  { coach: "04", value: 173, fill: "var(--color-edge)" },
  { coach: "05", value: 90, fill: "var(--color-other)" },
];

async function Statistics() {
  const employees = await getEmployees();
  const coaches = await getCoachs();

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-300 p-6 rounded w-3/4 ml-80 mt-28">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          Welcome to your statistics
        </h1>
        <div className="space-x-4">
          <div className="bg-grey-200 p-4 border border-gray-300 rounded">
            <NumberStat title="Current Employees Count" value={employees.length} />
            <NumberStat title="Current Coaches Count" value={coaches.length} />
            <NumberStat title="Total Encounters Count" value={0} />
            <NumberStat title="Add one" value={0} />
          </div>
        </div>

        <div className="mt-8 flex space-x-4">
          <BarrChart
            data={chartData01}
            title="[Example] Infos"
            description="[Example] Date, time"
          />
          <DotChart
            data={chartData02}
            title="[Example] Infos"
            description="[Example] Data, time"
          />
          <AreaaChart
            data={chartData03}
            title="[Example] Infos"
            description="[Example] Date, time"
          />
          <PiieChart
            data={chartData04}
            title="[Example] Infos"
            description="[Example] Date, time"
          />
        </div>
      </div>
    </div>
  );
}

export default Statistics;
