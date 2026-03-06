import type { MealItem } from '@/types';
import { X } from 'lucide-react';

interface FoodItemChipProps {
  item: MealItem;
  onRemove: () => void;
}

const categoryEmoji: Record<string, string> = {
  protein: '\uD83E\uDD69',
  carb: '\uD83C\uDF5E',
  fat: '\uD83E\uDD51',
  fiber: '\uD83E\uDD6C',
};

export function FoodItemChip({ item, onRemove }: FoodItemChipProps) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-cream-dark px-3 py-1.5 text-caption">
      <span>{categoryEmoji[item.category] ?? '\uD83C\uDF7D\uFE0F'}</span>
      <span className="text-deep-plum">{item.name}</span>
      <button
        onClick={onRemove}
        className="ml-0.5 min-w-[24px] min-h-[24px] flex items-center justify-center rounded-full hover:bg-warm-gray/10"
        aria-label={`Retirer ${item.name}`}
      >
        <X size={14} className="text-warm-gray" />
      </button>
    </div>
  );
}
