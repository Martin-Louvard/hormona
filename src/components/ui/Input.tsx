import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-caption font-medium text-warm-gray">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`rounded-2xl border border-warm-gray/20 bg-cream-dark px-4 py-3 text-body text-warm-gray placeholder:text-warm-gray/40 focus:border-rose-soft focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-soft/20 min-h-[44px] transition-colors ${error ? 'border-coral-warning' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-tiny text-coral-warning">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
