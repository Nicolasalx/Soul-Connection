import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
} from "recharts";

type RadarChartProps = {
  data: { name: string; value: number }[];
  title: string;
};

const CustomRadarChart: React.FC<RadarChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white border border-gray-300 p-6 rounded-lg">
      <h2 className="font-bold text-gray-600 mb-4 text-2xl">{title}</h2>
      <RadarChart outerRadius={90} width={400} height={400} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar
          name={title}
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Tooltip />
        <Legend />
      </RadarChart>
    </div>
  );
};

export default CustomRadarChart;
