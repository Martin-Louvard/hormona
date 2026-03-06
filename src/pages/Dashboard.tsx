import { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { CycleRing } from '@/components/dashboard/CycleRing';
import { MoodSelector } from '@/components/dashboard/MoodSelector';
import { Greeting } from '@/components/dashboard/Greeting';
import { ContextualTip } from '@/components/dashboard/ContextualTip';
import { SupplementChecklist } from '@/components/dashboard/SupplementChecklist';
import { DailyInsight } from '@/components/dashboard/DailyInsight';
import { RiseAnimation } from '@/components/ui/RiseAnimation';
import { useAuthStore } from '@/stores/authStore';
import { useCycleStore } from '@/stores/cycleStore';
import { useCycle } from '@/hooks/useCycle';
import type { MoodType } from '@/types';

export function Dashboard() {
  const { profile } = useAuthStore();
  const { todayMood, fetchTodayMood, saveMood } = useCycleStore();
  const { cycleInfo, isLoading } = useCycle();

  useEffect(() => {
    if (profile?.id) {
      fetchTodayMood(profile.id);
    }
  }, [profile?.id, fetchTodayMood]);

  const handleMoodSelect = async (mood: MoodType) => {
    if (!profile) return;
    await saveMood(profile.id, mood, 3);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4 pb-24">
        <div className="h-8 w-48 rounded-xl bg-cream-dark animate-pulse" />
        <div className="h-52 rounded-3xl bg-cream-dark animate-pulse" />
        <div className="h-20 rounded-3xl bg-cream-dark animate-pulse" />
      </div>
    );
  }

  return (
    <RiseAnimation className="flex flex-col gap-4 pb-4">
      <Greeting
        displayName={profile?.display_name}
        phase={cycleInfo?.phase}
      />

      {cycleInfo ? (
        <Card className="flex flex-col items-center gap-4 py-6">
          <CycleRing cycleInfo={cycleInfo} />
          <ContextualTip phase={cycleInfo.phase} phaseDay={cycleInfo.phaseDay} />
        </Card>
      ) : (
        <Card className="text-center text-body text-text-secondary">
          <p>Configure la date de tes dernieres regles dans ton profil pour voir ton cycle.</p>
        </Card>
      )}

      <Card>
        <MoodSelector
          selected={todayMood?.mood ?? null}
          onSelect={handleMoodSelect}
        />
      </Card>

      <Card>
        <SupplementChecklist />
      </Card>

      <DailyInsight />
    </RiseAnimation>
  );
}
