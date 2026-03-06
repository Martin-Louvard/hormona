import type { CyclePhase } from '@/types';
import { phaseLabels, getPhaseEmoji, getPhaseColor } from '@/lib/cycle';

interface PhaseIndicatorProps {
  phase: CyclePhase;
  className?: string;
}

const phaseBackgrounds: Record<CyclePhase, string> = {
  menstrual: 'bg-phase-menstrual/20',
  follicular: 'bg-phase-follicular/20',
  ovulatory: 'bg-phase-ovulatory/20',
  luteal: 'bg-phase-luteal/20',
};

export function PhaseIndicator({ phase, className = '' }: PhaseIndicatorProps) {
  const color = getPhaseColor(phase);

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ${phaseBackgrounds[phase]} ${className}`}
    >
      <span>{getPhaseEmoji(phase)}</span>
      <span className="text-caption font-medium" style={{ color }}>
        {phaseLabels[phase]}
      </span>
    </div>
  );
}
