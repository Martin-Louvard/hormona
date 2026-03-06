import { create } from 'zustand';
import type { JournalEntry } from '@/types';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

interface JournalState {
  todayEntry: JournalEntry | null;
  entries: JournalEntry[];
  loading: boolean;
  fetchToday: (userId: string) => Promise<void>;
  fetchEntries: (userId: string, limit?: number) => Promise<void>;
  saveEntry: (userId: string, content: string) => Promise<void>;
}

export const useJournalStore = create<JournalState>((set) => ({
  todayEntry: null,
  entries: [],
  loading: false,

  fetchToday: async (userId) => {
    set({ loading: true });
    const today = format(new Date(), 'yyyy-MM-dd');

    const { data } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    set({ todayEntry: data, loading: false });
  },

  fetchEntries: async (userId, limit = 20) => {
    const { data } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(limit);

    set({ entries: data ?? [] });
  },

  saveEntry: async (userId, content) => {
    const today = format(new Date(), 'yyyy-MM-dd');

    const { data, error } = await supabase
      .from('journal_entries')
      .upsert(
        { user_id: userId, date: today, content },
        { onConflict: 'user_id,date' }
      )
      .select()
      .single();

    if (error) throw error;
    set({ todayEntry: data });
  },
}));
