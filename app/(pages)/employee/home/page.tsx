"use client";

import React, { useEffect, useState } from "react";
import { isManager } from "../../../lib/user";
import { getEvents } from "../../../lib/dbhelper/events";
import { getEncounters } from "../../../lib/dbhelper/encounters";
import VerticalBarChartDashboard from "@/components/VerticalBarChartDashboard";
import AreaChartDashboard from "@/components/AreaChartDashboard";
import { Chart } from "react-google-charts"
import If from "@/components/If";

class DataType {
  constructor(
    public title: string,
    public value: number,
  ){
  }
}

function HomeDashboard() {
  const [hasRights, setHasRights] = useState(false);
  const [meetingsData, setMeetingsData] = useState<any[]>([])
  const [eventsData, setEventsData] = useState<any[]>([])
  const chartsColors = ['#9ba9ff', '#798bff', '#ffa9ce', '#f9da7a', '#b8acff']

  async function fillEncounters() {
    const encounters = await getEncounters()
    let sourcesValues: DataType[] = []
    encounters.map(encounter => encounter.source).forEach(src => {
      let source = sourcesValues.find(data => data.title === src)
      return source ? source.value += 1 : sourcesValues.push({title: src, value: 1})
    })
    const finalValues: any[] = [['Source', 'Number of meetings']]
    sourcesValues.map(entry => [entry.title, entry.value]).forEach(val => finalValues.push(val))
    setMeetingsData(finalValues)
  }

  async function fillEvents() {
    const events = await getEvents()
    let yearValues: {year: number, value: number}[] = []
    let monthValues: {year: number, month: number, value: number}[] = []
    let dayValues: {year: number, month: number, day: number, value: number}[] = []
    events.map(event => new Date(event.date)).forEach(src => {
      const year = src.getFullYear()
      const month = src.getMonth()
      const day = src.getDate()
      let sourceYear = yearValues.find(data => data.year === year)
      let sourceMonth = monthValues.find(data => data.month === month)
      let sourceDay = dayValues.find(data => data.day === day)
      if (sourceYear) {
        sourceYear.value += 1
      } else {
        yearValues.push({year: year, value: 1})
      }
      if (sourceMonth) {
        sourceMonth.value += 1
      } else {
        monthValues.push({year: year, month: month, value: 1})
      }
      if (sourceDay) {
        sourceDay.value += 1
      } else {
        dayValues.push({year: year, month: month, day: day, value: 1})
      }
    })
    const finalValues: any[] = [['Month', 'Monthly', 'Daily (Avg)']]
    monthValues.sort((a, b) => a.year <= b.year && a.month < b.month ? -1 : 1).map(entry => [
      (new Date(entry.year, entry.month, 1)).toLocaleString('default', { month: 'short' }),
      entry.value,
      dayValues.filter(day => day.year === entry.year && day.month === entry.month).reduce((sum, current) => sum + current.value, 0) / dayValues.filter(day => day.year === entry.year).length,
    ]).forEach(val => finalValues.push(val))
    setEventsData(finalValues)
  }

  useEffect(() => {
    const fetchData = async () => {
      const managerRights = await isManager();
      setHasRights(managerRights);
      fillEncounters()
      fillEvents()
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="font-bold text-gray-600 mb-2 text-5xl md:text-3xl">
        Dashboard
      </h1>
      <h2 className="text-gray-400 mb-5 text-xl" style={{ fontSize: "1rem" }}>
        Welcome!
      </h2>
      <div className="flex flex-col justify-center lg:grid lg:grid-cols-5 lg:justify-items-stretch gap-6 m-8">
          <div className="col-span-3 bg-white shadow-lg rounded-lg p-6 w-full">
            <p className="text-lg font-semibold text-foreground">
              Customers Overview
            </p>
            <p className="text-md text-foreground-400 mb-8">
              When customers have joined in the time.
            </p>
            <AreaChartDashboard />
          </div>
          <div className="col-span-2 bg-white shadow-lg rounded-lg p-6 w-full">
            <div className="mb-8">
              <p className="text-lg font-semibold text-foreground">
                Events
              </p>
              <p className="text-md text-foreground-400 mb-8">
                Our events and their status.
              </p>
            </div>
            <Chart
              chartType="Bar"
              width="100%"
              height="350px"
              data={eventsData}
              options={{ colors: chartsColors }}
            />
        </div>

          <div className="col-span-3 bg-white shadow-lg rounded-lg p-6 w-full">
            <p className="text-lg font-semibold mb-8 text-gray-700 ">
              Most Customers Countries
            </p>
            <VerticalBarChartDashboard />{" "}
            {/* changer la couleur de la barre en fonction du pays jeudi soir lié après liaison avec la db*/}
          </div>
          <div className="col-span-2 bg-white shadow-lg rounded-lg p-6 w-full">
            <div className="mb-4">
              <p className="text-lg font-semibold mb-4 text-gray-700">
                Meetings top sources
              </p>
            </div>
            <Chart
              chartType="PieChart"
              width="100%"
              height="350px"
              data={meetingsData}
              options={{ pieHole: 0.4, is3D: false, colors: chartsColors }}
            />
          </div>
      </div>

      <If condition={hasRights}>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            For more details, visit the{" "}
            <a href="/employee/statistics" className="text-blue-500 underline">
              Statistics
            </a>{" "}
            page.
          </p>
        </div>
      </If>
    </>
  );
}

export default HomeDashboard;
