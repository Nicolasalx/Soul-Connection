"use client";
import React from "react";
import { Col, Row, Statistic } from "antd";
import CountUp from "react-countup";
import { valueType } from "antd/es/statistic/utils";

interface NumberStatProps {
  title: string;
  value: number | string;
}

function NumberStat({ title, value }: NumberStatProps) {
  const formatter: (value: valueType) => React.ReactNode = (
    value: valueType
  ) => {
    if (typeof value === "number") {
      return <CountUp end={value} separator="," />;
    }
    return value;
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title={title} value={value} formatter={formatter} />
      </Col>
    </Row>
  );
}

export default NumberStat;
