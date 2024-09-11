'use client';
import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Divider, Pagination } from 'antd';
import { getTips } from '../../../lib/dbhelper/tips';
import Tips from '@/app/back/models/tips';
import AccordionComponent from '@/components/Accordion';

export default function Advices() {
  const [allTips, setAllTips] = useState<Tips[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tipsPerPage = 12;

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const tips: Tips[] = await getTips();
        setAllTips(tips);
      } catch (error) {
        console.error('Error fetching tips:', error);
      }
    };
    fetchTips();
  }, []);

  const indexOfLastTip = currentPage * tipsPerPage;
  const indexOfFirstTip = indexOfLastTip - tipsPerPage;
  const currentTips = allTips.slice(indexOfFirstTip, indexOfLastTip);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h1 className="font-bold text-gray-600 mb-2 text-5xl md:text-6xl">
        Tips for Coaches
        <Divider style={{ borderColor: '#d3d3d3' }} />
      </h1>
      <AccordionComponent/>
      {allTips.length > tipsPerPage && (
        <Pagination
          current={currentPage}
          total={allTips.length}
          pageSize={tipsPerPage}
          onChange={handlePageChange}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />
      )}
    </>
  );
}
