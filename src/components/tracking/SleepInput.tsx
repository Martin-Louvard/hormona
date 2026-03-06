interface SleepInputProps {
  onsetMinutes: number | null;
  nightWakings: number | null;
  onOnsetChange: (minutes: number) => void;
  onWakingsChange: (wakings: number) => void;
}

const onsetOptions = [
  { value: 10, label: '< 15 min' },
  { value: 20, label: '15-30 min' },
  { value: 45, label: '30-60 min' },
  { value: 90, label: '> 60 min' },
];

const wakingOptions = [0, 1, 2, 3];

export function SleepInput({ onsetMinutes, nightWakings, onOnsetChange, onWakingsChange }: SleepInputProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-caption font-medium text-warm-gray">Temps d'endormissement</span>
        <div className="flex gap-2">
          {onsetOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onOnsetChange(value)}
              className={`flex-1 rounded-2xl py-2 text-tiny font-medium transition-all min-h-[40px] ${
                onsetMinutes === value
                  ? 'bg-lavender/20 text-deep-plum ring-1 ring-lavender'
                  : 'bg-cream-dark text-warm-gray'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-caption font-medium text-warm-gray">Reveils nocturnes</span>
        <div className="flex gap-2">
          {wakingOptions.map((n) => (
            <button
              key={n}
              onClick={() => onWakingsChange(n)}
              className={`flex-1 rounded-2xl py-2 text-caption font-medium transition-all min-h-[44px] ${
                nightWakings === n
                  ? 'bg-lavender/20 text-deep-plum ring-1 ring-lavender'
                  : 'bg-cream-dark text-warm-gray'
              }`}
            >
              {n === 3 ? '3+' : n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
