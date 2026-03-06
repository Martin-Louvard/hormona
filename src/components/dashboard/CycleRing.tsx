import type { CycleInfo } from '@/types';
import { phaseLabels, phaseColors } from '@/lib/cycle';
import { ProgressRing } from '@/components/ui/ProgressRing';

interface CycleRingProps {
  cycleInfo: CycleInfo;
}

export function CycleRing({ cycleInfo }: CycleRingProps) {
  const { phase, currentDay, totalDays, cycleProgress } = cycleInfo;
  const color = phaseColors[phase];

  return (
    <div className="flex flex-col items-center gap-2">
      <ProgressRing
        progress={cycleProgress}
        size={144}
        strokeWidth={8}
        color={color}
      >
        <div className="flex flex-col items-center">
          <span className="font-mono text-data font-bold text-deep-plum">J{currentDay}</span>
          <span className="text-tiny text-warm-gray">/ {totalDays}</span>
        </div>
      </ProgressRing>
      <div
        className="rounded-full px-3 py-1 text-tiny font-medium text-white"
        style={{ backgroundColor: color }}
      >
        Phase {phaseLabels[phase]}
      </div>
    </div>
  );
}
