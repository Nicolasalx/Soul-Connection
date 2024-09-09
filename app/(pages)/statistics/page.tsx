'use client'

import React, { useEffect, useState } from "react";
import { Divider } from 'antd';
import { BarrChart } from "@/components/BarChart";
import { PiieChart } from "@/components/PieChart";
import { DotChart } from "@/components/DotChart";
import VerticalBarChart from "@/components/VerticalBarChart";
import RadarChart from "@/components/RadarChart";
import { fillCoachStatistic } from "../../lib/dbhelper/statistics_data";
import { isManager } from "../../lib/user";
import Forbidden from "@/components/Forbidden";

function Statistics() {
  const [nbCustomersByCoach, setNbCustomersByCoach] = useState<{ coach: string; value: number }[]>([]);
  const [nbGainByCoach, setNbGainByCoach] = useState<{ coach: string; value: number }[]>([]);
  const [nbEncountersByCoach, setNbEncountersByCoach] = useState<{ coach: string; value: number }[]>([]);
  const [nbEventsByCoach, setNbEventsByCoach] = useState<{ coach: string; value: number }[]>([]);
  const [averageRatingByCoach, setAverageRatingByCoach] = useState<{ coach: string; value: number }[]>([]);
  const [chartConfigCustomers, setChartConfigCustomers] = useState<Record<string, { color: string }>>({});
  const [astrologicalData, setAstrologicalData] = useState<{ name: string; value: number }[]>([]);
<<<<<<< HEAD:app/(pages)/statistics/page.tsx
  const [hasRights, setHasRights] = useState<boolean|null>(null);
=======
  const [hasRights, setHasRights] = useState<boolean | null>(null);
>>>>>>> 85c714dfb458b15051b5da2c07abf2f762d1e6f7:app/statistics/page.tsx

  useEffect(() => {
    isManager().then(val => setHasRights(val))
    if (hasRights === false) {
      return
    }
    const makeStatistics = async () => {
      const coachsStatistics = await fillCoachStatistic();

      const nbCustomerData = coachsStatistics.coach_list
        .map((coach, index) => ({
          coach,
          value: coachsStatistics.coach_nb_client[index],
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
      setNbCustomersByCoach(nbCustomerData);

      const colorPalette = [
        '#2C3E50',
        '#34495E',
        '#1F2A38',
        '#3E4A59',
        '#2D3436'
      ];

      const config = nbCustomerData.reduce((configAcc, item, index) => {
        configAcc[item.coach] = { color: colorPalette[index] };
        return configAcc;
      }, {} as Record<string, { color: string }>);

      setChartConfigCustomers(config);

      const nbGainData = coachsStatistics.coach_list
        .map((coach, index) => ({
          coach,
          value: coachsStatistics.coach_gain[index],
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)
        .reverse();
      setNbGainByCoach(nbGainData);

      const nbEncounters = coachsStatistics.coach_list
        .map((coach, index) => ({
          coach,
          value: coachsStatistics.coach_encounter[index],
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
      setNbEncountersByCoach(nbEncounters);

      const nbEvents = coachsStatistics.coach_list
        .map((coach, index) => ({
          coach,
          value: coachsStatistics.coach_nb_event[index],
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
      setNbEventsByCoach(nbEvents);

      const averageRating = coachsStatistics.coach_list
        .map((coach, index) => ({
          coach,
          value: coachsStatistics.coach_average_rating[index],
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
      setAverageRatingByCoach(averageRating);

      const astroData = coachsStatistics.data_astrological_sign.name_astro_sign
        .map((sign, index) => ({
          name: sign,
          value: coachsStatistics.data_astrological_sign.number_astro_sign[index],
        }));
      setAstrologicalData(astroData);
    };
    makeStatistics();
  }, []);

<<<<<<< HEAD:app/(pages)/statistics/page.tsx
  if (hasRights === null) {
    return null
  }

=======
>>>>>>> 85c714dfb458b15051b5da2c07abf2f762d1e6f7:app/statistics/page.tsx
  if (hasRights === false) {
    return <Forbidden />
  }

  return (
    <>
      <h1 className="font-bold text-gray-600 mb-10 mt-10 text-5xl md:text-6xl">
        Statistics
        <Divider style={{ borderColor: '#d3d3d3' }} />
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1">
          <PiieChart
            data={nbCustomersByCoach}
            title="Number of customers by coach"
            description=""
            dataKey="value"
            nameKey="coach"
            config={chartConfigCustomers}
            observation="Top 5 Coaches by Customer Count"
          />
        </div>

        <div className="col-span-1">
          <DotChart
            data={nbGainByCoach}
            title="Earnings by coach"
            description=""
            xAxisKey="coach"
            lineKey="value"
            observation="Earnings of Top 5 Coaches"
          />
        </div>

        <div className="col-span-1">
          <VerticalBarChart
            data={nbEncountersByCoach}
            title="Number of encounters by coach"
            yAxisKey="coach"
            barKey="value"
          />
        </div>

        <div className="col-span-1">
          <BarrChart
            data={nbEventsByCoach}
            title="Number of events by coach"
            yAxisKey="coach"
            barKey="value"
          />
        </div>

        <div className="col-span-1">
          <BarrChart
            data={averageRatingByCoach}
            title="Average rating by coach"
            yAxisKey="coach"
            barKey="value"
          />
        </div>

        <div className="col-span-1">
          <RadarChart
            data={astrologicalData}
            title="Astrological Sign Distribution"
          />
        </div>
      </div>
    </>
  );
}

export default Statistics;
