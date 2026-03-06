import { useState } from 'react';
import type { Meal, MealType, MealItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { FoodItemInput } from './FoodItemInput';
import { FoodItemChip } from './FoodItemChip';
import { FiberFirstToggle } from './FiberFirstToggle';
import { ArrowLeft, Trash2 } from 'lucide-react';

interface MealEditorProps {
  mealType: MealType;
  initial?: Meal;
  onSave: (data: { items: MealItem[]; fiber_first: boolean }) => void;
  onDelete?: () => void;
  onBack: () => void;
}

const mealLabels: Record<MealType, string> = {
  breakfast: 'Petit-dejeuner',
  lunch: 'Dejeuner',
  dinner: 'Diner',
  snack: 'Collation',
};

export function MealEditor({ mealType, initial, onSave, onDelete, onBack }: MealEditorProps) {
  const [items, setItems] = useState<MealItem[]>(initial?.items ?? []);
  const [fiberFirst, setFiberFirst] = useState(initial?.fiber_first ?? false);

  const handleAddItem = (item: MealItem) => {
    setItems((prev) => [...prev, item]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="min-w-[44px] min-h-[44px] flex items-center justify-center">
          <ArrowLeft size={22} className="text-deep-plum" />
        </button>
        <h2 className="font-serif text-title text-deep-plum">{mealLabels[mealType]}</h2>
      </div>

      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <FoodItemChip key={i} item={item} onRemove={() => handleRemoveItem(i)} />
          ))}
        </div>
      )}

      <FoodItemInput onAdd={handleAddItem} />

      <FiberFirstToggle value={fiberFirst} onChange={setFiberFirst} />

      <div className="flex gap-3 pt-2">
        {initial && onDelete && (
          <Button variant="ghost" onClick={onDelete} className="text-coral-warning">
            <Trash2 size={18} />
          </Button>
        )}
        <Button onClick={() => onSave({ items, fiber_first: fiberFirst })} className="flex-1">
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
