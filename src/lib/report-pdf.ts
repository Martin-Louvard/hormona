import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { MedicalReport } from './report-aggregator';
import { phaseLabels } from '@/lib/cycle';
import type { CyclePhase, MoodType } from '@/types';

const MOOD_LABELS: Record<MoodType, string> = {
  sunny: 'Ensoleille',
  cloudy: 'Nuageux',
  rainy: 'Pluvieux',
  stormy: 'Orageux',
  foggy: 'Brumeux',
};

const REGULARITY_LABELS: Record<string, string> = {
  regular: 'Regulier',
  irregular: 'Irregulier',
  unknown: 'Donnees insuffisantes',
};

const SKIN_TREND_LABELS: Record<string, string> = {
  improving: 'En amelioration',
  worsening: 'En degradation',
  stable: 'Stable',
};

export function generateReportPDF(
  report: MedicalReport,
  displayName: string,
  sections: {
    cycles: boolean;
    symptoms: boolean;
    moods: boolean;
    supplements: boolean;
    exercises: boolean;
    journal: boolean;
  },
  journalCount?: number
): Blob {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Header
  doc.setFontSize(20);
  doc.setTextColor(74, 44, 94); // deep-plum
  doc.text('Hormona — Resume de Suivi', margin, y);
  y += 10;

  doc.setFontSize(11);
  doc.setTextColor(107, 91, 115); // warm-gray
  doc.text(`Patiente : ${displayName}`, margin, y);
  y += 6;
  doc.text(`Periode : du ${report.period.from} au ${report.period.to} (${report.daysCovered} jours)`, margin, y);
  y += 6;
  doc.text(`Genere le : ${new Date().toLocaleDateString('fr-FR')}`, margin, y);
  y += 10;

  // Separator
  doc.setDrawColor(195, 177, 225); // lavender
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  function sectionTitle(title: string) {
    if (y > 260) {
      doc.addPage();
      y = margin;
    }
    doc.setFontSize(14);
    doc.setTextColor(74, 44, 94);
    doc.text(title, margin, y);
    y += 8;
  }

  function bodyText(text: string) {
    doc.setFontSize(10);
    doc.setTextColor(107, 91, 115);
    const lines = doc.splitTextToSize(text, contentWidth);
    if (y + lines.length * 5 > 270) {
      doc.addPage();
      y = margin;
    }
    doc.text(lines, margin, y);
    y += lines.length * 5 + 3;
  }

  // Cycles
  if (sections.cycles) {
    sectionTitle('Cycles menstruels');
    const c = report.cycles;
    bodyText(`Nombre de debuts de regles enregistres : ${c.totalCycles}`);
    bodyText(`Duree moyenne : ${c.avgLength} jours (min ${c.minLength}, max ${c.maxLength})`);
    bodyText(`Regularite : ${REGULARITY_LABELS[c.regularity]}`);
    y += 4;
  }

  // Symptoms
  if (sections.symptoms) {
    sectionTitle('Symptomes');
    const s = report.symptoms;
    if (s.skinAvg != null) {
      bodyText(`Qualite de peau moyenne : ${s.skinAvg}/5${s.skinTrend ? ` (${SKIN_TREND_LABELS[s.skinTrend]})` : ''}`);
    }
    bodyText(`Douleurs pelviennes : ${s.painFrequency}% des jours`);
    if (s.painAvgIntensity != null) {
      bodyText(`Intensite moyenne des douleurs : ${s.painAvgIntensity}/10${s.predominantPainType ? ` — type predominant : ${s.predominantPainType}` : ''}`);
    }
    if (s.sleepOnsetAvg != null) {
      bodyText(`Temps d'endormissement moyen : ${s.sleepOnsetAvg} min`);
    }
    if (s.nightWakingsAvg != null) {
      bodyText(`Reveils nocturnes moyens : ${s.nightWakingsAvg}`);
    }
    y += 4;
  }

  // Moods
  if (sections.moods) {
    sectionTitle('Humeur et energie');
    const m = report.moods;
    if (m.predominant) {
      bodyText(`Humeur predominante : ${MOOD_LABELS[m.predominant]}`);
    }
    if (m.avgEnergy != null) {
      bodyText(`Energie moyenne : ${m.avgEnergy}/5`);
    }

    const phaseData: string[][] = [];
    for (const phase of ['menstrual', 'follicular', 'ovulatory', 'luteal'] as CyclePhase[]) {
      const p = m.byPhase[phase];
      if (p.mood || p.energy != null) {
        phaseData.push([
          phaseLabels[phase],
          p.mood ? MOOD_LABELS[p.mood] : '-',
          p.energy != null ? `${p.energy}/5` : '-',
        ]);
      }
    }

    if (phaseData.length > 0) {
      autoTable(doc, {
        startY: y,
        margin: { left: margin, right: margin },
        head: [['Phase', 'Humeur', 'Energie']],
        body: phaseData,
        theme: 'grid',
        headStyles: { fillColor: [195, 177, 225], textColor: [74, 44, 94], fontSize: 9 },
        bodyStyles: { textColor: [107, 91, 115], fontSize: 9 },
        styles: { cellPadding: 3 },
      });
      y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;
    }
    y += 4;
  }

  // Supplements
  if (sections.supplements && report.supplements.length > 0) {
    sectionTitle('Complements alimentaires');
    const supData = report.supplements.map((s) => [
      s.name,
      s.dosage ?? '-',
      `${s.complianceRate}%`,
    ]);

    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [['Complement', 'Dosage', 'Observance']],
      body: supData,
      theme: 'grid',
      headStyles: { fillColor: [168, 197, 160], textColor: [74, 44, 94], fontSize: 9 },
      bodyStyles: { textColor: [107, 91, 115], fontSize: 9 },
      styles: { cellPadding: 3 },
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;
  }

  // Exercises
  if (sections.exercises) {
    sectionTitle('Activite physique');
    const e = report.exercises;
    if (e.totalSessions === 0) {
      bodyText('Aucune seance enregistree sur cette periode.');
    } else {
      bodyText(`Seances totales : ${e.totalSessions} (${e.avgPerWeek}/semaine)`);
      if (e.mostCommonType) bodyText(`Type le plus frequent : ${e.mostCommonType}`);
      if (e.boostedRate != null) bodyText(`Ressenti post-effort : ${e.boostedRate}% boostee, ${e.exhaustedRate}% epuisee`);
    }
    y += 4;
  }

  // Journal
  if (sections.journal && journalCount != null) {
    sectionTitle('Journal personnel');
    bodyText(`${journalCount} entree(s) de journal sur cette periode.`);
    bodyText('Le contenu du journal n\'est pas inclus dans ce rapport pour des raisons de confidentialite.');
    y += 4;
  }

  // Disclaimer footer on last page
  const disclaimerY = 275;
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  const disclaimer = 'Ce document est genere automatiquement par Hormona a titre informatif. Il ne constitue pas un diagnostic medical. Consultez un professionnel de sante pour toute decision medicale.';
  const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth);
  doc.text(disclaimerLines, margin, disclaimerY);

  return doc.output('blob');
}
