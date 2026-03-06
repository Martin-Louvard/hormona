import { useState } from 'react';
import type { MealItem, GILevel } from '@/types';

interface FoodItemInputProps {
  onAdd: (item: MealItem) => void;
}

type FoodCategory = 'protein' | 'carb' | 'fat' | 'fiber';

const categoryConfig: { key: FoodCategory; emoji: string; label: string }[] = [
  { key: 'protein', emoji: '\uD83E\uDD69', label: 'Prot' },
  { key: 'carb', emoji: '\uD83C\uDF5E', label: 'Gluc' },
  { key: 'fat', emoji: '\uD83E\uDD51', label: 'Lip' },
  { key: 'fiber', emoji: '\uD83E\uDD6C', label: 'Fib' },
];

const giOptions: { value: GILevel; label: string }[] = [
  { value: 'low', label: 'IG bas' },
  { value: 'high', label: 'IG haut' },
];

export function FoodItemInput({ onAdd }: FoodItemInputProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<FoodCategory | null>(null);
  const [giLevel, setGiLevel] = useState<GILevel>('low');

  const handleSubmit = () => {
    if (!name.trim() || !category) return;
    onAdd({
      name: name.trim(),
      category,
      gi_level: category === 'carb' ? giLevel : 'low',
    });
    setName('');
    setCategory(null);
    setGiLevel('low');
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom de l'aliment..."
        className="rounded-2xl border border-warm-gray/20 bg-cream-dark px-4 py-3 text-body text-warm-gray placeholder:text-warm-gray/40 focus:border-rose-soft focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-soft/20 min-h-[44px]"
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />

      <div className="flex gap-2">
        {categoryConfig.map(({ key, emoji, label }) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`flex-1 flex flex-col items-center gap-0.5 rounded-2xl py-2 text-tiny font-medium transition-all min-h-[44px] justify-center ${
              category === key
                ? 'bg-rose-soft/20 text-deep-plum ring-2 ring-rose-soft'
                : 'bg-cream-dark text-warm-gray'
            }`}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {category === 'carb' && (
        <div className="flex gap-2">
          {giOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setGiLevel(value)}
              className={`flex-1 rounded-2xl py-2 text-caption font-medium min-h-[44px] transition-all ${
                giLevel === value
                  ? value === 'low'
                    ? 'bg-sage/20 text-sage-dark ring-1 ring-sage'
                    : 'bg-coral-warning/20 text-coral-warning ring-1 ring-coral-warning'
                  : 'bg-cream-dark text-warm-gray'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!name.trim() || !category}
        className="self-end rounded-2xl bg-rose-soft px-4 py-2 text-caption font-medium text-white min-h-[44px] disabled:opacity-40 transition-all hover:bg-rose-soft/80"
      >
        Ajouter
      </button>
    </div>
  );
}
