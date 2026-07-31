"use client";

import { useStore } from "@/lib/store";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Search, LayoutGrid, List, Plus } from "lucide-react";
import { DEPARTMENTS, STATUSES } from "@/lib/constants";

export default function EmployeeFilters({ viewMode, setViewMode, onAdd }) {
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
        <div className="flex items-center bg-slate-100/50 p-1 rounded-lg border border-slate-300/70">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'grid' 
                ? 'bg-white shadow-sm text-primary-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
            title="Grid View"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'list' 
                ? 'bg-white shadow-sm text-primary-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>

        <Button leftIcon={Plus} onClick={onAdd}>
          Add Employee
        </Button>
      </div>
      
    </div>
  );
}
