import React from 'react';

interface ScrollingListProps {
  data: Record<string, any>[];
}

interface InfoStyle {
  color: string;
  fontSize: string;
  fontWeight?: string;
}

const infoStyles: Record<string, InfoStyle> = {
  name: { color: 'black', fontSize: '1rem', fontWeight: 'bold' },
  date: { color: 'black', fontSize: '0.8rem', fontWeight: 'bold' },
  location_name: { color: 'black', fontSize: '0.8rem' },
  max_participants: { color: 'grey', fontSize: '0.8rem' },
  type: { color: 'grey', fontSize: '0.8rem' },
  surname: { color: 'gray', fontSize: '0.8rem' },
  email: { color: 'grey', fontSize: '0.8rem' },
};

const prefixes: Record<string, string> = {
  name: 'Name:',
  date: 'Date:',
  location_name: 'Location:',
  max_participants: 'Max Participants:',
  type: 'Type:',
  surname: 'Surname:',
  email: 'Email:',
};

const ScrollingList: React.FC<ScrollingListProps> = ({ data }) => {
  return (
    <div className="w-full h-80 overflow-y-auto bg-white border rounded-lg p-2">
      <ul>
        {data.map((item, index) => {
          const orderedKeys = [
            'name', 'date', 'location_name', 'max_participants', 'type', 'surname', 'email'
          ];

          const itemValues = orderedKeys
            .filter(key => key in item)
            .map(key => {
              const prefix = prefixes[key] || '';
              const style = infoStyles[key] || { color: 'black', fontSize: '1rem' };
              return (
                <div key={key} style={{ color: style.color, fontSize: style.fontSize, fontWeight: style.fontWeight }}>
                  {prefix} {item[key]}
                </div>
              );
            });

          return (
            <li key={index} className="mb-2 border-b border-gray-300 pb-2 last:border-0">
              {itemValues}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ScrollingList;
