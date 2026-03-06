import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useExerciseStore } from '@/stores/exerciseStore';
import { useCycle } from '@/hooks/useCycle';
import { PhaseIndicator } from '@/components/ui/PhaseIndicator';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PhaseRecommendation } from '@/components/movement/PhaseRecommendation';
import { ActivityLogger } from '@/components/movement/ActivityLogger';
import { WeekGrid } from '@/components/movement/WeekGrid';
import { ExerciseHistoryCard } from '@/components/movement/ExerciseHistoryCard';
import { PostEffortPrompt } from '@/components/movement/PostEffortPrompt';
import type { Exercise, PostEffortFeeling } from '@/types';
import { Plus } from 'lucide-react';

export function Movement() {
  const { profile } = useAuthStore();
  const { weekExercises, recentExercises, loading, fetchWeek, addExercise, updatePostEffort, getPendingFeedback } = useExerciseStore();
  const { cycleInfo } = useCycle();
  const [logging, setLogging] = useState(false);
  const [feedbackExercise, setFeedbackExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    if (profile?.id) {
      fetchWeek(profile.id);
    }
  }, [profile?.id, fetchWeek]);

  useEffect(() => {
    const pending = getPendingFeedback();
    if (pending.length > 0 && !feedbackExercise) {
      setFeedbackExercise(pending[0]);
    }
  }, [weekExercises, getPendingFeedback, feedbackExercise]);

  const handleSaveActivity = async (type: string, duration: number) => {
    if (!profile) return;
    await addExercise(profile.id, {
      type,
      duration_minutes: duration,
      cycle_phase_at_time: cycleInfo?.phase ?? null,
    });
    setLogging(false);
  };

  const handlePostEffort = async (feeling: PostEffortFeeling) => {
    if (!feedbackExercise) return;
    await updatePostEffort(feedbackExercise.id, feeling);
    setTimeout(() => setFeedbackExercise(null), 2000);
  };

  if (logging) {
    return <ActivityLogger onSave={handleSaveActivity} onBack={() => setLogging(false)} />;
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4 p-4 pb-24">
        <h1 className="font-serif text-title text-deep-plum">Sport</h1>
        <div className="animate-pulse space-y-3">
          <div className="h-48 rounded-3xl bg-cream-dark" />
          <div className="h-16 rounded-3xl bg-cream-dark" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-title text-deep-plum">Sport</h1>
        {cycleInfo && <PhaseIndicator phase={cycleInfo.phase} />}
      </div>

      {cycleInfo && <PhaseRecommendation phase={cycleInfo.phase} />}

      <Button onClick={() => setLogging(true)} className="self-center">
        <Plus size={18} className="mr-2" />
        Noter une activite
      </Button>

      <Card>
        <p className="text-caption font-medium text-deep-plum mb-3">Cette semaine</p>
        <WeekGrid exercises={weekExercises} />
      </Card>

      {recentExercises.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-caption font-medium text-deep-plum">Historique recent</p>
          {recentExercises.slice(0, 5).map((exercise) => (
            <ExerciseHistoryCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      )}

      {feedbackExercise && (
        <PostEffortPrompt
          exercise={feedbackExercise}
          onSubmit={handlePostEffort}
          onDismiss={() => setFeedbackExercise(null)}
          phase={cycleInfo?.phase}
        />
      )}
    </div>
  );
}
