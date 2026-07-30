"use client";

import { useState, useEffect } from "react";
import EmployeeFilters from "@/components/employees/EmployeeFilters";
import EmployeeList from "@/components/employees/EmployeeList";
import { useStore } from "@/lib/store";
import { getAllEmployees } from "@/lib/data";

export default function EmployeesPage() {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  
  const setEmployees = useStore((state) => state.setEmployees);
  const employees = useStore((state) => state.employees);

  // Initialize employees from server data into Zustand store on first load
  useEffect(() => {
    // In a real app with database, we might fetch from API here.
    // For now, we hydrate the store with our mock data directly on mount if it's empty.
    if (employees.length === 0) {
      setEmployees(getAllEmployees());
    }
  }, [setEmployees, employees.length]);

  const handleAddEmployee = () => {
    alert("Add Employee flow will be implemented in Phase 6!");
  };

  const handleEditEmployee = (employee) => {
    alert(`Edit Employee flow for ${employee.firstName} will be implemented in Phase 6!`);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="mb-2">
        <p className="text-gray-500">Manage your organization's workforce.</p>
      </div>
      
      <EmployeeFilters 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        onAdd={handleAddEmployee} 
      />
      
      <EmployeeList 
        viewMode={viewMode} 
        onEdit={handleEditEmployee} 
      />
    </div>
  );
}
