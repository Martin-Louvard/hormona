import { Check } from 'lucide-react';

interface FiberFirstToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function FiberFirstToggle({ value, onChange }: FiberFirstToggleProps) {
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => onChange(!value)}
        className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all min-h-[44px] ${
          value
            ? 'bg-sage/15 ring-1 ring-sage'
            : 'bg-cream-dark'
        }`}
      >
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
            value ? 'border-sage bg-sage text-white' : 'border-warm-gray/30'
          }`}
        >
          {value && <Check size={14} />}
        </div>
        <span className={`text-caption font-medium ${value ? 'text-sage-dark' : 'text-warm-gray'}`}>
          J'ai mange les fibres en premier
        </span>
      </button>

      {!value && (
        <div className="rounded-2xl bg-lavender/10 px-4 py-3">
          <p className="text-tiny text-warm-gray">
            Manger les fibres (legumes, salade) avant les glucides peut reduire le pic de glycemie de 30 a 40%. Essaie la prochaine fois !
          </p>
        </div>
      )}
    </div>
  );
}
