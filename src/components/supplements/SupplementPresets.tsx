import { supplementPresets } from '@/data/supplement-presets';

interface SupplementPresetsProps {
  onSelect: (name: string) => void;
  selectedName: string;
}

export function SupplementPresets({ onSelect, selectedName }: SupplementPresetsProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-caption font-medium text-warm-gray">Complements courants SOPK</span>
      <div className="flex flex-wrap gap-2">
        {supplementPresets.map((preset) => {
          const isSelected = selectedName === preset.name;
          return (
            <button
              key={preset.name}
              onClick={() => onSelect(preset.name)}
              className={`rounded-full px-3 py-1.5 text-tiny font-medium transition-all min-h-[36px] ${
                isSelected
                  ? 'bg-rose-soft/20 text-deep-plum ring-1 ring-rose-soft'
                  : 'bg-cream-dark text-warm-gray hover:bg-cream-dark/80'
              }`}
            >
              {preset.emoji} {preset.name.split(' ')[0]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
