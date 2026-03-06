import { describe, it, expect } from 'vitest';
import { getCycleInfo, getPhaseRanges, getCycleDay, getPhaseEmoji, getPhaseColor } from './cycle';

describe('getPhaseRanges', () => {
  it('returns 4 phases covering full cycle for 28 days', () => {
    const ranges = getPhaseRanges(28);
    expect(ranges).toHaveLength(4);
    expect(ranges[0].phase).toBe('menstrual');
    expect(ranges[0].start).toBe(1);
    expect(ranges[3].end).toBe(28);
  });

  it('scales proportionally for 35-day cycle', () => {
    const ranges = getPhaseRanges(35);
    expect(ranges[0].end).toBe(Math.round(35 * 0.17)); // 6
    expect(ranges[1].end).toBe(Math.round(35 * 0.46)); // 16
    expect(ranges[2].end).toBe(Math.round(35 * 0.57)); // 20
    expect(ranges[3].end).toBe(35);
  });

  it('scales proportionally for 21-day cycle', () => {
    const ranges = getPhaseRanges(21);
    expect(ranges[0].end).toBe(Math.round(21 * 0.17)); // 4
    expect(ranges[3].end).toBe(21);
  });
});

describe('getCycleDay', () => {
  it('returns 1 on the start date', () => {
    const start = new Date(2026, 2, 1);
    expect(getCycleDay(start, new Date(2026, 2, 1))).toBe(1);
  });

  it('returns correct day for a date in the cycle', () => {
    const start = new Date(2026, 2, 1);
    expect(getCycleDay(start, new Date(2026, 2, 10))).toBe(10);
  });
});

describe('getCycleInfo', () => {
  it('returns null if lastPeriodStart is falsy', () => {
    const result = getCycleInfo({
      lastPeriodStart: null as unknown as Date,
      cycleLengthAvg: 28,
    });
    expect(result).toBeNull();
  });

  it('returns menstrual phase on day 1 of 28-day cycle', () => {
    const start = new Date(2026, 2, 1);
    const result = getCycleInfo({ lastPeriodStart: start, cycleLengthAvg: 28, today: new Date(2026, 2, 1) });
    expect(result).not.toBeNull();
    expect(result!.phase).toBe('menstrual');
    expect(result!.currentDay).toBe(1);
    expect(result!.isEstimate).toBe(false);
  });

  it('returns follicular phase around day 8 of 28-day cycle', () => {
    const start = new Date(2026, 2, 1);
    const result = getCycleInfo({ lastPeriodStart: start, cycleLengthAvg: 28, today: new Date(2026, 2, 8) });
    expect(result!.phase).toBe('follicular');
  });

  it('returns ovulatory phase around day 14 of 28-day cycle', () => {
    const start = new Date(2026, 2, 1);
    const result = getCycleInfo({ lastPeriodStart: start, cycleLengthAvg: 28, today: new Date(2026, 2, 14) });
    expect(result!.phase).toBe('ovulatory');
  });

  it('returns luteal phase around day 20 of 28-day cycle', () => {
    const start = new Date(2026, 2, 1);
    const result = getCycleInfo({ lastPeriodStart: start, cycleLengthAvg: 28, today: new Date(2026, 2, 20) });
    expect(result!.phase).toBe('luteal');
  });

  it('marks as estimate when past cycle length', () => {
    const start = new Date(2026, 1, 1);
    const result = getCycleInfo({ lastPeriodStart: start, cycleLengthAvg: 28, today: new Date(2026, 2, 5) });
    expect(result!.isEstimate).toBe(true);
    expect(result!.phase).toBe('luteal');
    expect(result!.currentDay).toBeGreaterThan(28);
  });

  it('calculates cycleProgress correctly', () => {
    const start = new Date(2026, 2, 1);
    const result = getCycleInfo({ lastPeriodStart: start, cycleLengthAvg: 28, today: new Date(2026, 2, 14) });
    expect(result!.cycleProgress).toBeCloseTo(14 / 28, 2);
  });

  it('caps cycleProgress at 1 when overdue', () => {
    const start = new Date(2026, 1, 1);
    const result = getCycleInfo({ lastPeriodStart: start, cycleLengthAvg: 28, today: new Date(2026, 2, 10) });
    expect(result!.cycleProgress).toBe(1);
  });

  it('calculates estimatedNextPeriod', () => {
    const start = new Date(2026, 2, 1);
    const result = getCycleInfo({ lastPeriodStart: start, cycleLengthAvg: 28, today: new Date(2026, 2, 1) });
    expect(result!.estimatedNextPeriod).toBeInstanceOf(Date);
  });

  it('calculates daysUntilNextPhase', () => {
    const start = new Date(2026, 2, 1);
    const result = getCycleInfo({ lastPeriodStart: start, cycleLengthAvg: 28, today: new Date(2026, 2, 1) });
    expect(result!.daysUntilNextPhase).toBeGreaterThan(0);
  });

  it('returns correct nextPhase', () => {
    const start = new Date(2026, 2, 1);
    const menstrual = getCycleInfo({ lastPeriodStart: start, cycleLengthAvg: 28, today: new Date(2026, 2, 1) });
    expect(menstrual!.nextPhase).toBe('follicular');

    const luteal = getCycleInfo({ lastPeriodStart: start, cycleLengthAvg: 28, today: new Date(2026, 2, 20) });
    expect(luteal!.nextPhase).toBe('menstrual');
  });
});

describe('getPhaseEmoji', () => {
  it('returns emoji for each phase', () => {
    expect(getPhaseEmoji('menstrual')).toBeTruthy();
    expect(getPhaseEmoji('follicular')).toBeTruthy();
    expect(getPhaseEmoji('ovulatory')).toBeTruthy();
    expect(getPhaseEmoji('luteal')).toBeTruthy();
  });
});

describe('getPhaseColor', () => {
  it('returns hex color for each phase', () => {
    expect(getPhaseColor('menstrual')).toBe('#E88D9E');
    expect(getPhaseColor('follicular')).toBe('#7EC8B8');
    expect(getPhaseColor('ovulatory')).toBe('#FFD166');
    expect(getPhaseColor('luteal')).toBe('#C3B1E1');
  });
});
