import { getAllEmployees, getStatusCounts, getNewJoinersCount } from "@/lib/data";
import KpiCard from "@/components/dashboard/KpiCard";
import { Users, UserCheck, CalendarOff, UserPlus } from "lucide-react";

export default function Home() {
  const employees = getAllEmployees();
  const statusCounts = getStatusCounts();
  const newJoiners = getNewJoinersCount();
  
  return (
    <div className="flex flex-col gap-8">
      {/* KPI Cards Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard 
            title="Total Employees" 
            value={employees.length} 
            icon={Users} 
            colorClass="primary" 
          />
          <KpiCard 
            title="Active Employees" 
            value={statusCounts.active} 
            icon={UserCheck} 
            colorClass="accent" 
          />
          <KpiCard 
            title="On Leave" 
            value={statusCounts.onLeave} 
            icon={CalendarOff} 
            colorClass="warning" 
          />
          <KpiCard 
            title="New Joiners" 
            value={newJoiners} 
            icon={UserPlus} 
            colorClass="info" 
            trend={{ isPositive: true, value: 12 }}
          />
        </div>
      </section>

      {/* Placeholder for charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-card p-6 h-80 flex items-center justify-center border border-gray-100 text-gray-400">
          Chart 1 Placeholder
        </div>
        <div className="bg-white rounded-xl shadow-card p-6 h-80 flex items-center justify-center border border-gray-100 text-gray-400">
          Chart 2 Placeholder
        </div>
      </section>
      
      <section>
        <div className="bg-white rounded-xl shadow-card p-6 h-80 flex items-center justify-center border border-gray-100 text-gray-400">
          Chart 3 Placeholder
        </div>
      </section>
    </div>
  );
}
