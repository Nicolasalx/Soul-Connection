function HomeDashboard() {
  return (
    <div className="p-6">
      <div className="bg-white border border-gray-300 p-56 rounded">
        <h1 className="text font-bold text-gray-900 mb-4">
          Welcome to your dashboard
        </h1>
        <p className="text-gray-700 mb-4">Here you will find for now:</p>
        <div className="space-y-4">
          <div className="bg-blue-200 p-4 border border-gray-300 rounded">
            <h2 className="text-md font-semibold">Coaches Count</h2>
            <p>The current total number of coaches.</p>
          </div>
          <div className="bg-orange-200 p-4 border border-gray-300 rounded">
            <h2 className="text-md font-semibold">Clients Count</h2>
            <p>The current total number of clients.</p>
          </div>
          <div className="bg-pink-200 p-4 border border-gray-300 rounded">
            <h2 className="text-md font-semibold">Next Meeting</h2>
            <p>Your next incoming meeting details.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard
