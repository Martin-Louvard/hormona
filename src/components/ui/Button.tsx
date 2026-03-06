import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-rose-soft text-white hover:bg-rose-soft/80 shadow-sm',
  secondary: 'bg-transparent border border-rose-soft text-deep-plum hover:bg-rose-soft/10',
  ghost: 'bg-transparent text-warm-gray hover:bg-cream-dark',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-10 px-4 text-caption',
  md: 'h-12 px-6 text-body',
  lg: 'h-14 px-8 text-body',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-2xl font-medium transition-all min-h-[44px] min-w-[44px] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="mr-2 animate-spin" />
            Un instant...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
