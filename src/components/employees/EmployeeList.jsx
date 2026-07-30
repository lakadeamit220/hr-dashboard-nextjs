"use client";

import { useStore } from "@/lib/store";
import EmployeeCard from "./EmployeeCard";
import EmployeeRow from "./EmployeeRow";
import { Inbox } from "lucide-react";

export default function EmployeeList({ viewMode, onEdit }) {
  const { employees, searchQuery, statusFilter, departmentFilter } = useStore();

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
      <div className="bg-white rounded-xl shadow-card border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
          <Inbox size={32} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No employees found</h3>
        <p className="text-gray-500 max-w-sm">
          We couldn't find any employees matching your current search and filter criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {filteredEmployees.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} onEdit={onEdit} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role & Dept</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEmployees.map((emp) => (
                  <EmployeeRow key={emp.id} employee={emp} onEdit={onEdit} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
