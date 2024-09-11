'use client';
import { Divider, Dropdown, Menu, Table, Select, Button, Input } from 'antd';
import React, { useState } from 'react';
import type { TableColumnsType } from 'antd';
import { EllipsisOutlined, EyeOutlined, DeleteOutlined, SearchOutlined, FilterOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import './customers-list.css';
import Image from 'next/image';

function Coaches() {
  interface DataType {
    key: React.Key;
    coach: string;
    email: string;
    phone: string;
    nbCustomers: string;
    profileImage?: string;
  }

  const items = (
    <Menu>
      <Menu.Item key="1" icon={<EyeOutlined />}>
        View
      </Menu.Item>
      <Menu.Item key="2" icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const columnsNewPage: TableColumnsType<DataType> = [
    {
      title: 'Coach',
      key: 'coach',
      render: (text, record) => (
        <div className="coach-profile-container">
          <div className="profile-icon-container">
            {record.profileImage ? (
              <Image
                src="https://wordpress-content.vroomly.com/wp-content/uploads/2023/03/koenigsegg.jpg"
                alt="Profile"
                className="profile-icon"
              />
            ) : (
              <UserOutlined className="default-icon" />
            )}
          </div>
          <span className="coach-name">{record.coach}</span>
        </div>
      ),
      width: 350,
    },
    {
      title: 'Email',
      width: 350,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      width: 350,
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Number of customers',
      width: 350,
      dataIndex: 'nbCustomers',
      key: 'nbCustomers',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <div className="actions-container">
          <Dropdown overlay={items} trigger={['click']}>
            <a className="actions-icon">
              <EllipsisOutlined />
            </a>
          </Dropdown>
        </div>
      ),
    },
  ];

  const dataNewPage: DataType[] = [
    {
      key: '1',
      coach: 'John Brown',
      email: 'john.brown@example.com',
      phone: '123-456-7890',
      nbCustomers: '10',
      profileImage: 'path-to-profile-image1.jpg',
    },
    {
      key: '2',
      coach: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      nbCustomers: '15',
      profileImage: 'path-to-profile-image2.jpg',
    },
    {
      key: '3',
      coach: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      phone: '555-555-5555',
      nbCustomers: '8',
      profileImage: 'path-to-profile-image3.jpg',
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <>
      <div className="header-container">
        <div className="left-header">
          <Select defaultValue="Bulk Action" className="bulk-action-select" style={{ width: 120 }} placeholder="Bulk Action">
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
          </Select>
          <Button className="apply-button" type="default" style={{ marginLeft: 8 }}>
            Apply
          </Button>
        </div>

        <div className="right-header">
          <div className="search-container">
            <SearchOutlined className="search-icon" onClick={handleSearchClick} />
            {searchVisible && (
              <Input 
                placeholder="Search by name" 
                className="search-input" 
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
            )}
          </div>

          <Divider type="vertical" className="header-divider" />

          <FilterOutlined className="filter-icon" />
          <SettingOutlined className="settings-icon" />
        </div>
      </div>

      <Divider style={{ margin: 0 }} />

      <Table 
        className="custom-table-header"
        columns={columnsNewPage} 
        dataSource={dataNewPage} 
        rowSelection={rowSelection}
      />
    </>
  );
}

export default Coaches;
