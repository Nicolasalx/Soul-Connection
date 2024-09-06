'use client'
import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Divider } from 'antd';
import { getTips } from '../lib/dbhelper/tips';
import Tips from "@/app/back/models/tips";

export default function Advices() {
  const [allTips, setAllTips] = useState<Tips[]>([]);

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

  return (
    <div className="flex flex-col h-screen w-screen p-6">
      <div className="bg-white border border-gray-300 p-12 rounded-lg">
        <h1 className="font-bold text-gray-600 mb-20 mt-10 text-2xl" style={{ fontSize: "4rem" }}>
          Tips
          <Divider style={{ borderColor: '#d3d3d3' }} />
        </h1>
        <Row gutter={16}>
          {allTips.length > 0 ? (
            allTips.map((tip) => (
              <Col span={8} key={tip.id}>
                <Card
                  title={tip.title}
                  bordered={false}
                  style={{ marginBottom: '16px' }}
                >
                  <p>{tip.tip}</p>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Card title="Tips" bordered={false}>
                <p>No tips available</p>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
}
