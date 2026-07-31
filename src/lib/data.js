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

export function getUpcomingEvents() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();

  const events = [];

  employees.forEach(emp => {
    if (emp.dateOfBirth) {
      const dob = new Date(emp.dateOfBirth);
      if (dob.getMonth() === currentMonth && dob.getDate() >= currentDate) {
        events.push({
          id: `bday-${emp.id}`,
          type: 'birthday',
          employeeName: `${emp.firstName} ${emp.lastName}`,
          date: emp.dateOfBirth,
          day: dob.getDate(),
          avatar: emp.avatar
        });
      }
    }
    if (emp.joiningDate) {
      const join = new Date(emp.joiningDate);
      if (join.getMonth() === currentMonth && join.getDate() >= currentDate && join.getFullYear() < today.getFullYear()) {
        const years = today.getFullYear() - join.getFullYear();
        events.push({
          id: `anniv-${emp.id}`,
          type: 'anniversary',
          employeeName: `${emp.firstName} ${emp.lastName}`,
          date: emp.joiningDate,
          day: join.getDate(),
          years: years,
          avatar: emp.avatar
        });
      }
    }
  });

  // Sort by day of month ascending
  events.sort((a, b) => a.day - b.day);
  return events.slice(0, 5);
}

export function getHeadcountGrowth() {
  // Sort employees by joining date
  const sorted = [...employees].sort((a, b) => new Date(a.joiningDate) - new Date(b.joiningDate));
  
  const history = [];
  let currentCount = 0;
  
  sorted.forEach(emp => {
    const d = new Date(emp.joiningDate);
    const monthYear = `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`;
    
    // Find if we already have an entry for this month
    const existing = history.find(h => h.month === monthYear);
    
    currentCount++;
    
    if (existing) {
      existing.headcount = currentCount;
    } else {
      history.push({
        month: monthYear,
        headcount: currentCount
      });
    }
  });
  
  return history;
}
