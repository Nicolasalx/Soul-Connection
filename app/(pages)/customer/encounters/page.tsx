'use client';

import React, { useEffect, useState } from "react";
import { Divider } from 'antd';
import { getSelfId, isManager } from "../../../lib/user";
import { getCustomerEncounters } from '../../../lib/dbhelper/customers';
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
    const [encountersDetails, setEncountersDetails] = useState<DataTypeEncounters[]>([]);
    const [hasRights, setHasRights] = useState(false);
    
    useEffect(() => {
      const fetchData = async () => {
        const managerRights = await isManager();
        const userID = 68
        setHasRights(managerRights);
        
        if (managerRights) {
          const makeStatistics = async () => {
            
            try {
                const customerEncounters = await getCustomerEncounters(userID);
                const formattedEncounters = customerEncounters.map((encounter: Encounters) => ({
                  key: encounter.id.toString(),
                  date: encounter.date,
                  rating: encounter.rating,
                  report: encounter.comment,
                  source: encounter.source
                }));
                setEncountersDetails(formattedEncounters);
              } catch (error) {
                console.error('Failed to fetch customer encounters:', error);
              }
          };
          
          makeStatistics();
        } else {
        
            try {
                const customerEncounters = await getCustomerEncounters(userID);
                const formattedEncounters = customerEncounters.map((encounter: Encounters) => ({
                  key: encounter.id.toString(),
                  date: encounter.date,
                  rating: encounter.rating,
                  report: encounter.comment,
                  source: encounter.source
                }));
                setEncountersDetails(formattedEncounters);
              } catch (error) {
                console.error('Failed to fetch customer encounters:', error);
              }
        }
      };
    
      fetchData();
    }, []);
  
    return (
      <>
        <h1 className="font-bold text-gray-600 mb-10 mt-10 text-5xl md:text-5xl">
        All Encounters
      </h1>
      <h2 className="text-gray-400 mb-5 text-xl" style={{ fontSize: "2rem" }}>
        View
      </h2>
      <Divider style={{ borderColor: '#d3d3d3' }} />

      <div className="flex space-x-4 mb-6">
        <div className="h-100">
            <ScrollingListApt
            data={hasRights ? encountersDetails : encountersDetails}
            /> 
        </div>
      </div>
      <div className="mt-2">
      </div>
    </>
  );
}

export default EncountersPage;
