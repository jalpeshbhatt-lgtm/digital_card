export default function ResellerDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">
        Reseller Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6 mt-8">
        <div className="border p-6 rounded">
          Clients
        </div>

        <div className="border p-6 rounded">
          Active Cards
        </div>

        <div className="border p-6 rounded">
          Revenue
        </div>

        <div className="border p-6 rounded">
          Leads
        </div>
      </div>
    </div>
  );
}