import { useState, useEffect, useCallback } from 'react';
import { offlineQueue } from '@/lib/offline-queue';
import { supabase } from '@/lib/supabase';

export function useOffline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncAt, setLastSyncAt] = useState<Date | null>(null);
  const [justSynced, setJustSynced] = useState(false);

  const refreshPending = useCallback(async () => {
    await offlineQueue.init();
    setPendingActions(offlineQueue.pendingCount);
  }, []);

  const flush = useCallback(async () => {
    if (isSyncing || !navigator.onLine) return;
    setIsSyncing(true);
    try {
      const result = await offlineQueue.flush(supabase);
      if (result.success > 0) {
        setLastSyncAt(new Date());
        setJustSynced(true);
        setTimeout(() => setJustSynced(false), 3000);
      }
    } finally {
      setIsSyncing(false);
      await refreshPending();
    }
  }, [isSyncing, refreshPending]);

  useEffect(() => {
    refreshPending();

    const handleOnline = () => {
      setIsOnline(true);
      flush();
    };
    const handleOffline = () => {
      setIsOnline(false);
      setJustSynced(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [flush, refreshPending]);

  return { isOnline, pendingActions, isSyncing, lastSyncAt, justSynced, flush, refreshPending };
}
