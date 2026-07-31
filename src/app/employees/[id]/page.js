"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { getAllEmployees } from "@/lib/data";
import Button from "@/components/ui/Button";
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, Calendar, FileText, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function EmployeeProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const employees = useStore((state) => state.employees);
  const setEmployees = useStore((state) => state.setEmployees);

  useEffect(() => {
    // If store is empty (e.g. direct load), hydrate it
    if (employees.length === 0) {
      setEmployees(getAllEmployees());
    }
  }, [employees.length, setEmployees]);

  useEffect(() => {
    if (employees.length > 0 && id) {
      const found = employees.find(e => e.id === id);
      setEmployee(found || null);
      setIsLoading(false);
    }
  }, [employees, id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-slate-800">Employee Not Found</h2>
        <p className="text-slate-500 mt-2 mb-6">The employee you are looking for does not exist.</p>
        <Button onClick={() => router.push("/employees")} leftIcon={ArrowLeft}>
          Back to Employees
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Breadcrumb / Back Navigation */}
      <button 
        onClick={() => router.push("/employees")}
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors w-fit"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Directory
      </button>

      {/* Header Profile Card */}
      <div className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-100 flex-shrink-0">
          {employee.avatar ? (
            <Image src={employee.avatar} alt={employee.firstName} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-slate-400">
              {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{employee.firstName} {employee.lastName}</h1>
              <p className="text-lg text-primary-600 font-medium mt-1">{employee.designation}</p>
              
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-3 text-slate-500">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100/50 text-sm font-medium">
                  <Briefcase size={14} />
                  {employee.department}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100/50 text-sm font-medium">
                  <MapPin size={14} />
                  {employee.address}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => window.location.href = `mailto:${employee.email}`}>
                Email
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Contact & Info */}
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-2xl p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{employee.email}</p>
                  <p className="text-xs text-slate-500">Work Email</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{employee.phone}</p>
                  <p className="text-xs text-slate-500">Mobile</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-2xl p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Employment Details</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Calendar size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{employee.joiningDate}</p>
                  <p className="text-xs text-slate-500">Date of Join</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-slate-400 mt-0.5 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 capitalize">{employee.status.replace('-', ' ')}</p>
                  <p className="text-xs text-slate-500">Current Status</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Timeline & Documents */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-2xl p-6">
            <h3 className="font-semibold text-slate-900 mb-6">Recent Activity</h3>
            <div className="relative pl-6 border-l border-slate-200 space-y-8 before:absolute before:top-0 before:bottom-0 before:-left-[1px] before:w-[2px] before:bg-gradient-to-b before:from-primary-500 before:to-transparent">
              
              <div className="relative">
                <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-primary-100 border-2 border-primary-500"></div>
                <p className="text-sm font-medium text-slate-900">Updated profile information</p>
                <p className="text-xs text-slate-500 mt-1">Today at 10:45 AM</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-slate-100 border-2 border-slate-300"></div>
                <p className="text-sm font-medium text-slate-900">Completed Annual Performance Review</p>
                <p className="text-xs text-slate-500 mt-1">2 weeks ago</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-slate-100 border-2 border-slate-300"></div>
                <p className="text-sm font-medium text-slate-900">Joined the company</p>
                <p className="text-xs text-slate-500 mt-1">{employee.joiningDate}</p>
              </div>

            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-[2px] border border-slate-300/70 shadow-sm rounded-2xl p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center justify-between">
              Documents
              <span className="text-xs font-normal text-primary-600 cursor-pointer hover:underline">View all</span>
            </h3>
            
            {employee.documents && employee.documents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {employee.documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white/50 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 group-hover:text-primary-600 transition-colors">{doc.name}</p>
                        <p className="text-xs text-slate-500">{doc.size}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-400 group-hover:text-primary-600" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-sm text-slate-500">No documents uploaded</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
