"use client";

import { useStore } from "@/lib/store";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Search, Plus } from "lucide-react";
import { DEPARTMENTS, STATUSES } from "@/lib/constants";

export default function EmployeeFilters({ onAdd }) {
  const { 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter, 
    departmentFilter, 
    setDepartmentFilter 
  } = useStore();

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    ...STATUSES.map(s => ({ value: s.value, label: s.label }))
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    ...DEPARTMENTS.map(d => ({ value: d, label: d }))
  ];

  return (
    <div className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
      
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
        <div className="sm:max-w-xs w-full">
          <Input 
            placeholder="Search employees..." 
            leftIcon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-48">
          <Select 
            options={departmentOptions}
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-48">
          <Select 
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Actions & View Toggle */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">


        <Button leftIcon={Plus} onClick={onAdd}>
          Add Employee
        </Button>
      </div>
      
    </div>
  );
}
