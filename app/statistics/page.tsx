import React from "react"
import NumberStat from "@/components/NumberStat"
import { BarrChart } from "@/components/BarChart"
import { DotChart } from "@/components/DotChart"
import { PiieChart } from "@/components/PieChart"
import { getCoachs, getEmployees } from "../lib/dbhelper/employees"

{/* Data qui entre dans les charts, pour chaque charts, un dictionnaire, donc j'aimerais les infos de la db sous cette forme si possible */}

const chartDataCoachNbEncounters = [
  { coach: "Coach01", value: 2 },
  { coach: "Coach02", value: 12 },
  { coach: "Coach03", value: 7 },
  { coach: "Coach04", value: 9 },
  { coach: "Coach05", value: 23 },
  { coach: "Coach06", value: 15 },
];

const chartDataCoachesAverageDateRating= [
  { coach: "Coach01", grade: 10 },
  { coach: "Coach02", grade: 5 },
  { coach: "Coach03", grade: 2 },
  { coach: "Coach04", grade: 8 },
  { coach: "Coach05", grade: 7 },
  { coach: "Coach06", grade: 3 },
];

const chartConfigAge = {
  "18-25": {
    label: "18-25",
    color: "hsl(187, 68%, 83%)",
  },
  "26-35": {
    label: "26-35",
    color: "hsl(0, 0%, 50%)",
  },
  "35-65": {
    label: "35-65",
    color: "hsl(323, 100%, 88%)",
  },
  "65-80": {
    label: "65-80",
    color: "hsl(38, 100%, 67%",
  },
};

const chartDataAgeProportion= [
  { age: "18-25", value: 186 },
  { age: "26-35", value: 305 },
  { age: "35-65", value: 237 },
  { age: "65-80", value: 73 },
];

const chartDataSalesEv = [
  { month: "January", amount: 186 },
  { month: "February", amount: 305 },
  { month: "March", amount: 237 },
  { month: "April", amount: 73 },
  { month: "May", amount: 209 },
  { month: "June", amount: 214 },
];

async function Statistics() {
  const employees = await getEmployees();
  const coaches = await getCoachs();

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-300 p-6 rounded w-3/4 ml-80 mt-28">
        <div className="space-x-4">
        <h1 className="text-xl font-bold text-gray-400 mb-4">
          Welcome to your Statistics
        </h1>
        <div className="bg-grey-200 p-4 border border-gray-300 flex justify-center rounded mb-6">
          <NumberStat title="Current Employees Count" value={employees.length} />
          <NumberStat title="Current Coaches Count" value={coaches.length} />
          <NumberStat title="Total Encounters Count" value={0} /> {/* Infos db: Obtenir la somme de toutes les renocntres réalisées */}
          <NumberStat title="Total Sales Revenus" value={0} /> {/* Infos db: Obtenir la somme tous les paiements reçus */}
          <NumberStat title="Total Incoming Meeting Count" value={0} /> {/* Infos db: Récupérer le nombre de prochains meeting */}
        </div>
          <BarrChart
            data={chartDataCoachNbEncounters}
            title="[Example] Coaches total perfomances"
            description="Count of each coach total encounters generated"
            yAxisKey="coach" 
            barKey="value"
            observation="Observation"
            details="Details"
          />
          <BarrChart
            data={chartDataCoachesAverageDateRating}
            title="[Example] Coaches Average Dates Rating"
            description="Moyenne de note des rencontres de chaque coachs"
            yAxisKey="coach" 
            barKey="grade"
            observation="Observation"
            details="Details"
          />
          <PiieChart
            data={chartDataAgeProportion}
            title="Age Ranges Present on SC"
            description="for [Example] the last 6 months"
            dataKey="value"
            nameKey="age"
            config={chartConfigAge}
            observation="None"
            details="None"
          />
          <DotChart
            data={chartDataSalesEv}
            title="Sales Revenus Evolution"
            description="[Example] January 2024 - June 2024 (A Extraire)"
            lineKey="amount"         
            xAxisKey="month"
            observation="None"
            details="None"
          /> {/* Infos db: Besoin des paiements et de leur dates pour faire une courbe évolutive (pareil que sur la page home)*/}
        </div>
      </div>
    </div>
  );
}

{/* Note: Voir peut-être ajouter une chart observation sur l'évolution avec une flèche sur chiffre d'affaire ou autre chose. */}

export default Statistics;
