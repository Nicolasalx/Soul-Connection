'use client';

import React, { useEffect, useState } from 'react';
import { Select, Empty, Divider } from 'antd';
import { getCustomers } from '../../lib/dbhelper/customers';
import Customers from "@/app/back/models/customers";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd/es/select';

type Direction = 'Left' | 'Right';

const Clothing: React.FC = () => {
  const [customerOptions, setCustomerOptions] = useState<SelectProps<any>['options']>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customers | null>(null);
  const [hats, setHats] = useState<any[]>([]);
  const [tops, setTops] = useState<any[]>([]);
  const [bottoms, setBottoms] = useState<any[]>([]);
  const [shoes, setShoes] = useState<any[]>([]);

  const [currentHatIndex, setCurrentHatIndex] = useState<number>(0);
  const [currentTopIndex, setCurrentTopIndex] = useState<number>(0);
  const [currentBottomIndex, setCurrentBottomIndex] = useState<number>(0);
  const [currentShoesIndex, setCurrentShoesIndex] = useState<number>(0);

  const [hatImageError, setHatImageError] = useState<boolean>(false);
  const [topImageError, setTopImageError] = useState<boolean>(false);
  const [bottomImageError, setBottomImageError] = useState<boolean>(false);
  const [shoesImageError, setShoesImageError] = useState<boolean>(false);

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
      setShoes([]);
      setCurrentHatIndex(0);
      setCurrentTopIndex(0);
      setCurrentBottomIndex(0);
      setCurrentShoesIndex(0);
    }
  };

  const categorizeClothes = (clothes: any[]) => {
    const hatList: any[] = [];
    const topList: any[] = [];
    const bottomList: any[] = [];
    const shoesList: any[] = [];

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
        case 'shoes':
          shoesList.push(item);
          break;
        default:
          break;
      }
    });

    setHats(hatList);
    setTops(topList);
    setBottoms(bottomList);
    setShoes(shoesList);
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  const handleArrowClick = (direction: Direction, category: 'hat' | 'top' | 'bottom' | 'shoes') => {
    switch (category) {
      case 'hat':
        setCurrentHatIndex(prevIndex => {
          const newIndex = direction === 'Left' ? prevIndex - 1 : prevIndex + 1;
          return Math.max(0, Math.min(hats.length - 1, newIndex));
        });
        setHatImageError(false);
        break;
      case 'top':
        setCurrentTopIndex(prevIndex => {
          const newIndex = direction === 'Left' ? prevIndex - 1 : prevIndex + 1;
          return Math.max(0, Math.min(tops.length - 1, newIndex));
        });
        setTopImageError(false);
        break;
      case 'bottom':
        setCurrentBottomIndex(prevIndex => {
          const newIndex = direction === 'Left' ? prevIndex - 1 : prevIndex + 1;
          return Math.max(0, Math.min(bottoms.length - 1, newIndex));
        });
        setBottomImageError(false);
        break;
      case 'shoes':
        setCurrentShoesIndex(prevIndex => {
          const newIndex = direction === 'Left' ? prevIndex - 1 : prevIndex + 1;
          return Math.max(0, Math.min(shoes.length - 1, newIndex));
        });
        setShoesImageError(false);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h1 className="font-bold text-gray-600 text-5xl md:text-6xl">
        Clothing
        <Divider style={{ borderColor: '#d3d3d3' }} />
      </h1>
      <Select
        allowClear
        className='mb-5 w-full'
        placeholder="Select a customer"
        options={customerOptions}
        onChange={handleChange}
      />

      {selectedCustomer ? (
        <div className='flex flex-col items-center max-h-[calc(100vh - 60px)] overflow-y-auto w-full'>
          {/* Hats */}
          <div className='flex items-center justify-center mb-2'>
            {hats.length > 0 && !hatImageError && (
              <>
                <LeftOutlined
                  className='text-4xl cursor-pointer'
                  onClick={() => handleArrowClick('Left', 'hat')}
                />
                <img
                  src={`/api/clothes/${hats[currentHatIndex]?.id}/image`}
                  alt="Hat Image"
                  width={150}
                  height={150}
                  className='mx-4 rounded'
                  onError={() => setHatImageError(true)}
                />
                <RightOutlined
                  className='text-4xl cursor-pointer'
                  onClick={() => handleArrowClick('Right', 'hat')}
                />
              </>
            )}
            {hatImageError || hats.length === 0 ? (
              <Empty description="No Hat" />
            ) : null}
          </div>

          {/* Tops */}
          <div className='flex items-center justify-center mb-2'>
            {tops.length > 0 && !topImageError && (
              <>
                <LeftOutlined
                  className='text-4xl cursor-pointer'
                  onClick={() => handleArrowClick('Left', 'top')}
                />
                <img
                  src={`/api/clothes/${tops[currentTopIndex]?.id}/image`}
                  alt="Top Image"
                  width={150}
                  height={150}
                  className='mx-4 rounded'
                  onError={() => setTopImageError(true)}
                />
                <RightOutlined
                  className='text-4xl cursor-pointer'
                  onClick={() => handleArrowClick('Right', 'top')}
                />
              </>
            )}
            {topImageError || tops.length === 0 ? (
              <Empty description="No Top" />
            ) : null}
          </div>

          {/* Bottoms */}
          <div className='flex items-center justify-center mb-2'>
            {bottoms.length > 0 && !bottomImageError && (
              <>
                <LeftOutlined
                  className='text-4xl cursor-pointer'
                  onClick={() => handleArrowClick('Left', 'bottom')}
                />
                <img
                  src={`/api/clothes/${bottoms[currentBottomIndex]?.id}/image`}
                  alt="Bottom Image"
                  width={150}
                  height={150}
                  className='mx-4 rounded'
                  onError={() => setBottomImageError(true)}
                />
                <RightOutlined
                  className='text-4xl cursor-pointer'
                  onClick={() => handleArrowClick('Right', 'bottom')}
                />
              </>
            )}
            {bottomImageError || bottoms.length === 0 ? (
              <Empty description="No Bottom" />
            ) : null}
          </div>

          {/* Shoes */}
          <div className='flex items-center justify-center mb-2'>
            {shoes.length > 0 && !shoesImageError && (
              <>
                <LeftOutlined
                  className='text-4xl cursor-pointer'
                  onClick={() => handleArrowClick('Left', 'shoes')}
                />
                <img
                  src={`/api/clothes/${shoes[currentShoesIndex]?.id}/image`}
                  alt="Shoes Image"
                  width={150}
                  height={150}
                  className='mx-4 rounded'
                  onError={() => setShoesImageError(true)}
                />
                <RightOutlined
                  className='text-4xl cursor-pointer'
                  onClick={() => handleArrowClick('Right', 'shoes')}
                />
              </>
            )}
            {shoesImageError || shoes.length === 0 ? (
              <Empty description="No Shoes" />
            ) : null}
          </div>
        </div>
      ) : (
        <Empty description="No customer selected" />
      )}
    </>
  );
};

export default Clothing;
