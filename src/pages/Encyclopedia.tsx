import { useState } from 'react';
import { DiagnosisPathway } from '@/components/encyclopedia/DiagnosisPathway';
import { SymptomGrid } from '@/components/encyclopedia/SymptomGrid';
import { SymptomArticlePage } from '@/components/encyclopedia/SymptomArticlePage';
import { StudyFeed } from '@/components/encyclopedia/StudyFeed';
import { StudyArticlePage } from '@/components/encyclopedia/StudyArticlePage';

type View =
  | { type: 'main' }
  | { type: 'symptom'; id: string }
  | { type: 'study'; id: string };

export function Encyclopedia() {
  const [view, setView] = useState<View>({ type: 'main' });

  if (view.type === 'symptom') {
    return (
      <div className="flex flex-col gap-4 p-4 pb-24">
        <SymptomArticlePage articleId={view.id} onBack={() => setView({ type: 'main' })} />
      </div>
    );
  }

  if (view.type === 'study') {
    return (
      <div className="flex flex-col gap-4 p-4 pb-24">
        <StudyArticlePage articleId={view.id} onBack={() => setView({ type: 'main' })} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 pb-24">
      <h1 className="font-serif text-title text-deep-plum">Encyclopedie SOPK</h1>

      <section>
        <DiagnosisPathway />
      </section>

      <section>
        <p className="text-caption font-medium text-deep-plum mb-3">Symptomatheque</p>
        <SymptomGrid onSelect={(id) => setView({ type: 'symptom', id })} />
      </section>

      <section>
        <p className="text-caption font-medium text-deep-plum mb-3">Etudes vulgarisees</p>
        <StudyFeed onSelect={(id) => setView({ type: 'study', id })} />
      </section>
    </div>
  );
}
