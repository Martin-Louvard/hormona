import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { format, subMonths } from 'date-fns';

export interface ReportSections {
  cycles: boolean;
  symptoms: boolean;
  moods: boolean;
  supplements: boolean;
  exercises: boolean;
  journal: boolean;
}

interface ReportConfigProps {
  onGenerate: (from: string, to: string, sections: ReportSections) => void;
  loading: boolean;
}

export function ReportConfig({ onGenerate, loading }: ReportConfigProps) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const threeMonthsAgo = format(subMonths(new Date(), 3), 'yyyy-MM-dd');

  const [from, setFrom] = useState(threeMonthsAgo);
  const [to, setTo] = useState(today);
  const [sections, setSections] = useState<ReportSections>({
    cycles: true,
    symptoms: true,
    moods: true,
    supplements: true,
    exercises: false,
    journal: false,
  });

  const toggleSection = (key: keyof ReportSections) => {
    setSections((s) => ({ ...s, [key]: !s[key] }));
  };

  const sectionItems: { key: keyof ReportSections; label: string; hint?: string }[] = [
    { key: 'cycles', label: 'Cycles menstruels' },
    { key: 'symptoms', label: 'Symptomes' },
    { key: 'moods', label: 'Humeur et energie' },
    { key: 'supplements', label: 'Complements' },
    { key: 'exercises', label: 'Activite physique' },
    { key: 'journal', label: 'Journal', hint: 'Seul le nombre d\'entrees sera inclus (contenu prive)' },
  ];

  return (
    <Card className="flex flex-col gap-4">
      <p className="text-caption font-medium text-deep-plum">Periode du rapport</p>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="mb-1 block text-tiny text-warm-gray">Du</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            max={to}
            className="w-full rounded-xl border border-warm-gray/20 bg-cream px-3 py-2 text-caption text-deep-plum outline-none focus:border-rose-soft"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-tiny text-warm-gray">Au</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            min={from}
            max={today}
            className="w-full rounded-xl border border-warm-gray/20 bg-cream px-3 py-2 text-caption text-deep-plum outline-none focus:border-rose-soft"
          />
        </div>
      </div>

      <p className="text-caption font-medium text-deep-plum">Sections a inclure</p>
      <div className="flex flex-col gap-2">
        {sectionItems.map((item) => (
          <label key={item.key} className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={sections[item.key]}
              onChange={() => toggleSection(item.key)}
              className="mt-0.5 h-5 w-5 rounded accent-rose-soft"
            />
            <div>
              <span className="text-caption text-deep-plum">{item.label}</span>
              {item.hint && (
                <p className="text-tiny text-warm-gray/70">{item.hint}</p>
              )}
            </div>
          </label>
        ))}
      </div>

      <button
        onClick={() => onGenerate(from, to, sections)}
        disabled={loading || !Object.values(sections).some(Boolean)}
        className="mt-2 flex h-12 items-center justify-center rounded-2xl bg-rose-soft font-medium text-white transition-all hover:bg-rose-soft/80 active:scale-[0.97] disabled:opacity-50"
      >
        {loading ? 'Preparation...' : 'Generer le rapport'}
      </button>
    </Card>
  );
}
