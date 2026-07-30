import { getAllEmployees, getDepartmentDistribution, getStatusCounts } from "@/lib/data";

export default function Home() {
  const employees = getAllEmployees();
  
  // Quick verification in console
  console.log("Total Employees:", employees.length);
  console.log("Status Counts:", getStatusCounts());
  console.log("Department Dist:", getDepartmentDistribution());
  
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] gap-4">
      <h1 className="text-3xl font-bold text-primary-600">HR Dashboard</h1>
      <p className="text-gray-500">Welcome to the Dashboard. Verification phase running.</p>
      <div className="bg-white p-6 rounded-xl shadow-card border border-gray-100 mt-4 text-center">
        <p className="text-xl font-medium text-gray-800">{employees.length}</p>
        <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Employees Loaded</p>
      </div>
    </div>
  );
}
