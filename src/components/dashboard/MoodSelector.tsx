import { useState } from 'react';
import type { MoodType } from '@/types';

const moods: { type: MoodType; emoji: string; label: string; color: string }[] = [
  { type: 'sunny', emoji: '\u2600\uFE0F', label: 'Radieuse', color: '#D4A847' },
  { type: 'cloudy', emoji: '\u26C5', label: 'Mitig\u00e9e', color: '#B8A9D4' },
  { type: 'rainy', emoji: '\uD83C\uDF27\uFE0F', label: 'Triste', color: '#7EBAB0' },
  { type: 'stormy', emoji: '\u26C8\uFE0F', label: 'Agit\u00e9e', color: '#C97B8B' },
  { type: 'foggy', emoji: '\uD83C\uDF2B\uFE0F', label: 'Perdue', color: '#A69AAE' },
];

interface MoodSelectorProps {
  selected: MoodType | null;
  onSelect: (mood: MoodType) => void;
}

export function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  const [justSelected, setJustSelected] = useState<MoodType | null>(null);

  const handleSelect = (type: MoodType) => {
    onSelect(type);
    setJustSelected(type);
    setTimeout(() => setJustSelected(null), 600);
  };

  return (
    <div>
      <p className="mb-3 text-caption font-medium text-text-secondary">Comment tu te sens aujourd'hui ?</p>
      <div className="flex justify-between gap-2">
        {moods.map(({ type, emoji, label, color }) => {
          const isSelected = selected === type;
          const isJustSelected = justSelected === type;

          return (
            <button
              key={type}
              onClick={() => handleSelect(type)}
              className={`relative flex flex-col items-center gap-1 rounded-2xl p-2 min-w-[56px] min-h-[56px] transition-all duration-200 ${
                isSelected
                  ? 'ring-2'
                  : selected
                    ? 'opacity-40'
                    : 'hover:bg-bg-overlay'
              } ${isJustSelected ? 'animate-bloom-pulse' : ''}`}
              style={
                isSelected
                  ? { backgroundColor: `${color}20`, '--tw-ring-color': color } as React.CSSProperties
                  : undefined
              }
              aria-label={label}
            >
              {/* Bloom ring effect */}
              {isJustSelected && (
                <span
                  className="absolute inset-0 rounded-2xl animate-bloom-ring"
                  style={{ border: `2px solid ${color}` }}
                />
              )}

              <span className="text-2xl">{emoji}</span>
              <span className="text-[10px] text-text-muted">{label}</span>

              {/* Sparkle particles */}
              {isJustSelected && (
                <>
                  <span className="absolute top-0 left-1/4 h-1 w-1 rounded-full animate-sparkle" style={{ backgroundColor: color }} />
                  <span className="absolute top-1 right-1/4 h-1.5 w-1.5 rounded-full animate-sparkle" style={{ backgroundColor: color, animationDelay: '100ms' }} />
                  <span className="absolute top-0 left-1/2 h-1 w-1 rounded-full animate-sparkle" style={{ backgroundColor: color, animationDelay: '200ms' }} />
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
