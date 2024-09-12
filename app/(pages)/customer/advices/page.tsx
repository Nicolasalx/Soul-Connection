"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { createAdvice, getAdvice } from "@/app/lib/dbhelper/advices";
import { getSelfIdCustomer } from "@/app/lib/user";
import Advices from "@/app/back/models/advices";

export default function AdvicesPage() {
  const [advices, setAdvices] = useState<Advices[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAdvices();
  }, []);

  const fetchAdvices = async () => {
    try {
      const customerId = (await getSelfIdCustomer()).toString();
      const data = await getAdvice(customerId);

      if (data) {
        setAdvices(data);
      } else {
        const newAdvices: Advices[] = [];
        await createAdvice(customerId, newAdvices);
        setAdvices(newAdvices);
      }
    } catch (error) {
      console.error("Error fetching advices:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={advices}
        loading={loading}
        size="middle"
        rowKey={(record) => record.title}
      />
    </>
  );
}
