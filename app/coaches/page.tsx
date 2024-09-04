'use client';

import type { FormProps } from 'antd';
import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { createEmployee } from '../lib/dbhelper/employees';
import Employees from "@/app/back/models/employees";

/*     COACH CREATION     */

type FieldType = {
  email: string;
  name: string;
  surname: string;
  birthDate: string;
  gender: string;
  work: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  const uuid = Math.floor(Math.random() * 10 ** 15);

  const employee = new Employees(
    uuid,
    values.email,
    values.name,
    values.surname,
    values.birthDate,
    values.gender,
    values.work
  );

  createEmployee(employee);

  console.log(employee);
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

/*     TABLE COACHES      */

interface CoachesData {
  key: React.Key;
  name: string;
  birthDate: string;
  // customers: string[]; // Modify after
  lastConnection: string;
}

const dataCoaches: CoachesData[] = [
  {
    key: 1,
    name: 'Date',
    birthDate: 'date',
    // customers: ['John', 'Max'],
    lastConnection: '18-07-2024'
  },
  {
    key: 2,
    name: 'Date',
    birthDate: 'date',
    // customers: ['John', 'Max'],
    lastConnection: '18-07-2024'
  },
  {
    key: 3,
    name: 'Date',
    birthDate: 'date',
    // customers: ['John', 'Max'],
    lastConnection: '18-07-2024'
  },
  {
    key: 4,
    name: 'Date',
    birthDate: 'date',
    // customers: ['John', 'Max'],
    lastConnection: '18-07-2024'
  },
];

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
      <Button type="primary" onClick={showModal} style={{marginLeft: 200, marginTop: 200}}>
        Create New Employee
      </Button>
      <Modal title="Employee Creation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

        <Form.Item<FieldType>
          label="E-mail"
          name="email"
          rules={[{ required: true, message: 'Please input your e-mail' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Surname"
          name="surname"
          rules={[{ required: true, message: 'Please input your surname' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Birth Date"
          name="birthDate"
          rules={[{ required: true, message: 'Please input your birth date' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please input your gender' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Work"
          name="work"
          rules={[{ required: true, message: 'Please input your work' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

      </Modal>
    </>
  );
}

export default Coaches
