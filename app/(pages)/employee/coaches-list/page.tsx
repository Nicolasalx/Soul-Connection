"use client";

import React, { useEffect, useState } from "react";
import {
  Divider,
  Dropdown,
  Menu,
  Table,
  Select,
  Button,
  Input,
  Modal,
  Badge,
  TableColumnsType,
} from "antd";
import {
  EllipsisOutlined,
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
  SettingOutlined,
  UserOutlined,
  PlusOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import "./coaches-list.css";
import ContentWrapper from "@/components/ContentWrapper";
import { getEmployees } from "@/app/lib/dbhelper/employees";
import { getEmployeesImage } from "@/app/lib/dbhelper/employees_image";
import {
  assignCoachToCustomer,
  getCoachCustomers,
  getCustomers,
  unassignCoachToCustomer,
} from "@/app/lib/dbhelper/customers";
import EmployeeForm from "./employeeForm";
import { isManager } from "@/app/lib/user";
import Customers from "@/app/back/models/customers";
import Image from "next/image";

var mongoose = require("mongoose");

interface DataType {
  key: React.Key;
  coach: string;
  email: string;
  phone: string;
  nbCustomers: string;
  profileImage?: string;
  customerNames: string[];
}

const items = (
  <Menu>
    <Menu.Item key="1" icon={<EyeOutlined />}>
      View
    </Menu.Item>
    <Menu.Item key="2" icon={<DeleteOutlined />}>
      Delete
    </Menu.Item>
  </Menu>
);

function Coaches() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [nbCoaches, setNbCoaches] = useState<number>(0);
  const [dataNewPage, setDataNewPage] = useState<DataType[]>([]);
  const [selectedAction, setSelectedAction] = useState<string | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasRights, setHasRights] = useState(false);
  const [customerNames, setCustomerNames] = useState<{
    [key: string]: string[];
  }>({});
  const [allCustomers, setAllCustomers] = useState<Customers[]>([]);

  const columnsNewPage: TableColumnsType<DataType> = [
    {
      title: "Coach",
      key: "coach",
      render: (text: string, record: DataType) => (
        <div className="coach-profile-container">
          <div className="profile-icon-container">
            {record.profileImage ? (
              <Image
                src={record.profileImage}
                alt="Profile"
                className="profile-icon"
              />
            ) : (
              <UserOutlined className="default-icon" />
            )}
          </div>
          <span className="coach-name">{record.coach}</span>
        </div>
      ),
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "20%",
    },
    {
      title: "Number of customers",
      dataIndex: "nbCustomers",
      key: "nbCustomers",
      width: "15%",
    },
    {
      title: "Select Customers",
      key: "selectCustomers",
      render: (text: string, record: DataType) => (
        <Select
          mode="multiple"
          placeholder="Select customers"
          style={{ width: 200 }}
          onChange={(value: string[]) =>
            handleCustomerSelect(record.key.toString(), value)
          }
          value={customerNames[record.key.toString()] || []}
        >
          {allCustomers.map((customer) => (
            <Select.Option
              key={customer._id?.toString() || ""}
              value={`${customer.name} ${customer.surname}`}
            >
              {customer.name} {customer.surname}
            </Select.Option>
          ))}
        </Select>
      ),
      width: "20%",
    },

    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div className="actions-container">
          <Dropdown overlay={items} trigger={["click"]}>
            <a className="actions-icon">
              <EllipsisOutlined />
            </a>
          </Dropdown>
        </div>
      ),
      className: "actions-column",
    },
  ];

  useEffect(() => {
    const fetchCoachesData = async () => {
      try {
        const dataEmployees = await getEmployees();
        const coaches = dataEmployees.filter((e) => e.work === "Coach");

        const formattedData = await Promise.all(
          coaches.map(async (e) => {
            const getEmployeeImg = await getEmployeesImage(e.id.toString());
            const nbCustomersCoach = await getCoachCustomers(e.id);
            return {
              key: e.id.toString(),
              coach: `${e.name} ${e.surname}`,
              email: e.email,
              phone: "N/A",
              nbCustomers: nbCustomersCoach.length.toString() || "N/A",
              profileImage: getEmployeeImg?.image || "",
              customerNames: customerNames[e.id.toString()] || [],
            };
          })
        );

        setDataNewPage(formattedData);
        setNbCoaches(formattedData.length);
      } catch (error) {
        console.error("Error fetching coach data:", error);
      }
    };

    const fetchAllCustomers = async () => {
      const customers = await getCustomers();
      setAllCustomers(customers);

      const namesByCoachId: { [key: string]: string[] } = {};

      customers.forEach((customer) => {
        const coachId = customer.coach_id.toString();
        if (!namesByCoachId[coachId]) {
          namesByCoachId[coachId] = [];
        }
        namesByCoachId[coachId].push(`${customer.name} ${customer.surname}`);
      });

      setCustomerNames(namesByCoachId);
    };

    isManager().then((val) => setHasRights(val));
    fetchAllCustomers().then(fetchCoachesData);
  }, [customerNames]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  const handleActionChange = (value: string) => {
    setSelectedAction(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCustomerSelect = async (
    coachId: string,
    selectedCustomerNames: string[]
  ) => {
    const coach = dataNewPage.find((coach) => coach.key === coachId);
    if (coach) {
      const previousCustomerNames = customerNames[coachId] || [];

      const deselectedCustomers = previousCustomerNames.filter(
        (name) => !selectedCustomerNames.includes(name)
      );

      deselectedCustomers.forEach(async (deselectedCustomerName) => {
        const customer = allCustomers.find(
          (c) => `${c.name} ${c.surname}` === deselectedCustomerName
        );
        if (customer && customer._id) {
          console.log(
            `Désélectionné : Coach ID: ${coachId}, Customer ID: ${customer._id}`
          );
          await unassignCoachToCustomer(customer._id);
        }
      });

      for (const customerName of selectedCustomerNames) {
        const customer = allCustomers.find(
          (c) => `${c.name} ${c.surname}` === customerName
        );
        if (customer && customer._id) {
          const objectId = new mongoose.Types.ObjectId(customer._id);
          const coachIdNumber = parseInt(coachId, 10);
          await assignCoachToCustomer(coachIdNumber, objectId);
        }
      }
    }

    setCustomerNames((prev) => ({
      ...prev,
      [coachId]: selectedCustomerNames,
    }));
  };

  return (
    <>
      <div className="text-black">
        <div className="header-title-container">
          <h1 className="font-bold text-badge-color mb-2 text-5xl md:text-4xl">
            Coaches List
          </h1>
          <div className="header-buttons">
            <Button
              className="export-button"
              type="default"
              icon={<CloudDownloadOutlined />}
              style={{ fontWeight: "bold" }}
            >
              Export
            </Button>
            <Button
              className="add-button"
              type="primary"
              icon={<PlusOutlined />}
              style={{ marginLeft: "1rem" }}
              onClick={showModal}
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
        </div>
        <h3 className="font-bold text-gray-blue mb-4">
          You have total {nbCoaches} coaches.
        </h3>
      </div>
      <ContentWrapper>
        <div className="header-container">
          <div className="left-header">
            <Select
              defaultValue="Bulk Action"
              style={{ width: 120 }}
              onChange={handleActionChange}
            >
              <Select.Option value="1">Select all</Select.Option>
              <Select.Option value="2">Deselect all</Select.Option>
              <Select.Option value="3">Delete selected</Select.Option>
            </Select>
            <Button
              className="apply-button"
              type="default"
              style={{ marginLeft: "0.5rem" }}
            >
              Apply
            </Button>
          </div>
          <div className="right-header">
            <div
              className="search-container"
              style={{ display: searchVisible ? "flex" : "none" }}
            >
              <Input
                placeholder="Search"
                suffix={<SearchOutlined />}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <Button
              type="default"
              icon={<SearchOutlined />}
              onClick={handleSearchClick}
            />
            <Button
              type="default"
              icon={<FilterOutlined />}
              style={{ marginLeft: "0.5rem" }}
            />
            <Button
              type="default"
              icon={<SettingOutlined />}
              style={{ marginLeft: "0.5rem" }}
            />
          </div>
        </div>
        <Divider />
        <Table
          rowSelection={rowSelection}
          columns={columnsNewPage}
          dataSource={dataNewPage}
          pagination={{ pageSize: 10 }}
        />
      </ContentWrapper>
    </>
  );
}

export default Coaches;
