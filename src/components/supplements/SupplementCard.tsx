import type { Supplement, SupplementLog, SupplementPeriod } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Check } from 'lucide-react';

interface SupplementCardProps {
  supplement: Supplement;
  logs: SupplementLog[];
  onToggle: (period: SupplementPeriod) => void;
  onEdit: () => void;
}

const periodLabels: Record<string, string> = {
  morning: 'Matin',
  evening: 'Soir',
  both: 'Matin & Soir',
};

export function SupplementCard({ supplement, logs, onToggle, onEdit }: SupplementCardProps) {
  const periods: SupplementPeriod[] =
    supplement.time_of_day === 'both' ? ['morning', 'evening'] : [supplement.time_of_day as SupplementPeriod];

  const isLowStock = supplement.stock_remaining_days <= 5;

  return (
    <div
      className="rounded-3xl bg-white p-4 shadow-[0_2px_12px_rgba(74,44,94,0.06)] flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <button onClick={onEdit} className="flex-1 text-left min-h-[44px] flex flex-col justify-center">
          <p className="text-body font-medium text-deep-plum">{supplement.name}</p>
          {supplement.dosage && (
            <p className="text-tiny text-warm-gray">{supplement.dosage}</p>
          )}
        </button>
        <div className="flex items-center gap-2">
          {isLowStock && (
            <Badge colorScheme="warning">Stock : {supplement.stock_remaining_days}j</Badge>
          )}
          <Badge colorScheme="neutral">{periodLabels[supplement.time_of_day]}</Badge>
        </div>
      </div>

      <div className="flex gap-2">
        {periods.map((period) => {
          const taken = logs.some(
            (l) => l.supplement_id === supplement.id && l.period === period
          );
          return (
            <button
              key={period}
              onClick={() => onToggle(period)}
              className={`flex items-center gap-1.5 rounded-2xl px-4 py-2 text-caption font-medium transition-all min-h-[44px] ${
                taken
                  ? 'bg-sage/20 text-sage-dark'
                  : 'bg-cream-dark text-warm-gray hover:bg-cream-dark/80'
              }`}
            >
              {taken && <Check size={16} />}
              {period === 'morning' ? 'Matin' : 'Soir'}
              {taken ? ' pris' : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
}
