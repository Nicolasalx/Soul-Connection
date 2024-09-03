'use client';

import { Image } from 'antd';
import { Divider, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import './customers-page.css';
import { Typography } from 'antd';
import { Flex, Radio } from 'antd';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';

const baseStyle: React.CSSProperties = {
  width: '25%',
  height: 54,
};

const { Title } = Typography;

/*     DATA CUSTOMER       */

// Replace with array and a multiple choice

const customerName = "Louis Delanata";
const customerBirthdate = "09/06/1996";
const customerLocation = "3 Rue de la Tour 34000 Montpellier, France";

/*     PAYMENTS       */

interface DataTypePayments {
  key: React.Key;
  date: string;
  amount: string;
  comment: string;
}

const columnsPayments: TableColumnsType<DataTypePayments> = [
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
  },
];

const dataPayments: DataTypePayments[] = [
  {
    key: '1',
    date: '2023-12-01',
    amount: '200e',
    comment: 'Subscription',
  },
  {
    key: '2',
    date: '2024-01-10',
    amount: '300e',
    comment: 'Subscription',
  },
  {
    key: '3',
    date: '2024-02-20',
    amount: '200e',
    comment: 'Subscription',
  }
];

/*     MEETINGS       */

interface DataTypeMeetings {
  key: React.Key;
  date: string;
  rating: string;
  report: string;
  source: string;
}

const columnsMeetings: TableColumnsType<DataTypeMeetings> = [
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
  },
  {
    title: 'Report',
    dataIndex: 'report',
  },
  {
    title: 'Source',
    dataIndex: 'source',
  }
];

const dataMeetings: DataTypeMeetings[] = [
  {
    key: '1',
    date: '2024-02-14',
    rating: '3/5',
    report: 'Very good moment',
    source: 'Dating App'
  },
  {
    key: '2',
    date: '2024-03-12',
    rating: '4/5',
    report: 'I love her!',
    source: 'Friend of my friend'
  },
  {
    key: '3',
    date: '2024-03-20',
    rating: '1/5',
    report: 'HORRIBLE MOMENT',
    source: 'At the bar'
  }
];

export default function ClientProfile() {

  return (
    <>
      <Title style={{color: 'white', marginTop: 20, marginLeft: 20}}>Customers</Title>
      <Divider style={{ borderColor: '#ffffff' }}></Divider>

        <div style={{...baseStyle, backgroundColor: '#1677ff', height: 100, marginLeft: 20, marginTop: 20}}><FontAwesomeIcon icon={faPerson} />OK</div>
        <div style={{...baseStyle, backgroundColor: '#1677ffbf', height: 100, marginLeft: 20, marginTop: 20}}>DEF</div>
        <div style={{...baseStyle, backgroundColor: '#1677ff', height: 100, marginLeft: 20, marginTop: 20}}>GHI</div>

        <Image
          width={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />

      <Divider style={{ borderColor: '#ffffff' }}></Divider>
      <div className='tables-container'>
        <div className='table-payments'>
          <Table title={() => 'Payments'} footer={() => ''} bordered columns={columnsPayments} dataSource={dataPayments} size="large" />
        </div>
        <div className='table-meetings'>
          <Table title={() => 'Meetings'} footer={() => ''} bordered columns={columnsMeetings} dataSource={dataMeetings} size="large" />
        </div>
      </div>
    </>
  );
}
