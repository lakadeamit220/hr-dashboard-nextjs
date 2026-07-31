"use client";

import { useStore } from "@/lib/store";
import EmployeeCard from "./EmployeeCard";
import EmployeeRow from "./EmployeeRow";
import EmployeeSkeleton from "./EmployeeSkeleton";
import { Inbox, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

export default function EmployeeList({ viewMode, onEdit, onView, onDelete, isLoading }) {
  const employees = useStore((state) => state.employees);
  const searchQuery = useStore((state) => state.searchQuery);
  const statusFilter = useStore((state) => state.statusFilter);
  const departmentFilter = useStore((state) => state.departmentFilter);

  // Derived state: Filtered Employees
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, departmentFilter]);

  if (isLoading) {
    return <EmployeeSkeleton viewMode={viewMode} />;
  }

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

  
  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);


  if (filteredEmployees.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-xl p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50/50 rounded-full flex items-center justify-center text-slate-400 mb-4">
          <Inbox size={32} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">No employees found</h3>
        <p className="text-slate-500 max-w-sm">
          We couldn't find any employees matching your current search and filter criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
          {paginatedEmployees.map((employee) => (
            <EmployeeCard 
              key={employee.id} 
              employee={employee} 
              onEdit={onEdit} 
              onView={onView}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-xl overflow-hidden animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-300/70 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4 font-semibold">Employee</th>
                  <th className="px-6 py-4 font-semibold">Role & Dept</th>
                  <th className="px-6 py-4 font-semibold">Phone</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedEmployees.map((employee) => (
                  <EmployeeRow 
                    key={employee.id} 
                    employee={employee} 
                    onEdit={onEdit} 
                    onView={onView}
                    onDelete={onDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-300/70 pt-4 mt-6">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-900">{startIndex + 1}</span> to <span className="font-medium text-slate-900">{Math.min(startIndex + itemsPerPage, filteredEmployees.length)}</span> of <span className="font-medium text-slate-900">{filteredEmployees.length}</span> employees
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="!px-2"
            >
              <ChevronLeft size={16} />
            </Button>
            <div className="text-sm font-medium text-slate-700 px-2">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="!px-2"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
