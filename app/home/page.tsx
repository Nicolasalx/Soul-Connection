function HomeDashboard() {
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
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard
