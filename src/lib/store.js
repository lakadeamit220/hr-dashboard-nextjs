import { create } from 'zustand';

export const useStore = create((set) => ({
  // Global App State
  sidebarOpen: false,
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // Employees List State
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  statusFilter: 'all', // 'all', 'active', 'on-leave', 'notice-period', 'inactive'
  setStatusFilter: (status) => set({ statusFilter: status }),
  
  departmentFilter: 'all',
  setDepartmentFilter: (department) => set({ departmentFilter: department }),
  
  // Toast State
  toast: { message: "", type: "success", isVisible: false },
  showToast: (message, type = "success") => set({ toast: { message, type, isVisible: true } }),
  hideToast: () => set((state) => ({ toast: { ...state.toast, isVisible: false } })),
  
  // Client-side employees cache for optimistic updates
  employees: [],
  setEmployees: (employees) => set({ employees }),
  
  addEmployee: (employee) => set((state) => ({ 
    employees: [employee, ...state.employees] 
  })),
  
  editEmployee: (id, data) => set((state) => ({
    employees: state.employees.map(emp => emp.id === id ? { ...emp, ...data } : emp)
  })),
  
  removeEmployee: (id) => set((state) => ({
    employees: state.employees.filter(emp => emp.id !== id)
  }))
}));
