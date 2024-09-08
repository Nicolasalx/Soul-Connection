import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface VerticalBarChartProps {
  data: { coach: string; value: number }[];
  title: string;
  yAxisKey: string;
  barKey: string;
}

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({ data, title, yAxisKey, barKey }) => {
  return (
    <div className="bg-white border border-gray-300 p-4 rounded-lg overflow-hidden">
      <h2 className="font-bold text-gray-600 mb-4 text-xl">{title}</h2>
      <div className="w-full h-72">
        <BarChart
          width={400}
          height={300}
          data={data}
          margin={{ bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={yAxisKey}
            tick={{ angle: -45, textAnchor: 'end', fontSize: 12 }}
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey={barKey} fill="#34495e" barSize={15} />
        </BarChart>
      </div>
    </div>
  );
};

export default VerticalBarChart;
