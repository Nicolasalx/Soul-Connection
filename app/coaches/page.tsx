'use client';

import { Button, Modal, Select } from 'antd';
import React, { useState } from 'react';
import EmployeeForm from './employeeForm';
import type { SelectProps } from 'antd';

/*     TABLE COACHES      */

interface CoachesData {
  key: React.Key;
  name: string;
  birthDate: string;
  lastConnection: string;
}

const dataCoaches: CoachesData[] = [
  {
    key: 1,
    name: 'Date',
    birthDate: 'date',
    lastConnection: '18-07-2024'
  },
  {
    key: 2,
    name: 'Date',
    birthDate: 'date',
    lastConnection: '18-07-2024'
  },
  {
    key: 3,
    name: 'Date',
    birthDate: 'date',
    lastConnection: '18-07-2024'
  },
  {
    key: 4,
    name: 'Date',
    birthDate: 'date',
    lastConnection: '18-07-2024'
  },
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={{ marginLeft: 300, marginTop: 500 }}>
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
