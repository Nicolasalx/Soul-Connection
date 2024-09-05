'use client';

import { Button, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import EmployeeForm from './employeeForm';
import type { SelectProps, TableColumnsType } from 'antd';
import { getEmployees } from '../lib/dbhelper/employees';

/*     TABLE COACHES      */

interface DataTypeCoaches {
  key: React.Key;
  id: string;
  name: string;
  birthDate: string;
  customers: string;
  lastConnection: string;
}

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
  },
  {
    title: 'Last Connection',
    dataIndex: 'lastConnection',
  }
];

/*      SELECTION OF CUSTOMERS     */

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

function Coaches() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<DataTypeCoaches[]>([]);

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
        customers: employee.work || 'N/A',
        lastConnection: 'N/A',
      }));
      setData(formattedData);
    }

    fetchEmployeesData();
  }, []);

  return (
    <>
      <div style={{ marginLeft: 300, marginTop: 500 }}>
        <Table columns={columns} dataSource={data} size="middle" pagination={false} />

        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          onChange={handleChange}
          options={options}
        />

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
