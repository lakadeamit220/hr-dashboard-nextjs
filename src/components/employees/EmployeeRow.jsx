import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Edit2, MoreVertical } from "lucide-react";
import { STATUSES } from "@/lib/constants";
import Image from "next/image";

export default function EmployeeRow({ employee, onEdit }) {
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
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          {employee.avatar ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
              <Image 
                src={employee.avatar} 
                alt={`${employee.firstName} ${employee.lastName}`} 
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold border border-primary-50 text-sm">
              {initials}
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900">
              {employee.firstName} {employee.lastName}
            </div>
            <div className="text-sm text-gray-500">{employee.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{employee.designation}</div>
        <div className="text-sm text-gray-500">{employee.department}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{employee.phone}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge variant={badgeVariant}>{statusConfig.label}</Badge>
        {employee.documents && employee.documents.length > 0 && (
          <span className="ml-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md" title={`${employee.documents.length} document(s)`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            {employee.documents.length}
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button 
          variant="ghost" 
          size="sm" 
          leftIcon={Edit2}
          onClick={() => onEdit && onEdit(employee)}
          className="text-gray-400 hover:text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Edit
        </Button>
      </td>
    </tr>
  );
}
