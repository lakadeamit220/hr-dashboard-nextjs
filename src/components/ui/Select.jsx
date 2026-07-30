import { forwardRef } from 'react';

const Select = forwardRef(({ 
  label, 
  error, 
  helperText, 
  options = [], 
  className = '', 
  id,
  ...props 
}, ref) => {
  const selectId = id || `select-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <select
        ref={ref}
        id={selectId}
        className={`
          block w-full rounded-lg border px-3 py-2 text-gray-900 shadow-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors
          ${error ? 'border-danger-300 focus:ring-danger-500 focus:border-danger-500' : 'border-gray-300'}
        `}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      
      {(error || helperText) && (
        <p className={`text-xs ${error ? 'text-danger-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
