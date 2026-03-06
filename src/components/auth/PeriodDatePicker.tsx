import { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  isSameMonth,
  subMonths,
  getDay,
  isAfter,
  startOfDay,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PeriodDatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export function PeriodDatePicker({ value, onChange }: PeriodDatePickerProps) {
  const today = startOfDay(new Date());
  const [viewMonth, setViewMonth] = useState(today);
  const minMonth = subMonths(today, 1);

  const canGoPrev = !isSameMonth(viewMonth, minMonth);
  const canGoNext = !isSameMonth(viewMonth, today);

  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(viewMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDayOfWeek = (getDay(monthStart) + 6) % 7;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-body text-warm-gray text-center">
        Quand ont commence tes dernieres regles ?
      </p>

      <div className="rounded-3xl bg-white p-4 shadow-[0_2px_12px_rgba(74,44,94,0.06)]">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => setViewMonth(subMonths(viewMonth, 1))}
            disabled={!canGoPrev}
            className="p-2 rounded-full hover:bg-cream-dark disabled:opacity-30 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Mois precedent"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-heading font-medium text-deep-plum capitalize">
            {format(viewMonth, 'MMMM yyyy', { locale: fr })}
          </span>
          <button
            type="button"
            onClick={() => setViewMonth(subMonths(viewMonth, -1))}
            disabled={!canGoNext}
            className="p-2 rounded-full hover:bg-cream-dark disabled:opacity-30 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Mois suivant"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((d, i) => (
            <div key={i} className="text-tiny font-medium text-warm-gray-light py-1">
              {d}
            </div>
          ))}

          {Array.from({ length: startDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {days.map((day) => {
            const isFuture = isAfter(day, today);
            const isSelected = value && isSameDay(day, value);
            const isToday = isSameDay(day, today);

            return (
              <button
                key={day.toISOString()}
                type="button"
                disabled={isFuture}
                onClick={() => onChange(day)}
                className={`h-10 w-full rounded-full text-caption transition-all min-h-[44px] flex items-center justify-center ${
                  isSelected
                    ? 'bg-rose-soft text-white font-medium'
                    : isToday
                    ? 'bg-cream-dark text-deep-plum font-medium'
                    : isFuture
                    ? 'text-warm-gray/30'
                    : 'text-warm-gray hover:bg-cream-dark'
                }`}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
