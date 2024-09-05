import NumberStat from "@/components/NumberStat";
import DateTime from "@/components/DateTime"
import { AreaaChart } from "@/components/AreaChart";
import { getCoachs, getEmployees } from "../lib/dbhelper/employees"

const chartDataSalesEv = [
  { month: "January", amount: 186 },
  { month: "February", amount: 305 },
  { month: "March", amount: 237 },
  { month: "April", amount: 73 },
  { month: "May", amount: 209 },
  { month: "June", amount: 214 },
];

async function HomeDashboard() {
  const employees = await getEmployees();
  const coaches = await getCoachs();

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-300 p-6 rounded w-3/4 ml-80 mt-28">
      <h1 className="text-xl font-bold text-gray-400 mb-6">
          Welcome to your Home Dashboard
        </h1>
        <div className="bg-gray-100 p-4 border border-gray-300 rounded-md mb-6 text-center">
          <DateTime />
        </div>
        <div className="bg-grey-200 p-4 border border-gray-300 flex justify-center rounded mb-6">
          <NumberStat title="Current Employees Count" value={employees.length} />
          <NumberStat title="Current Coaches Count" value={coaches.length} />
          <NumberStat title="Total Encounters Count" value={0} /> {/* Infos db: Obtenir la somme de toutes les renocntres réalisées */}
          <NumberStat title="Total Sales Revenus" value={0} /> {/* Infos db: Obtenir la somme tous les paiements reçus (ajouter une tranche de date) */}
          <NumberStat title="Total Incoming Meeting Count" value={0} /> {/* Infos db: Récupérer le nombre de prochains meeting */}
        </div>
        <AreaaChart
            data={chartDataSalesEv}
            title="Sales Revenus Evolution"
            description="[Example] January 2024 - June 2024 (A Extraire)"
            dataKey="amount"
            xAxisKey="month"
          /> {/* Infos db: Besoin des paiements et de leur date pour faire une courbe évolutive (présente aussi sur statistics)*/}
        <div className="bg-white p-4 border border-gray-300 rounded-md mt-6">
            <h2 className="text-lg font-semibold text-center">Top Performer Coach</h2> {/* Infos db: Obtenir le nom du coach avec le nombre de recontre le plus elevés et/ou les mieux notés*/}
            <p className="text-md text-center">Name: {"A ajouter"}</p>
            <p className="text-md text-center">Performance: {"A ajouter"}</p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-300">
            For more details, go to the <a href="/statistics" className="text-blue-500 underline">Statistics page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

{/* Note: Voir pour peut-être ajouter une info sur les meetings */}
{/* Note: Voir pour peut-être ajouter un lien vers la page statistics si click sur un chart */}

export default HomeDashboard
