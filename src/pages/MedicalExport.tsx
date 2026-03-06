import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Eye, Download } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ReportConfig, type ReportSections } from '@/components/medical/ReportConfig';
import { ReportPreview } from '@/components/medical/ReportPreview';
import {
  aggregateCycles,
  aggregateSymptoms,
  aggregateMoods,
  aggregateSupplements,
  aggregateExercises,
  type MedicalReport,
} from '@/lib/report-aggregator';
import { generateReportPDF } from '@/lib/report-pdf';

type View = 'config' | 'preview';

export function MedicalExport() {
  const navigate = useNavigate();
  const { user, profile } = useAuthStore();
  const [view, setView] = useState<View>('config');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<MedicalReport | null>(null);
  const [sections, setSections] = useState<ReportSections | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchReportData = async (from: string, to: string, secs: ReportSections) => {
    if (!user || !profile) return;
    setLoading(true);
    setError(null);
    setSections(secs);

    try {
      const daysCovered = differenceInDays(parseISO(to), parseISO(from)) + 1;

      if (daysCovered < 14) {
        setError('La periode selectionnee doit couvrir au moins 14 jours.');
        setLoading(false);
        return;
      }

      const [
        { data: cycleEntries },
        { data: symptoms },
        { data: moods },
        { data: supplements },
        { data: supplementLogs },
        { data: exercises },
        { data: journalEntries },
      ] = await Promise.all([
        supabase
          .from('cycle_entries')
          .select('*')
          .eq('user_id', user.id)
          .gte('date', from)
          .lte('date', to)
          .order('date'),
        supabase
          .from('symptoms')
          .select('*')
          .eq('user_id', user.id)
          .gte('date', from)
          .lte('date', to)
          .order('date'),
        supabase
          .from('mood_entries')
          .select('*')
          .eq('user_id', user.id)
          .gte('date', from)
          .lte('date', to)
          .order('date'),
        supabase
          .from('supplements')
          .select('*')
          .eq('user_id', user.id)
          .eq('active', true),
        supabase
          .from('supplement_logs')
          .select('*')
          .eq('user_id', user.id)
          .gte('taken_at', `${from}T00:00:00`)
          .lte('taken_at', `${to}T23:59:59`),
        supabase
          .from('exercises')
          .select('*')
          .eq('user_id', user.id)
          .gte('date', from)
          .lte('date', to)
          .order('date'),
        supabase
          .from('journal_entries')
          .select('id')
          .eq('user_id', user.id)
          .gte('date', from)
          .lte('date', to),
      ]);

      const medicalReport: MedicalReport = {
        period: { from, to },
        daysCovered,
        cycles: aggregateCycles(profile, cycleEntries ?? []),
        symptoms: aggregateSymptoms(symptoms ?? []),
        moods: aggregateMoods(moods ?? [], profile),
        supplements: aggregateSupplements(supplements ?? [], supplementLogs ?? [], daysCovered),
        exercises: aggregateExercises(exercises ?? [], daysCovered),
        journalExcerptCount: journalEntries?.length ?? 0,
      };

      setReport(medicalReport);
      setView('preview');
    } catch {
      setError('Erreur lors de la recuperation des donnees.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!report || !sections || !profile) return;

    const blob = generateReportPDF(
      report,
      profile.display_name,
      sections,
      sections.journal ? report.journalExcerptCount : undefined
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hormona-rapport-${report.period.from}-${report.period.to}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      <div className="flex items-center gap-3">
        <button
          onClick={() => view === 'preview' ? setView('config') : navigate('/more')}
          className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-cream-dark"
        >
          <ArrowLeft size={20} className="text-deep-plum" />
        </button>
        <h1 className="font-serif text-title text-deep-plum">Export medical</h1>
      </div>

      <Card className="flex items-start gap-3 bg-lavender/10">
        <FileText size={20} className="mt-0.5 shrink-0 text-lavender" />
        <p className="text-tiny text-warm-gray">
          Genere un resume de tes donnees de suivi a partager avec ton medecin, gynecologue ou endocrinologue. Le PDF est cree localement, aucune donnee n'est envoyee.
        </p>
      </Card>

      {error && (
        <Card className="border border-phase-menstrual/30 bg-phase-menstrual/5">
          <p className="text-caption text-phase-menstrual">{error}</p>
        </Card>
      )}

      {view === 'config' && (
        <ReportConfig onGenerate={fetchReportData} loading={loading} />
      )}

      {view === 'preview' && report && sections && (
        <>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setView('config')}
              className="flex-1"
            >
              <Eye size={16} className="mr-2" />
              Modifier
            </Button>
            <Button
              size="sm"
              onClick={downloadPDF}
              className="flex-1"
            >
              <Download size={16} className="mr-2" />
              Telecharger PDF
            </Button>
          </div>
          <ReportPreview
            report={report}
            sections={sections}
            displayName={profile?.display_name ?? 'Utilisatrice'}
          />
        </>
      )}
    </div>
  );
}
