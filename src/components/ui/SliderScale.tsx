interface SliderScaleProps {
  value: number | null;
  onChange: (value: number) => void;
  color?: string;
  labels?: string[];
  max?: number;
  className?: string;
}

export function SliderScale({
  value,
  onChange,
  color = '#F2B5D4',
  labels,
  max = 5,
  className = '',
}: SliderScaleProps) {
  return (
    <div className={`flex items-center justify-between gap-2 ${className}`}>
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
        const isActive = value !== null && n <= value;
        const isSelected = value === n;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`flex flex-col items-center gap-1 min-w-[44px] min-h-[44px] justify-center transition-all ${
              isSelected ? 'scale-110' : ''
            }`}
            aria-label={labels?.[n - 1] ?? `${n}`}
          >
            <div
              className="h-8 w-8 rounded-full border-2 transition-all"
              style={{
                backgroundColor: isActive ? color : 'transparent',
                borderColor: isActive ? color : '#e5e5e5',
                opacity: isActive && !isSelected ? 0.5 : 1,
              }}
            />
            {labels?.[n - 1] && (
              <span className="text-[10px] text-warm-gray">{labels[n - 1]}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
