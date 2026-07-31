import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  helperText, 
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '', 
  id,
  ...props 
}, ref) => {
  const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      
      <div className="relative flex items-center">
        {LeftIcon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none">
            <LeftIcon size={18} />
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={`
            block w-full rounded-lg border px-3 py-2 text-slate-900 shadow-sm bg-transparent
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm
            disabled:bg-slate-50/50 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors
            ${error ? 'border-danger-300 focus:ring-danger-500 focus:border-danger-500' : 'border-slate-300/70'}
            ${LeftIcon ? 'pl-9' : ''}
            ${RightIcon ? 'pr-9' : ''}
          `}
          {...props}
        />
        
        {RightIcon && (
          <div className="absolute right-3 text-slate-400 pointer-events-none">
            <RightIcon size={18} />
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={`text-xs ${error ? 'text-danger-600' : 'text-slate-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
