"use client";

import { useStore } from "@/lib/store";
import EmployeeCard from "./EmployeeCard";
import EmployeeRow from "./EmployeeRow";
import { Inbox } from "lucide-react";

export default function EmployeeList({ viewMode, onEdit, onView }) {
  const employees = useStore((state) => state.employees);
  const searchQuery = useStore((state) => state.searchQuery);
  const statusFilter = useStore((state) => state.statusFilter);
  const departmentFilter = useStore((state) => state.departmentFilter);

  // Derived state: Filtered Employees
  const filteredEmployees = employees.filter((emp) => {
    // Search filter (Name or Email)
    const matchesSearch = 
      emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;

    // Department filter
    const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  if (filteredEmployees.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-[2px] border border-blue-400/40 shadow-sm rounded-xl p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-blue-400 mb-4">
          <Inbox size={32} />
        </div>
        <h3 className="text-lg font-semibold text-blue-950 mb-1">No employees found</h3>
        <p className="text-blue-600 max-w-sm">
          We couldn't find any employees matching your current search and filter criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
          {filteredEmployees.map((employee) => (
            <EmployeeCard 
              key={employee.id} 
              employee={employee} 
              onEdit={onEdit} 
              onView={onView}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-[2px] border border-blue-400/40 shadow-sm rounded-xl overflow-hidden animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-blue-400/40 text-xs uppercase tracking-wider text-blue-600">
                  <th className="px-6 py-4 font-semibold">Employee</th>
                  <th className="px-6 py-4 font-semibold">Role & Dept</th>
                  <th className="px-6 py-4 font-semibold">Phone</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEmployees.map((employee) => (
                  <EmployeeRow 
                    key={employee.id} 
                    employee={employee} 
                    onEdit={onEdit} 
                    onView={onView}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
