import { Minus, Plus } from 'lucide-react';

interface CycleLengthPickerProps {
  value: number;
  onChange: (value: number) => void;
}

const MIN = 20;
const MAX = 45;

export function CycleLengthPicker({ value, onChange }: CycleLengthPickerProps) {
  const decrement = () => onChange(Math.max(MIN, value - 1));
  const increment = () => onChange(Math.min(MAX, value + 1));

  let hint = '';
  if (value < 24) hint = 'Un cycle court peut indiquer un desequilibre hormonal. Parles-en a ton medecin.';
  else if (value > 38) hint = 'Un cycle long est frequent avec le SOPK. Pas de panique !';

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-body text-warm-gray text-center">
        Quelle est la duree moyenne de ton cycle (du premier jour des regles au suivant) ?
      </p>

      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= MIN}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-dark text-deep-plum transition-all active:scale-95 disabled:opacity-30"
          aria-label="Diminuer"
        >
          <Minus size={20} />
        </button>

        <div className="flex flex-col items-center">
          <span className="font-mono text-data font-bold text-deep-plum">{value}</span>
          <span className="text-caption text-warm-gray-light">jours</span>
        </div>

        <button
          type="button"
          onClick={increment}
          disabled={value >= MAX}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-dark text-deep-plum transition-all active:scale-95 disabled:opacity-30"
          aria-label="Augmenter"
        >
          <Plus size={20} />
        </button>
      </div>

      {hint && (
        <p className="text-caption text-warm-gray-light text-center max-w-xs">{hint}</p>
      )}
    </div>
  );
}
