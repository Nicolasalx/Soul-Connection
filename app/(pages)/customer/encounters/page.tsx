"use client";

import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import { getSelfIdCustomer, isManager } from "../../../lib/user";
import { getCustomerEncounters } from "../../../lib/dbhelper/customers";
import ScrollingListApt from "@/components/ScrollingListApt";
import Encounters from "@/app/back/models/encounters";

interface DataTypeEncounters {
  key: React.Key;
  date: string;
  rating: number;
  report: string;
  source: string;
}

function EncountersPage() {
  const [encountersDetails, setEncountersDetails] = useState<
    DataTypeEncounters[]
  >([]);
  const [hasRights, setHasRights] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const managerRights = await isManager();
      const userID = await getSelfIdCustomer();
      setHasRights(managerRights);

      if (managerRights) {
        const makeStatistics = async () => {
          try {
            const customerEncounters = await getCustomerEncounters(userID);
            const formattedEncounters = customerEncounters.map(
              (encounter: Encounters) => ({
                key: encounter.id.toString(),
                date: new Date(encounter.date).toLocaleString(),
                rating: encounter.rating,
                report: encounter.comment,
                source: encounter.source,
              })
            );
            setEncountersDetails(formattedEncounters);
          } catch (error) {
            console.error("Failed to fetch customer encounters:", error);
          }
        };

        makeStatistics();
      } else {
        try {
          const customerEncounters = await getCustomerEncounters(userID);
          const formattedEncounters = customerEncounters.map(
            (encounter: Encounters) => ({
              key: encounter.id.toString(),
              date: new Date(encounter.date).toLocaleString(),
              rating: encounter.rating,
              report: encounter.comment,
              source: encounter.source,
            })
          );
          setEncountersDetails(formattedEncounters);
        } catch (error) {
          console.error("Failed to fetch customer encounters:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="font-bold mb-2 text-5xl md:text-3xl mb-12">
        All Encounters
      </h1>
      <div className="flex space-x-4 mb-6">
        <div className="w-full">
          <ScrollingListApt
            data={hasRights ? encountersDetails : encountersDetails}
          />
        </div>
      </div>
      <div className="mt-2"></div>
    </>
  );
}

export default EncountersPage;
