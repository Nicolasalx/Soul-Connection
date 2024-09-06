'use client'
import React, { useEffect, useState } from 'react';
import { Image, Divider, Table, Select, Typography, Empty } from 'antd';
import type { TableColumnsType, SelectProps } from 'antd';
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

      if (customer?.id || customer?.id === 0) {
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

  const imageUrl = customerId ? `/api/customers/${customerId}/image` : null;

  return (
    <div className="flex flex-col h-screen w-screen p-6">
      <div className="bg-white border border-gray-300 p-12 rounded-lg">
        <h1 className="font-bold text-gray-600 mb-10 mt-10 text-5xl md:text-6xl">
          Customers
          <Divider style={{ borderColor: '#d3d3d3' }} />
        </h1>
        <div className="flex flex-col md:flex-row space-x-4 mb-6">
          <div className="flex-1 bg-gray-100 border border-gray-300 p-6 rounded-lg">
            <Select
              size="large"
              placeholder="Select a customer"
              onChange={handleChange}
              style={{ width: '100%' }}
              options={options}
              value={selectedCustomer}
            />
            <div className="mt-6">
              <Title level={4} style={{ color: 'gray' }}><FontAwesomeIcon icon={faPerson} /> {customerDetails.name || "No name"}</Title>
              <Title level={4} style={{ color: 'gray' }}><FontAwesomeIcon icon={faCakeCandles} /> {customerDetails.birth_date || "No birth date"}</Title>
              <Title level={4} style={{ color: 'gray' }}><FontAwesomeIcon icon={faLocationDot} /> {customerDetails.address || "No address"}</Title>
              <Title level={4} style={{ color: 'gray' }}><FontAwesomeIcon icon={faPhone} /> {customerDetails.phone_number || "No phone number"}</Title>
              <Title level={4} style={{ color: 'gray' }}><FontAwesomeIcon icon={faComment} /> {customerDetails.description || "No description"}</Title>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Customer Image"
                width={400}
                height={300}
                style={{ margin: '0 20px' }}
              />
            ) : (
              <Empty description="No image available" />
            )}
          </div>
        </div>

        <Divider style={{ borderColor: '#d3d3d3' }} />
        <div className="flex flex-col md:flex-row space-x-4 mt-4">
          <div className="flex-1 bg-gray-100 border border-gray-300 p-6 rounded-lg">
            <Table title={() => 'Payments'} footer={() => ''} bordered columns={columnsPayments} dataSource={paymentsDetails} size="large"/>
          </div>
          <div className="flex-1 bg-gray-100 border border-gray-300 p-6 rounded-lg">
            <Table title={() => 'Meetings'} footer={() => ''} bordered columns={columnsEncounters} dataSource={encountersDetails} size="large"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;
