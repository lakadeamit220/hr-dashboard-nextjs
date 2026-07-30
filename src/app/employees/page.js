"use client";

import { useState, useEffect } from "react";
import EmployeeFilters from "@/components/employees/EmployeeFilters";
import EmployeeList from "@/components/employees/EmployeeList";
import EmployeeForm from "@/components/employees/EmployeeForm";
import Modal from "@/components/ui/Modal";
import { useStore } from "@/lib/store";
import { getAllEmployees } from "@/lib/data";

export default function EmployeesPage() {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // null for Add, object for Edit
  
  const setEmployees = useStore((state) => state.setEmployees);
  const employees = useStore((state) => state.employees);

  // Initialize employees from server data into Zustand store on first load
  useEffect(() => {
    if (employees.length === 0) {
      setEmployees(getAllEmployees());
    }
  }, [setEmployees, employees.length]);

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleFormSuccess = (message) => {
    handleCloseModal();
    // In Phase 6.7 we will add a toast notification here
    console.log(message);
  };

  return (
    <div className="flex flex-col gap-2 relative">
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={selectedEmployee ? "Edit Employee" : "Add New Employee"}
      >
        <EmployeeForm 
          employee={selectedEmployee} 
          onSuccess={handleFormSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
