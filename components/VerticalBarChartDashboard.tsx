import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import React, { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';

const data = [
  { country: "China", value: 8 },
  { country: "Alaska", value: 12 },
  { country: "USA", value: 83 },
  { country: "France", value: 130 },
];

const VerticalBarChartDashboard = ({ color }: { color: string }) => {
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
    <div className="container mx-auto p-4">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VerticalBarChartDashboard;
