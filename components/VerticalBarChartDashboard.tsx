import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import React, { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';
// import NumberStat from "./NumberStat";

const data = [
  { country: "Chine", value: 8 },
  { country: "Alaska", value: 12 },
  { country: "USA", value: 83 },
  { country: "France", value: 130 }, // graph avec date & client par date (mois, semaine, comme vous voulez)
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
  
  //const totalEvents = 12; // Valeur en dur simulant la DB, voir mockup pour ce que dois affiché le graphique,
  //const eventsPerMonths = 8; // Valeur en dur simulant la DB, si pas possible d'avoir ce graph, alternative proche, pas grave
  //const eventsPerWeek = 4; // Valeur en dur simulant la DB
  //const eventsPerDay = 2; // Valeur en dur simulant la DB, ces calculs devraient se faire sur le fichier page.tsx employees/home

  return (
    <div className="container mx-auto p-4">
      {/* <div className="stats flex justify-around mb-4">
        <NumberStat
          title="Monthly"
          value={eventsPerMonths} // ces valeurs devraient etre passé en param pour rendre le graph modulaire
        />
        <NumberStat
          title="Weekly"
          value={eventsPerWeek} // fausse valeur, en dure, mettre info db
        />
        <NumberStat
          title="Daily"
          value={eventsPerDay} // fausse valeur, en dure, mettre info db
        />
      </div> */}

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
