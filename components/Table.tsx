import React from "react";

const Table: React.FC = () => {
  return (
    <div className="p-6">
      <table className="min-w-full bg-white border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="py-2 px-4 border-b border-gray-300 text-center">INFOS</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center">INFOS</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center">INFOS</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center">INFOS</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center">INFOS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b border-gray-300 text-center">INFOS</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center">INFOS</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center">INFOS</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center">INFOS</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center">INFOS</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-300 text-center">INFOS</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center">INFOS</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center">INFOS</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center">INFOS</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center">INFOS</td>
          </tr>
          {/* more lines filled w/ db data */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

