export default function Badge({ 
  children, 
  variant = 'gray', 
  className = '' 
}) {
  const variants = {
    gray: "bg-slate-100/50 text-slate-700",
    primary: "bg-primary-50 text-primary-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-slate-600",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${variants[variant] || variants.gray} ${className}`}>
      {children}
    </span>
  );
}
