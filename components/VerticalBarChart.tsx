import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface VerticalBarChartProps {
  data: { coach: string; value: number }[];
  title: string;
  yAxisKey?: string;
  barKey?: string;
}

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({
  data,
  title,
  yAxisKey = 'coach',
  barKey = 'value'
}) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const sampleData = data[0];
  if (!(yAxisKey in sampleData) || !(barKey in sampleData)) {
    return <div>Invalid data keys provided</div>;
  }

  return (
    <div className="bg-white border border-gray-300 p-4 rounded-lg overflow-hidden">
      <h2 className="font-bold text-gray-600 text-xl">{title}</h2>
      <div className="w-full h-72">
        <BarChart
          width={400}
          height={280}
          data={data}
          margin={{ bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={yAxisKey}
            tick={{ textAnchor: 'end', fontSize: 12 }}
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey={barKey} fill="#34495e" barSize={25} />
        </BarChart>
      </div>
    </div>
  );
};

export default VerticalBarChart;
