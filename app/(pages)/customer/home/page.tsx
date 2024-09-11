
'use client'
import React, { useEffect, useState } from "react";
import { getSelfIdCustomer } from "../../../lib/user";
import { getCustomers } from "@/app/lib/dbhelper/customers";

export async function getCustomerUserName() {
  const customerUserId = await getSelfIdCustomer();
  const allCustomers = await getCustomers();
  
  const customerUserInfos = allCustomers.find(customer => customer.id === customerUserId);
  
  if (customerUserInfos) {
    const {
      _id,
      birth_date,
      gender,
      password,
      ...cleanMergedData
    } = customerUserInfos;

    return cleanMergedData;
  }
  return null;
}

export default function Home() {
  const [customerInfo, setCustomerInfo] = useState<{ name: string, surname: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getCustomerUserName();
      if (data) {
        setCustomerInfo(data);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-gray-400 mb-2 text-3xl text-center">
        Welcome{customerInfo ? `, ${customerInfo.name} ${customerInfo.surname}` : ''}!
      </h1>
    </>
  );
}
