"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import {
  getCustomerEncounters,
  getCustomerPayments,
  getCustomers,
} from "@/app/lib/dbhelper/customers";
import {
  StarFilled,
  StarOutlined,
  MailOutlined,
  SunOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import "./customer_view.css";
import Customers from "@/app/back/models/customers";
import { getCoachs } from "@/app/lib/dbhelper/employees";
import { getCustomersImage } from "@/app/lib/dbhelper/customers_image";
import Image from "next/image";
import { ObjectId } from "mongodb";

/*    MEETINGS   */

interface TypeMeetings {
  key: React.Key;
  date: string;
  rating: number;
  report: string;
  source: string;
}

const columnsMeetings: TableColumnsType<TypeMeetings> = [
  {
    title: "Date",
    dataIndex: "date",
    render: (text) => (
      <span style={{ fontWeight: "bold", color: "#0056b3" }}>{text}</span>
    ),
  },
  {
    title: "Rating",
    dataIndex: "rating",
    render: (rating: number) => (
      <span style={{ display: "flex", alignItems: "center" }}>
        {Array.from({ length: 5 }, (_, index) =>
          index < rating ? (
            <StarFilled
              key={index}
              style={{
                color: "#183662",
                fontSize: "16px",
                marginRight: "4px",
              }}
            />
          ) : (
            <StarOutlined
              key={index}
              style={{
                color: "#183662",
                fontSize: "16px",
                marginRight: "4px",
              }}
            />
          )
        )}
      </span>
    ),
  },
  {
    title: "Report",
    dataIndex: "report",
    render: (text) => (
      <span style={{ color: "#607d8b", fontWeight: "bold" }}>{text}</span>
    ),
  },
  {
    title: "Source",
    dataIndex: "source",
    render: (text) => (
      <span style={{ color: "#607d8b", fontWeight: "bold" }}>{text}</span>
    ),
  },
];

/*    PAYMENTS   */

interface TypePayments {
  key: React.Key;
  date: string;
  payment_method: string;
  amount: string;
  comment: string;
}

const columnsPayments: TableColumnsType<TypePayments> = [
  {
    title: "Date",
    dataIndex: "date",
    render: (text) => (
      <span style={{ fontWeight: "bold", color: "#0056b3" }}>{text}</span>
    ),
  },
  {
    title: "Payment Method",
    dataIndex: "payment_method",
    render: (text) => (
      <span style={{ color: "#607d8b", fontWeight: "bold" }}>{text}</span>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    render: (text) => (
      <span style={{ fontWeight: "bold", color: "#183662" }}>{text}</span>
    ),
  },
  {
    title: "Comment",
    dataIndex: "comment",
    render: (text) => (
      <span style={{ color: "#607d8b", fontWeight: "bold" }}>{text}</span>
    ),
  },
];

interface CustomerViewProps {
  id: string;
}

export default function CustomerView({ id }: CustomerViewProps) {
  const [meetingsData, setMeetingsData] = useState<TypeMeetings[]>([]);
  const [paymentsData, setPaymentsData] = useState<TypePayments[]>([]);
  const [customer, setCustomer] = useState<Customers | undefined>();
  const [coachName, setCoachName] = useState<string>("");
  const [nbEncounters, setNbEncounters] = useState<number>(0);
  const [imgCustomerReal, setImgCustomer] = useState<string | undefined>();

  useEffect(() => {
    const fetchCustomerData = async () => {
      const customerData = await getCustomers();
      const customer = customerData.find((cust) => cust.id.toString() === id);

      if (customer) {
        const encounters = await getCustomerEncounters(customer.id);
        setNbEncounters(encounters.length);
        const imgCustomer = await getCustomersImage(customer.id.toString());
        if (imgCustomer) {
          setImgCustomer(imgCustomer.image);
        }
        const dataCoachs = await getCoachs();
        const coach = dataCoachs.find((cust) => cust.id === customer.coach_id);
        if (coach) {
          setCoachName(coach.name);
        }
        setCustomer(customer);
      } else {
        console.error("Customer not found");
      }

      const encountersCustomer = await getCustomerEncounters(Number(id));
      const paymentsCustomer = await getCustomerPayments(Number(id));

      const formattedMeetings = encountersCustomer.map((encounter) => ({
        key: encounter._id?.toString() || "",
        date: encounter.date,
        rating: encounter.rating,
        report: encounter.comment,
        source: encounter.source,
      }));

      const formattedPayments = paymentsCustomer.map((payment) => ({
        key: payment._id?.toString() || "",
        date: payment.date,
        payment_method: payment.payment_method,
        amount: `${payment.amount.toFixed(2)} $`,
        comment: payment.comment,
      }));

      setMeetingsData(formattedMeetings);
      setPaymentsData(formattedPayments);
    };
    fetchCustomerData();
  }, [id]);

  return (
    <>
      <div className="text-black">
        <div
          className="header-title-container"
          style={{
            marginLeft: "25px",
          }}
        >
          <h1
            className="font-bold mb-2 text-5xl md:text-4xl"
            style={{
              color: "#183662",
            }}
          >
            Customer Details
          </h1>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          height: "100vh",
          padding: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "500px",
            backgroundColor: "#f0f0f0",
            padding: "40px",
            marginRight: "40px",
            boxSizing: "border-box",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <Image
                src={imgCustomerReal || ""}
                alt="Icone"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>

            <h1 style={{ marginBottom: "20px", color: "#183662" }}>
              {customer?.name} {customer?.surname}
            </h1>

            <hr className="divider" />

            <div
              style={{
                margin: "20px 0",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MailOutlined className="icon" />
              <PushpinOutlined className="icon" />
            </div>
          </div>

          <hr className="divider" />

          <div className="info-container">
            <div className="info-item">
              <h2 className="info-number">{nbEncounters}</h2>
              <p>Total Encounters</p>
            </div>
            <div className="info-item">
              <h2 className="info-number">20</h2>
              <p>Positives</p>
            </div>
            <div className="info-item">
              <h2 className="info-number">20</h2>
              <p>In progress</p>
            </div>
          </div>

          <hr className="divider" />

          <div className="details-container">
            <h2 style={{ color: "#183662" }}>Short Details</h2>
            <div className="details-item">
              <p className="details-label">User ID:</p>
              <p className="details-value">{customer?.id}</p>
            </div>
            <div className="details-item">
              <p className="details-label">Email:</p>
              <p className="details-value">{customer?.email}</p>
            </div>
            <div className="details-item">
              <p className="details-label">Address:</p>
              <p className="details-value">{customer?.address}</p>
            </div>
            <div className="details-item">
              <p className="details-label">Last Activity:</p>
              <p className="details-value">August 5th, 2023</p>
            </div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            height: "100%",
          }}
        >
          <div>
            <h2
              className="table-title"
              style={{
                color: "#183662",
                marginBottom: "20px",
              }}
            >
              Encounters
            </h2>
            <Table
              columns={columnsMeetings}
              dataSource={meetingsData}
              pagination={{ pageSize: 5 }}
            />
          </div>
          <div>
            <h2
              className="table-title"
              style={{
                color: "#183662",
                marginTop: "40px",
                marginBottom: "20px",
              }}
            >
              Payments
            </h2>
            <Table
              columns={columnsPayments}
              dataSource={paymentsData}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
