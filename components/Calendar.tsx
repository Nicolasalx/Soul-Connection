import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Event {
  date: Date;
  color: string;
  description: string;
}

const CalendarDemo: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events] = useState<Event[]>([
    { date: new Date(2024, 8, 15), color: 'red', description: 'Meeting with team' },
    { date: new Date(2024, 8, 15), color: 'blue', description: 'Project deadline' },
  ]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDateClick = (value: Date) => {
    setSelectedDate(value);
  };

  const eventsOnSelectedDate = events.filter(event =>
    event.date.toDateString() === selectedDate?.toDateString()
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date }: { date: Date }) => {
          const event = events.find(event => event.date.toDateString() === date.toDateString());
          return event ? `event-pin-${event.color}` : '';
        }}
        onClickDay={handleDateClick}
        style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px' }}
      />

      {selectedDate && (
        <div style={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
          <h3 style={{ margin: 0 }}>Events on {selectedDate.toDateString()}</h3>
          {eventsOnSelectedDate.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {eventsOnSelectedDate.map((event, index) => (
                <li key={index} style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        backgroundColor: event.color,
                        marginRight: '10px'
                      }}
                    ></div>
                    <div>{event.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No events</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarDemo;
