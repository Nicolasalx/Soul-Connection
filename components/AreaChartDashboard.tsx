import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import NumberStat from "./NumberStat";

const data = [
  { month: "Jan", customers: 100, meetings: 20, clientsPerCoach: 5 },
  { month: "Feb", customers: 120, meetings: 30, clientsPerCoach: 6 },
  { month: "Mar", customers: 150, meetings: 40, clientsPerCoach: 7 },
  { month: "Apr", customers: 180, meetings: 50, clientsPerCoach: 8 },
];

const AreaChartDashboard = () => {
  const totalCustomers = 932 // en dure pour avoir une valeur, censé être valeur de la db
  const totalMeetings = 260 // en dure pour avoir une valeur, censé être valeur de la db, voir mockup
  const meetingPercentage = (totalMeetings / totalCustomers) * 100;
  const averageClientsPerCoach = 34 // en dure pour avoir une valeur, censé être valeur de la db, voir mockup

  return (
    <div className="container mx-auto p-4">
      <div className="stats flex justify-around mb-4">
        <NumberStat 
        title= "Customers"
        value= {totalCustomers}
        />
        <NumberStat 
        title= "Doing Meetings"
        value= {totalCustomers} // fausse valeur, en dure, mettre info db
        />
        <NumberStat 
        title= "Customers by coach"
        value= {totalCustomers} // fausse valeur, en dure, mettre info db
        />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" /> {/* or date */}
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="customers" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartDashboard;
