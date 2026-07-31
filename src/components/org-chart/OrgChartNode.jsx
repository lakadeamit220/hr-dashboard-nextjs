"use client";

import { useState } from "react";
import Image from "next/image";
import { getAvatarColorClass } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function OrgChartNode({ employee, employees }) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Find all employees who report to this employee
  const directReports = employees.filter(emp => emp.managerId === employee.id);
  const hasReports = directReports.length > 0;

  const fullName = `${employee.firstName} ${employee.lastName}`;
  const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const avatarColor = getAvatarColorClass(fullName);

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <div className="relative group flex flex-col items-center">
        <div className="bg-white/5 backdrop-blur-[4px] border border-slate-300/80 shadow-md rounded-xl p-4 w-64 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl relative z-10">
          <div className="flex items-center gap-3">
            {employee.avatar ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary-100 shadow-sm flex-shrink-0">
                <Image src={employee.avatar} alt={fullName} fill className="object-cover" />
              </div>
            ) : (
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-2 text-sm shadow-sm flex-shrink-0 ${avatarColor}`}>
                {initials}
              </div>
            )}
            
            <div className="min-w-0">
              <h4 className="font-semibold text-slate-900 truncate" title={fullName}>{fullName}</h4>
              <p className="text-xs text-primary-600 font-medium truncate mt-0.5" title={employee.designation}>{employee.designation}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{employee.department}</p>
            </div>
          </div>
          
          {hasReports && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border border-slate-300 rounded-full flex items-center justify-center text-slate-500 hover:text-primary-600 hover:border-primary-300 shadow-sm transition-colors z-20"
            >
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
      </div>

      {/* Children Tree */}
      {hasReports && isExpanded && (
        <div className="relative pt-6 flex justify-center">
          {/* Vertical line from parent to horizontal line */}
          <div className="absolute top-0 left-1/2 w-px h-6 bg-slate-300 -translate-x-1/2"></div>
          
          {/* Horizontal line connecting siblings (only if > 1 report) */}
          {directReports.length > 1 && (
            <div className="absolute top-6 left-[calc(50%/var(--child-count))] right-[calc(50%/var(--child-count))] h-px bg-slate-300"></div>
          )}

          <div 
            className="flex justify-center gap-6 pt-6"
            style={{ "--child-count": directReports.length }}
          >
            {directReports.map((report, index) => (
              <div key={report.id} className="relative flex flex-col items-center">
                {/* Vertical line from horizontal line down to child node */}
                <div className="absolute -top-6 left-1/2 w-px h-6 bg-slate-300 -translate-x-1/2"></div>
                <OrgChartNode employee={report} employees={employees} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
