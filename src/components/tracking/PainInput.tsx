import { SliderScale } from '@/components/ui/SliderScale';

interface PainInputProps {
  type: string | null;
  intensity: number | null;
  onTypeChange: (type: string | null) => void;
  onIntensityChange: (intensity: number) => void;
}

const painTypes = [
  { value: 'none', label: 'Aucune' },
  { value: 'crampes', label: 'Crampes' },
  { value: 'tiraillements', label: 'Tiraillements' },
  { value: 'pression', label: 'Pression' },
  { value: 'aigu', label: 'Aigu' },
];

export function PainInput({ type, intensity, onTypeChange, onIntensityChange }: PainInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-caption font-medium text-warm-gray">Douleurs pelviennes</span>
      <div className="flex flex-wrap gap-2">
        {painTypes.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onTypeChange(value === 'none' ? null : value)}
            className={`rounded-full px-3 py-1.5 text-tiny font-medium transition-all min-h-[36px] ${
              (type === null && value === 'none') || type === value
                ? 'bg-rose-soft/20 text-deep-plum ring-1 ring-rose-soft'
                : 'bg-cream-dark text-warm-gray'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {type && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-tiny text-warm-gray">Intensite</span>
            <span className="text-tiny font-medium text-deep-plum">{intensity ?? 0}/10</span>
          </div>
          <SliderScale
            value={intensity}
            onChange={onIntensityChange}
            max={10}
            color="#E8927C"
          />
        </div>
      )}
    </div>
  );
}
