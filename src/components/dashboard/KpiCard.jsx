import { TrendingUp, TrendingDown } from "lucide-react";

export default function KpiCard({ title, value, icon: Icon, trend, colorClass = "primary" }) {
  // Mapping color prop to Tailwind classes safely
  const colorStyles = {
    primary: "bg-primary-50 text-primary-600",
    accent: "bg-accent-50 text-accent-600",
    warning: "bg-warning-50 text-warning-600",
    info: "bg-info-50 text-info-600",
    danger: "bg-danger-50 text-danger-600",
  };

  const selectedColor = colorStyles[colorClass] || colorStyles.primary;

  return (
    <div className="bg-white/5 backdrop-blur-[2px] border border-blue-300 shadow-sm rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 animate-slide-up border border-blue-300 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">{title}</span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-blue-950">{value}</span>
          
          {trend && (
            <div className={`flex items-center text-sm font-medium ${trend.isPositive ? 'text-accent-600' : 'text-danger-600'}`}>
              {trend.isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
              {trend.value}%
            </div>
          )}
        </div>
      </div>
      
      {Icon && (
        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${selectedColor}`}>
          <Icon size={28} />
        </div>
      )}
    </div>
  );
}
