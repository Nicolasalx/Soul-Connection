"use client";

import React, { useEffect, useState } from "react";
import { Image, Divider, Table, Select, Typography, Empty } from "antd";
import type { TableColumnsType, SelectProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPerson,
  faLocationDot,
  faCakeCandles,
  faPhone,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import {
  getCoachCustomers,
  getCustomerEncounters,
  getCustomerPayments,
  getCustomers,
} from "../../../lib/dbhelper/customers";
import Customers from "@/app/back/models/customers";
import Payments from "@/app/back/models/payments";
import Encounters from "@/app/back/models/encounters";
import { getSelfId, isManager } from "../../../lib/user";
import If from "@/components/If";
import { getCustomersImage } from "@/app/lib/dbhelper/customers_image";

const { Title } = Typography;

interface DataTypePayments {
  key: React.Key;
  date: string;
  amount: string;
  comment: string;
}

const columnsPayments: TableColumnsType<DataTypePayments> = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
];

interface DataTypeEncounters {
  key: React.Key;
  date: string;
  rating: number;
  report: string;
  source: string;
}

const columnsEncounters: TableColumnsType<DataTypeEncounters> = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Rating",
    dataIndex: "rating",
  },
  {
    title: "Report",
    dataIndex: "report",
  },
  {
    title: "Source",
    dataIndex: "source",
  },
];

function ClientProfile() {
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [customerData, setCustomerData] = useState<Customers[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>(
    undefined
  );
  const [customerDetails, setCustomerDetails] = useState<Partial<Customers>>(
    {}
  );
  const [paymentsDetails, setPaymentsDetails] = useState<DataTypePayments[]>(
    []
  );
  const [encountersDetails, setEncountersDetails] = useState<
    DataTypeEncounters[]
  >([]);
  const [hasRights, setHasRights] = useState(false);

  useEffect(() => {
    async function fetchCoachData() {
      try {
        const selfIdCoach = await getSelfId();
        const response = await getCoachCustomers(selfIdCoach);
        setCustomerData(response);
        const formattedOptions = response.map((customer: Customers) => ({
          value: customer.id.toString(),
          label: customer.name,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
      }
    }

    async function fetchManagerData() {
      try {
        const response = await getCustomers();
        setCustomerData(response);
        const formattedOptions = response.map((customer: Customers) => ({
          value: customer.id.toString(),
          label: customer.name,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
      }
    }

    async function selectRoleView() {
      isManager().then((val) => setHasRights(val));
      if (await isManager()) {
        fetchManagerData();
      } else {
        fetchCoachData();
      }
    }

    selectRoleView();
  }, [hasRights]);

  const [urlCustomer, setCustomerUrl] = useState("");

  useEffect(() => {
    async function fetchCustomerDetails() {
      if (selectedCustomer) {
        const customer = customerData.find(
          (cust) => cust.id.toString() === selectedCustomer
        );
        setCustomerDetails(customer || {});

        try {
          if (customer) {
            const imageData = await getCustomersImage(customer.id.toString());
            setCustomerUrl(imageData.image);
          }
        } catch (error) {
          console.error("Failed to fetch customer image:", error);
        }
        if (customer?.id || customer?.id === 0) {
          try {
            const customerPayments = await getCustomerPayments(customer.id);
            const formattedPayments = customerPayments.map(
              (payment: Payments) => ({
                key: payment.id.toString(),
                date: payment.date,
                amount: payment.amount.toString(),
                comment: payment.comment,
              })
            );
            setPaymentsDetails(formattedPayments);
          } catch (error) {
            console.error("Failed to fetch customer payments:", error);
          }

          try {
            const customerEncounters = await getCustomerEncounters(customer.id);
            const formattedEncounters = customerEncounters.map(
              (encounter: Encounters) => ({
                key: encounter.id.toString(),
                date: encounter.date,
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
      }
    }
    fetchCustomerDetails();
  }, [selectedCustomer, customerData]);

  const handleChange = (value: string | string[]) => {
    setSelectedCustomer(value as string);
  };

  return (
    <>
      <h1 className="font-bold text-gray-600 mb-2 text-5xl md:text-3xl">
        Customers
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 col-span-2 bg-white shadow-lg p-6 rounded-[2px]">
          <Select
            size="large"
            placeholder="Select a customer"
            onChange={handleChange}
            style={{ width: "100%" }}
            options={options}
            value={selectedCustomer}
          />
          <div className="mt-6">
            <Title level={4} style={{ color: "gray" }}>
              <FontAwesomeIcon icon={faPerson} />{" "}
              {customerDetails.name || "No name"}
            </Title>
            <Title level={4} style={{ color: "gray" }}>
              <FontAwesomeIcon icon={faCakeCandles} />{" "}
              {customerDetails.birth_date || "No birth date"}
            </Title>
            <Title level={4} style={{ color: "gray" }}>
              <FontAwesomeIcon icon={faLocationDot} />{" "}
              {customerDetails.address || "No address"}
            </Title>
            <Title level={4} style={{ color: "gray" }}>
              <FontAwesomeIcon icon={faPhone} />{" "}
              {customerDetails.phone_number || "No phone number"}
            </Title>
            <Title level={4} style={{ color: "gray" }}>
              <FontAwesomeIcon icon={faComment} />{" "}
              {customerDetails.description || "No description"}
            </Title>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          {urlCustomer ? (
            <Image
              src={urlCustomer}
              alt="Customer Image"
              width={400}
              height={300}
              style={{ margin: "0 20px" }}
            />
          ) : (
            <Empty description="No image available" />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row mt-4">
        <div className="flex-1 col-span-2 bg-white shadow-lg p-6 rounded-[2px]">
          <Table
            title={() => "Meetings"}
            footer={() => ""}
            bordered
            columns={columnsEncounters}
            dataSource={encountersDetails}
            size="large"
            pagination={{ pageSize: 5 }}
            scroll={{ x: "100%" }}
          />
        </div>

        <If condition={hasRights}>
          <div className="flex-1 col-span-2 bg-white shadow-lg p-6 rounded-[2px]">
            <Table
              title={() => "Payments"}
              footer={() => ""}
              bordered
              columns={columnsPayments}
              dataSource={paymentsDetails}
              size="large"
              pagination={{ pageSize: 5 }}
              scroll={{ x: "100%" }}
            />
          </div>
        </If>
      </div>
    </>
  );
}

export default ClientProfile;
