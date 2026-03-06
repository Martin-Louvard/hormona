import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { Meal } from '@/types';
import { format, startOfWeek, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

interface WeeklyBalanceChartProps {
  weekMeals: Meal[];
}

const categoryColors: Record<string, string> = {
  protein: '#E88D9E',
  carb: '#FFD166',
  fat: '#C3B1E1',
  fiber: '#A8C5A0',
};

export function WeeklyBalanceChart({ weekMeals }: WeeklyBalanceChartProps) {
  const data = useMemo(() => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(weekStart, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayMeals = weekMeals.filter((m) => m.date === dateStr);

      const counts = { protein: 0, carb: 0, fat: 0, fiber: 0 };
      dayMeals.forEach((meal) => {
        meal.items.forEach((item) => {
          if (item.category in counts) {
            counts[item.category as keyof typeof counts]++;
          }
        });
      });

      return {
        day: format(date, 'EEE', { locale: fr }).charAt(0).toUpperCase() + format(date, 'EEE', { locale: fr }).slice(1, 3),
        ...counts,
      };
    });
  }, [weekMeals]);

  const hasData = weekMeals.length > 0;

  if (!hasData) {
    return (
      <div className="text-center py-6">
        <p className="text-caption text-warm-gray">
          Commence a noter tes repas pour voir ton equilibre de la semaine.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-caption font-medium text-deep-plum mb-3">Equilibre de la semaine</p>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} barCategoryGap="20%">
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#6B5B73' }}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 2px 12px rgba(74,44,94,0.1)',
              fontSize: 12,
            }}
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = { protein: 'Prot', carb: 'Gluc', fat: 'Lip', fiber: 'Fib' };
              return [value, labels[name] ?? name];
            }}
          />
          <Bar dataKey="fiber" stackId="a" fill={categoryColors.fiber} radius={[0, 0, 0, 0]} />
          <Bar dataKey="protein" stackId="a" fill={categoryColors.protein} radius={[0, 0, 0, 0]} />
          <Bar dataKey="carb" stackId="a" fill={categoryColors.carb} radius={[0, 0, 0, 0]} />
          <Bar dataKey="fat" stackId="a" fill={categoryColors.fat} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 flex justify-center gap-4">
        {Object.entries(categoryColors).map(([key, color]) => {
          const labels: Record<string, string> = { protein: 'Prot', carb: 'Gluc', fat: 'Lip', fiber: 'Fib' };
          return (
            <div key={key} className="flex items-center gap-1">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-tiny text-warm-gray">{labels[key]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
