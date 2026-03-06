import type { Exercise } from '@/types';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';

interface WeekGridProps {
  exercises: Exercise[];
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

export function WeekGrid({ exercises }: WeekGridProps) {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayExercises = exercises.filter((e) => e.date === dateStr);
    const isToday = isSameDay(date, today);
    const dayLabel = format(date, 'EEEEE', { locale: fr }).toUpperCase();

    return { date, dateStr, dayExercises, isToday, dayLabel };
  });

  return (
    <div className="flex justify-between gap-1">
      {days.map(({ dateStr, dayExercises, isToday, dayLabel }) => (
        <div key={dateStr} className="flex flex-col items-center gap-1.5">
          <span className={`text-tiny font-medium ${isToday ? 'text-deep-plum' : 'text-warm-gray/60'}`}>
            {dayLabel}
          </span>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
              isToday ? 'ring-2 ring-rose-soft' : ''
            } ${dayExercises.length > 0 ? 'bg-sage/20' : 'bg-cream-dark'}`}
          >
            {dayExercises.length > 0 ? (
              <span className="text-sm">
                {activityEmojis[dayExercises[0].type] ?? '\u2705'}
              </span>
            ) : (
              <div className="h-2 w-2 rounded-full bg-warm-gray/20" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
