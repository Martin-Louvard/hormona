import { create } from 'zustand';
import type { Exercise, PostEffortFeeling, CyclePhase } from '@/types';
import { supabase } from '@/lib/supabase';
import { offlineQueue } from '@/lib/offline-queue';
import { format, startOfWeek, endOfWeek } from 'date-fns';

interface ExerciseState {
  weekExercises: Exercise[];
  recentExercises: Exercise[];
  loading: boolean;
  fetchWeek: (userId: string) => Promise<void>;
  addExercise: (userId: string, data: { type: string; duration_minutes: number; cycle_phase_at_time: CyclePhase | null }) => Promise<void>;
  updatePostEffort: (id: string, feeling: PostEffortFeeling) => Promise<void>;
  getPendingFeedback: () => Exercise[];
}

export const useExerciseStore = create<ExerciseState>((set, get) => ({
  weekExercises: [],
  recentExercises: [],
  loading: false,

  fetchWeek: async (userId) => {
    set({ loading: true });
    const now = new Date();
    const weekStart = format(startOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd');
    const weekEnd = format(endOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd');

    const [{ data: weekData }, { data: recentData }] = await Promise.all([
      supabase
        .from('exercises')
        .select('*')
        .eq('user_id', userId)
        .gte('date', weekStart)
        .lte('date', weekEnd)
        .order('created_at', { ascending: false }),
      supabase
        .from('exercises')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10),
    ]);

    set({
      weekExercises: weekData ?? [],
      recentExercises: recentData ?? [],
      loading: false,
    });
  },

  addExercise: async (userId, data) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    try {
      const { data: exercise, error } = await supabase
        .from('exercises')
        .insert({ user_id: userId, date: today, ...data })
        .select()
        .single();

      if (error) throw error;
      set((s) => ({
        weekExercises: [exercise, ...s.weekExercises],
        recentExercises: [exercise, ...s.recentExercises.slice(0, 9)],
      }));
    } catch (e) {
      if (!navigator.onLine) {
        await offlineQueue.enqueue('exercises', 'insert', { user_id: userId, date: today, ...data });
      } else {
        throw e;
      }
    }
  },

  updatePostEffort: async (id, feeling) => {
    const { error } = await supabase
      .from('exercises')
      .update({ post_effort_feeling: feeling })
      .eq('id', id);

    if (error) throw error;
    const update = (list: Exercise[]) =>
      list.map((e) => (e.id === id ? { ...e, post_effort_feeling: feeling } : e));
    set((s) => ({
      weekExercises: update(s.weekExercises),
      recentExercises: update(s.recentExercises),
    }));
  },

  getPendingFeedback: () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return get().weekExercises.filter(
      (e) => e.date === today && !e.post_effort_feeling
    );
  },
}));
