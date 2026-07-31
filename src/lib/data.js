import { initialEmployees } from './mock-data';

// In-memory store (module-level variable for demo purposes)
let employees = [...initialEmployees];

export function getAllEmployees() {
  return [...employees];
}

export function getEmployeeById(id) {
  return employees.find(emp => emp.id === id) || null;
}

export function addEmployee(employeeData) {
  const newEmployee = {
    ...employeeData,
    id: `emp-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 1000)}`,
    documents: employeeData.documents || []
  };
  employees.push(newEmployee);
  return newEmployee;
}

export function updateEmployee(id, employeeData) {
  const index = employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...employeeData };
    return employees[index];
  }
  return null;
}

export function deleteEmployee(id) {
  const initialLength = employees.length;
  employees = employees.filter(emp => emp.id !== id);
  return employees.length < initialLength;
}

// --- Aggregation helpers for dashboard ---

export function getDepartmentDistribution() {
  const counts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});
  
  return Object.keys(counts).map(dept => ({
    department: dept,
    count: counts[dept]
  }));
}

export function getPerformanceDistribution() {
  const counts = employees.reduce((acc, emp) => {
    if (emp.performanceRating) {
      acc[emp.performanceRating] = (acc[emp.performanceRating] || 0) + 1;
    }
    return acc;
  }, {});
  
  return Object.keys(counts).map(rating => ({
    rating: rating,
    count: counts[rating]
  }));
}

export function getStatusCounts() {
  return employees.reduce((acc, emp) => {
    if (emp.status === 'active') acc.active++;
    else if (emp.status === 'on-leave') acc.onLeave++;
    else if (emp.status === 'notice-period') acc.noticePeriod++;
    else if (emp.status === 'inactive') acc.inactive++;
    return acc;
  }, { active: 0, onLeave: 0, noticePeriod: 0, inactive: 0 });
}

export function getNewJoinersCount() {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  return employees.filter(emp => {
    const joinDate = new Date(emp.joiningDate);
    return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear;
  }).length;
}
