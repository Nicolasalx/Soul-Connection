'use client'

import React, { useEffect, useState } from "react";
import { Divider } from 'antd';
import { BarrChart } from "@/components/BarChart";
import { DotChart } from "@/components/DotChart";
import { PiieChart } from "@/components/PieChart";
import { fillCoachStatistic } from "../lib/dbhelper/statistics_data";

function Statistics() {
  const [nbCustomersByCoach, setNbCustomersByCoach] = useState<{ coach: string; value: number }[]>([]);
  const [nbGainByCoach, setNbGainByCoach] = useState<{ coach: string; value: number }[]>([]);
  const [nbEncountersByCoach, setNbEncountersByCoach] = useState<{ coach: string; value: number }[]>([]);
  const [nbEventsByCoach, setNbEventsByCoach] = useState<{ coach: string; value: number }[]>([]);
  const [averageRatingByCoach, setAverageRatingByCoach] = useState<{ coach: string; value: number }[]>([]);

useEffect(() => {
  const makeStatistics = async () => {
    const coachsStatistics = await fillCoachStatistic();

    console.log(coachsStatistics);

    const nbCustomerData = coachsStatistics.coach_list
      .map((coach, index) => ({
        coach,
        value: coachsStatistics.coach_nb_client[index],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
    setNbCustomersByCoach(nbCustomerData);

    const nbGainData = coachsStatistics.coach_list
      .map((coach, index) => ({
        coach,
        value: coachsStatistics.coach_gain[index],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
      console.log("HERE: ", nbGainData);
    setNbGainByCoach(nbGainData);
    console.log("HERE2: ", nbGainByCoach);

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
  };
  makeStatistics();
}, []);


  return (
    <div className="flex flex-col h-screen w-screen p-6">
      <div className="bg-white border border-gray-300 p-12 rounded-lg">
        <h1 className="font-bold text-gray-600 mb-10 mt-10 text-2xl" style={{ fontSize: "4rem" }}>
          Statistics
          <Divider style={{ borderColor: '#d3d3d3' }} />
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="col-span-1">
            <BarrChart
              data={nbCustomersByCoach}
              title="Number of customers by coach"
              yAxisKey="coach"
              barKey="value"
            />
          </div>

          <div className="col-span-1">
            <BarrChart
              data={nbGainByCoach}
              title="Earnings by coach"
              yAxisKey="coach"
              barKey="value"
            />
          </div>
          <div className="col-span-1">
            <BarrChart
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
          {/* <div className="col-span-1">
            <PiieChart
              data={chartDataAgeProportion}
              title="Age Ranges Present on SC"
              description="Distribution of Age Ranges"
              dataKey="value"
              nameKey="age"
              config={chartConfigAge}
              observation="None"
            />
          </div>
          <div className="col-span-1">
            <DotChart
              data={chartDataSalesEv}
              title="Sales Revenus Evolution"
              description="Evolution from January to June 2024"
              lineKey="amount"
              xAxisKey="month"
              observation="None"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
