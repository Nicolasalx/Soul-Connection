'use client';

import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { getTips } from '../../../lib/dbhelper/tips';
import Tips from '@/app/back/models/tips';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function Advices() {
  const [allTips, setAllTips] = useState<Tips[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tipsPerPage = 5;

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastTip = currentPage * tipsPerPage;
  const indexOfFirstTip = indexOfLastTip - tipsPerPage;
  const currentTips = allTips.slice(indexOfFirstTip, indexOfLastTip);

  return (
    <>
      <h1 className="font-bold text-gray-600 mb-2 text-5xl md:text-3xl">
        Tips
      </h1>

      <Accordion>
        {currentTips.map((tip) => (
          <AccordionItem
            key={tip.id}
            aria-label={`Accordion ${tip.id}`}
            subtitle="Press to expand"
            title={tip.title}
          >
            {tip.tip}
          </AccordionItem>
        ))}
      </Accordion>

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
