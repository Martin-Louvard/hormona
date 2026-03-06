import { useEffect } from 'react';
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

  useEffect(() => {
    if (profile?.id) {
      fetchSupplements(profile.id);
    }
  }, [profile?.id, fetchSupplements]);

  if (supplements.length === 0) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pill size={18} className="text-warm-gray-light" />
          <span className="text-caption text-warm-gray">Pas de complements configures</span>
        </div>
        <Link
          to="/supplements"
          className="text-caption font-medium text-rose-deep min-h-[44px] flex items-center"
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
    await toggleLog(profile.id, supplementId, period);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-tiny font-medium text-warm-gray/60">
        Complements du {period === 'morning' ? 'matin' : 'soir'}
      </p>
      {relevant.map((supplement) => {
        const taken = todayLogs.some(
          (l) => l.supplement_id === supplement.id && l.period === period
        );
        const lowStock = supplement.stock_remaining_days <= 5;

        return (
          <button
            key={supplement.id}
            onClick={() => handleToggle(supplement.id)}
            className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition-all min-h-[44px] ${
              taken ? 'bg-sage/10' : 'bg-cream-dark hover:bg-cream-dark/80'
            }`}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                taken
                  ? 'border-sage bg-sage text-white'
                  : 'border-warm-gray/30'
              }`}
            >
              {taken && <Check size={14} />}
            </div>
            <span
              className={`flex-1 text-caption ${
                taken ? 'text-warm-gray line-through' : 'text-deep-plum'
              }`}
            >
              {supplement.name}
            </span>
            {lowStock && !taken && (
              <AlertTriangle size={14} className="text-coral-warning" />
            )}
          </button>
        );
      })}
    </div>
  );
}
