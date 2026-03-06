import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { getCycleInfo } from '@/lib/cycle';
import type { CycleInfo } from '@/types';
import { parseISO } from 'date-fns';

export function useCycle() {
  const profile = useAuthStore((s) => s.profile);
  const [cycleInfo, setCycleInfo] = useState<CycleInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    if (!profile?.last_period_start) {
      setCycleInfo(null);
      setIsLoading(false);
      return;
    }

    const info = getCycleInfo({
      lastPeriodStart: parseISO(profile.last_period_start),
      cycleLengthAvg: profile.cycle_length_avg,
    });
    setCycleInfo(info);
    setIsLoading(false);
  }, [profile?.last_period_start, profile?.cycle_length_avg]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const interval = setInterval(refresh, 60_000);
    return () => clearInterval(interval);
  }, [refresh]);

  useEffect(() => {
    const handleFocus = () => refresh();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refresh]);

  return { cycleInfo, isLoading, refresh };
}
