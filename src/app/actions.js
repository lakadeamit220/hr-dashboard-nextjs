"use server";

import { revalidatePath } from "next/cache";

// These actions simulate mutations against a database.
// Since we're using mock data and Zustand for the client UI state, 
// these server actions will simulate a delay, validate data, 
// and then tell the client whether it succeeded.

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function createEmployee(prevState, formData) {
  try {
    // Simulate network delay
    await delay(800);
    
    // Server-side validation (basic example)
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const department = formData.get("department");

    if (!firstName || !lastName || !email || !department) {
      return { 
        success: false, 
        message: "First name, last name, email, and department are required." 
      };
    }

    // In a real app: await db.employee.create({ data: ... })
    
    // Revalidate paths to update SSR pages if needed
    revalidatePath("/");
    revalidatePath("/employees");

    return { 
      success: true, 
      message: "Employee created successfully",
      // Pass back ID if needed for optimistic updates
      id: `emp-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 1000)}` 
    };
  } catch (error) {
    return { 
      success: false, 
      message: error.message || "Failed to create employee" 
    };
  }
}

export async function updateEmployee(id, prevState, formData) {
  try {
    if (!id) throw new Error("Employee ID is required");
    
    // Simulate network delay
    await delay(800);
    
    // Server-side validation
    const email = formData.get("email");
    if (!email) {
      return { 
        success: false, 
        message: "Email is required." 
      };
    }

    // In a real app: await db.employee.update({ where: { id }, data: ... })
    
    revalidatePath("/");
    revalidatePath("/employees");

    return { 
      success: true, 
      message: "Employee updated successfully" 
    };
  } catch (error) {
    return { 
      success: false, 
      message: error.message || "Failed to update employee" 
    };
  }
}

export async function deleteEmployee(id) {
  try {
    if (!id) throw new Error("Employee ID is required");
    
    // Simulate network delay
    await delay(600);

    // In a real app: await db.employee.delete({ where: { id } })
    
    revalidatePath("/");
    revalidatePath("/employees");

    return { 
      success: true, 
      message: "Employee deleted successfully" 
    };
  } catch (error) {
    return { 
      success: false, 
      message: error.message || "Failed to delete employee" 
    };
  }
}
