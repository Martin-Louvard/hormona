import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useMealStore } from '@/stores/mealStore';
import { useCycle } from '@/hooks/useCycle';
import { PhaseIndicator } from '@/components/ui/PhaseIndicator';
import { Card } from '@/components/ui/Card';
import { GISearchBar } from '@/components/nutrition/GISearchBar';
import { MealCard } from '@/components/nutrition/MealCard';
import { MealEditor } from '@/components/nutrition/MealEditor';
import { SOSCravingFlow } from '@/components/nutrition/SOSCravingFlow';
import { WeeklyBalanceChart } from '@/components/nutrition/WeeklyBalanceChart';
import type { MealType, MealItem } from '@/types';
import { AlertCircle } from 'lucide-react';

const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner'];

export function Nutrition() {
  const { profile } = useAuthStore();
  const { todayMeals, weekMeals, fetchMeals, fetchWeekMeals, addMeal, updateMeal, deleteMeal } = useMealStore();
  const { cycleInfo } = useCycle();
  const [editingType, setEditingType] = useState<MealType | null>(null);
  const [showSOS, setShowSOS] = useState(false);

  useEffect(() => {
    if (profile?.id) {
      fetchMeals(profile.id);
      fetchWeekMeals(profile.id);
    }
  }, [profile?.id, fetchMeals, fetchWeekMeals]);

  const getMealForType = (type: MealType) => todayMeals.find((m) => m.meal_type === type);
  const editingMeal = editingType ? getMealForType(editingType) : null;

  const handleSave = async (data: { items: MealItem[]; fiber_first: boolean }) => {
    if (!profile || !editingType) return;
    if (editingMeal) {
      await updateMeal(editingMeal.id, data);
    } else {
      await addMeal(profile.id, { meal_type: editingType, ...data });
    }
    setEditingType(null);
    fetchWeekMeals(profile.id);
  };

  const handleDelete = async () => {
    if (!editingMeal || !profile) return;
    await deleteMeal(editingMeal.id);
    setEditingType(null);
    fetchWeekMeals(profile.id);
  };

  if (editingType) {
    return (
      <MealEditor
        mealType={editingType}
        initial={editingMeal ?? undefined}
        onSave={handleSave}
        onDelete={editingMeal ? handleDelete : undefined}
        onBack={() => setEditingType(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-title text-deep-plum">Nutrition</h1>
        {cycleInfo && <PhaseIndicator phase={cycleInfo.phase} />}
      </div>

      <GISearchBar />

      <div className="flex flex-col gap-3">
        {mealTypes.map((type) => (
          <MealCard
            key={type}
            mealType={type}
            meal={getMealForType(type)}
            onAdd={() => setEditingType(type)}
            onEdit={() => setEditingType(type)}
          />
        ))}
      </div>

      {cycleInfo && (
        <button
          onClick={() => setShowSOS(true)}
          className="flex items-center justify-center gap-2 rounded-2xl bg-rose-soft/15 px-4 py-3 text-body font-medium text-deep-plum transition-all hover:bg-rose-soft/25 min-h-[48px]"
        >
          <AlertCircle size={20} className="text-rose-soft" />
          SOS Fringale
        </button>
      )}

      <Card>
        <WeeklyBalanceChart weekMeals={weekMeals} />
      </Card>

      {showSOS && cycleInfo && (
        <SOSCravingFlow phase={cycleInfo.phase} onClose={() => setShowSOS(false)} />
      )}
    </div>
  );
}
