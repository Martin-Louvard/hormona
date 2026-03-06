import { create } from 'zustand';
import type { Supplement, SupplementLog, SupplementPeriod } from '@/types';
import { supabase } from '@/lib/supabase';
import { offlineQueue } from '@/lib/offline-queue';
import { format, subDays } from 'date-fns';

interface SupplementState {
  supplements: Supplement[];
  todayLogs: SupplementLog[];
  loading: boolean;
  fetchSupplements: (userId: string) => Promise<void>;
  addSupplement: (userId: string, data: Pick<Supplement, 'name' | 'dosage' | 'time_of_day' | 'stock_remaining_days'>) => Promise<void>;
  updateSupplement: (id: string, data: Partial<Supplement>) => Promise<void>;
  deleteSupplement: (id: string) => Promise<void>;
  toggleLog: (userId: string, supplementId: string, period: SupplementPeriod) => Promise<void>;
  getComplianceRate: (userId: string, days: number) => Promise<number>;
}

export const useSupplementStore = create<SupplementState>((set, get) => ({
  supplements: [],
  todayLogs: [],
  loading: false,

  fetchSupplements: async (userId) => {
    set({ loading: true });
    const today = format(new Date(), 'yyyy-MM-dd');

    const [{ data: supplements }, { data: logs }] = await Promise.all([
      supabase
        .from('supplements')
        .select('*')
        .eq('user_id', userId)
        .eq('active', true)
        .order('created_at'),
      supabase
        .from('supplement_logs')
        .select('*')
        .eq('user_id', userId)
        .gte('taken_at', `${today}T00:00:00`)
        .lte('taken_at', `${today}T23:59:59`),
    ]);

    set({
      supplements: supplements ?? [],
      todayLogs: logs ?? [],
      loading: false,
    });
  },

  addSupplement: async (userId, data) => {
    try {
      const { data: supplement, error } = await supabase
        .from('supplements')
        .insert({ ...data, user_id: userId, active: true })
        .select()
        .single();

      if (error) throw error;
      set((s) => ({ supplements: [...s.supplements, supplement] }));
    } catch (e) {
      if (!navigator.onLine) {
        await offlineQueue.enqueue('supplements', 'insert', { ...data, user_id: userId, active: true });
      } else {
        throw e;
      }
    }
  },

  updateSupplement: async (id, data) => {
    const { error } = await supabase
      .from('supplements')
      .update(data)
      .eq('id', id);

    if (error) throw error;
    set((s) => ({
      supplements: s.supplements.map((sup) =>
        sup.id === id ? { ...sup, ...data } : sup
      ),
    }));
  },

  deleteSupplement: async (id) => {
    const { error } = await supabase
      .from('supplements')
      .update({ active: false })
      .eq('id', id);

    if (error) throw error;
    set((s) => ({
      supplements: s.supplements.filter((sup) => sup.id !== id),
    }));
  },

  toggleLog: async (userId, supplementId, period) => {
    const { todayLogs, supplements } = get();
    const existing = todayLogs.find(
      (l) => l.supplement_id === supplementId && l.period === period
    );

    if (existing) {
      await supabase.from('supplement_logs').delete().eq('id', existing.id);
      set((s) => ({
        todayLogs: s.todayLogs.filter((l) => l.id !== existing.id),
      }));
    } else {
      const { data, error } = await supabase
        .from('supplement_logs')
        .insert({
          user_id: userId,
          supplement_id: supplementId,
          taken_at: new Date().toISOString(),
          period,
        })
        .select()
        .single();

      if (error) throw error;
      set((s) => ({ todayLogs: [...s.todayLogs, data] }));

      // Decrement stock
      const supplement = supplements.find((s) => s.id === supplementId);
      if (supplement && supplement.stock_remaining_days > 0) {
        const otherPeriodLogged = todayLogs.some(
          (l) => l.supplement_id === supplementId && l.period !== period
        );
        // Only decrement if this is the first log of the day for this supplement
        // or if it's a 'both' supplement and both periods are now logged
        if (supplement.time_of_day !== 'both' || otherPeriodLogged) {
          await get().updateSupplement(supplementId, {
            stock_remaining_days: supplement.stock_remaining_days - 1,
          });
        }
      }
    }
  },

  getComplianceRate: async (userId, days) => {
    const startDate = format(subDays(new Date(), days), 'yyyy-MM-dd');
    const { data: logs } = await supabase
      .from('supplement_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('taken_at', `${startDate}T00:00:00`);

    const { supplements } = get();
    if (!supplements.length || !logs?.length) return 0;

    const expectedPerDay = supplements.reduce((acc, s) => {
      return acc + (s.time_of_day === 'both' ? 2 : 1);
    }, 0);

    const totalExpected = expectedPerDay * days;
    if (totalExpected === 0) return 0;

    return Math.min(logs.length / totalExpected, 1);
  },
}));
