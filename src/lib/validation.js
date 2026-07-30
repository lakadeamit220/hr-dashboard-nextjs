/**
 * Shared validation rules for use with react-hook-form
 */

export const employeeValidationRules = {
  firstName: {
    required: "First name is required",
    minLength: { value: 2, message: "First name must be at least 2 characters" },
    maxLength: { value: 50, message: "First name cannot exceed 50 characters" }
  },
  lastName: {
    required: "Last name is required",
    minLength: { value: 2, message: "Last name must be at least 2 characters" },
    maxLength: { value: 50, message: "Last name cannot exceed 50 characters" }
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address formatting"
    }
  },
  phone: {
    required: "Phone number is required",
    pattern: {
      value: /^\+?[0-9\s\-()]{10,15}$/,
      message: "Invalid phone number format"
    }
  },
  department: {
    required: "Department is required"
  },
  designation: {
    required: "Designation is required"
  },
  status: {
    required: "Status is required"
  },
  salary: {
    required: "Salary is required",
    min: { value: 0, message: "Salary cannot be negative" },
    valueAsNumber: true
  },
  joiningDate: {
    required: "Joining date is required"
  },
  performanceRating: {
    required: "Performance rating is required"
  },
  address: {
    required: "Address is required",
    maxLength: { value: 200, message: "Address cannot exceed 200 characters" }
  }
};
