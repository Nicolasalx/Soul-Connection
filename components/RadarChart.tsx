import React, { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend } from "recharts";

type RadarChartProps = {
  data: { name: string; value: number }[];
  title: string;
};

const CustomRadarChart: React.FC<RadarChartProps> = ({ data, title }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#000000" size={50} />
      </div>
    );
  }
  
  return (
    <div className="bg-white border border-gray-300 p-6 rounded-lg">
      <h2 className="font-bold text-gray-600 mb-4 text-2xl">{title}</h2>
      <RadarChart outerRadius={50} data={data} width={300} height={300}>
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
