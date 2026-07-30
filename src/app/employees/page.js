"use client";

import { useState, useEffect } from "react";
import EmployeeFilters from "@/components/employees/EmployeeFilters";
import EmployeeList from "@/components/employees/EmployeeList";
import EmployeeForm from "@/components/employees/EmployeeForm";
import EmployeeDetailPanel from "@/components/employees/EmployeeDetailPanel";
import Modal from "@/components/ui/Modal";
import { useStore } from "@/lib/store";
import { getAllEmployees } from "@/lib/data";

export default function EmployeesPage() {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add", "edit", "view"
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const setEmployees = useStore((state) => state.setEmployees);
  const employees = useStore((state) => state.employees);
  const showToast = useStore((state) => state.showToast);

  // Initialize employees from server data into Zustand store on first load
  useEffect(() => {
    if (employees.length === 0) {
      setEmployees(getAllEmployees());
    }
  }, [setEmployees, employees.length]);

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedEmployee(null);
      setModalMode("add");
    }, 200); // Wait for transition before clearing data
  };

  const handleFormSuccess = (message) => {
    handleCloseModal();
    showToast(message, "success");
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
        onView={handleViewEmployee}
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={
          modalMode === "add" ? "Add New Employee" :
          modalMode === "edit" ? "Edit Employee" :
          "Employee Details"
        }
      >
        {modalMode === "view" ? (
          <EmployeeDetailPanel 
            employee={selectedEmployee} 
            onEdit={handleEditEmployee}
            onClose={handleCloseModal}
          />
        ) : (
          <EmployeeForm 
            employee={selectedEmployee} 
            onSuccess={handleFormSuccess}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
}
