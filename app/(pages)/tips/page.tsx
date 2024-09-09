'use client';
import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Divider, Pagination } from 'antd';
import { getTips } from '../../lib/dbhelper/tips';
import Tips from '@/app/back/models/tips';

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
      <h1 className="font-bold text-gray-600 mb-20 mt-10 text-5xl md:text-6xl">
        Tips
        <Divider style={{ borderColor: '#d3d3d3' }} />
      </h1>
      <Row gutter={16}>
        {currentTips.length > 0 ? (
          currentTips.map((tip) => (
            <Col span={8} key={tip.id}>
              <Card
                title={tip.title}
                bordered={false}
                style={{
                  marginBottom: '16px',
                  border: '2px solid #d3d3d3',
                  borderRadius: '10px',
                  padding: '16px'
                }}
              >
                <p>{tip.tip}</p>
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Card
              title="Tips"
              bordered={false}
              style={{
                border: '2px solid #d3d3d3',
                borderRadius: '10px',
                padding: '16px'
              }}
            >
              <p>No tips available</p>
            </Card>
          </Col>
        )}
      </Row>
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
