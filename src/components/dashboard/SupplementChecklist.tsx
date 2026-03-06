import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useSupplementStore } from '@/stores/supplementStore';
import { Check, AlertTriangle, Pill } from 'lucide-react';
import type { SupplementPeriod } from '@/types';

function getCurrentPeriod(): SupplementPeriod {
  return new Date().getHours() < 14 ? 'morning' : 'evening';
}

export function SupplementChecklist() {
  const profile = useAuthStore((s) => s.profile);
  const { supplements, todayLogs, fetchSupplements, toggleLog } = useSupplementStore();
  const [justChecked, setJustChecked] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.id) {
      fetchSupplements(profile.id);
    }
  }, [profile?.id, fetchSupplements]);

  if (supplements.length === 0) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pill size={18} strokeWidth={1.75} className="text-text-muted" />
          <span className="text-caption text-text-secondary">Pas de complements configures</span>
        </div>
        <Link
          to="/supplements"
          className="text-caption font-medium text-accent-primary min-h-[44px] flex items-center"
        >
          Configurer
        </Link>
      </div>
    );
  }

  const period = getCurrentPeriod();
  const relevant = supplements.filter(
    (s) => s.time_of_day === period || s.time_of_day === 'both'
  );

  if (relevant.length === 0) return null;

  const handleToggle = async (supplementId: string) => {
    if (!profile) return;
    setJustChecked(supplementId);
    await toggleLog(profile.id, supplementId, period);
    setTimeout(() => setJustChecked(null), 500);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-tiny font-medium text-text-muted">
        Complements du {period === 'morning' ? 'matin' : 'soir'}
      </p>
      {relevant.map((supplement) => {
        const taken = todayLogs.some(
          (l) => l.supplement_id === supplement.id && l.period === period
        );
        const lowStock = supplement.stock_remaining_days <= 5;
        const isJustChecked = justChecked === supplement.id;

        return (
          <button
            key={supplement.id}
            onClick={() => handleToggle(supplement.id)}
            className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition-all min-h-[44px] ${
              taken ? 'bg-accent-success/10' : 'bg-bg-subtle hover:bg-bg-subtle/80'
            }`}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                taken
                  ? 'border-accent-success bg-accent-success text-white'
                  : 'border-text-muted/30'
              }`}
            >
              {taken && (
                <Check
                  size={14}
                  strokeWidth={1.75}
                  className={isJustChecked ? 'animate-check-bounce' : ''}
                />
              )}
            </div>
            <span
              className={`relative flex-1 text-caption transition-colors ${
                taken ? 'text-text-muted line-through' : 'text-text-primary'
              }`}
            >
              {supplement.name}
              {isJustChecked && taken && (
                <span className="ml-1 inline-block animate-sparkle text-xs">&#10024;</span>
              )}
            </span>
            {lowStock && !taken && (
              <AlertTriangle size={14} strokeWidth={1.75} className="text-accent-warning" />
            )}
          </button>
        );
      })}
    </div>
  );
}
