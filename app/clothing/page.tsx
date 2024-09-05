'use client';

import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getCustomers } from '../lib/dbhelper/customers';
import { ObjectId } from 'mongodb';
import Customers from "@/app/back/models/customers";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd/es/select';

type Direction = 'Left' | 'Right';

const CustomerSelect: React.FC = () => {
  const [customerOptions, setCustomerOptions] = useState<SelectProps<any>['options']>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customers | null>(null);
  const [hats, setHats] = useState<any[]>([]);
  const [tops, setTops] = useState<any[]>([]);
  const [bottoms, setBottoms] = useState<any[]>([]);

  const [currentHatIndex, setCurrentHatIndex] = useState<number>(0);
  const [currentTopIndex, setCurrentTopIndex] = useState<number>(0);
  const [currentBottomIndex, setCurrentBottomIndex] = useState<number>(0);

  const fetchCustomersData = async () => {
    const dataCustomers = await getCustomers();
    const formattedCustomers = dataCustomers.map((customer: Customers) => ({
      label: `${customer.name} ${customer.surname}`,
      value: `${customer._id ? customer._id.toString() : ''}`,
    }));
    setCustomerOptions(formattedCustomers);
  };

  const handleChange = async (value: string) => {
    const dataCustomers = await getCustomers();
    const customer = dataCustomers.find((c: Customers) => c._id?.toString() === value);
    if (customer) {
      setSelectedCustomer(customer);
      categorizeClothes(customer.clothes);
    } else {
      setSelectedCustomer(null);
      setHats([]);
      setTops([]);
      setBottoms([]);
      setCurrentHatIndex(0);
      setCurrentTopIndex(0);
      setCurrentBottomIndex(0);
    }
  };

  const categorizeClothes = (clothes: any[]) => {
    const hatList: any[] = [];
    const topList: any[] = [];
    const bottomList: any[] = [];

    clothes.forEach(item => {
      switch (item.type) {
        case 'hat/cap':
          hatList.push(item);
          break;
        case 'top':
          topList.push(item);
          break;
        case 'bottom':
          bottomList.push(item);
          break;
        default:
          break;
      }
    });

    setHats(hatList);
    setTops(topList);
    setBottoms(bottomList);
    
    console.log("ALL HAT", hatList);
    console.log("ALL TOP", topList);
    console.log("ALL BOTTOM", bottomList);
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  const handleArrowClick = (direction: Direction, category: 'hat' | 'top' | 'bottom') => {
    switch (category) {
      case 'hat':
        setCurrentHatIndex(prevIndex => {
          const newIndex = direction === 'Left' ? prevIndex - 1 : prevIndex + 1;
          return Math.max(0, Math.min(hats.length - 1, newIndex));
        });
        break;
      case 'top':
        setCurrentTopIndex(prevIndex => {
          const newIndex = direction === 'Left' ? prevIndex - 1 : prevIndex + 1;
          return Math.max(0, Math.min(tops.length - 1, newIndex));
        });
        break;
      case 'bottom':
        setCurrentBottomIndex(prevIndex => {
          const newIndex = direction === 'Left' ? prevIndex - 1 : prevIndex + 1;
          return Math.max(0, Math.min(bottoms.length - 1, newIndex));
        });
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ marginLeft: 300, marginTop: 200, width: 500 }}>
      <Select
        allowClear
        style={{ width: '100%' }}
        placeholder="Select a customer"
        options={customerOptions}
        onChange={handleChange}
      />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'space-around'
      }}>
        {/* Hats */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LeftOutlined
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={() => handleArrowClick('Left', 'hat')}
          />
          <img
            src={`/api/clothes/${hats[currentHatIndex]?.id}/image`}
            alt="Hat Image"
            width={400}
            height={300}
            style={{ margin: '0 20px' }}
          />
          <RightOutlined
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={() => handleArrowClick('Right', 'hat')}
          />
        </div>

        {/* Tops */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LeftOutlined
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={() => handleArrowClick('Left', 'top')}
          />
          <img
            src={`/api/clothes/${tops[currentTopIndex]?.id}/image`}
            alt="Top Image"
            width={400}
            height={300}
            style={{ margin: '0 20px' }}
          />
          <RightOutlined
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={() => handleArrowClick('Right', 'top')}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LeftOutlined
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={() => handleArrowClick('Left', 'bottom')}
          />
          <img
            src={`/api/clothes/${bottoms[currentBottomIndex]?.id}/image`}
            alt="Bottom Image"
            width={400}
            height={300}
            style={{ margin: '0 20px' }}
          />
          <RightOutlined
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={() => handleArrowClick('Right', 'bottom')}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerSelect;


