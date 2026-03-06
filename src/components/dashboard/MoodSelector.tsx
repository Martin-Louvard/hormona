import type { MoodType } from '@/types';

const moods: { type: MoodType; emoji: string; label: string; color: string }[] = [
  { type: 'sunny', emoji: '\u2600\uFE0F', label: 'Radieuse', color: '#FFD166' },
  { type: 'cloudy', emoji: '\u26C5', label: 'Mitig\u00e9e', color: '#C3B1E1' },
  { type: 'rainy', emoji: '\uD83C\uDF27\uFE0F', label: 'Triste', color: '#7EC8B8' },
  { type: 'stormy', emoji: '\u26C8\uFE0F', label: 'Agit\u00e9e', color: '#E88D9E' },
  { type: 'foggy', emoji: '\uD83C\uDF2B\uFE0F', label: 'Perdue', color: '#9B8BA3' },
];

interface MoodSelectorProps {
  selected: MoodType | null;
  onSelect: (mood: MoodType) => void;
}

export function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <div>
      <p className="mb-3 text-caption font-medium text-warm-gray">Comment tu te sens aujourd'hui ?</p>
      <div className="flex justify-between gap-2">
        {moods.map(({ type, emoji, label, color }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`flex flex-col items-center gap-1 rounded-2xl p-2 transition-all min-w-[56px] min-h-[56px] ${
              selected === type
                ? 'ring-2 scale-110 animate-[bounce_0.3s_ease-in-out]'
                : 'hover:bg-warm-gray/5'
            }`}
            style={
              selected === type
                ? { backgroundColor: `${color}33`, ringColor: color, '--tw-ring-color': color } as React.CSSProperties
                : undefined
            }
            aria-label={label}
          >
            <span className="text-2xl">{emoji}</span>
            <span className="text-[10px] text-warm-gray">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
