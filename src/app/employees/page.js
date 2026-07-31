"use client";

import { useState, useEffect } from "react";
import EmployeeFilters from "@/components/employees/EmployeeFilters";
import EmployeeList from "@/components/employees/EmployeeList";
import EmployeeForm from "@/components/employees/EmployeeForm";
import EmployeeDetailPanel from "@/components/employees/EmployeeDetailPanel";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { deleteEmployee } from "@/app/actions";
import { useStore } from "@/lib/store";
import { getAllEmployees } from "@/lib/data";

export default function EmployeesPage() {
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add", "edit", "view"
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const setEmployees = useStore((state) => state.setEmployees);
  const employees = useStore((state) => state.employees);
  const showToast = useStore((state) => state.showToast);

  useEffect(() => {
    if (employees.length === 0) {
      setEmployees(getAllEmployees());
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  
  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    setIsDeleting(true);
    
    try {
      const result = await deleteEmployee(employeeToDelete.id);
      if (result.success) {
        useStore.getState().removeEmployee(employeeToDelete.id);
        showToast(result.message, "success");
        setIsDeleteModalOpen(false);
        
        // Also close detail modal if it was open for this user
        if (selectedEmployee?.id === employeeToDelete.id) {
          handleCloseModal();
        }
      } else {
        showToast(result.message, "error");
      }
    } catch (error) {
      showToast("Failed to delete employee", "error");
    } finally {
      setIsDeleting(false);
      setTimeout(() => setEmployeeToDelete(null), 200);
    }
  };

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
        <p className="text-slate-500">Manage your organization's workforce.</p>
      </div>
      
      <EmployeeFilters 
        onAdd={handleAddEmployee} 
      />
      
      <EmployeeList 
        onEdit={handleEditEmployee}
        onView={handleViewEmployee}
        onDelete={handleDeleteClick}
        isLoading={isLoading}
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


      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        title="Delete Employee"
      >
        <div className="p-1">
          <p className="text-slate-600 mb-6">
            Are you sure you want to delete <span className="font-semibold text-slate-900">{employeeToDelete?.firstName} {employeeToDelete?.lastName}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button 
              variant="secondary" 
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="danger" 
              onClick={confirmDelete}
              isLoading={isDeleting}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
