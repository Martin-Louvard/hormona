export interface SupplementPreset {
  name: string;
  emoji: string;
  dosage: string;
  timeOfDay: 'morning' | 'evening' | 'both';
  description: string;
}

export const supplementPresets: SupplementPreset[] = [
  {
    name: 'Inositol (Myo + D-chiro)',
    emoji: '\u2728',
    dosage: '4g / jour',
    timeOfDay: 'both',
    description: 'Aide a ameliorer la sensibilite a l\'insuline et la qualite ovulatoire.',
  },
  {
    name: 'Magnesium Bisglycinate',
    emoji: '\uD83D\uDCAB',
    dosage: '300-400mg / jour',
    timeOfDay: 'evening',
    description: 'Reduit le stress, les crampes et ameliore le sommeil.',
  },
  {
    name: 'Zinc',
    emoji: '\uD83D\uDEE1\uFE0F',
    dosage: '15-30mg / jour',
    timeOfDay: 'morning',
    description: 'Anti-inflammatoire, aide contre l\'acne et la chute de cheveux.',
  },
  {
    name: 'Vitamine D3',
    emoji: '\u2600\uFE0F',
    dosage: '2000-4000 UI / jour',
    timeOfDay: 'morning',
    description: 'Souvent en carence dans le SOPK. Soutient l\'immunite et l\'humeur.',
  },
  {
    name: 'Omega-3 (EPA/DHA)',
    emoji: '\uD83D\uDC1F',
    dosage: '1-2g / jour',
    timeOfDay: 'morning',
    description: 'Anti-inflammatoire puissant, soutient la sante cardiovasculaire.',
  },
  {
    name: 'Fer (Bisglycinate)',
    emoji: '\uD83E\uDDE2',
    dosage: '14-28mg / jour',
    timeOfDay: 'morning',
    description: 'En cas de regles abondantes. A prendre loin du the et du cafe.',
  },
  {
    name: 'Berberine',
    emoji: '\uD83C\uDF3F',
    dosage: '500mg x2 / jour',
    timeOfDay: 'both',
    description: 'Alternative naturelle a la metformine pour la resistance a l\'insuline.',
  },
  {
    name: 'NAC (N-Acetyl Cysteine)',
    emoji: '\uD83D\uDD2C',
    dosage: '600-1800mg / jour',
    timeOfDay: 'morning',
    description: 'Antioxydant, ameliore la qualite ovulatoire et la sensibilite a l\'insuline.',
  },
  {
    name: 'Vitamine B12',
    emoji: '\u26A1',
    dosage: '1000mcg / jour',
    timeOfDay: 'morning',
    description: 'Essentielle pour l\'energie, surtout si prise de metformine.',
  },
];
