'use client'

import { delete_db_customers, update_db_customers } from "../lib/update_db_data/update_db_customers";
import { delete_db_employees, update_db_employees } from "../lib/update_db_data/update_db_employees";
import { delete_db_tips, update_db_tips } from "../lib/update_db_data/update_db_tips";

function HomeDashboard()
{
  // ! strt test api to db
  const handleUpdateClick = async () => {
    try {
//      await update_db_tips();
//      await update_db_employees();
//      await update_db_customers();
      alert('Database updated successfully');
    } catch (error) {
      console.error('Failed to update employees:', error);
      alert('Failed to update database');
    }
  };

  const handleDeleteClick = async () => {
    try {
//      await delete_db_tips();
//      await delete_db_employees();
//      await delete_db_customers();
      alert('Database deleted successfully');
    } catch (error) {
      console.error('Failed to deleted employees:', error);
      alert('Failed to deleted database');
    }
  };
  // ! end test api to db
  
  return (
    <div className="p-6">
      <div className="bg-white border border-gray-300 p-6 rounded w-3/4 ml-80 mt-28">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          Welcome to your Dashboard
        </h1>
        <p className="text-gray-700 mb-4">Will be completed soon !</p>
        <div className="space-y-4">
          <div className="bg-blue-200 p-4 border border-gray-300 rounded">
            <h2 className="text-md font-semibold">Date & Time</h2>
            <p></p>
          </div>
          <div className="bg-orange-200 p-4 border border-gray-300 rounded">
            <h2 className="text-md font-semibold">Client Counts & Coach Counts</h2>
            <p></p>
          </div>
          <div className="bg-pink-200 p-4 border border-gray-300 rounded">
            <h2 className="text-md font-semibold">Next Meeting & Other infos</h2>
            <p></p>
          </div>
          {/*  START THIBAUD DB BUTTON (TO REMOVE LATER) */}
          <button
            onClick={handleUpdateClick}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Update Database
          </button>
                    {/* Add the update button here */}
                    <button
            onClick={handleDeleteClick}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Delete Database
          </button>
          {/*  END THIBAUD DB BUTTON (TO REMOVE LATER) */}
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;
