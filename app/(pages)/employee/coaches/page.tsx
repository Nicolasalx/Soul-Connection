"use client";

import { Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import type { SelectProps, TableColumnsType } from "antd";
import { getEmployees } from "../../../lib/dbhelper/employees";
import {
  assignCoachToCustomer,
  getCustomers,
  unassignCoachToCustomer,
} from "../../../lib/dbhelper/customers";
import { ObjectId } from "mongodb";
import { isManager } from "../../../lib/user";
import EmployeeForm from "./employeeForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

var mongoose = require("mongoose");

interface DataTypeCoaches {
  key: React.Key;
  id: string;
  name: string;
  birthDate: string;
  customers: string[];
  lastConnection: string;
}

interface CustomerType {
  id: number;
  name: string;
  surname: string;
  _id?: ObjectId;
  coach_id?: number;
}

function Coaches() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<DataTypeCoaches[]>([]);
  const [customerOptions, setCustomerOptions] = useState<
    SelectProps["options"]
  >([]);
  const [prevSelections, setPrevSelections] = useState<{
    [key: string]: string[];
  }>({});
  const [hasRights, setHasRights] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const fetchEmployeesData = async () => {
    const dataEmployees = await getEmployees();
    const dataCustomers = await getCustomers();

    const formattedData = dataEmployees
      .filter((e) => e.work === "Coach")
      .map((employee) => {
        const coachCustomers = dataCustomers
          .filter((customer: CustomerType) => customer.coach_id === employee.id)
          .map((customer: CustomerType) =>
            customer._id ? customer._id.toString() : ""
          );

        return {
          key: employee.id,
          id: employee.id,
          name: `${employee.name} ${employee.surname}`,
          birthDate: employee.birth_date || "N/A",
          customers: coachCustomers,
          lastConnection: employee.last_connection
            ? new Date(employee.last_connection).toLocaleString()
            : "N/A",
        };
      })
      .sort((a, b) => (a.id < b.id ? -1 : 1));

    setData(formattedData as any);

    setPrevSelections(
      formattedData.reduce((acc, employee) => {
        acc[employee.id] = employee.customers;
        return acc;
      }, {} as { [key: string]: string[] })
    );
  };

  const fetchCustomersData = async () => {
    const dataCustomers = await getCustomers();
    const formattedCustomers = dataCustomers.map((customer: CustomerType) => ({
      label: `${customer.name} ${customer.surname}`,
      value: `${customer._id ? customer._id.toString() : ""}`,
    }));

    setCustomerOptions(formattedCustomers);
  };

  useEffect(() => {
    isManager().then((val) => setHasRights(val));
    fetchEmployeesData();
    fetchCustomersData();
  }, []);

  const handleCustomerChange = async (
    values: string[],
    record: DataTypeCoaches
  ) => {
    const coachId = Number(record.id);
    const previousValues = prevSelections[record.id] || [];
    const addedValues = values.filter(
      (value) => !previousValues.includes(value)
    );
    const removedValues = previousValues.filter(
      (value) => !values.includes(value)
    );

    for (const value of addedValues) {
      try {
        var objectId = new mongoose.Types.ObjectId(value);
        await assignCoachToCustomer(coachId, objectId);
      } catch (error) {
        console.error("Invalid ObjectId format:", value);
      }
    }

    for (const value of removedValues) {
      try {
        var objectId = new mongoose.Types.ObjectId(value);
        await unassignCoachToCustomer(objectId);
      } catch (error) {
        console.error("Invalid ObjectId format:", value);
      }
    }

    setPrevSelections((prev) => ({
      ...prev,
      [record.id]: values,
    }));

    fetchCustomersData();
  };

  const columns: TableColumnsType<DataTypeCoaches> = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Birth Date",
      dataIndex: "birthDate",
    },
    {
      title: hasRights ? "Customers" : "",
      dataIndex: "customers",
      render: (_, record) => (
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Select customers"
          defaultValue={record.customers}
          onChange={(value) => handleCustomerChange(value, record)}
          options={customerOptions}
        />
      ),
    },
    {
      title: "Last Connection",
      dataIndex: "lastConnection",
    },
  ];

  return (
    <>
      <h1 className="font-bold text-gray-600 mb-2 text-5xl md:text-3xl">
        Coaches
      </h1>
      <h2 className="text-gray-400 mb-5" style={{ fontSize: "1rem" }}>
        You have [db Value] of coaches.
      </h2>

      <div className="flex justify-end mb-6">
        <FontAwesomeIcon
          icon={faSquarePlus}
          style={{ color: "#3f72ca" }}
          onClick={showModal}
          size="3x"
        />
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          size="large"
          rowKey="id"
          pagination={{ pageSize: 6 }}
          scroll={{ x: "100%" }}
        />
        <Modal
          title="Add Employee"
          open={isModalOpen}
          okButtonProps={{ hidden: true }}
          onCancel={() => setIsModalOpen(false)}
        >
          <EmployeeForm />
        </Modal>
      </div>
    </>
  );
}

export default Coaches;
