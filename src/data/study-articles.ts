export interface StudyArticle {
  id: string;
  title: string;
  emoji: string;
  summary: string;
  content: string[];
  source: string;
}

export const studyArticles: StudyArticle[] = [
  {
    id: 'microbiote',
    title: 'Microbiote et SOPK : le lien meconnu',
    emoji: '\uD83E\uDDA0',
    summary: 'Des etudes recentes montrent que le microbiote intestinal joue un role cle dans le SOPK.',
    content: [
      'Plusieurs etudes ont montre que les femmes atteintes de SOPK ont une diversite microbienne reduite par rapport aux femmes sans SOPK.',
      'Le microbiote intestinal influence le metabolisme des hormones, notamment les oestrogenes et les androgenes. Un desequilibre (dysbiose) peut aggraver l\'hyperandrogenisme.',
      'Les probiotiques et les aliments fermentes (kefir, kimchi, choucroute) montrent des resultats prometteurs pour ameliorer les marqueurs du SOPK.',
      'Les fibres prebiotiques (poireaux, oignons, ail, banane) nourrissent les bonnes bacteries. Objectif : 25-30g de fibres par jour.',
      'L\'axe intestin-cerveau-ovaires est un domaine de recherche en plein essor. Prendre soin de son intestin, c\'est aussi prendre soin de ses hormones.',
    ],
    source: 'Journal of Clinical Endocrinology & Metabolism, 2020',
  },
  {
    id: 'inositol',
    title: 'Inositol : l\'allie anti-SOPK',
    emoji: '\u2728',
    summary: 'Le myo-inositol et le D-chiro-inositol montrent une efficacite comparable a la metformine.',
    content: [
      'L\'inositol existe sous 9 formes. Les deux plus etudiees dans le SOPK sont le myo-inositol (MI) et le D-chiro-inositol (DCI).',
      'Le ratio optimal semble etre 40:1 (MI:DCI), qui correspond au ratio naturel dans le corps.',
      'Une meta-analyse de 2023 portant sur 3800 patientes a montre que l\'inositol ameliore : la sensibilite a l\'insuline, la regularite du cycle, la qualite ovulatoire, les taux d\'androgenes.',
      'La dose recommandee est de 4g de myo-inositol par jour, idealement repartie en 2 prises (matin et soir, a jeun).',
      'Les effets se manifestent generalement apres 3 a 6 mois de prise reguliere. La patience est cle.',
    ],
    source: 'Reproductive Biology and Endocrinology, 2023',
  },
  {
    id: 'stress',
    title: 'Stress et SOPK : le cercle vicieux',
    emoji: '\uD83E\uDDD8\u200D\u2640\uFE0F',
    summary: 'Le stress chronique aggrave le SOPK en augmentant le cortisol et la resistance a l\'insuline.',
    content: [
      'Le cortisol (hormone du stress) augmente la resistance a l\'insuline, la production d\'androgenes et l\'inflammation — les trois piliers du SOPK.',
      'Les femmes SOPK ont souvent un axe HPA (hypothalamus-hypophyse-surrenales) dysregule, les rendant plus sensibles au stress.',
      'La meditation de pleine conscience (mindfulness) a montre une reduction du cortisol de 20-25% en 8 semaines d\'etudes.',
      'Le yoga est particulierement benefique : il combine mouvement doux, respiration et meditation. Des etudes montrent une amelioration des marqueurs hormonaux.',
      'Le journaling (ecriture therapeutique) aide a reduire le stress percu et ameliore la qualite du sommeil.',
    ],
    source: 'Psychoneuroendocrinology, 2021',
  },
  {
    id: 'vitamin-d',
    title: 'Vitamine D et SOPK',
    emoji: '\u2600\uFE0F',
    summary: '67 a 85% des femmes SOPK ont une carence en vitamine D, avec des impacts sur les hormones.',
    content: [
      'La vitamine D n\'est pas vraiment une vitamine, c\'est une pro-hormone. Elle joue un role dans la regulation de plus de 200 genes.',
      'La carence en vitamine D est associee a : une resistance a l\'insuline plus marquee, un risque accru de depression, une inflammation chronique, des difficultes d\'ovulation.',
      'La supplementation en vitamine D (2000-4000 UI/jour) a montre une amelioration de la sensibilite a l\'insuline et de la regularite du cycle.',
      'La vitamine D aide a l\'absorption du calcium et travaille en synergie avec le magnesium. Prends-les ensemble pour un effet optimal.',
      'Fais verifier ton taux (25-OH-D) par prise de sang. L\'objectif est un taux entre 40 et 60 ng/mL.',
    ],
    source: 'Nutrients, 2022',
  },
  {
    id: 'resistance-vs-cardio',
    title: 'Musculation vs Cardio dans le SOPK',
    emoji: '\uD83C\uDFCB\uFE0F\u200D\u2640\uFE0F',
    summary: 'La musculation pourrait etre plus benefique que le cardio pour ameliorer la resistance a l\'insuline.',
    content: [
      'Une etude de 2022 a compare 3 groupes de femmes SOPK : musculation seule, cardio seul, et combine. Les trois groupes ont ameliore leurs marqueurs, mais avec des differences.',
      'La musculation a montre la meilleure amelioration de la sensibilite a l\'insuline (+23%) grace a l\'augmentation de la masse musculaire, le premier consommateur de glucose.',
      'Le cardio a ete plus efficace pour la sante cardiovasculaire et la reduction de l\'inflammation.',
      'L\'ideal semble etre une combinaison : 2-3 seances de musculation + 1-2 seances de cardio par semaine.',
      'Important : adapter l\'intensite a la phase du cycle. HIIT et musculation intense en phase folliculaire/ovulatoire. Yoga et marche en phase luteale/menstruelle.',
    ],
    source: 'Medicine & Science in Sports & Exercise, 2022',
  },
];
