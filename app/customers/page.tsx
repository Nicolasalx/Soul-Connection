'use client';

import { Image } from 'antd';
import { Divider, Table, Select } from 'antd';
import type { TableColumnsType, SelectProps } from 'antd';
import './customers-page.css';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faLocationDot, faCakeCandles, faPhone, faComment } from '@fortawesome/free-solid-svg-icons';
import { getCoachCustomers, getCustomerEncounters, getCustomerPayments } from '../lib/dbhelper/customers';
import Customers from "@/app/back/models/customers";
import Payments from "@/app/back/models/payments";
import Encounters from "@/app/back/models/encounters";
import { getSelfId } from '../lib/user';

const baseStyle: React.CSSProperties = {
  width: '100%',
  height: 54
};

const { Title } = Typography;

/*     PAYMENTS       */

interface DataTypePayments {
  key: React.Key;
  date: string;
  amount: string;
  comment: string;
}

const columnsPayments: TableColumnsType<DataTypePayments> = [
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
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
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
  },
  {
    title: 'Report',
    dataIndex: 'report',
  },
  {
    title: 'Source',
    dataIndex: 'source',
  }
];

function ClientProfile() {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [customerData, setCustomerData] = useState<Customers[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>(undefined);
  const [customerDetails, setCustomerDetails] = useState<Partial<Customers>>({});
  const [paymentsDetails, setPaymentsDetails] = useState<DataTypePayments[]>([]);
  const [encountersDetails, setEncountersDetails] = useState<DataTypeEncounters[]>([]);
  const [customerId, setCustomerId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCustomerData() {
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
        console.error('Failed to fetch customer data:', error);
      }
    }
    fetchCustomerData();
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      const customer = customerData.find(cust => cust.id.toString() === selectedCustomer);
      setCustomerDetails(customer || {});
      setCustomerId(customer?.id ?? null);

      console.log("CUSTOMER ID: ", customerId);

      if (customer?.id !== undefined) {
        /*     PAYMENTS     */
        const customerPayments = getCustomerPayments(customer.id);
        customerPayments.then(payments => {
          const formattedPayments = payments.map((payment: Payments) => ({
            key: payment.id.toString(),
            date: payment.date,
            amount: payment.amount.toString(),
            comment: payment.comment,
          }));
          setPaymentsDetails(formattedPayments);
        }).catch(error => {
          console.error('Failed to fetch customer payments:', error);
        });

        /*     ENCOUNTERS     */
        const customerEncounters = getCustomerEncounters(customer.id);
        customerEncounters.then(encounters => {
          const formattedEncounters = encounters.map((encounter: Encounters) => ({
            key: encounter.id.toString(),
            date: encounter.date,
            rating: encounter.rating,
            report: encounter.comment,
            source: encounter.source
          }));
          setEncountersDetails(formattedEncounters);
        }).catch(error => {
          console.error('Failed to fetch customer encounters:', error);
        });
      }
    }
  }, [selectedCustomer, customerData]);

  const handleChange = (value: string | string[]) => {
    setSelectedCustomer(value as string);
  };

  return (
    <>
      <div style={{ marginLeft: 220 }}>
        <Title style={{ color: 'white', marginTop: 120, marginLeft: 70 }}>Customers</Title>
        <Divider style={{ borderColor: '#ffffff' }}></Divider>

        <div className='profile-container'>
          <div className='profile-info' style={{ marginLeft: 50 }}>
            <Select
              size="large"
              placeholder="Select a customer"
              onChange={handleChange}
              style={{ width: 200 }}
              options={options}
              value={selectedCustomer}
            />
            <div style={{ ...baseStyle, height: 65, marginTop: 20 }}>
              <Title style={{ color: "white" }}><FontAwesomeIcon icon={faPerson} />  {customerDetails.name || "No name"}</Title>
            </div>
            <div style={{ ...baseStyle, height: 65 }}>
              <Title style={{ color: "white" }}><FontAwesomeIcon icon={faCakeCandles} />  {customerDetails.birth_date || "No birth date"}</Title>
            </div>
            <div style={{ ...baseStyle, height: 65 }}>
              <Title style={{ color: "white" }}><FontAwesomeIcon icon={faLocationDot} />  {customerDetails.address || "No address"}</Title>
            </div>
            <div style={{ ...baseStyle, height: 65 }}>
              <Title style={{ color: "white" }}><FontAwesomeIcon icon={faPhone} />  {customerDetails.phone_number || "No phone number"}</Title>
            </div>
            <div style={{ ...baseStyle, height: 65 }}>
              <Title style={{ color: "white" }}><FontAwesomeIcon icon={faComment} />  {customerDetails.description || "No description"}</Title>
            </div>
          </div>
          <div className='profile-image'>
            <img
                src={`/api/customers/${customerId}/image`}
                alt="Customer Image"
                width={400}
                height={300}
                style={{ margin: '0 20px' }}
              />
          </div>
        </div>

        <Divider style={{ borderColor: '#ffffff' }}></Divider>
        <div className='tables-container'>
          <div className='table-payments'>
            <Table title={() => 'Payments'} footer={() => ''} bordered columns={columnsPayments} dataSource={paymentsDetails} size="large" />
          </div>
          <div className='table-meetings'>
            <Table title={() => 'Meetings'} footer={() => ''} bordered columns={columnsEncounters} dataSource={encountersDetails} size="large" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientProfile;
