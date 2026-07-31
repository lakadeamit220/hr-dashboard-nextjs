import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Edit2, Mail, Phone, MapPin } from "lucide-react";
import { STATUSES } from "@/lib/constants";
import Image from "next/image";
import { getAvatarColorClass } from "@/lib/utils";

export default function EmployeeCard({ employee, onEdit, onView }) {
  // Get Initials
  const initials = `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`.toUpperCase();
  const fullName = `${employee.firstName} ${employee.lastName}`;
  const avatarColor = getAvatarColorClass(fullName);
  
  // Find status config to get the correct color mapping
  const statusConfig = STATUSES.find(s => s.value === employee.status) || STATUSES[0];
  
  // Map our constant colors to Badge variants
  const colorToVariant = {
    green: 'success',
    amber: 'warning',
    orange: 'warning',
    red: 'danger',
  };
  const badgeVariant = colorToVariant[statusConfig.color] || 'gray';

  return (
    <div className="bg-white/5 backdrop-blur-[2px] border border-blue-300 shadow-sm rounded-xl p-5 hover:shadow-card-hover transition-shadow duration-300 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4 gap-3">
        <div className="flex gap-3 items-center min-w-0">
          {employee.avatar ? (
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-300 shadow-sm flex-shrink-0">
              <Image 
                src={employee.avatar} 
                alt={fullName} 
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold border-2 shadow-sm flex-shrink-0 ${avatarColor}`}>
              {initials}
            </div>
          )}
          
          <div className="min-w-0">
            <h3 className="font-semibold text-blue-950 text-lg truncate" title={fullName}>
              {fullName}
            </h3>
            <p className="text-sm text-blue-600 truncate">{employee.designation}</p>
          </div>
        </div>
        
        <Badge variant={badgeVariant}>{statusConfig.label}</Badge>
      </div>
      
      <div className="mt-2 space-y-2.5 flex-1">
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <Mail size={16} className="text-blue-400 flex-shrink-0" />
          <span className="truncate" title={employee.email}>{employee.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <Phone size={16} className="text-blue-400 flex-shrink-0" />
          <span>{employee.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <MapPin size={16} className="text-blue-400 flex-shrink-0" />
          <span className="truncate">{employee.address}</span>
        </div>
      </div>
      
      <div className="mt-5 pt-4 border-t border-blue-300 flex items-center justify-between gap-2">
        <div className="flex gap-2 items-center min-w-0">
          <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md truncate" title={employee.department}>
            {employee.department}
          </span>
          {employee.documents && employee.documents.length > 0 && (
            <span className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md flex-shrink-0" title={`${employee.documents.length} document(s)`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2-2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              {employee.documents.length}
            </span>
          )}
        </div>
        
        <div className="flex gap-2 flex-shrink-0">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onView && onView(employee)}
            className="text-blue-600 hover:text-primary-600 hover:bg-primary-50"
          >
            View
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            leftIcon={Edit2}
            onClick={() => onEdit && onEdit(employee)}
            className="text-blue-600 hover:text-primary-600 hover:bg-primary-50"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
