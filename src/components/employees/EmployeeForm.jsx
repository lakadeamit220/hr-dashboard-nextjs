"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { employeeValidationRules } from "@/lib/validation";
import { DEPARTMENTS, STATUSES } from "@/lib/constants";
import { createEmployee, updateEmployee, deleteEmployee } from "@/app/actions";
import { useStore } from "@/lib/store";
import { processUpload } from "@/lib/upload";
import Image from "next/image";
import { Upload, Trash2 } from "lucide-react";

export default function EmployeeForm({ employee, onSuccess, onCancel }) {
  const isEditing = !!employee;
  const { addEmployee, editEmployee, removeEmployee } = useStore();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);
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
      status: "active",
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

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this employee? This action cannot be undone.")) {
      setServerError("");
      setIsDeleting(true);
      startTransition(async () => {
        const result = await deleteEmployee(employee.id);
        if (result.success) {
          removeEmployee(employee.id);
          onSuccess && onSuccess(result.message);
        } else {
          setServerError(result.message);
        }
        setIsDeleting(false);
      });
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
          addEmployee({ ...employeeData, id: result.id, documents: [] });
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
        <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-300/70 bg-slate-100/50 flex items-center justify-center shrink-0">
          {avatarPreview ? (
             <Image src={avatarPreview} alt="Avatar" width={64} height={64} className="object-cover w-full h-full" />
          ) : (
             <span className="text-slate-400 text-xs text-center px-1">No Image</span>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">Profile Photo</label>
          <div className="flex items-center">
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm border border-slate-300/70 rounded-md text-sm font-medium text-slate-700 hover:bg-white/5 backdrop-blur-[2px]/90 transition-colors">
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

      {/* Documents Section */}
      {isEditing && employee.documents && employee.documents.length > 0 && (
        <div className="pt-4 border-t border-slate-300/70">
          <h4 className="text-sm font-medium text-slate-900 mb-3">Uploaded Documents</h4>
          <div className="space-y-2">
            {employee.documents.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50/50 border border-slate-300/70 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-md text-slate-500 border border-slate-300/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                    <p className="text-xs text-slate-500">{doc.size} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  type="button"
                  onClick={() => {
                    // Simulate document download
                    const blob = new Blob(["Simulated document content for " + doc.name], { type: "text/plain" });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = doc.name.replace('.pdf', '.txt'); // forcing txt since it's fake text
                    a.click();
                    window.URL.revokeObjectURL(url);
                  }}
                  className="text-primary-600 hover:bg-primary-50"
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`flex items-center pt-4 border-t border-slate-300/70 ${isEditing ? 'justify-between' : 'justify-end'}`}>
        {isEditing && (
          <Button 
            variant="danger" 
            type="button" 
            leftIcon={Trash2} 
            onClick={handleDelete}
            isLoading={isDeleting}
            disabled={isPending || isDeleting}
          >
            Delete
          </Button>
        )}
        
        <div className="flex gap-3">
          <Button variant="ghost" type="button" onClick={onCancel} disabled={isPending || isDeleting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={isPending} disabled={isDeleting}>
            {isEditing ? "Save Changes" : "Create Employee"}
          </Button>
        </div>
      </div>
    </form>
  );
}
