import { Card } from '@/components/ui/Card';
import type { MedicalReport } from '@/lib/report-aggregator';
import type { ReportSections } from './ReportConfig';
import { phaseLabels } from '@/lib/cycle';
import type { CyclePhase, MoodType } from '@/types';

const MOOD_LABELS: Record<MoodType, string> = {
  sunny: 'Ensoleille',
  cloudy: 'Nuageux',
  rainy: 'Pluvieux',
  stormy: 'Orageux',
  foggy: 'Brumeux',
};

interface ReportPreviewProps {
  report: MedicalReport;
  sections: ReportSections;
  displayName: string;
}

export function ReportPreview({ report, sections, displayName }: ReportPreviewProps) {
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <h2 className="font-serif text-body font-semibold text-deep-plum">
          Resume de Suivi
        </h2>
        <p className="mt-1 text-tiny text-warm-gray">
          {displayName} — du {report.period.from} au {report.period.to} ({report.daysCovered} jours)
        </p>
      </Card>

      {sections.cycles && (
        <Card>
          <h3 className="text-caption font-medium text-deep-plum">Cycles menstruels</h3>
          <div className="mt-2 space-y-1 text-tiny text-warm-gray">
            <p>Debuts de regles : {report.cycles.totalCycles}</p>
            <p>Duree moyenne : {report.cycles.avgLength} jours ({report.cycles.minLength}-{report.cycles.maxLength})</p>
            <p>Regularite : {report.cycles.regularity === 'regular' ? 'Regulier' : report.cycles.regularity === 'irregular' ? 'Irregulier' : 'Donnees insuffisantes'}</p>
          </div>
        </Card>
      )}

      {sections.symptoms && (
        <Card>
          <h3 className="text-caption font-medium text-deep-plum">Symptomes</h3>
          <div className="mt-2 space-y-1 text-tiny text-warm-gray">
            {report.symptoms.skinAvg != null && (
              <p>Peau : {report.symptoms.skinAvg}/5
                {report.symptoms.skinTrend === 'improving' && ' (en amelioration)'}
                {report.symptoms.skinTrend === 'worsening' && ' (en degradation)'}
                {report.symptoms.skinTrend === 'stable' && ' (stable)'}
              </p>
            )}
            <p>Douleurs pelviennes : {report.symptoms.painFrequency}% des jours</p>
            {report.symptoms.painAvgIntensity != null && (
              <p>Intensite moyenne : {report.symptoms.painAvgIntensity}/10
                {report.symptoms.predominantPainType && ` — ${report.symptoms.predominantPainType}`}
              </p>
            )}
            {report.symptoms.sleepOnsetAvg != null && (
              <p>Endormissement : {report.symptoms.sleepOnsetAvg} min</p>
            )}
            {report.symptoms.nightWakingsAvg != null && (
              <p>Reveils nocturnes : {report.symptoms.nightWakingsAvg}</p>
            )}
          </div>
        </Card>
      )}

      {sections.moods && (
        <Card>
          <h3 className="text-caption font-medium text-deep-plum">Humeur et energie</h3>
          <div className="mt-2 space-y-1 text-tiny text-warm-gray">
            {report.moods.predominant && (
              <p>Humeur predominante : {MOOD_LABELS[report.moods.predominant]}</p>
            )}
            {report.moods.avgEnergy != null && (
              <p>Energie moyenne : {report.moods.avgEnergy}/5</p>
            )}
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(['menstrual', 'follicular', 'ovulatory', 'luteal'] as CyclePhase[]).map((phase) => {
                const p = report.moods.byPhase[phase];
                if (!p.mood && p.energy == null) return null;
                return (
                  <div key={phase} className="rounded-xl bg-cream p-2">
                    <p className="text-tiny font-medium text-deep-plum">{phaseLabels[phase]}</p>
                    {p.mood && <p className="text-tiny text-warm-gray">{MOOD_LABELS[p.mood]}</p>}
                    {p.energy != null && <p className="text-tiny text-warm-gray">{p.energy}/5</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {sections.supplements && report.supplements.length > 0 && (
        <Card>
          <h3 className="text-caption font-medium text-deep-plum">Complements</h3>
          <div className="mt-2 space-y-2">
            {report.supplements.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-tiny">
                <div>
                  <span className="text-deep-plum">{s.name}</span>
                  {s.dosage && <span className="text-warm-gray"> — {s.dosage}</span>}
                </div>
                <span className={`font-medium ${s.complianceRate >= 80 ? 'text-sage' : s.complianceRate >= 50 ? 'text-phase-ovulatory' : 'text-phase-menstrual'}`}>
                  {s.complianceRate}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {sections.exercises && (
        <Card>
          <h3 className="text-caption font-medium text-deep-plum">Activite physique</h3>
          <div className="mt-2 space-y-1 text-tiny text-warm-gray">
            {report.exercises.totalSessions === 0 ? (
              <p>Aucune seance enregistree.</p>
            ) : (
              <>
                <p>{report.exercises.totalSessions} seances ({report.exercises.avgPerWeek}/semaine)</p>
                {report.exercises.mostCommonType && <p>Type principal : {report.exercises.mostCommonType}</p>}
                {report.exercises.boostedRate != null && (
                  <p>Post-effort : {report.exercises.boostedRate}% boostee, {report.exercises.exhaustedRate}% epuisee</p>
                )}
              </>
            )}
          </div>
        </Card>
      )}

      {sections.journal && (
        <Card>
          <h3 className="text-caption font-medium text-deep-plum">Journal</h3>
          <p className="mt-2 text-tiny text-warm-gray">
            {report.journalExcerptCount} entree(s). Le contenu n'est pas inclus (donnees privees).
          </p>
        </Card>
      )}

      <p className="px-2 text-center text-tiny text-warm-gray/50">
        Ce document est informatif. Il ne constitue pas un diagnostic medical.
      </p>
    </div>
  );
}
