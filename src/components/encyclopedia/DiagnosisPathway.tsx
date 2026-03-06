import { useState } from 'react';
import { diagnosisPathway } from '@/data/diagnosis-pathway';
import { useEncyclopediaStore } from '@/stores/encyclopediaStore';
import { PathwayCard } from './PathwayCard';
import { Card } from '@/components/ui/Card';
import { ChevronRight } from 'lucide-react';

export function DiagnosisPathway() {
  const { readPathwayCards, markRead } = useEncyclopediaStore();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const progress = readPathwayCards.length / diagnosisPathway.length;

  if (activeIndex !== null) {
    const card = diagnosisPathway[activeIndex];
    return (
      <PathwayCard
        card={card}
        currentIndex={activeIndex}
        total={diagnosisPathway.length}
        onNext={() => {
          markRead(card.id);
          if (activeIndex < diagnosisPathway.length - 1) {
            setActiveIndex(activeIndex + 1);
          } else {
            setActiveIndex(null);
          }
        }}
        onBack={() => {
          if (activeIndex > 0) setActiveIndex(activeIndex - 1);
          else setActiveIndex(null);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-caption font-medium text-deep-plum">Comprendre le SOPK</p>
        <span className="text-tiny text-warm-gray">{readPathwayCards.length}/{diagnosisPathway.length}</span>
      </div>

      <div className="h-1.5 rounded-full bg-cream-dark overflow-hidden">
        <div
          className="h-full rounded-full bg-rose-soft transition-all duration-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {diagnosisPathway.map((card, i) => {
        const isRead = readPathwayCards.includes(card.id);
        return (
          <button
            key={card.id}
            onClick={() => setActiveIndex(i)}
            className="w-full text-left"
          >
            <Card variant="interactive" className="flex items-center gap-3">
              <span className="text-xl">{card.emoji}</span>
              <div className="flex-1">
                <p className={`text-caption font-medium ${isRead ? 'text-warm-gray' : 'text-deep-plum'}`}>
                  {card.title}
                </p>
                {isRead && <span className="text-tiny text-sage-dark">Lu</span>}
              </div>
              <ChevronRight size={18} className="text-warm-gray-light" />
            </Card>
          </button>
        );
      })}
    </div>
  );
}
