import type {
  Profile,
  CycleEntry,
  Symptom,
  MoodEntry,
  MoodType,
  Supplement,
  SupplementLog,
  Exercise,
  CyclePhase,
} from '@/types';
import { getCycleInfo } from '@/lib/cycle';
import { differenceInDays, parseISO } from 'date-fns';

export interface CycleReport {
  totalCycles: number;
  avgLength: number;
  minLength: number;
  maxLength: number;
  regularity: 'regular' | 'irregular' | 'unknown';
}

export interface SymptomReport {
  skinAvg: number | null;
  skinTrend: 'improving' | 'worsening' | 'stable' | null;
  painFrequency: number;
  painAvgIntensity: number | null;
  predominantPainType: string | null;
  sleepOnsetAvg: number | null;
  nightWakingsAvg: number | null;
}

export interface MoodReport {
  predominant: MoodType | null;
  avgEnergy: number | null;
  byPhase: Record<CyclePhase, { mood: MoodType | null; energy: number | null }>;
}

export interface SupplementReport {
  name: string;
  dosage: string | null;
  complianceRate: number;
}

export interface ExerciseReport {
  totalSessions: number;
  avgPerWeek: number;
  mostCommonType: string | null;
  boostedRate: number | null;
  exhaustedRate: number | null;
}

export interface MedicalReport {
  period: { from: string; to: string };
  daysCovered: number;
  cycles: CycleReport;
  symptoms: SymptomReport;
  moods: MoodReport;
  supplements: SupplementReport[];
  exercises: ExerciseReport;
  journalExcerptCount: number;
}

export function aggregateCycles(
  profile: Profile,
  cycleEntries: CycleEntry[]
): CycleReport {
  const periodStarts = cycleEntries
    .filter((e) => e.period_started)
    .map((e) => parseISO(e.date))
    .sort((a, b) => a.getTime() - b.getTime());

  if (periodStarts.length < 2) {
    return {
      totalCycles: periodStarts.length,
      avgLength: profile.cycle_length_avg,
      minLength: profile.cycle_length_avg,
      maxLength: profile.cycle_length_avg,
      regularity: 'unknown',
    };
  }

  const lengths: number[] = [];
  for (let i = 1; i < periodStarts.length; i++) {
    lengths.push(differenceInDays(periodStarts[i], periodStarts[i - 1]));
  }

  const avg = Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);
  const variance = max - min;

  return {
    totalCycles: periodStarts.length,
    avgLength: avg,
    minLength: min,
    maxLength: max,
    regularity: variance <= 5 ? 'regular' : variance <= 10 ? 'irregular' : 'irregular',
  };
}

export function aggregateSymptoms(symptoms: Symptom[]): SymptomReport {
  if (symptoms.length === 0) {
    return {
      skinAvg: null,
      skinTrend: null,
      painFrequency: 0,
      painAvgIntensity: null,
      predominantPainType: null,
      sleepOnsetAvg: null,
      nightWakingsAvg: null,
    };
  }

  const skinValues = symptoms.filter((s) => s.skin_quality != null).map((s) => s.skin_quality!);
  const skinAvg = skinValues.length > 0
    ? Math.round((skinValues.reduce((a, b) => a + b, 0) / skinValues.length) * 10) / 10
    : null;

  let skinTrend: SymptomReport['skinTrend'] = null;
  if (skinValues.length >= 7) {
    const half = Math.floor(skinValues.length / 2);
    const firstHalf = skinValues.slice(0, half).reduce((a, b) => a + b, 0) / half;
    const secondHalf = skinValues.slice(half).reduce((a, b) => a + b, 0) / (skinValues.length - half);
    const diff = secondHalf - firstHalf;
    skinTrend = diff > 0.3 ? 'improving' : diff < -0.3 ? 'worsening' : 'stable';
  }

  const painEntries = symptoms.filter((s) => s.pelvic_pain_intensity != null && s.pelvic_pain_intensity > 0);
  const painFrequency = Math.round((painEntries.length / symptoms.length) * 100);
  const painAvgIntensity = painEntries.length > 0
    ? Math.round((painEntries.reduce((a, b) => a + b.pelvic_pain_intensity!, 0) / painEntries.length) * 10) / 10
    : null;

  const painTypes = painEntries.filter((s) => s.pelvic_pain_type).map((s) => s.pelvic_pain_type!);
  const typeCounts = painTypes.reduce<Record<string, number>>((acc, t) => {
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});
  const predominantPainType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  const sleepOnsets = symptoms.filter((s) => s.sleep_onset_minutes != null).map((s) => s.sleep_onset_minutes!);
  const sleepOnsetAvg = sleepOnsets.length > 0
    ? Math.round(sleepOnsets.reduce((a, b) => a + b, 0) / sleepOnsets.length)
    : null;

  const wakings = symptoms.filter((s) => s.night_wakings != null).map((s) => s.night_wakings!);
  const nightWakingsAvg = wakings.length > 0
    ? Math.round((wakings.reduce((a, b) => a + b, 0) / wakings.length) * 10) / 10
    : null;

  return { skinAvg, skinTrend, painFrequency, painAvgIntensity, predominantPainType, sleepOnsetAvg, nightWakingsAvg };
}

