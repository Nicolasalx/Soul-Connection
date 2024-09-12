"use client";

import React, { useContext, useEffect, useState } from "react";
import type { SelectProps, TableProps } from "antd";
import { Table, Select } from "antd";
import Customers from "@/app/back/models/customers";
import { getSelfId, isManager } from "@/app/lib/user";
import { getCoachCustomers, getCustomers } from "@/app/lib/dbhelper/customers";
import Advices from "@/app/back/models/advices";
import { createNote, getNote } from "@/app/lib/dbhelper/notes";

type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const CoachNotes: React.FC = () => {
  const [listNotes, setListNotes] = useState<Advices[]>([]);
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [customerData, setCustomerData] = useState<Customers[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>(
    undefined
  );

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
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

  useEffect(() => {
    async function fetchCoachData() {
      try {
        const selfIdCoach = await getSelfId();

        var response;
        if (await isManager()) {
          response = await getCustomers();
        } else {
          response = await getCoachCustomers(selfIdCoach);
        }
        setCustomerData(response);
        const formattedOptions = response.map((customer: Customers) => ({
          value: customer.id.toString(),
          label: customer.name + " " + customer.surname,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
      }
    }
    fetchCoachData();
  }, []);

  useEffect(() => {
    async function fetchNotesData() {
      try {
        if (selectedCustomer) {
          const customer = customerData.find(
            (cust) => cust.id.toString() === selectedCustomer
          );
          if (customer) {
            const advices = await getNote(customer.id.toString());
            if (advices) {
              setListNotes(advices);
            } else {
              const newNotes: Advices[] = [];
              await createNote(customer.id.toString(), newNotes);
              setListNotes([]);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    }
    fetchNotesData();
  }, [customerData, selectedCustomer]);

  const handleChange = (value: string | string[]) => {
    setSelectedCustomer(value as string);
  };

  return (
    <div>
      <h1 className="font-bold text-gray-600 mb-2 text-5xl md:text-3xl mb-12">
        Coach Notes
      </h1>
      <Select
        size="large"
        placeholder="Select a customer"
        onChange={handleChange}
        style={{ width: "100%" }}
        options={options}
        value={selectedCustomer}
      />
      <Table
        rowClassName={() => "read-only-row"}
        bordered
        dataSource={listNotes}
        columns={defaultColumns as ColumnTypes}
      />
    </div>
  );
};

export default CoachNotes;
