'use client';

import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { createEmployee } from '../lib/dbhelper/employees';
import Employees from "@/app/back/models/employees";

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
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const EmployeeForm: React.FC = () => (
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
);

export default EmployeeForm;
