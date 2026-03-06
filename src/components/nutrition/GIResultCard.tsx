import type { GIEntry } from '@/lib/gi-database';
import { getGIColor, getGIEmoji } from '@/lib/gi-database';
import { Card } from '@/components/ui/Card';
import { X } from 'lucide-react';

interface GIResultCardProps {
  entry: GIEntry;
  onClose: () => void;
}

const levelLabels = {
  low: 'IG Bas',
  medium: 'IG Moyen',
  high: 'IG Eleve',
};

export function GIResultCard({ entry, onClose }: GIResultCardProps) {
  const color = getGIColor(entry.level);

  return (
    <Card variant="highlight" phaseColor={color}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{getGIEmoji(entry.level)}</span>
            <span className="text-body font-medium text-deep-plum">{entry.name}</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-tiny font-bold text-white"
              style={{ backgroundColor: color }}
            >
              IG {entry.gi} — {levelLabels[entry.level]}
            </span>
            <span className="text-tiny text-warm-gray">{entry.category}</span>
          </div>
          {entry.tip && (
            <p className="text-caption text-warm-gray">{entry.tip}</p>
          )}
          {entry.alternatives.length > 0 && (
            <div className="mt-2">
              <p className="text-tiny font-medium text-warm-gray/60">Alternatives :</p>
              <p className="text-caption text-sage-dark">{entry.alternatives.join(', ')}</p>
            </div>
          )}
        </div>
        <button onClick={onClose} className="min-w-[44px] min-h-[44px] flex items-center justify-center">
          <X size={18} className="text-warm-gray" />
        </button>
      </div>
    </Card>
  );
}
