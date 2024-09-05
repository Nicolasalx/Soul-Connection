'use client';

import { Button, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import EmployeeForm from './employeeForm';
import type { SelectProps, TableColumnsType } from 'antd';
import { getEmployees } from '../lib/dbhelper/employees';
import { getCustomers } from '../lib/dbhelper/customers';

/*     TABLE COACHES      */

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
  coach_id?: number;
}

const handleCustomerChange = (value: string[], record: DataTypeCoaches) => {
  console.log(`Selected customers for ${record.name}:`, value);
};

function Coaches() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<DataTypeCoaches[]>([]);
  const [customerOptions, setCustomerOptions] = useState<SelectProps['options']>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchEmployeesData() {
      const dataEmployees = await getEmployees();
      const formattedData = dataEmployees.map((employee: any) => ({
        key: employee.id,
        id: employee.id,
        name: `${employee.name} ${employee.surname}`,
        birthDate: employee.birth_date || 'N/A',
        customers: employee.customers || [],
        lastConnection: 'N/A',
      }));
      setData(formattedData);
    }

    async function fetchCustomersData() {
      const dataCustomers = await getCustomers();
      const formattedCustomers = dataCustomers
        .filter((customer: CustomerType) => !customer.coach_id)
        .map((customer: CustomerType) => ({
          label: `${customer.name} ${customer.surname}`,
          value: customer.id.toString(),
        }));
      setCustomerOptions(formattedCustomers);
    }

    fetchEmployeesData();
    fetchCustomersData();
  }, []);

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
      <>
        <div style={{ marginLeft: 300, marginTop: 150 }}>
          <Table columns={columns} dataSource={data} size="middle" pagination={false} />
  
          <Button type="primary" onClick={showModal}>
            Create New Employee
          </Button>
          <Modal title="Employee Creation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <EmployeeForm />
          </Modal>
        </div>
      </>
    );
  }

  export default Coaches;
