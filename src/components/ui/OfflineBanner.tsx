import { WifiOff, RefreshCw, Check } from 'lucide-react';
import { useOffline } from '@/hooks/useOffline';

export function OfflineBanner() {
  const { isOnline, pendingActions, isSyncing, justSynced } = useOffline();

  if (isOnline && !justSynced && !isSyncing && pendingActions === 0) return null;

  if (justSynced) {
    return (
      <div className="flex items-center justify-center gap-2 bg-sage/90 px-4 py-2 text-white">
        <Check size={16} />
        <span className="text-tiny font-medium">Synchronise</span>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="flex items-center justify-center gap-2 bg-warm-gray/90 px-4 py-2 text-white">
        <WifiOff size={16} />
        <span className="text-tiny font-medium">
          Mode hors-ligne
          {pendingActions > 0 && ` · ${pendingActions} en attente`}
        </span>
      </div>
    );
  }

  if (isSyncing) {
    return (
      <div className="flex items-center justify-center gap-2 bg-lavender/90 px-4 py-2 text-white">
        <RefreshCw size={16} className="animate-spin" />
        <span className="text-tiny font-medium">Synchronisation...</span>
      </div>
    );
  }

  return null;
}
