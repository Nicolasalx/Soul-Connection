'use client'

import { Card } from 'antd';
import { getTips } from '../lib/dbhelper/tips';
import React, { useState, useEffect } from 'react';
import Tips from "@/app/back/models/tips";

export default function Advices() {
  const [allTips, setAllTips] = useState<Tips[]>([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const tips: Tips[] = await getTips();
        console.log(tips);
        setAllTips(tips);
      } catch (error) {
        console.error('Error fetching tips:', error);
      }
    };
    fetchTips();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginLeft: 170, marginTop: 30 }}>
      {allTips.length > 0 ? (
        allTips.map((tip) => (
          <Card
            key={tip.id}
            title={tip.title}
            bordered={false}
            style={{ width: 300 }}
          >
            <p>{tip.tip}</p>
          </Card>
        ))
      ) : (
        <Card title="Tips" bordered={false} style={{ width: 300 }}>
          <p>No tips available</p>
        </Card>
      )}
    </div>
  );
}
