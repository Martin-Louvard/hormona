import type { PathwayCard as PathwayCardType } from '@/data/diagnosis-pathway';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PathwayCardProps {
  card: PathwayCardType;
  currentIndex: number;
  total: number;
  onNext: () => void;
  onBack: () => void;
}

export function PathwayCard({ card, currentIndex, total, onNext, onBack }: PathwayCardProps) {
  const isLast = currentIndex === total - 1;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="min-w-[44px] min-h-[44px] flex items-center justify-center">
          <ArrowLeft size={22} className="text-deep-plum" />
        </button>
        <div className="flex-1">
          <p className="text-tiny text-warm-gray">{currentIndex + 1} / {total}</p>
          <div className="h-1 rounded-full bg-cream-dark overflow-hidden mt-1">
            <div
              className="h-full rounded-full bg-rose-soft transition-all"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="text-center py-4">
        <span className="text-4xl">{card.emoji}</span>
        <h2 className="font-serif text-title text-deep-plum mt-3">{card.title}</h2>
      </div>

      <div className="flex flex-col gap-4">
        {card.content.map((paragraph, i) => (
          <p key={i} className="text-body text-warm-gray leading-relaxed">{paragraph}</p>
        ))}
      </div>

      <Button onClick={onNext} className="mt-4">
        {isLast ? 'Terminer' : 'Suivant'}
        {!isLast && <ArrowRight size={18} className="ml-2" />}
      </Button>
    </div>
  );
}
