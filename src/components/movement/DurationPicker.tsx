interface DurationPickerProps {
  selected: number | null;
  onSelect: (duration: number) => void;
}

const durations = [15, 20, 30, 45, 60];

export function DurationPicker({ selected, onSelect }: DurationPickerProps) {
  return (
    <div className="flex gap-2">
      {durations.map((d) => (
        <button
          key={d}
          onClick={() => onSelect(d)}
          className={`flex-1 rounded-2xl py-2.5 text-caption font-medium transition-all min-h-[44px] ${
            selected === d
              ? 'bg-rose-soft/20 text-deep-plum ring-2 ring-rose-soft'
              : 'bg-cream-dark text-warm-gray hover:bg-cream-dark/80'
          }`}
        >
          {d}'
        </button>
      ))}
    </div>
  );
}
