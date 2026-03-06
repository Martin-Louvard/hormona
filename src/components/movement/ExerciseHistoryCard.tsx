import type { Exercise } from '@/types';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ExerciseHistoryCardProps {
  exercise: Exercise;
}

const activityEmojis: Record<string, string> = {
  Yoga: '\uD83E\uDDD8',
  Muscu: '\uD83D\uDCAA',
  Cardio: '\uD83C\uDFC3',
  HIIT: '\uD83D\uDD25',
  Marche: '\uD83D\uDEB6',
  Natation: '\uD83C\uDFCA',
  Danse: '\uD83E\uDD38',
};

export function ExerciseHistoryCard({ exercise }: ExerciseHistoryCardProps) {
  const emoji = activityEmojis[exercise.type] ?? '\uD83C\uDFCB\uFE0F';
  const dateStr = format(parseISO(exercise.date), 'd MMM', { locale: fr });

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_1px_4px_rgba(74,44,94,0.04)]">
      <span className="text-xl">{emoji}</span>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-caption font-medium text-deep-plum">{exercise.type}</span>
          <span className="text-tiny text-warm-gray">{dateStr}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-tiny text-warm-gray">{exercise.duration_minutes} min</span>
          {exercise.post_effort_feeling && (
            <span className="text-tiny">
              {exercise.post_effort_feeling === 'boosted' ? '\u2728 Boostee' : '\uD83D\uDE2E\u200D\uD83D\uDCA8 Epuisee'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
