'use client'
import { Button, Divider, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import type { SelectProps, TableColumnsType } from 'antd';
import { getEmployees } from '../lib/dbhelper/employees';
import { assignCoachToCustomer, getCustomers, unassignCoachToCustomer } from '../lib/dbhelper/customers';
import { ObjectId } from 'mongodb';

var mongoose = require('mongoose');

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
  const [customerOptions, setCustomerOptions] = useState<SelectProps['options']>([]);
  const [prevSelections, setPrevSelections] = useState<{ [key: string]: string[] }>({});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchEmployeesData = async () => {
    const dataEmployees = await getEmployees();
    const dataCustomers = await getCustomers();

    const formattedData = dataEmployees.map((employee: any) => {
      const coachCustomers = dataCustomers
        .filter((customer: CustomerType) => customer.coach_id === employee.id)
        .map((customer: CustomerType) => customer._id ? customer._id.toString() : '');

      return {
        key: employee.id,
        id: employee.id,
        name: `${employee.name} ${employee.surname}`,
        birthDate: employee.birth_date || 'N/A',
        customers: coachCustomers,
        lastConnection: 'N/A',
      };
    });

    setData(formattedData);

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
      value: `${customer._id ? customer._id.toString() : ''}`,
    }));

    setCustomerOptions(formattedCustomers);
  };

  useEffect(() => {
    fetchEmployeesData();
    fetchCustomersData();
  }, []);

  const handleCustomerChange = async (values: string[], record: DataTypeCoaches) => {
    const coachId = Number(record.id);
    const previousValues = prevSelections[record.id] || [];
    const addedValues = values.filter(value => !previousValues.includes(value));
    const removedValues = previousValues.filter(value => !values.includes(value));

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

    setPrevSelections(prev => ({
      ...prev,
      [record.id]: values
    }));

    fetchCustomersData();
  };

  const columns: TableColumnsType<DataTypeCoaches> = [
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Birth Date',
      dataIndex: 'birthDate',
    },
    {
      title: 'Customers',
      dataIndex: 'customers',
      render: (_, record) => (
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Select customers"
          defaultValue={record.customers}
          onChange={(value) => handleCustomerChange(value, record)}
          options={customerOptions}
        />
      ),
    },
    {
      title: 'Last Connection',
      dataIndex: 'lastConnection',
    },
  ];
  
  return (
    <div className="flex flex-col h-screen w-screen p-6">
      <div className="bg-white border border-gray-300 p-12 rounded-lg flex-1 w-full">
        <h1 className="font-bold text-gray-600 mb-10 text-2xl" style={{ fontSize: "4rem" }}>
          Coaches
          <Divider style={{ borderColor: '#d3d3d3' }} />
        </h1>
        <Button type="primary" onClick={showModal} className="mb-6 w-full">
          Add Employee
        </Button>

        <Table
          columns={columns}
          dataSource={data}
          size="large"
          rowKey="id"
          scroll={{ x: '100%' }} 
        />

        <Modal
          title="Add Employee"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => setIsModalOpen(false)}
        ></Modal>
      </div>
    </div>
  );
}

  export default Coaches;
