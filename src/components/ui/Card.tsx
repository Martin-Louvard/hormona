import type { HTMLAttributes } from 'react';

type Variant = 'default' | 'highlight' | 'interactive';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: Variant;
  phaseColor?: string;
}

export function Card({ className = '', children, variant = 'default', phaseColor, ...props }: CardProps) {
  const base = 'rounded-3xl bg-white p-5 shadow-[0_2px_12px_rgba(74,44,94,0.06)]';

  const variantStyles: Record<Variant, string> = {
    default: '',
    highlight: 'border-l-[3px]',
    interactive: 'hover:shadow-md active:scale-[0.98] transition-all cursor-pointer',
  };

  const style = variant === 'highlight' && phaseColor
    ? { borderLeftColor: phaseColor }
    : undefined;

  return (
    <div
      className={`${base} ${variantStyles[variant]} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
