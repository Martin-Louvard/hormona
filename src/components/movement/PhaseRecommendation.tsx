import type { CyclePhase } from '@/types';
import { phaseRecommendations } from '@/data/phase-recommendations';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface PhaseRecommendationProps {
  phase: CyclePhase;
}

const intensityConfig = {
  low: { label: 'Intensite basse', scheme: 'sage' as const },
  moderate: { label: 'Intensite moderee', scheme: 'lavender' as const },
  high: { label: 'Intensite haute', scheme: 'rose' as const },
};

export function PhaseRecommendation({ phase }: PhaseRecommendationProps) {
  const rec = phaseRecommendations[phase];
  const intensity = intensityConfig[rec.intensity];

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <p className="text-caption font-medium text-deep-plum">Recommande pour toi</p>
        <Badge colorScheme={intensity.scheme}>{intensity.label}</Badge>
      </div>
      <p className="text-caption text-warm-gray mb-4">{rec.explanation}</p>
      <div className="flex flex-col gap-2">
        {rec.activities.map((activity) => (
          <div key={activity.name} className="flex items-start gap-3 rounded-2xl bg-cream-dark p-3">
            <span className="text-xl">{activity.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-caption font-medium text-deep-plum">{activity.name}</p>
                <span className="text-tiny text-warm-gray">{activity.duration}</span>
              </div>
              <p className="text-tiny text-warm-gray">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
