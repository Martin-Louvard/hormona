import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useCycle } from '@/hooks/useCycle';
import { Card } from '@/components/ui/Card';
import { RiseAnimation } from '@/components/ui/RiseAnimation';
import { Greeting } from '@/components/dashboard/Greeting';
import { ContextualTip } from '@/components/dashboard/ContextualTip';
import { DailyInsight } from '@/components/dashboard/DailyInsight';
import { DiagnosisPathway } from '@/components/encyclopedia/DiagnosisPathway';
import { SymptomGrid } from '@/components/encyclopedia/SymptomGrid';
import { SymptomArticlePage } from '@/components/encyclopedia/SymptomArticlePage';
import { StudyFeed } from '@/components/encyclopedia/StudyFeed';
import { StudyArticlePage } from '@/components/encyclopedia/StudyArticlePage';
import { phaseLabels, phaseColors, phaseColorsSoft, getPhaseEmoji } from '@/lib/cycle';

type View =
  | { type: 'main' }
  | { type: 'symptom'; id: string }
  | { type: 'study'; id: string };

export function Dashboard() {
  const { profile } = useAuthStore();
  const { cycleInfo, isLoading } = useCycle();
  const [view, setView] = useState<View>({ type: 'main' });

  if (view.type === 'symptom') {
    return (
      <div className="flex flex-col gap-4 pb-24">
        <SymptomArticlePage articleId={view.id} onBack={() => setView({ type: 'main' })} />
      </div>
    );
  }

  if (view.type === 'study') {
    return (
      <div className="flex flex-col gap-4 pb-24">
        <StudyArticlePage articleId={view.id} onBack={() => setView({ type: 'main' })} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pb-24">
        <div className="h-8 w-48 rounded-xl bg-cream-dark animate-pulse" />
        <div className="h-12 rounded-2xl bg-cream-dark animate-pulse" />
        <div className="h-32 rounded-3xl bg-cream-dark animate-pulse" />
        <div className="h-48 rounded-3xl bg-cream-dark animate-pulse" />
      </div>
    );
  }

  return (
    <RiseAnimation className="flex flex-col gap-5 pb-4">
      <Greeting
        displayName={profile?.display_name}
        phase={cycleInfo?.phase}
      />

      {/* Phase progress bar */}
      {cycleInfo && (
        <div
          className="flex items-center gap-3 rounded-2xl px-4 py-3"
          style={{ backgroundColor: phaseColorsSoft[cycleInfo.phase] }}
        >
          <span className="text-lg">{getPhaseEmoji(cycleInfo.phase)}</span>
          <div className="flex-1">
            <div className="flex items-baseline justify-between mb-1">
              <span
                className="text-caption font-semibold"
                style={{ color: phaseColors[cycleInfo.phase] }}
              >
                Phase {phaseLabels[cycleInfo.phase]}
              </span>
              <span className="text-tiny text-warm-gray">
                J{cycleInfo.currentDay}/{cycleInfo.totalDays}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/60 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${cycleInfo.cycleProgress * 100}%`,
                  backgroundColor: phaseColors[cycleInfo.phase],
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Contextual tips */}
      {cycleInfo && (
        <Card>
          <ContextualTip phase={cycleInfo.phase} phaseDay={cycleInfo.phaseDay} />
        </Card>
      )}

      <DailyInsight />

      {/* Symptom library */}
      <section>
        <p className="text-caption font-medium text-deep-plum mb-3">Symptomatheque</p>
        <SymptomGrid onSelect={(id) => setView({ type: 'symptom', id })} />
      </section>

      {/* Study feed */}
      <section>
        <p className="text-caption font-medium text-deep-plum mb-3">Etudes vulgarisees</p>
        <StudyFeed onSelect={(id) => setView({ type: 'study', id })} />
      </section>

      {/* Diagnosis pathway */}
      <section>
        <DiagnosisPathway />
      </section>
    </RiseAnimation>
  );
}
