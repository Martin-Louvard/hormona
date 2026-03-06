export interface PathwayCard {
  id: string;
  title: string;
  emoji: string;
  content: string[];
}

export const diagnosisPathway: PathwayCard[] = [
  {
    id: 'what-is-pcos',
    title: 'C\'est quoi le SOPK ?',
    emoji: '\uD83E\uDDE0',
    content: [
      'Le Syndrome des Ovaires Polykystiques (SOPK) touche environ 1 femme sur 10 en age de procreer. C\'est la cause la plus frequente de troubles de l\'ovulation.',
      'Malgre son nom, le probleme n\'est pas vraiment les "kystes". Ce sont en fait des follicules immatures qui ne parviennent pas a ovuler correctement.',
      'Le SOPK est un desordre hormonal et metabolique. Il affecte bien plus que les ovaires : peau, cheveux, poids, humeur, energie, fertilite...',
      'Il n\'existe pas de "guerison" mais une tres bonne gestion est possible. Beaucoup de femmes vivent tres bien avec le SOPK une fois qu\'elles comprennent leur corps.',
    ],
  },
  {
    id: 'insulin',
    title: 'L\'insuline, le chef d\'orchestre',
    emoji: '\uD83C\uDFBC',
    content: [
      'L\'insuline est une hormone produite par le pancreas. Son role ? Faire entrer le sucre (glucose) du sang dans les cellules pour produire de l\'energie.',
      'Dans le SOPK, environ 70% des femmes ont une "resistance a l\'insuline". Les cellules ne repondent plus bien a l\'insuline, alors le pancreas en produit encore plus.',
      'Trop d\'insuline stimule les ovaires a produire plus d\'androgenes (hormones males). C\'est ca qui cause l\'acne, l\'hirsutisme et les troubles du cycle.',
      'Bonne nouvelle : la resistance a l\'insuline peut s\'ameliorer avec l\'alimentation (IG bas, fibres en premier), le sport et certains complements comme l\'inositol.',
    ],
  },
  {
    id: 'androgens',
    title: 'Les androgenes',
    emoji: '\u2696\uFE0F',
    content: [
      'Les androgenes sont des hormones presentes chez tout le monde, hommes et femmes. La testosterone est la plus connue.',
      'Dans le SOPK, les androgenes sont souvent en exces. C\'est ce qu\'on appelle l\'hyperandrogenisme.',
      'Cet exces peut se manifester par : acne persistante (surtout sur le menton et la machoire), pilosite excessive (hirsutisme), perte de cheveux (alopecie), peau grasse.',
      'Reduire l\'insuline aide souvent a reduire les androgenes naturellement. Certains complements (zinc, the vert, spearmint) peuvent aussi aider.',
    ],
  },
  {
    id: 'cycle-with-pcos',
    title: 'Ton cycle avec le SOPK',
    emoji: '\uD83D\uDD04',
    content: [
      'Un cycle "normal" dure entre 21 et 35 jours. Dans le SOPK, les cycles sont souvent irreguliers, longs (>35 jours) ou absents.',
      'L\'ovulation peut etre retardee ou absente (anovulation). Sans ovulation, pas de progesterone, ce qui desequilibre encore plus les hormones.',
      'L\'absence de regles n\'est pas "pratique" — elle augmente le risque d\'hyperplasie de l\'endometre. Parles-en a ton gyneco.',
      'Suivre ton cycle, meme irregulier, t\'aide a reperer des patterns et a adapter ton mode de vie. C\'est exactement ce que fait cette app.',
    ],
  },
  {
    id: 'what-you-can-do',
    title: 'Ce que tu peux faire',
    emoji: '\uD83D\uDCAA',
    content: [
      'Alimentation a IG bas : reduis les pics de glycemie en privilegiant les glucides complexes, les proteines et les bonnes graisses.',
      'Mouvement regulier : la musculation et le HIIT (en phase folliculaire/ovulatoire) ameliorent la sensibilite a l\'insuline.',
      'Gestion du stress : le cortisol aggrave la resistance a l\'insuline. Yoga, meditation, journaling peuvent aider.',
      'Complements cibles : inositol, magnesium, vitamine D, omega-3, zinc... toujours avec un suivi medical.',
      'Sommeil de qualite : 7-9h par nuit. Le manque de sommeil augmente la resistance a l\'insuline et le cortisol.',
      'Tu n\'as pas a tout changer d\'un coup. Chaque petit pas compte. Cette app est la pour t\'accompagner au quotidien.',
    ],
  },
];
