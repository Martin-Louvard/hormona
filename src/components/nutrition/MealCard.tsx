import type { Meal, MealType } from '@/types';
import { Card } from '@/components/ui/Card';
import { Check, Plus } from 'lucide-react';

interface MealCardProps {
  mealType: MealType;
  meal?: Meal;
  onAdd: () => void;
  onEdit: () => void;
}

const mealConfig: Record<MealType, { label: string; emoji: string }> = {
  breakfast: { label: 'Petit-dejeuner', emoji: '\uD83C\uDF05' },
  lunch: { label: 'Dejeuner', emoji: '\u2600\uFE0F' },
  dinner: { label: 'Diner', emoji: '\uD83C\uDF19' },
  snack: { label: 'Collation', emoji: '\uD83C\uDF7F' },
};

export function MealCard({ mealType, meal, onAdd, onEdit }: MealCardProps) {
  const config = mealConfig[mealType];

  if (!meal) {
    return (
      <button onClick={onAdd} className="w-full">
        <Card variant="interactive" className="flex items-center gap-3">
          <span className="text-xl">{config.emoji}</span>
          <div className="flex-1 text-left">
            <p className="text-caption font-medium text-warm-gray">{config.label}</p>
            <p className="text-tiny text-warm-gray/50">Ajouter un repas</p>
          </div>
          <Plus size={20} className="text-rose-soft" />
        </Card>
      </button>
    );
  }

  const itemsSummary = meal.items.map((i) => i.name).join(', ');

  return (
    <button onClick={onEdit} className="w-full text-left">
      <Card variant="interactive">
        <div className="flex items-start gap-3">
          <span className="text-xl">{config.emoji}</span>
          <div className="flex-1">
            <p className="text-caption font-medium text-deep-plum">{config.label}</p>
            <p className="text-tiny text-warm-gray line-clamp-2">{itemsSummary || 'Aucun aliment note'}</p>
            {meal.fiber_first && (
              <div className="mt-1 flex items-center gap-1 text-tiny text-sage-dark">
                <Check size={12} /> Fibres en premier
              </div>
            )}
          </div>
        </div>
      </Card>
    </button>
  );
}
