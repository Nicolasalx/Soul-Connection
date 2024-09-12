import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import NumberStat from "./NumberStat";

const data = [
  { month: "Jan", events: 20 }, // graph avec date & client par date (mois, semaine, comme vous voulez)
  { month: "Feb", events: 30 },
  { month: "Mar", events: 40 },
  { month: "Apr", events: 50 },
];

const VerticalBarChartDashboard = () => {
  const totalEvents = 12 ; // Valeur en dur simulant la DB, voir mockup pour ce que dois affiché le graphique,
  const eventsPerMonths = 8;  // Valeur en dur simulant la DB, si pas possible d'avoir ce graph, alternative proche, pas grave
  const eventsPerWeek = 4; // Valeur en dur simulant la DB
  const eventsPerDay = 2; // Valeur en dur simulant la DB, ces calculs devraient se faire sur le fichier page.tsx employees/home 

  return (
    <div className="container mx-auto p-4">
      <div className="stats flex justify-around mb-4">
        <NumberStat 
        title= "Monthly"
        value= {eventsPerMonths} // ces valeurs devraient etre passé en param pour rendre le graph modulaire
        />
        <NumberStat 
        title= "Weekly"
        value= {eventsPerWeek} // fausse valeur, en dure, mettre info db
        />
        <NumberStat 
        title= "Daily"
        value= {eventsPerDay} // fausse valeur, en dure, mettre info db
        />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="events" fill="#82ca9d" />
          <Bar dataKey="clientsPerCoach" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VerticalBarChartDashboard;
