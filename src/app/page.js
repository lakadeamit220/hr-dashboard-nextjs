import { 
  getAllEmployees, 
  getStatusCounts, 
  getNewJoinersCount,
  getDepartmentDistribution,
  getPerformanceDistribution
} from "@/lib/data";

import KpiCard from "@/components/dashboard/KpiCard";
import DepartmentChart from "@/components/charts/DepartmentChart";
import PerformanceChart from "@/components/charts/PerformanceChart";
import { Users, UserCheck, CalendarOff, UserPlus, ArrowRight, Clock, Plus, Download, Settings } from "lucide-react";
import Link from "next/link";

export default function Home() {
  // Fetch data
  const employees = getAllEmployees();
  const statusCounts = getStatusCounts();
  const newJoiners = getNewJoinersCount();
  const departmentData = getDepartmentDistribution();
  const performanceData = getPerformanceDistribution();
  
  return (
    <div className="flex flex-col gap-8">
      {/* KPI Cards Section */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Dashboard Overview</h2>
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

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentChart data={departmentData} />
        <PerformanceChart data={performanceData} />
      </section>
    </div>
  );
}
