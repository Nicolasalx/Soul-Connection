"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import type { GetRef, InputRef, TableProps } from "antd";
import { Button, Form, Input, Table, Modal } from "antd";
import { Typography } from "antd";
import Advices from "@/app/back/models/advices";
import { createNote, getNote, updateNote } from "@/app/lib/dbhelper/notes";
import { getSelfIdCustomer } from "@/app/lib/user";

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
      console.log("Save failed:", errInfo);
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

type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const CoachNotes: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const { Title } = Typography;
  const [count, setCount] = useState(2);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [listNotes, setListNotes] = useState<Advices[]>([]);

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      editable: true,
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      editable: true,
    },
  ];

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        if (await getSelfIdCustomer()) {
          const newListNotes: Advices[] = listNotes;
          const newAdvice: Advices = {
            title: values.name,
            description: values.description,
          };
          newListNotes.push(newAdvice);
          setListNotes(newListNotes);
          await updateNote((await getSelfIdCustomer()).toString(), newListNotes);
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
      .catch((info) => {
        console.log("Validate Failed:", info);
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

  useEffect(() => {
    async function fetchData() {
      try {
        const selfCustomerId = await getSelfIdCustomer();
        const advices = await getNote(selfCustomerId.toString());

        if (advices) {
          setListNotes(advices);
        } else {
          const newNotes: Advices[] = [];
          await createNote(selfCustomerId.toString(), newNotes);
        }
      } catch (error) {
        console.error("Failed to fetch customer data or notes:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-gray-600 mb-2 text-5xl md:text-3xl mb-12">
        Your notes
      </h1>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={listNotes}
        columns={columns as ColumnTypes}
      />
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Modal
        title="Add a new note"
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
            rules={[{ required: true, message: "Please input the name !" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description !" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CoachNotes;
