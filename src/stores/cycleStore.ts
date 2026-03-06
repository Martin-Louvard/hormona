import { create } from 'zustand';
import type { MoodEntry, MoodType } from '@/types';
import { supabase } from '@/lib/supabase';
import { offlineQueue } from '@/lib/offline-queue';
import { format } from 'date-fns';

interface CycleState {
  todayMood: MoodEntry | null;
  loading: boolean;
  fetchTodayMood: (userId: string) => Promise<void>;
  saveMood: (userId: string, mood: MoodType, energyLevel: number) => Promise<void>;
}

export const useCycleStore = create<CycleState>((set) => ({
  todayMood: null,
  loading: false,

  fetchTodayMood: async (userId) => {
    set({ loading: true });
    const today = format(new Date(), 'yyyy-MM-dd');

    const { data } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    set({ todayMood: data, loading: false });
  },

  saveMood: async (userId, mood, energyLevel) => {
    const today = format(new Date(), 'yyyy-MM-dd');

    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .upsert(
          { user_id: userId, date: today, mood, energy_level: energyLevel },
          { onConflict: 'user_id,date' }
        )
        .select()
        .single();

      if (error) throw error;
      set({ todayMood: data });
    } catch (e) {
      if (!navigator.onLine) {
        await offlineQueue.enqueue('mood_entries', 'upsert', { user_id: userId, date: today, mood, energy_level: energyLevel });
      } else {
        throw e;
      }
    }
  },
}));
