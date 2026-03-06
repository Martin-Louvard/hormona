export type CyclePhase = 'menstrual' | 'follicular' | 'ovulatory' | 'luteal';

export type MoodType = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'foggy';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type TimeOfDay = 'morning' | 'evening' | 'both';

export type SupplementPeriod = 'morning' | 'evening';

export type PostEffortFeeling = 'boosted' | 'exhausted';

export type GILevel = 'low' | 'medium' | 'high';

export interface Profile {
  id: string;
  display_name: string;
  cycle_length_avg: number;
  last_period_start: string | null;
  created_at: string;
  updated_at: string;
}

export interface CycleEntry {
  id: string;
  user_id: string;
  date: string;
  period_started: boolean;
  period_ended: boolean;
  notes: string | null;
  created_at: string;
}

export interface MoodEntry {
  id: string;
  user_id: string;
  date: string;
  mood: MoodType;
  energy_level: number;
  created_at: string;
}

export interface MealItem {
  name: string;
  category: string;
  gi_level: GILevel;
}

export interface Meal {
  id: string;
  user_id: string;
  date: string;
  meal_type: MealType;
  items: MealItem[];
  fiber_first: boolean;
  created_at: string;
}

export interface Symptom {
  id: string;
  user_id: string;
  date: string;
  skin_quality: number | null;
  pelvic_pain_type: string | null;
  pelvic_pain_intensity: number | null;
  sleep_onset_minutes: number | null;
  night_wakings: number | null;
  notes: string | null;
  created_at: string;
}

export interface Exercise {
  id: string;
  user_id: string;
  date: string;
  type: string;
  duration_minutes: number;
  post_effort_feeling: PostEffortFeeling | null;
  cycle_phase_at_time: CyclePhase | null;
  created_at: string;
}

export interface Supplement {
  id: string;
  user_id: string;
  name: string;
  dosage: string | null;
  time_of_day: TimeOfDay;
  stock_remaining_days: number;
  interaction_notes: string | null;
  active: boolean;
  created_at: string;
}

export interface SupplementLog {
  id: string;
  user_id: string;
  supplement_id: string;
  taken_at: string;
  period: SupplementPeriod;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  date: string;
  content: string;
  created_at: string;
}

export interface GIEntry {
  name: string;
  gi: number;
  level: GILevel;
  suggestion?: string;
  category: string;
}

export interface CycleInfo {
  currentDay: number;
  totalDays: number;
  phase: CyclePhase;
  phaseDay: number;
  phaseTotalDays: number;
  phaseProgress: number;
  cycleProgress: number;
  nextPhase: CyclePhase;
  daysUntilNextPhase: number;
  estimatedNextPeriod: Date;
  isEstimate: boolean;
}
