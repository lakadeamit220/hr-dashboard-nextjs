import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Edit2, Mail, Phone, MapPin } from "lucide-react";
import { STATUSES } from "@/lib/constants";
import Image from "next/image";

export default function EmployeeCard({ employee, onEdit }) {
  // Get Initials
  const initials = `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`.toUpperCase();
  
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
    <div className="bg-white rounded-xl shadow-card border border-gray-100 p-5 hover:shadow-card-hover transition-shadow duration-300 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3 items-center">
          {employee.avatar ? (
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary-100">
              <Image 
                src={employee.avatar} 
                alt={`${employee.firstName} ${employee.lastName}`} 
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xl font-bold border-2 border-primary-50">
              {initials}
            </div>
          )}
          
          <div>
            <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-1">{employee.designation}</p>
          </div>
        </div>
        
        <Badge variant={badgeVariant}>{statusConfig.label}</Badge>
      </div>
      
      <div className="mt-2 space-y-2.5 flex-1">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail size={16} className="text-gray-400 flex-shrink-0" />
          <span className="truncate" title={employee.email}>{employee.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone size={16} className="text-gray-400 flex-shrink-0" />
          <span>{employee.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} className="text-gray-400 flex-shrink-0" />
          <span className="truncate">{employee.address}</span>
        </div>
      </div>
      
      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md">
          {employee.department}
        </span>
        
        <Button 
          variant="ghost" 
          size="sm" 
          leftIcon={Edit2}
          onClick={() => onEdit && onEdit(employee)}
          className="text-gray-500 hover:text-primary-600 hover:bg-primary-50"
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
