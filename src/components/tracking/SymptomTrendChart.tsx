import { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useAuthStore } from '@/stores/authStore';
import { useSymptomStore } from '@/stores/symptomStore';
import { format, subDays } from 'date-fns';

type MetricTab = 'skin' | 'pain' | 'sleep';

export function SymptomTrendChart() {
  const profile = useAuthStore((s) => s.profile);
  const { monthSymptoms, fetchMonth } = useSymptomStore();
  const [metric, setMetric] = useState<MetricTab>('skin');

  useEffect(() => {
    if (profile?.id) fetchMonth(profile.id, new Date());
  }, [profile?.id, fetchMonth]);

  const tabs: { key: MetricTab; label: string }[] = [
    { key: 'skin', label: 'Peau' },
    { key: 'pain', label: 'Douleurs' },
    { key: 'sleep', label: 'Sommeil' },
  ];

  const data = useMemo(() => {
    const last30 = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), 29 - i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const symptom = monthSymptoms.find((s) => s.date === dateStr);

      let value: number | null = null;
      if (symptom) {
        if (metric === 'skin') value = symptom.skin_quality;
        else if (metric === 'pain') value = symptom.pelvic_pain_intensity;
        else value = symptom.night_wakings;
      }

      return {
        date: format(date, 'd/MM'),
        value,
      };
    });
    return last30;
  }, [monthSymptoms, metric]);

  const hasEnoughData = monthSymptoms.length >= 5;

  if (!hasEnoughData) {
    return (
      <div className="text-center py-6">
        <p className="text-caption text-warm-gray">
          Continue a noter tes symptomes pour voir les tendances. Il faut au moins 5 jours de donnees.
        </p>
      </div>
    );
  }

  const lineColor = metric === 'skin' ? '#A8C5A0' : metric === 'pain' ? '#E88D9E' : '#C3B1E1';

  return (
    <div>
      <div className="flex gap-2 mb-3">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setMetric(key)}
            className={`rounded-full px-3 py-1 text-tiny font-medium transition-all min-h-[32px] ${
              metric === key
                ? 'bg-rose-soft/20 text-deep-plum'
                : 'bg-cream-dark text-warm-gray'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#6B5B73' }}
            interval={6}
          />
          <YAxis hide domain={[0, metric === 'pain' ? 10 : 5]} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 2px 12px rgba(74,44,94,0.1)',
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={2}
            dot={{ fill: lineColor, r: 3 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
