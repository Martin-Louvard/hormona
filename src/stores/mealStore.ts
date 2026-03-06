import { create } from 'zustand';
import type { Meal, MealType, MealItem } from '@/types';
import { supabase } from '@/lib/supabase';
import { offlineQueue } from '@/lib/offline-queue';
import { format, startOfWeek, endOfWeek } from 'date-fns';

interface MealState {
  todayMeals: Meal[];
  weekMeals: Meal[];
  loading: boolean;
  fetchMeals: (userId: string, date?: string) => Promise<void>;
  fetchWeekMeals: (userId: string) => Promise<void>;
  addMeal: (userId: string, data: { meal_type: MealType; items: MealItem[]; fiber_first: boolean; date?: string }) => Promise<void>;
  updateMeal: (id: string, data: Partial<Meal>) => Promise<void>;
  deleteMeal: (id: string) => Promise<void>;
}

export const useMealStore = create<MealState>((set) => ({
  todayMeals: [],
  weekMeals: [],
  loading: false,

  fetchMeals: async (userId, date) => {
    set({ loading: true });
    const targetDate = date ?? format(new Date(), 'yyyy-MM-dd');

    const { data } = await supabase
      .from('meals')
      .select('*')
      .eq('user_id', userId)
      .eq('date', targetDate)
      .order('created_at');

    set({ todayMeals: data ?? [], loading: false });
  },

  fetchWeekMeals: async (userId) => {
    const now = new Date();
    const weekStart = format(startOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd');
    const weekEnd = format(endOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd');

    const { data } = await supabase
      .from('meals')
      .select('*')
      .eq('user_id', userId)
      .gte('date', weekStart)
      .lte('date', weekEnd)
      .order('date');

    set({ weekMeals: data ?? [] });
  },

  addMeal: async (userId, { meal_type, items, fiber_first, date }) => {
    const targetDate = date ?? format(new Date(), 'yyyy-MM-dd');

    try {
      const { data, error } = await supabase
        .from('meals')
        .insert({ user_id: userId, date: targetDate, meal_type, items, fiber_first })
        .select()
        .single();

      if (error) throw error;
      set((s) => ({ todayMeals: [...s.todayMeals, data] }));
    } catch (e) {
      if (!navigator.onLine) {
        await offlineQueue.enqueue('meals', 'insert', { user_id: userId, date: targetDate, meal_type, items, fiber_first });
      } else {
        throw e;
      }
    }
  },

  updateMeal: async (id, updates) => {
    const { error } = await supabase
      .from('meals')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    set((s) => ({
      todayMeals: s.todayMeals.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    }));
  },

  deleteMeal: async (id) => {
    const { error } = await supabase.from('meals').delete().eq('id', id);
    if (error) throw error;
    set((s) => ({
      todayMeals: s.todayMeals.filter((m) => m.id !== id),
    }));
  },
}));
