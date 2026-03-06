import { Children, type ReactNode } from 'react';

interface RiseAnimationProps {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
}

export function RiseAnimation({ children, className = '', staggerMs = 40 }: RiseAnimationProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => (
        <div
          className="animate-rise"
          style={{ animationDelay: `${index * staggerMs}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
