"use client";

import React, { useEffect, useState } from "react";
import { BarrChart } from "@/components/BarChart";
import { PiieChart } from "@/components/PieChart";
import { DotChart } from "@/components/DotChart";
import VerticalBarChart from "@/components/VerticalBarChart";
import RadarChart from "@/components/RadarChart";
import { fillCoachStatistic } from "../../../lib/dbhelper/statistics_data";

function Statistics() {
  const [nbCustomersByCoach, setNbCustomersByCoach] = useState<
    { coach: string; value: number }[]
  >([]);
  const [nbGainByCoach, setNbGainByCoach] = useState<
    { coach: string; value: number }[]
  >([]);
  const [nbEncountersByCoach, setNbEncountersByCoach] = useState<
    { coach: string; value: number }[]
  >([]);
  const [nbEventsByCoach, setNbEventsByCoach] = useState<
    { coach: string; value: number }[]
  >([]);
  const [averageRatingByCoach, setAverageRatingByCoach] = useState<
    { coach: string; value: number }[]
  >([]);
  const [chartConfigCustomers, setChartConfigCustomers] = useState<
    Record<string, { color: string }>
  >({});
  const [chartConfigAverageRating, setChartConfigAverageRating] = useState<
    Record<string, { color: string }>
  >({});
  const [astrologicalData, setAstrologicalData] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
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
        "#2C3E50",
        "#34495E",
        "#1F2A38",
        "#3E4A59",
        "#2D3436",
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

      const colorPaletteRate = [
        "#4B4F6B",
        "#5C6378",
        "#3A3D4D",
        "#53566D",
        "#2F3342",
      ];

      const configAverageRating = averageRating.reduce(
        (configAcc, item, index) => {
          configAcc[item.coach] = { color: colorPaletteRate[index] };
          return configAcc;
        },
        {} as Record<string, { color: string }>
      );

      setChartConfigAverageRating(configAverageRating);

      const astroData =
        coachsStatistics.data_astrological_sign.name_astro_sign.map(
          (sign, index) => ({
            name: sign,
            value:
              coachsStatistics.data_astrological_sign.number_astro_sign[index],
          })
        );
      setAstrologicalData(astroData);
    };
    makeStatistics();
  }, []);

  return (
    <>
      <h1 className="font-bold text-gray-600 mb-2 text-5xl md:text-3xl">
        Statistics
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Number of customers by coach
          </p>
          <PiieChart
            data={nbCustomersByCoach}
            title=""
            description=""
            dataKey="value"
            nameKey="coach"
            config={chartConfigCustomers}
            observation="Top 5 Coaches by Customer Count"
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Earnings by coach
          </p>
          <DotChart
            data={nbGainByCoach}
            title=""
            description=""
            xAxisKey="coach"
            lineKey="value"
            observation="Earnings of Top 5 Coaches"
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Number of encounters by coach
          </p>
          <VerticalBarChart
            data={nbEncountersByCoach}
            title=""
            yAxisKey="coach"
            barKey="value"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Number of events by coach
          </p>
          <BarrChart
            data={nbEventsByCoach}
            title=""
            yAxisKey="coach"
            barKey="value"
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Average rating by coach
          </p>
          <PiieChart
            data={averageRatingByCoach}
            title=""
            description=""
            dataKey="value"
            nameKey="coach"
            config={chartConfigAverageRating}
            observation="Top 5 Coaches by Average Rate"
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Astrological Sign Distribution
          </p>
          <RadarChart data={astrologicalData} title="" />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Pour plus de détails, visitez la page{" "}
          <a href="/statistics" className="text-blue-500 underline">
            Statistics
          </a>
          .
        </p>
      </div>
    </>
  );
}

export default Statistics;
