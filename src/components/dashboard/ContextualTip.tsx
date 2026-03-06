import type { CyclePhase } from '@/types';
import { getTipByPhaseDay } from '@/lib/tips';

interface ContextualTipProps {
  phase: CyclePhase;
  phaseDay: number;
}

export function ContextualTip({ phase, phaseDay }: ContextualTipProps) {
  const tip = getTipByPhaseDay(phase, phaseDay);

  return (
    <div className="mt-3 pt-3 border-t border-warm-gray/10">
      <p className="text-tiny font-medium text-warm-gray/60 mb-1">Conseil du jour</p>
      <p className="text-caption text-warm-gray">{tip}</p>
    </div>
  );
}
