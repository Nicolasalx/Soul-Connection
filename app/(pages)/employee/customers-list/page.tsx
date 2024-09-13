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
import "./customers-list.css";
import ContentWrapper from "@/components/ContentWrapper";
import { getCustomers } from "@/app/lib/dbhelper/customers";
import { getCustomersImage } from "@/app/lib/dbhelper/customers_image";
import CustomerForm from "./customerForm";
import Image from "next/image";
import CustomerView from "../../../../components/customer-view/page";

interface DataType {
  key: React.Key;
  customer: string;
  email: string;
  phone: string;
  payment_method: string;
  profileImage?: string;
}

const CustomersList: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [nbCustomers, setNbCustomers] = useState<number>(0);
  const [dataNewPage, setDataNewPage] = useState<DataType[]>([]);
  const [selectedAction, setSelectedAction] = useState<string | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        const dataCustomers = await getCustomers();
        const formattedData = await Promise.all(
          dataCustomers.map(async (e) => {
            const getCustomerImg = await getCustomersImage(e.id.toString());
            return {
              key: e.id?.toString() || "",
              customer: `${e.name} ${e.surname}`,
              email: e.email,
              phone: "N/A",
              payment_method: "Card",
              profileImage: getCustomerImg?.image || "",
            };
          })
        );
        setDataNewPage(formattedData);
        setNbCustomers(formattedData.length);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
    fetchCustomersData();
  }, []);

  const handleMenuClick = (e: { key: string; id: string }) => {
    if (e.key === "1") {
      setSelectedCustomerId(e.id);
      setIsModalOpen(true);
    }
  };

  const items = (id: string) => (
    <Menu onClick={(e) => handleMenuClick({ key: e.key, id })}>
      <Menu.Item key="1" icon={<EyeOutlined />}>
        View
      </Menu.Item>
      <Menu.Item key="2" icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const columnsNewPage: TableColumnsType<DataType> = [
    {
      title: "Customer",
      key: "customer",
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
          <span className="coach-name">{record.customer}</span>
        </div>
      ),
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "25%",
    },
    {
      title: "Payment Methods",
      dataIndex: "payment_method",
      key: "payment_method",
      width: "20%",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: DataType) => (
        <div className="actions-container">
          <Dropdown overlay={items(record.key as string)} trigger={["click"]}>
            <a className="actions-icon">
              <EllipsisOutlined />
            </a>
          </Dropdown>
        </div>
      ),
      className: "actions-column",
    },
  ];

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

  return (
    <>
      <div className="text-black">
        <div className="header-title-container">
          <h1 className="font-bold text-badge-color mb-2 text-5xl md:text-4xl">
            Customers List
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
              title="Add Customer"
              open={isModalOpen}
              okButtonProps={{ hidden: true }}
              onCancel={() => setIsModalOpen(false)}
            >
              <CustomerForm />
            </Modal>
          </div>
        </div>
        <h3 className="font-bold text-gray-blue mb-4">
          You have total {nbCustomers} customers.
        </h3>
      </div>
      <ContentWrapper>
        <div className="header-container">
          <div className="left-header">
            <Select
              defaultValue="Bulk Action"
              className="bulk-action-select"
              style={{ width: "120px", color: "#607d8b" }}
              placeholder="Bulk Action"
              onChange={handleActionChange}
            >
              <Select.Option value="1">Select all</Select.Option>
              <Select.Option value="2">Delete all</Select.Option>
              <Select.Option value="3">View all</Select.Option>
            </Select>
            <Button
              className="apply-button"
              type="default"
              style={{
                marginLeft: "0.5rem",
                backgroundColor: selectedAction ? "#607d8b" : "#f0f0f0",
                color: selectedAction ? "white" : "#b0b0b0",
                border: "none",
                cursor: selectedAction ? "pointer" : "not-allowed",
                fontWeight: "bold",
              }}
              disabled={!selectedAction}
            >
              Apply
            </Button>
          </div>
          <div className="right-header">
            <div className="search-container">
              <SearchOutlined
                className="search-icon"
                onClick={handleSearchClick}
              />
              {searchVisible && (
                <Input
                  placeholder="Search by name"
                  className="search-input"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                />
              )}
            </div>
            <Divider type="vertical" className="header-divider" />
            <Badge dot={true} color="#0056b3">
              <FilterOutlined className="filter-icon" />
            </Badge>
            <div className="settings-container">
              <SettingOutlined className="settings-icon" />
            </div>
          </div>
        </div>
        <Divider style={{ margin: 0 }} />
        <Table
          className="custom-table-header"
          columns={columnsNewPage}
          dataSource={dataNewPage}
          rowSelection={rowSelection}
          pagination={false}
        />
        <Modal
          title=""
          centered
          open={isModalOpen && selectedCustomerId !== null}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedCustomerId(null);
          }}
          footer={null}
          width="80%"
          bodyStyle={{ height: "80vh", overflow: "auto" }}
        >
          {selectedCustomerId !== null && (
            <CustomerView id={selectedCustomerId} />
          )}
        </Modal>
      </ContentWrapper>
    </>
  );
};

export default CustomersList;
