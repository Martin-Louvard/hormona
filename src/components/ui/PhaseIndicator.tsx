import type { CyclePhase } from '@/types';
import { phaseLabels, getPhaseEmoji, getPhaseColor, phaseColorsSoft } from '@/lib/cycle';

interface PhaseIndicatorProps {
  phase: CyclePhase;
  className?: string;
}

export function PhaseIndicator({ phase, className = '' }: PhaseIndicatorProps) {
  const color = getPhaseColor(phase);
  const softColor = phaseColorsSoft[phase];

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ${className}`}
      style={{ backgroundColor: softColor }}
    >
      <span>{getPhaseEmoji(phase)}</span>
      <span className="text-caption font-medium" style={{ color }}>
        {phaseLabels[phase]}
      </span>
    </div>
  );
}
