'use client';

import { Button, Modal, Table, Divider } from 'antd';

import React, { useEffect, useState } from 'react';
import EmployeeForm from './employeeForm';
import type { SelectProps } from 'antd';
import { getEmployees } from '../lib/dbhelper/employees';
import { assignCoachToCustomer, getCustomers, unassignCoachToCustomer } from '../lib/dbhelper/customers';
import { ObjectId } from 'mongodb';

var mongoose = require('mongoose');

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

  return (
    <div className="flex flex-col h-screen p-6">
      <div className="bg-white border border-gray-300 p-12 rounded-lg">
        <h1 className="font-bold text-gray-600 mb-10 mt-10 text-2xl" style={{ fontSize: "4rem" }}>
          Coaches
          <Divider style={{ borderColor: '#d3d3d3' }} />
        </h1>
        <Button type="primary" onClick={showModal} className="mb-6 w-full">
          Add Employee
        </Button>

        <Table
          dataSource={data}
          columns={[
            { title: 'Name', dataIndex: 'name', key: 'name', width: 250 },
            { title: 'Birth Date', dataIndex: 'birthDate', key: 'birthDate', width: 250 },
            { title: 'Customers', dataIndex: 'customers', key: 'customers', width: 400,
              render: (customers: string[]) => customers.join(', ') 
            },
            { title: 'Last Connection', dataIndex: 'lastConnection', key: 'lastConnection', width: 250 },
          ]}
          rowKey="id"
          scroll={{ x: '100%' }} 
        />
        <Modal
          title="Add Employee"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => setIsModalOpen(false)}
        >
          <EmployeeForm />
        </Modal>
      </div>
      </div>  );
}

export default Coaches;
