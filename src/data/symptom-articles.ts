export interface SymptomArticle {
  id: string;
  title: string;
  emoji: string;
  understand: string[];
  natural: string[];
  medical: string[];
}

export const symptomArticles: SymptomArticle[] = [
  {
    id: 'hirsutism',
    title: 'Pilosite excessive',
    emoji: '\uD83E\uDDF6',
    understand: [
      'L\'hirsutisme est une croissance excessive de poils dans des zones typiquement masculines : menton, levre superieure, poitrine, ventre, dos.',
      'Il est cause par l\'exces d\'androgenes, souvent lie a la resistance a l\'insuline.',
      'Environ 70% des femmes SOPK sont concernees. C\'est l\'un des symptomes les plus difficiles emotionnellement.',
    ],
    natural: [
      'Le the a la menthe verte (spearmint) a montre une reduction des androgenes dans plusieurs etudes.',
      'L\'inositol peut aider en ameliorant la sensibilite a l\'insuline.',
      'Le zinc est un anti-androgene naturel.',
      'Reduire les pics de glycemie aide indirectement en baissant l\'insuline, donc les androgenes.',
    ],
    medical: [
      'L\'epilation laser ou la lumiere pulsee sont les traitements les plus efficaces a long terme.',
      'Certaines pilules contraceptives anti-androgenes peuvent aider.',
      'La spironolactone est un anti-androgene medical souvent prescrit.',
      'Les resultats prennent du temps (6-12 mois) — sois patiente avec toi-meme.',
    ],
  },
  {
    id: 'hair-loss',
    title: 'Chute de cheveux',
    emoji: '\uD83D\uDC87',
    understand: [
      'L\'alopecie androgenetique touche environ 50% des femmes SOPK.',
      'Elle se manifeste par un amincissement diffus sur le dessus du crane, rarement par des zones completement chauves.',
      'La DHT (dihydrotestosterone), derive de la testosterone, miniaturise les follicules pileux.',
    ],
    natural: [
      'Le zinc et le fer (si carence) sont essentiels pour la sante des cheveux.',
      'Les omega-3 nourrissent le cuir chevelu de l\'interieur.',
      'Le the vert contient de l\'EGCG, un inhibiteur naturel de la 5-alpha reductase.',
      'Le massage du cuir chevelu stimule la circulation sanguine.',
    ],
    medical: [
      'Le minoxidil topique est le traitement de reference.',
      'La spironolactone peut etre prescrite comme anti-androgene.',
      'Les complements a base de biotine, silicium et MSM peuvent aider.',
      'Un bilan sanguin (ferritine, zinc, vitamine D) est recommande.',
    ],
  },
  {
    id: 'acne',
    title: 'Acne hormonale',
    emoji: '\uD83D\uDE36',
    understand: [
      'L\'acne SOPK est typiquement hormonale : elle touche le bas du visage (menton, machoire, cou).',
      'Les androgenes stimulent la production de sebum, qui bouche les pores.',
      'Elle resiste souvent aux traitements topiques classiques car la cause est interne.',
    ],
    natural: [
      'Le zinc a des proprietes anti-inflammatoires et anti-androgenes.',
      'La NAC (N-Acetyl Cysteine) aide a reduire l\'inflammation.',
      'Reduire les produits laitiers peut aider (ils contiennent des facteurs de croissance).',
      'L\'huile de jojoba mime le sebum naturel et peut reguler la production.',
    ],
    medical: [
      'Les retinoides topiques (tretinoine) sont tres efficaces.',
      'Certaines pilules contraceptives anti-androgenes aident significativement.',
      'La spironolactone est souvent prescrite pour l\'acne hormonale resistante.',
      'L\'isotretinoine (Roaccutane) est un dernier recours mais tres efficace.',
    ],
  },
  {
    id: 'fertility',
    title: 'Fertilite et SOPK',
    emoji: '\uD83C\uDF3C',
    understand: [
      'Le SOPK est la premiere cause d\'infertilite anovulatoire, mais infertilite ne veut pas dire sterilite.',
      'Beaucoup de femmes SOPK tombent enceintes naturellement ou avec un peu d\'aide.',
      'Le probleme principal est l\'ovulation irreguliere ou absente.',
    ],
    natural: [
      'L\'inositol ameliore la qualite ovulatoire et les taux de grossesse dans les etudes.',
      'Maintenir un poids sain ameliore significativement l\'ovulation.',
      'La NAC peut ameliorer la qualite des ovocytes.',
      'Le CoQ10 soutient la qualite ovocytaire.',
    ],
    medical: [
      'Le citrate de clomifene est le traitement de premiere intention.',
      'Le letrozole est de plus en plus utilise et souvent plus efficace dans le SOPK.',
      'La metformine peut etre ajoutee pour ameliorer la reponse.',
      'La FIV est rarement necessaire mais reste une option.',
    ],
  },
  {
    id: 'fatigue',
    title: 'Fatigue chronique',
    emoji: '\uD83D\uDE34',
    understand: [
      'La fatigue est l\'un des symptomes les plus sous-estimes du SOPK.',
      'Elle peut etre causee par : resistance a l\'insuline (montagnes russes glycemiques), inflammation chronique, troubles du sommeil, carence en fer ou vitamine D.',
      'Le SOPK augmente aussi le risque d\'apnee du sommeil, meme sans surpoids.',
    ],
    natural: [
      'Stabiliser la glycemie est la premiere etape : repas equilibres, fibres en premier.',
      'Le magnesium aide le sommeil et la production d\'energie cellulaire.',
      'La vitamine D est souvent basse et sa correction ameliore l\'energie.',
      'L\'exercice regulier, paradoxalement, donne plus d\'energie a moyen terme.',
    ],
    medical: [
      'Un bilan complet est recommande : ferritine, vitamine D, TSH, glycemie a jeun.',
      'Traiter une eventuelle apnee du sommeil fait une difference enorme.',
      'La metformine peut aider si la fatigue est liee a la resistance a l\'insuline.',
      'Un suivi psychologique peut aider si la fatigue a une composante depressive.',
    ],
  },
  {
    id: 'weight',
    title: 'Poids et SOPK',
    emoji: '\u2696\uFE0F',
    understand: [
      'Environ 60-80% des femmes SOPK ont des difficultes avec le poids, mais le SOPK peut toucher des femmes de toutes corpulences.',
      'La resistance a l\'insuline favorise le stockage des graisses, surtout abdominales.',
      'Le metabolisme de base est souvent plus lent de 15-40% chez les femmes SOPK.',
    ],
    natural: [
      'L\'alimentation a IG bas est plus efficace que le comptage de calories dans le SOPK.',
      'L\'activite physique reguliere (surtout musculation) ameliore la composition corporelle.',
      'L\'inositol aide a ameliorer la sensibilite a l\'insuline et peut faciliter la perte de poids.',
      'Le sommeil suffisant est crucial : le manque de sommeil aggrave la resistance a l\'insuline.',
    ],
    medical: [
      'La metformine peut aider a reduire le poids lie a l\'insulinoresistance.',
      'Le GLP-1 (liraglutide, semaglutide) est de plus en plus etudie dans le SOPK.',
      'Un suivi dietetique specialise SOPK est plus efficace qu\'un regime classique.',
      'Ne jamais faire de regime restrictif severe : ca aggrave le SOPK a long terme.',
    ],
  },
];
