import { differenceInDays, addDays } from 'date-fns';
import type { CycleInfo, CyclePhase } from '@/types';

export type CycleInput = {
  lastPeriodStart: Date;
  cycleLengthAvg: number;
  today?: Date;
};

const PHASE_ORDER: CyclePhase[] = ['menstrual', 'follicular', 'ovulatory', 'luteal'];

export function getPhaseRanges(cycleDays: number): { phase: CyclePhase; start: number; end: number }[] {
  const menstrualEnd = Math.round(cycleDays * 0.17);
  const follicularEnd = Math.round(cycleDays * 0.46);
  const ovulatoryEnd = Math.round(cycleDays * 0.57);

  return [
    { phase: 'menstrual', start: 1, end: menstrualEnd },
    { phase: 'follicular', start: menstrualEnd + 1, end: follicularEnd },
    { phase: 'ovulatory', start: follicularEnd + 1, end: ovulatoryEnd },
    { phase: 'luteal', start: ovulatoryEnd + 1, end: cycleDays },
  ];
}

export function getCycleDay(lastPeriodStart: Date, today: Date = new Date()): number {
  return differenceInDays(today, lastPeriodStart) + 1;
}

export function getCycleInfo(input: CycleInput): CycleInfo | null {
  if (!input.lastPeriodStart) return null;

  const today = input.today ?? new Date();
  const cycleDays = input.cycleLengthAvg;
  const rawDay = getCycleDay(input.lastPeriodStart, today);
  const ranges = getPhaseRanges(cycleDays);

  const isEstimate = rawDay > cycleDays;
  const currentDay = isEstimate ? rawDay : rawDay;

  let phase: CyclePhase;
  let phaseDay: number;
  let phaseTotalDays: number;

  if (isEstimate) {
    phase = 'luteal';
    const lutealRange = ranges[3];
    phaseTotalDays = lutealRange.end - lutealRange.start + 1;
    phaseDay = phaseTotalDays;
  } else {
    const range = ranges.find((r) => currentDay >= r.start && currentDay <= r.end) ?? ranges[3];
    phase = range.phase;
    phaseDay = currentDay - range.start + 1;
    phaseTotalDays = range.end - range.start + 1;
  }

  const phaseProgress = phaseDay / phaseTotalDays;
  const cycleProgress = Math.min(currentDay / cycleDays, 1);

  const currentPhaseIndex = PHASE_ORDER.indexOf(phase);
  const nextPhase = PHASE_ORDER[(currentPhaseIndex + 1) % PHASE_ORDER.length];

  const currentRange = ranges.find((r) => r.phase === phase)!;
  const daysUntilNextPhase = isEstimate ? 0 : currentRange.end - currentDay + 1;

  const daysUntilNextPeriod = isEstimate ? 0 : cycleDays - currentDay + 1;
  const estimatedNextPeriod = addDays(today, daysUntilNextPeriod);

  return {
    currentDay,
    totalDays: cycleDays,
    phase,
    phaseDay,
    phaseTotalDays,
    phaseProgress,
    cycleProgress,
    nextPhase,
    daysUntilNextPhase,
    estimatedNextPeriod,
    isEstimate,
  };
}

export function getPhaseEmoji(phase: CyclePhase): string {
  const emojis: Record<CyclePhase, string> = {
    menstrual: '\uD83C\uDF19',
    follicular: '\uD83C\uDF31',
    ovulatory: '\u2600\uFE0F',
    luteal: '\uD83C\uDF42',
  };
  return emojis[phase];
}

export function getPhaseColor(phase: CyclePhase): string {
  return phaseColors[phase];
}

export const phaseLabels: Record<CyclePhase, string> = {
  menstrual: 'Menstruelle',
  follicular: 'Folliculaire',
  ovulatory: 'Ovulatoire',
  luteal: 'Lut\u00e9ale',
};

export const phaseColors: Record<CyclePhase, string> = {
  menstrual: '#C97B8B',
  follicular: '#5BA68A',
  ovulatory: '#D4A847',
  luteal: '#9B85C4',
};

export const phaseColorsSoft: Record<CyclePhase, string> = {
  menstrual: '#F5DDE3',
  follicular: '#D4EDE4',
  ovulatory: '#F5EAC8',
  luteal: '#E4DCF0',
};
