"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { employeeValidationRules } from "@/lib/validation";
import { DEPARTMENTS, STATUSES } from "@/lib/constants";
import { createEmployee, updateEmployee } from "@/app/actions";
import { useStore } from "@/lib/store";
import { processUpload } from "@/lib/upload";
import Image from "next/image";
import { Upload } from "lucide-react";

export default function EmployeeForm({ employee, onSuccess, onCancel }) {
  const isEditing = !!employee;
  const { addEmployee, editEmployee } = useStore();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(employee?.avatar || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: employee || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      status: "Active",
      salary: "",
      joiningDate: new Date().toISOString().split('T')[0],
      performanceRating: 3,
      address: ""
    }
  });

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await processUpload(file);
        setAvatarPreview(base64);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const onSubmit = (data) => {
    setServerError("");
    
    // Construct FormData for the server action
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(async () => {
      let result;
      if (isEditing) {
        result = await updateEmployee(employee.id, null, formData);
      } else {
        result = await createEmployee(null, formData);
      }

      if (result.success) {
        // Optimistically update our local Zustand store
        const employeeData = { ...data, avatar: avatarPreview };
        
        if (isEditing) {
          editEmployee(employee.id, employeeData);
        } else {
          // Add generated ID from server simulation
          addEmployee({ ...employeeData, id: result.id });
        }
        
        onSuccess && onSuccess(result.message);
      } else {
        setServerError(result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="p-3 bg-danger-50 text-danger-700 rounded-md text-sm">
          {serverError}
        </div>
      )}

      {/* Avatar Upload */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center shrink-0">
          {avatarPreview ? (
             <Image src={avatarPreview} alt="Avatar" width={64} height={64} className="object-cover w-full h-full" />
          ) : (
             <span className="text-gray-400 text-xs text-center px-1">No Image</span>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
          <div className="flex items-center">
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Upload size={16} />
              <span>Choose File</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="First Name *"
          {...register("firstName", employeeValidationRules.firstName)}
          error={errors.firstName?.message}
        />
        <Input 
          label="Last Name *"
          {...register("lastName", employeeValidationRules.lastName)}
          error={errors.lastName?.message}
        />
        
        <Input 
          label="Email *"
          type="email"
          {...register("email", employeeValidationRules.email)}
          error={errors.email?.message}
        />
        <Input 
          label="Phone *"
          {...register("phone", employeeValidationRules.phone)}
          error={errors.phone?.message}
        />

        <Select
          label="Department *"
          options={DEPARTMENTS}
          {...register("department", employeeValidationRules.department)}
          error={errors.department?.message}
        />
        <Input 
          label="Designation *"
          {...register("designation", employeeValidationRules.designation)}
          error={errors.designation?.message}
        />

        <Select
          label="Status *"
          options={STATUSES.map(s => ({ value: s.value, label: s.label }))}
          {...register("status", employeeValidationRules.status)}
          error={errors.status?.message}
        />
        <Input 
          label="Salary (₹) *"
          type="number"
          {...register("salary", employeeValidationRules.salary)}
          error={errors.salary?.message}
        />

        <Input 
          label="Joining Date *"
          type="date"
          {...register("joiningDate", employeeValidationRules.joiningDate)}
          error={errors.joiningDate?.message}
        />
        <Input 
          label="Performance Rating (1-5) *"
          type="number"
          step="0.1"
          {...register("performanceRating", employeeValidationRules.performanceRating)}
          error={errors.performanceRating?.message}
        />
      </div>

      <Input 
        label="Address *"
        {...register("address", employeeValidationRules.address)}
        error={errors.address?.message}
      />

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button variant="ghost" type="button" onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isPending}>
          {isEditing ? "Save Changes" : "Create Employee"}
        </Button>
      </div>
    </form>
  );
}
