import { useRef } from 'react';
import { supplementInteractions } from '@/data/supplement-interactions';
import { Card } from '@/components/ui/Card';
import { AlertTriangle } from 'lucide-react';

interface InteractionCardsProps {
  activeSupplementNames: string[];
}

export function InteractionCards({ activeSupplementNames }: InteractionCardsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const relevant = supplementInteractions.filter((interaction) =>
    interaction.supplements.some((s) =>
      activeSupplementNames.some((name) =>
        name.toLowerCase().includes(s.toLowerCase())
      )
    )
  );

  if (relevant.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <AlertTriangle size={16} className="text-coral-warning" />
        <span className="text-caption font-medium text-deep-plum">Interactions a connaitre</span>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {relevant.map((interaction) => (
          <Card
            key={interaction.id}
            className="min-w-[260px] max-w-[280px] snap-start flex-shrink-0"
          >
            <p className="text-caption font-medium text-deep-plum">{interaction.title}</p>
            <p className="mt-1 text-tiny text-warm-gray">{interaction.description}</p>
            <p className="mt-2 text-tiny font-medium text-sage-dark">{interaction.rule}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
