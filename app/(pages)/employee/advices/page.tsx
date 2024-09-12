'use client'

import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef, SelectProps, TableProps } from 'antd';
import { Button, Form, Input, Popconfirm, Table, Modal, Select } from 'antd';
import { Typography } from 'antd';
import Customers from '@/app/back/models/customers';
import { getSelfId, isManager } from '@/app/lib/user';
import { getCoachCustomers, getCustomers } from '@/app/lib/dbhelper/customers';
import { createAdvice, getAdvice, updateAdvice } from '@/app/lib/dbhelper/advices';
import Advices from '@/app/back/models/advices';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  description: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface DataType {
  key: React.Key;
  name: string;
  description: string;
}

type ColumnTypes = Exclude<TableProps['columns'], undefined>;

const CoachAdvices: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const { Title } = Typography;
  const [count, setCount] = useState(2);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [listAdvices, setListAdvices] = useState<Advices[]>([]);

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      editable: true,
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      editable: true,
    }
  ];


  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        if (selectedCustomer) {
          const customer = customerData.find(cust => cust.id.toString() === selectedCustomer);
          if (customer) {
            const newListAdvices: Advices[] = listAdvices;
            const newAdvice: Advices = {
              title: values.name,
              description: values.description
            };
            newListAdvices.push(newAdvice);
            setListAdvices(newListAdvices);
            await updateAdvice(customer.id.toString(), newListAdvices);
          }
        }
  
        const newData: DataType = {
          key: count,
          name: values.name,
          description: values.description,
        };
  
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };
  

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [customerData, setCustomerData] = useState<Customers[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchCoachData() {
      try {
        const selfIdCoach = await getSelfId();

        var response;
        if (await isManager()) {
          response = await getCustomers();
        } else {
          response = await getCoachCustomers(selfIdCoach);
          
        }
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
    fetchCoachData();
  }, []);

  useEffect(() => {
    async function fetchAdvicesData() {
      try {
        if (selectedCustomer) {
          const customer = customerData.find(cust => cust.id.toString() === selectedCustomer);
          if (customer) {
            const advices = await getAdvice(customer.id.toString());
            if (advices) {
              setListAdvices(advices);
            } else {
              const newAdvices: Advices[] = [];
              await createAdvice(customer.id.toString(), newAdvices);
            }
          }
        }
      } catch (error) {
   
      }
    }
    fetchAdvicesData();
  }, [customerData, selectedCustomer]);

  const handleChange = (value: string | string[]) => {
    setSelectedCustomer(value as string);
  };

  return (
    <div>
      <h1 className="font-bold text-gray-600 mb-2 text-5xl md:text-3xl mb-12">
          Coach Advices
      </h1>
      <Select
        size="large"
        placeholder="Select a customer"
        onChange={handleChange}
        style={{ width: '100%' }}
        options={options}
        value={selectedCustomer}
      />
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={listAdvices}
        columns={columns as ColumnTypes}
      />
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Modal
        title="Add a new row"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CoachAdvices;
