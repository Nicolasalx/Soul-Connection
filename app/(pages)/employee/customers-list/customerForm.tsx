"use client";

import type { FormProps } from "antd";
import { Form, Input, DatePicker, message } from "antd";
import React from "react";
import dayjs from "dayjs";
import bcrypt from "bcryptjs";
import { Button } from "@nextui-org/react";
import { createCustomer } from "@/app/lib/dbhelper/customers";
import Customers from "@/app/back/models/customers";

type FieldType = {
  email: string;
  password: string;
  name: string;
  surname: string;
  birthDate: string | null;
  gender: string;
  description: string;
  astrological_sign: string;
  phone_number: string;
  adress: string;
  clothes: [];
  coach_id: 0;
};

const CustomerForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const key = "updatable";

    messageApi.open({
      key,
      type: "loading",
      content: "Submitting...",
    });

    const uuid = Math.floor(Math.random() * 10 ** 15);
    const formattedBirthDate = values.birthDate
      ? dayjs(values.birthDate).format("YYYY-MM-DD")
      : "";

    const hashedPassword = await bcrypt.hash(values.password, 10);

    const customer = new Customers(
      uuid,
      values.email,
      hashedPassword,
      values.name,
      values.surname,
      formattedBirthDate,
      values.gender,
      "",
      "",
      "",
      "",
      [],
      0
    );

    try {
      createCustomer(customer);
      messageApi.open({
        key,
        type: "success",
        content: "Customer created successfully!",
        duration: 2,
      });
    } catch (error) {
      messageApi.open({
        key,
        type: "error",
        content: "Failed to create customer. Please try again.",
        duration: 2,
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    messageApi.open({
      type: "error",
      content: "Please fill in all required fields correctly.",
      duration: 2,
    });
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 5 }}
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
          rules={[
            { required: true, message: "Please input your e-mail" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Surname"
          name="surname"
          rules={[{ required: true, message: "Please input your surname" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Birth Date"
          name="birthDate"
          rules={[{ required: true, message: "Please input your birth date" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item<FieldType>
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please input your gender" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CustomerForm;
