'use client';

import React, { useEffect, useState } from 'react';
import { Select, Empty, Divider } from 'antd';
import Customers from "@/app/back/models/customers";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd/es/select';
import { getClothesImage } from '@/app/lib/dbhelper/clothes_image';
import { getCustomers } from '@/app/lib/dbhelper/customers';
import Image from 'next/image';

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

  const [currentHatUrl, setCurrentHatUrl] = useState<string>('');
  const [currentTopUrl, setCurrentTopUrl] = useState<string>('');
  const [currentBottomUrl, setCurrentBottomUrl] = useState<string>('');
  const [currentShoesUrl, setCurrentShoesUrl] = useState<string>('');

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

  const categorizeClothes = async (clothes: any[]) => {
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

    try {
      if (hatList.length > 0) {
        const hatUrl = await getClothesImage(hatList[0]?.id);
        setCurrentHatUrl(hatUrl.image);
      } else {
        setCurrentHatUrl('');
      }
    } catch {
      setCurrentHatUrl('');
    }

    try {
      if (topList.length > 0) {
        const topUrl = await getClothesImage(topList[0]?.id);
        setCurrentTopUrl(topUrl.image);
      } else {
        setCurrentTopUrl('');
      }
    } catch {
      setCurrentTopUrl('');
    }

    try {
      if (bottomList.length > 0) {
        const bottomUrl = await getClothesImage(bottomList[0]?.id);
        setCurrentBottomUrl(bottomUrl.image);
      } else {
        setCurrentBottomUrl('');
      }
    } catch {
      setCurrentBottomUrl('');
    }

    try {
      if (shoesList.length > 0) {
        const shoesUrl = await getClothesImage(shoesList[0]?.id);
        setCurrentShoesUrl(shoesUrl.image);
      } else {
        setCurrentShoesUrl('');
      }
    } catch {
      setCurrentShoesUrl('');
    }
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  const handleArrowClick = async (direction: Direction, category: 'hat' | 'top' | 'bottom' | 'shoes') => {
    let newIndex: number;
    switch (category) {
      case 'hat':
        newIndex = direction === 'Left' ? currentHatIndex - 1 : currentHatIndex + 1;
        setCurrentHatIndex(Math.max(0, Math.min(hats.length - 1, newIndex)));

        try {
          const urlHat = await getClothesImage(hats[newIndex]?.id);
          setCurrentHatUrl(urlHat.image);
        } catch {
          setCurrentHatUrl('');
        }
        break;

      case 'top':
        newIndex = direction === 'Left' ? currentTopIndex - 1 : currentTopIndex + 1;
        setCurrentTopIndex(Math.max(0, Math.min(tops.length - 1, newIndex)));

        try {
          const urlTop = await getClothesImage(tops[newIndex]?.id);
          setCurrentTopUrl(urlTop.image);
        } catch {
          setCurrentTopUrl('');
        }
        break;

      case 'bottom':
        newIndex = direction === 'Left' ? currentBottomIndex - 1 : currentBottomIndex + 1;
        setCurrentBottomIndex(Math.max(0, Math.min(bottoms.length - 1, newIndex)));

        try {
          const urlBottom = await getClothesImage(bottoms[newIndex]?.id);
          setCurrentBottomUrl(urlBottom.image);
        } catch {
          setCurrentBottomUrl('');
        }
        break;

      case 'shoes':
        newIndex = direction === 'Left' ? currentShoesIndex - 1 : currentShoesIndex + 1;
        setCurrentShoesIndex(Math.max(0, Math.min(shoes.length - 1, newIndex)));

        try {
          const urlShoes = await getClothesImage(shoes[newIndex]?.id);
          setCurrentShoesUrl(urlShoes.image);
        } catch {
          setCurrentShoesUrl('');
        }
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
            {currentHatUrl ? (
            <>
              <LeftOutlined
                className='text-4xl cursor-pointer'
                onClick={() => handleArrowClick('Left', 'hat')}
              />
              <Image
                src={currentHatUrl}
                alt="Hat Image"
                width={150}
                height={150}
                className='mx-4 rounded'
              />
              <RightOutlined
                className='text-4xl cursor-pointer'
                onClick={() => handleArrowClick('Right', 'hat')}
              />
            </>
            ) : (
              <Empty description="No hat available" />
            )}
          </div>

          {/* Tops */}
          <div className='flex items-center justify-center mb-2'>
            {currentTopUrl ? (
            <>
              <LeftOutlined
                className='text-4xl cursor-pointer'
                onClick={() => handleArrowClick('Left', 'top')}
              />
              <Image
                src={currentTopUrl}
                alt="Top Image"
                width={150}
                height={150}
                className='mx-4 rounded'
              />
              <RightOutlined
                className='text-4xl cursor-pointer'
                onClick={() => handleArrowClick('Right', 'top')}
              />
            </>
            ) : (
              <Empty description="No top available" />
            )}
          </div>

          {/* Bottoms */}
          <div className='flex items-center justify-center mb-2'>
            {currentBottomUrl ? (
            <>
              <LeftOutlined
                className='text-4xl cursor-pointer'
                onClick={() => handleArrowClick('Left', 'bottom')}
              />
              <Image
                src={currentBottomUrl}
                alt="Bottom Image"
                width={150}
                height={150}
                className='mx-4 rounded'
              />
              <RightOutlined
                className='text-4xl cursor-pointer'
                onClick={() => handleArrowClick('Right', 'bottom')}
              />
            </>
            ) : (
              <Empty description="No bottom available" />
            )}
          </div>

          {/* Shoes */}
          <div className='flex items-center justify-center mb-2'>
            {currentShoesUrl ? (
            <>
              <LeftOutlined
                className='text-4xl cursor-pointer'
                onClick={() => handleArrowClick('Left', 'shoes')}
              />
              <Image
                src={currentShoesUrl}
                alt="Shoes Image"
                width={150}
                height={150}
                className='mx-4 rounded'
              />
              <RightOutlined
                className='text-4xl cursor-pointer'
                onClick={() => handleArrowClick('Right', 'shoes')}
              />
            </>
            ) : (
              <Empty description="No shoes available" />
            )}
          </div>
        </div>
      ) : (
        <p>No customer selected</p>
      )}
    </>
  );
};

export default Clothing;
