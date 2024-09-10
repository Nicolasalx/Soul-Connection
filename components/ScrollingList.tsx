import React from 'react';

const ScrollingList = () => {
  const links = [
    { name: 'INFOS', value: 'Coming soon' },
    { name: 'INFOS', value: 'Coming soon' },
    { name: 'INFOS', value: 'Coming soon' },
    { name: 'INFOS', value: 'Coming soon' },
    { name: 'INFOS', value: 'Coming soon' },
    { name: 'INFOS', value: 'Coming soon' },
    { name: 'INFOS', value: 'Coming soon' },
    { name: 'INFOS', value: 'Coming soon' },
    { name: 'INFOS', value: 'Coming soon' },
    { name: 'INFOS', value: 'Coming soon' },
    { name: 'INFOS', value: 'Coming soon' },
    { name: 'INFOS', value: 'Coming soon' },
    { name: 'INFOS', value: 'Coming soon' },
    { name: 'INFOS', value: 'Coming soon' },
    { name: 'INFOS', value: 'Coming soon' },
    { name: 'INFOS', value: 'Coming soon' },
  ];

  return (
    <div className="w-full h-80 overflow-y-auto bg-white border rounded-lg p-2">
      <ul>
        {links.map((link, index) => (
          <li key={index} className="mb-2">
            <div className="text-blue-500 hover:underline">
              {link.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScrollingList;
