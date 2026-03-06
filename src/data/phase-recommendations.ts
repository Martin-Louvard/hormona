import type { CyclePhase } from '@/types';

export interface ActivityRecommendation {
  emoji: string;
  name: string;
  duration: string;
  description: string;
}

export interface PhaseRecommendation {
  phase: CyclePhase;
  intensity: 'low' | 'moderate' | 'high';
  explanation: string;
  activities: ActivityRecommendation[];
}

export const phaseRecommendations: Record<CyclePhase, PhaseRecommendation> = {
  menstrual: {
    phase: 'menstrual',
    intensity: 'low',
    explanation: 'Ton corps se regenere. Privilegia la douceur et l\'ecoute de tes sensations. Pas de culpabilite si tu preferes te reposer.',
    activities: [
      { emoji: '\uD83E\uDDD8', name: 'Yoga restauratif', duration: '20-30 min', description: 'Postures au sol, etirements doux, respiration.' },
      { emoji: '\uD83D\uDEB6', name: 'Marche tranquille', duration: '20-30 min', description: 'En plein air si possible, a ton rythme.' },
      { emoji: '\uD83E\uDDD8\u200D\u2640\uFE0F', name: 'Stretching', duration: '15-20 min', description: 'Etirements des hanches et du bas du dos.' },
    ],
  },
  follicular: {
    phase: 'follicular',
    intensity: 'moderate',
    explanation: 'Ton energie remonte avec les oestrogenes ! C\'est le moment d\'explorer, d\'essayer de nouvelles activites et d\'augmenter l\'intensite progressivement.',
    activities: [
      { emoji: '\uD83D\uDCAA', name: 'Musculation', duration: '30-45 min', description: 'Renforcement musculaire, charges moderees.' },
      { emoji: '\uD83E\uDD38', name: 'Danse / Cours collectif', duration: '30-45 min', description: 'Cardio fun avec de l\'energie montante.' },
      { emoji: '\uD83C\uDFCA', name: 'Natation', duration: '30-40 min', description: 'Endurance douce, tres bon pour les articulations.' },
    ],
  },
  ovulatory: {
    phase: 'ovulatory',
    intensity: 'high',
    explanation: 'Pic d\'energie et de confiance ! Ton corps est pret pour les efforts intenses. Profite de cette fenetre de performance.',
    activities: [
      { emoji: '\uD83D\uDD25', name: 'HIIT', duration: '20-30 min', description: 'Intervalles haute intensite, tabata, circuits.' },
      { emoji: '\uD83C\uDFC3', name: 'Course / Cardio', duration: '30-45 min', description: 'Running, velo, c\'est le moment de se depasser.' },
      { emoji: '\uD83D\uDCAA', name: 'Musculation intense', duration: '40-50 min', description: 'Charges lourdes, nouveaux records.' },
    ],
  },
  luteal: {
    phase: 'luteal',
    intensity: 'moderate',
    explanation: 'La progesterone monte, l\'energie baisse progressivement. Reduis l\'intensite, surtout en fin de phase. Ecoute ton corps.',
    activities: [
      { emoji: '\uD83E\uDDD8', name: 'Yoga flow', duration: '30-40 min', description: 'Vinyasa doux, sans forcer les inversions.' },
      { emoji: '\uD83D\uDEB6', name: 'Marche active', duration: '30-45 min', description: 'Marche rapide ou rando legere.' },
      { emoji: '\uD83E\uDD3D', name: 'Pilates', duration: '30 min', description: 'Renforcement en profondeur, respiration.' },
    ],
  },
};