export function aggregateMoods(
  moods: MoodEntry[],
  profile: Profile
): MoodReport {
  const emptyPhase = { mood: null, energy: null };
  const byPhase: MoodReport['byPhase'] = {
    menstrual: { ...emptyPhase },
    follicular: { ...emptyPhase },
    ovulatory: { ...emptyPhase },
    luteal: { ...emptyPhase },
  };

  if (moods.length === 0) {
    return { predominant: null, avgEnergy: null, byPhase };
  }

  // Count moods
  const moodCounts: Record<string, number> = {};
  let totalEnergy = 0;

  // Phase grouping
  const phaseGroups: Record<CyclePhase, { moods: MoodType[]; energies: number[] }> = {
    menstrual: { moods: [], energies: [] },
    follicular: { moods: [], energies: [] },
    ovulatory: { moods: [], energies: [] },
    luteal: { moods: [], energies: [] },
  };

  for (const entry of moods) {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    totalEnergy += entry.energy_level;

    if (profile.last_period_start) {
      const cycleInfo = getCycleInfo({
        lastPeriodStart: parseISO(profile.last_period_start),
        cycleLengthAvg: profile.cycle_length_avg,
        today: parseISO(entry.date),
      });
      if (cycleInfo) {
        phaseGroups[cycleInfo.phase].moods.push(entry.mood);
        phaseGroups[cycleInfo.phase].energies.push(entry.energy_level);
      }
    }
  }

  const predominant = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as MoodType | undefined ?? null;
  const avgEnergy = Math.round((totalEnergy / moods.length) * 10) / 10;

  for (const phase of Object.keys(phaseGroups) as CyclePhase[]) {
    const group = phaseGroups[phase];
    if (group.moods.length > 0) {
      const phaseMoodCounts: Record<string, number> = {};
      group.moods.forEach((m) => {
        phaseMoodCounts[m] = (phaseMoodCounts[m] || 0) + 1;
      });
      byPhase[phase] = {
        mood: Object.entries(phaseMoodCounts).sort((a, b) => b[1] - a[1])[0][0] as MoodType,
        energy: Math.round((group.energies.reduce((a, b) => a + b, 0) / group.energies.length) * 10) / 10,
      };
    }
  }

  return { predominant, avgEnergy, byPhase };
}

export function aggregateSupplements(
  supplements: Supplement[],
  logs: SupplementLog[],
  daysCovered: number
): SupplementReport[] {
  return supplements.map((sup) => {
    const supLogs = logs.filter((l) => l.supplement_id === sup.id);
    const expectedPerDay = sup.time_of_day === 'both' ? 2 : 1;
    const totalExpected = expectedPerDay * daysCovered;
    const complianceRate = totalExpected > 0 ? Math.min(supLogs.length / totalExpected, 1) : 0;

    return {
      name: sup.name,
      dosage: sup.dosage,
      complianceRate: Math.round(complianceRate * 100),
    };
  });
}

export function aggregateExercises(
  exercises: Exercise[],
  daysCovered: number
): ExerciseReport {
  if (exercises.length === 0) {
    return {
      totalSessions: 0,
      avgPerWeek: 0,
      mostCommonType: null,
      boostedRate: null,
      exhaustedRate: null,
    };
  }

  const weeks = Math.max(daysCovered / 7, 1);
  const avgPerWeek = Math.round((exercises.length / weeks) * 10) / 10;

  const typeCounts: Record<string, number> = {};
  exercises.forEach((e) => {
    typeCounts[e.type] = (typeCounts[e.type] || 0) + 1;
  });
  const mostCommonType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  const withFeedback = exercises.filter((e) => e.post_effort_feeling);
  const boostedRate = withFeedback.length > 0
    ? Math.round((withFeedback.filter((e) => e.post_effort_feeling === 'boosted').length / withFeedback.length) * 100)
    : null;
  const exhaustedRate = withFeedback.length > 0
    ? Math.round((withFeedback.filter((e) => e.post_effort_feeling === 'exhausted').length / withFeedback.length) * 100)
    : null;

  return { totalSessions: exercises.length, avgPerWeek, mostCommonType, boostedRate, exhaustedRate };
}
