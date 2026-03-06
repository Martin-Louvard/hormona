import type { CyclePhase } from '@/types';

export interface Tip {
  id: string;
  phase: CyclePhase;
  category: 'nutrition' | 'movement' | 'wellness' | 'mindset';
  text: string;
}

const tipsByPhase: Record<CyclePhase, Tip[]> = {
  menstrual: [
    { id: 'm1', phase: 'menstrual', category: 'wellness', text: 'Sois douce avec toi-meme. Une tisane de gingembre peut aider les crampes.' },
    { id: 'm2', phase: 'menstrual', category: 'movement', text: 'C\'est le moment de ralentir. Privilegia les activites calmes comme le yoga doux.' },
    { id: 'm3', phase: 'menstrual', category: 'nutrition', text: 'Le fer est ton allie en ce moment : lentilles, epinards, viande rouge.' },
    { id: 'm4', phase: 'menstrual', category: 'mindset', text: 'Ecoute ton corps. Si tu es fatiguee, c\'est normal — repose-toi.' },
    { id: 'm5', phase: 'menstrual', category: 'nutrition', text: 'Les aliments riches en magnesium (chocolat noir, amandes) peuvent soulager les crampes.' },
    { id: 'm6', phase: 'menstrual', category: 'wellness', text: 'Une bouillotte sur le ventre peut faire des miracles. Prends soin de toi.' },
    { id: 'm7', phase: 'menstrual', category: 'movement', text: 'Une courte marche en plein air peut aider a reduire les douleurs et la fatigue.' },
    { id: 'm8', phase: 'menstrual', category: 'nutrition', text: 'Evite les aliments tres sales qui favorisent la retention d\'eau.' },
    { id: 'm9', phase: 'menstrual', category: 'mindset', text: 'C\'est ok de dire non. Ton energie est precieuse, utilise-la pour toi.' },
    { id: 'm10', phase: 'menstrual', category: 'wellness', text: 'Le curcuma est un anti-inflammatoire naturel — ajoute-le a tes plats.' },
  ],
  follicular: [
    { id: 'f1', phase: 'follicular', category: 'movement', text: 'Ton energie remonte ! C\'est le moment ideal pour tester un nouveau sport.' },
    { id: 'f2', phase: 'follicular', category: 'mindset', text: 'Phase creative : profite de cette clarte mentale pour tes projets.' },
    { id: 'f3', phase: 'follicular', category: 'nutrition', text: 'Ton metabolisme accelere. Les proteines et legumes verts sont tes amis.' },
    { id: 'f4', phase: 'follicular', category: 'nutrition', text: 'C\'est le bon moment pour planifier tes repas de la semaine.' },
    { id: 'f5', phase: 'follicular', category: 'movement', text: 'Essaie la musculation ou le Pilates — ton corps recupere bien en ce moment.' },
    { id: 'f6', phase: 'follicular', category: 'wellness', text: 'Ta peau se renouvelle : c\'est le moment d\'exfolier en douceur.' },
    { id: 'f7', phase: 'follicular', category: 'nutrition', text: 'Les aliments fermentes (kimchi, kefir) soutiennent ton microbiote.' },
    { id: 'f8', phase: 'follicular', category: 'mindset', text: 'Ton cerveau est plus receptif a la nouveaute — apprends quelque chose de nouveau.' },
    { id: 'f9', phase: 'follicular', category: 'movement', text: 'L\'endurance est a son max. Profites-en pour des seances plus longues.' },
    { id: 'f10', phase: 'follicular', category: 'nutrition', text: 'Les graines de lin moulues sont excellentes pour l\'equilibre hormonal.' },
  ],
  ovulatory: [
    { id: 'o1', phase: 'ovulatory', category: 'mindset', text: 'Pic d\'energie et de confiance ! Profites-en pour tes projets sociaux.' },
    { id: 'o2', phase: 'ovulatory', category: 'movement', text: 'Tu es au top de ta forme : c\'est le moment pour le HIIT ou la course.' },
    { id: 'o3', phase: 'ovulatory', category: 'wellness', text: 'Ta peau est souvent au mieux en ce moment — hydrate-la bien.' },
    { id: 'o4', phase: 'ovulatory', category: 'wellness', text: 'Profite de cette energie, mais n\'oublie pas de bien dormir.' },
    { id: 'o5', phase: 'ovulatory', category: 'nutrition', text: 'Privilegie les legumes cruciferes (brocoli, chou-fleur) pour aider le foie.' },
    { id: 'o6', phase: 'ovulatory', category: 'movement', text: 'C\'est le moment ideal pour battre tes records personnels !' },
    { id: 'o7', phase: 'ovulatory', category: 'mindset', text: 'Ta communication est au top — planifie tes conversations importantes.' },
    { id: 'o8', phase: 'ovulatory', category: 'nutrition', text: 'Les antioxydants (baies, the vert) soutiennent la qualite ovulatoire.' },
    { id: 'o9', phase: 'ovulatory', category: 'wellness', text: 'L\'hydratation est cle — bois au moins 2L d\'eau aujourd\'hui.' },
    { id: 'o10', phase: 'ovulatory', category: 'movement', text: 'Les sports de groupe sont parfaits en ce moment — cours collectifs, danse !' },
  ],
  luteal: [
    { id: 'l1', phase: 'luteal', category: 'nutrition', text: 'Privilegie les glucides complexes ce soir pour eviter les insomnies.' },
    { id: 'l2', phase: 'luteal', category: 'wellness', text: 'Le magnesium peut aider avec l\'irritabilite et les ballonnements.' },
    { id: 'l3', phase: 'luteal', category: 'nutrition', text: 'Envie de sucre ? C\'est normal. Opte pour du chocolat noir 70%+.' },
    { id: 'l4', phase: 'luteal', category: 'nutrition', text: 'Reduis la cafeine si tu te sens anxieuse — essaie le rooibos.' },
    { id: 'l5', phase: 'luteal', category: 'movement', text: 'Baisse l\'intensite de tes entrainements — yoga, marche, natation.' },
    { id: 'l6', phase: 'luteal', category: 'mindset', text: 'Les emotions sont plus intenses. Le journaling peut aider a y voir clair.' },
    { id: 'l7', phase: 'luteal', category: 'wellness', text: 'Un bain chaud le soir peut ameliorer la qualite de ton sommeil.' },
    { id: 'l8', phase: 'luteal', category: 'nutrition', text: 'Les patates douces sont ideales : IG moyen, riches en fibres et vitamine A.' },
    { id: 'l9', phase: 'luteal', category: 'mindset', text: 'Sois indulgente avec toi-meme. Le SPM n\'est pas un defaut de caractere.' },
    { id: 'l10', phase: 'luteal', category: 'wellness', text: 'L\'huile d\'onagre peut aider avec les douleurs mammaires premenstruelles.' },
  ],
};

export function getTipByPhaseDay(phase: CyclePhase, phaseDay: number): string {
  const tips = tipsByPhase[phase];
  return tips[(phaseDay - 1) % tips.length].text;
}

export function getAllTips(phase: CyclePhase): Tip[] {
  return tipsByPhase[phase];
}
