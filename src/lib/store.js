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
  
  // Client-side employees cache for optimistic updates
  // Note: For full SSR Next.js apps, this is usually hydrated from props or fetched via React Query,
  // but we'll use Zustand for client-side filtering and optimistic UI additions
  employees: [],
  setEmployees: (employees) => set({ employees }),
  
  addOptimisticEmployee: (employee) => set((state) => ({ 
    employees: [employee, ...state.employees] 
  })),
  
  updateOptimisticEmployee: (id, data) => set((state) => ({
    employees: state.employees.map(emp => emp.id === id ? { ...emp, ...data } : emp)
  })),
  
  deleteOptimisticEmployee: (id) => set((state) => ({
    employees: state.employees.filter(emp => emp.id !== id)
  }))
}));
