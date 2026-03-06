interface BadgeProps {
  children: React.ReactNode;
  colorScheme?: 'rose' | 'lavender' | 'sage' | 'warning' | 'neutral';
  className?: string;
}

const colorStyles: Record<NonNullable<BadgeProps['colorScheme']>, string> = {
  rose: 'bg-rose-soft/20 text-rose-deep',
  lavender: 'bg-lavender/20 text-deep-plum',
  sage: 'bg-sage/20 text-sage-dark',
  warning: 'bg-coral-warning/20 text-coral-warning',
  neutral: 'bg-warm-gray/10 text-warm-gray',
};

export function Badge({ children, colorScheme = 'neutral', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-tiny font-medium ${colorStyles[colorScheme]} ${className}`}>
      {children}
    </span>
  );
}
