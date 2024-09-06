'use client';

import { useState } from 'react';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar, Card, Button, Divider } from 'antd';
import type { Dayjs } from 'dayjs';
import styles from './Calendar.module.css';

const getListData = (value: Dayjs) => {
  let listData: { type: string; content: string }[] = [];
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event......' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export default function Events() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [events, setEvents] = useState<{ type: string; content: string }[]>([]);

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className={styles.notesMonth}>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className={styles.events}>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const onSelect = (value: Dayjs) => {
    setSelectedDate(value);
    setEvents(getListData(value));
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div className="flex flex-col h-screen w-screen p-6">
      <div className="bg-white border border-gray-300 p-12 rounded-lg">
        <h1 className="font-bold text-gray-600 mb-10 mt-10 text-5xl md:text-6xl">
          Events
          <Divider style={{ borderColor: '#d3d3d3' }} />
        </h1>
        <div className={styles.container}>
          <div className={styles.calendarContainer}>
            <Calendar cellRender={cellRender} onSelect={onSelect} />
          </div>

          <div className={styles.cardContainer}>
            {selectedDate && events.length > 0 && (
              <div className={styles.selectedDateText}>
                <Card title={`Events on ${selectedDate.format('YYYY-MM-DD')}`} bordered={false} style={{ width: 300 }}>
                  <ul>
                    {events.map((event, index) => (
                      <li key={index}>
                        <div style={{ marginTop: '5px' }} className={styles.test}>

                          <Button>
                            <Badge status={event.type as BadgeProps['status']} text={event.content} />
                          </Button>
                        </div>

                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            )}

            {selectedDate && events.length === 0 && (
              <div className={styles.selectedDateText}>
                <Card title={`No events on ${selectedDate.format('YYYY-MM-DD')}`} bordered={false} style={{ width: 300 }}>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
