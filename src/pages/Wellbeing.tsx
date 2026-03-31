import { useState } from 'react';
import { Nutrition } from './Nutrition';
import { Movement } from './Movement';

type WellbeingTab = 'nutrition' | 'sport';

export function Wellbeing() {
  const [tab, setTab] = useState<WellbeingTab>('nutrition');

  const tabs: { key: WellbeingTab; label: string }[] = [
    { key: 'nutrition', label: 'Nutrition' },
    { key: 'sport', label: 'Sport' },
  ];

  return (
    <div className="flex flex-col gap-4 pb-24">
      <h1 className="font-serif text-title text-deep-plum">Bien-etre</h1>

      <div className="flex border-b border-warm-gray/10">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 py-3 text-caption font-medium transition-all min-h-[44px] ${
              tab === key
                ? 'text-deep-plum border-b-2 border-rose-soft'
                : 'text-warm-gray'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'nutrition' && <NutritionContent />}
      {tab === 'sport' && <MovementContent />}
    </div>
  );
}

// Wrap pages to strip their outer container and h1
// since Wellbeing provides its own layout
function NutritionContent() {
  return <Nutrition embedded />;
}

function MovementContent() {
  return <Movement embedded />;
}
