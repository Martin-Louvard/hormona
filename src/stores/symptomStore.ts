import { create } from 'zustand';
import type { Symptom } from '@/types';
import { supabase } from '@/lib/supabase';
import { offlineQueue } from '@/lib/offline-queue';
import { format, startOfMonth, endOfMonth } from 'date-fns';

interface SymptomState {
  todaySymptoms: Symptom | null;
  monthSymptoms: Symptom[];
  loading: boolean;
  fetchToday: (userId: string) => Promise<void>;
  fetchMonth: (userId: string, date: Date) => Promise<void>;
  saveSymptoms: (userId: string, data: Partial<Symptom>) => Promise<void>;
}

export const useSymptomStore = create<SymptomState>((set) => ({
  todaySymptoms: null,
  monthSymptoms: [],
  loading: false,

  fetchToday: async (userId) => {
    set({ loading: true });
    const today = format(new Date(), 'yyyy-MM-dd');

    const { data } = await supabase
      .from('symptoms')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    set({ todaySymptoms: data, loading: false });
  },

  fetchMonth: async (userId, date) => {
    const monthStart = format(startOfMonth(date), 'yyyy-MM-dd');
    const monthEnd = format(endOfMonth(date), 'yyyy-MM-dd');

    const { data } = await supabase
      .from('symptoms')
      .select('*')
      .eq('user_id', userId)
      .gte('date', monthStart)
      .lte('date', monthEnd)
      .order('date');

    set({ monthSymptoms: data ?? [] });
  },

  saveSymptoms: async (userId, data) => {
    const today = format(new Date(), 'yyyy-MM-dd');

    try {
      const { data: result, error } = await supabase
        .from('symptoms')
        .upsert(
          { user_id: userId, date: today, ...data },
          { onConflict: 'user_id,date' }
        )
        .select()
        .single();

      if (error) throw error;
      set({ todaySymptoms: result });
    } catch (e) {
      if (!navigator.onLine) {
        await offlineQueue.enqueue('symptoms', 'upsert', { user_id: userId, date: today, ...data });
      } else {
        throw e;
      }
    }
  },
}));
