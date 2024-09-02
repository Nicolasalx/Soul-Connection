export default function HomeDashboard() {
  return (
    <div className="p-12">
      <div className="bg-white border border-gray-300 rounded p-72">
        <div className="text-center mb-10">
          <h1 className="text font-bold">Welcome to your dashboard</h1>
        </div>
        <p className="text-center mb-4">
          Here you will find for now:
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>The current total number of coaches on Soul Connection.</li>
            <li>The current total number of clients on Soul Connection.</li>
            <li>Your next incoming meeting.</li>
          </ul>
        </p>
      </div>
    </div>
  );
}
