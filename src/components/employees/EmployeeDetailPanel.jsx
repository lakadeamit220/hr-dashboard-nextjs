import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { STATUSES } from "@/lib/constants";
import { getAvatarColorClass } from "@/lib/utils";
import Image from "next/image";
import { Mail, Phone, MapPin, Briefcase, Calendar, Star, FileText, Edit2 } from "lucide-react";

export default function EmployeeDetailPanel({ employee, onEdit, onClose }) {
  if (!employee) return null;

  const fullName = `${employee.firstName} ${employee.lastName}`;
  const avatarColor = getAvatarColorClass(fullName);
  const initials = `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`.toUpperCase();
  const statusConfig = STATUSES.find(s => s.value === employee.status) || STATUSES[0];
  const colorToVariant = { green: 'success', amber: 'warning', orange: 'warning', red: 'danger' };
  const badgeVariant = colorToVariant[statusConfig.color] || 'gray';

  return (
    <div className="space-y-6">
      {/* Header Profile Section */}
      <div className="flex items-center gap-5 pb-6 border-b border-blue-400/40">
        {employee.avatar ? (
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
            <Image 
              src={employee.avatar} 
              alt={fullName} 
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md ${avatarColor}`}>
            {initials}
          </div>
        )}
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-blue-950">{fullName}</h2>
          <p className="text-primary-600 font-medium">{employee.designation}</p>
          <div className="mt-2 flex gap-2">
            <Badge variant={badgeVariant}>{statusConfig.label}</Badge>
            <Badge variant="gray">{employee.department}</Badge>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-950">Email Address</p>
            <p className="text-sm text-blue-600">{employee.email}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-950">Phone Number</p>
            <p className="text-sm text-blue-600">{employee.phone}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-950">Address</p>
            <p className="text-sm text-blue-600">{employee.address}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-950">Joining Date</p>
            <p className="text-sm text-blue-600">{new Date(employee.joiningDate).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Briefcase className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-950">Salary</p>
            <p className="text-sm text-blue-600">{Number(employee.salary).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-950">Performance Rating</p>
            <p className="text-sm text-blue-600">{employee.performanceRating}</p>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="pt-6 border-t border-blue-400/40">
        <h3 className="text-lg font-semibold text-blue-950 mb-4">Documents</h3>
        {employee.documents && employee.documents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {employee.documents.map(doc => (
              <div key={doc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-blue-400/40">
                <div className="w-10 h-10 rounded bg-white/5 backdrop-blur-[2px] border border-blue-400/40 shadow-sm border border-blue-400/40 flex items-center justify-center text-blue-600 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-950 truncate">{doc.name}</p>
                  <p className="text-xs text-blue-600">{doc.size}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    const blob = new Blob(["Preview content for " + doc.name], { type: "text/plain" });
                    const url = window.URL.createObjectURL(blob);
                    window.open(url, '_blank');
                    // We don't revoke here immediately so the new tab can load it
                  }}
                  className="text-primary-600 hover:bg-primary-50 px-2"
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-blue-600 italic bg-gray-50 p-4 rounded-lg text-center border border-blue-400/40">
            No documents uploaded yet.
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-blue-400/40">
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
        <Button 
          variant="primary" 
          leftIcon={Edit2}
          onClick={() => onEdit(employee)}
        >
          Edit Details
        </Button>
      </div>
    </div>
  );
}
