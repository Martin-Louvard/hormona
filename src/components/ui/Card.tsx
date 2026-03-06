import type { HTMLAttributes } from 'react';

type Variant = 'default' | 'highlight' | 'interactive' | 'subtle';
type Level = 1 | 2 | 3;

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: Variant;
  level?: Level;
  phaseColor?: string;
}

const levelStyles: Record<Level, string> = {
  1: 'bg-white rounded-[20px] p-5 shadow-[0_2px_16px_rgba(45,34,53,0.06),0_0_0_1px_rgba(45,34,53,0.03)]',
  2: 'bg-bg-subtle rounded-2xl p-4 border border-[rgba(45,34,53,0.04)]',
  3: 'bg-white rounded-[20px] p-5 shadow-[0_2px_16px_rgba(45,34,53,0.06),0_0_0_1px_rgba(45,34,53,0.03)] transition-[transform,box-shadow] duration-[180ms] ease-out cursor-pointer active:scale-[0.97] active:shadow-[0_1px_8px_rgba(45,34,53,0.08)]',
};

function variantToLevel(variant: Variant): Level {
  switch (variant) {
    case 'subtle': return 2;
    case 'interactive': return 3;
    default: return 1;
  }
}

export function Card({ className = '', children, variant = 'default', level, phaseColor, ...props }: CardProps) {
  const resolvedLevel = level ?? variantToLevel(variant);
  const base = levelStyles[resolvedLevel];

  const highlightStyle = variant === 'highlight' ? 'border-l-[3px]' : '';

  const style = variant === 'highlight' && phaseColor
    ? { borderLeftColor: phaseColor }
    : undefined;

  return (
    <div
      className={`${base} ${highlightStyle} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
