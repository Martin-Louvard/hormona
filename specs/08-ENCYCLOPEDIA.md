# 08 — Encyclopédie SOPK

## Contexte produit

Une femme vient d'apprendre qu'elle a le SOPK. Elle googles. Elle tombe sur des forums catastrophistes, des régimes miracles, des infos contradictoires. Elle panique.

Ce module est l'antidote : du contenu **vulgarisé, vérifié, structuré**. Organisé en parcours pour ne pas saturer. Le ton est celui d'une amie médecin qui t'explique avec des mots simples.

Tout le contenu est statique (pas de CMS, pas d'API). Il vit dans des fichiers TypeScript structurés.

---

## User Stories

- Je viens d'être diagnostiquée et je ne comprends rien → Parcours "Nouveau diagnostic"
- J'ai un symptôme précis et je veux comprendre pourquoi → Symptomathèque
- Je veux rester informée des avancées → Coin des études

---

## Écran principal : `/encyclopedia`

```
┌──────────────────────────────┐
│  S'informer                  │
│                              │
│  ┌────────────────────────┐  │
│  │ 🎓 Nouveau diagnostic  │  │  ← Card CTA, gradient doux
│  │ 5 fiches pour          │  │
│  │ comprendre les bases   │  │
│  │                ──→     │  │
│  └────────────────────────┘  │
│                              │
│  Symptomathèque              │
│  ┌────────┐ ┌────────┐      │
│  │ 🪒     │ │ 💇‍♀️    │      │
│  │Hirsut. │ │Cheveux │      │  ← Grille 2 colonnes
│  └────────┘ └────────┘      │
│  ┌────────┐ ┌────────┐      │
│  │ 😤     │ │ 🤰     │      │
│  │ Acné   │ │Fertil. │      │
│  └────────┘ └────────┘      │
│  ┌────────┐ ┌────────┐      │
│  │ 😴     │ │ ⚖️     │      │
│  │Fatigue │ │ Poids  │      │
│  └────────┘ └────────┘      │
│                              │
│  Le coin des études          │
│  ┌────────────────────────┐  │
│  │ 🧬 Microbiote & SOPK  │  │  ← Card article
│  │ Mars 2025              │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 🧬 Inositol : ce que   │  │
│  │ disent les études      │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

---

## Section 1 : Parcours "Nouveau Diagnostic"

5 fiches courtes, à lire dans l'ordre. Chaque fiche = 1 écran scrollable. Navigation : "Suivant →" en bas.

### Fiche 1 : "C'est quoi le SOPK ?"
- Syndrome, pas maladie unique. Touche 1 femme sur 10.
- Le nom est trompeur : on n'a pas toujours des kystes.
- 3 critères de Rotterdam (oligo-ovulation, hyperandrogénie, ovaires polykystiques). Il faut 2 sur 3.
- Ce n'est pas ta faute. C'est hormonal et souvent génétique.

### Fiche 2 : "L'insuline, le chef d'orchestre"
- L'insulinorésistance touche ~70% des femmes SOPK.
- L'insuline trop haute stimule les ovaires → trop d'androgènes.
- C'est le levier principal : stabiliser l'insuline améliore presque tout.
- Analogie : l'insuline est comme un videur de boîte de nuit. Quand il est débordé, il laisse passer n'importe quoi.

### Fiche 3 : "Les androgènes, c'est quoi ?"
- Hormones dites "masculines" (testostérone, DHEA-S) mais toutes les femmes en ont.
- Trop d'androgènes → acné, pilosité, perte de cheveux.
- Le lien avec l'insuline : insuline ↑ → androgènes ↑.

### Fiche 4 : "Ton cycle avec le SOPK"
- Cycles irréguliers = ovulation irrégulière, pas absence d'ovulation.
- Pourquoi les cycles sont longs : le follicule met plus de temps à mûrir.
- Les 4 phases du cycle et ce qui se passe hormonalement dans chacune.

### Fiche 5 : "Ce que tu peux faire"
- Résumé des leviers : alimentation IG bas, sport adapté, gestion du stress, sommeil, compléments.
- Pas de solution miracle. C'est un marathon, pas un sprint.
- L'app est là pour t'accompagner dans chacun de ces leviers.
- CTA vers le dashboard.

### Indicateur de progression

Barre de progression en haut (1/5, 2/5…). Les fiches déjà lues sont marquées (vert). L'état de lecture est sauvegardé localement (Zustand persist).

---

## Section 2 : Symptomathèque

6 fiches de symptômes. Chaque fiche a 3 sections : Comprendre, Solutions naturelles, Options médicales.

### Structure de données

```typescript
type SymptomArticle = {
  id: string;
  title: string;
  emoji: string;
  summary: string;           // 1 phrase pour l'écran principal
  sections: {
    understand: string;      // Explication vulgarisée
    natural: string;         // Solutions naturelles / lifestyle
    medical: string;         // Options médicales (informatives, pas prescriptives)
  };
  relatedSupplements: string[];  // Liens vers les compléments pertinents
};
```

### Les 6 symptômes

**🪒 Hirsutisme**
- Comprendre : Excès de poils (visage, ventre, dos) causé par les androgènes. Touche ~70% des femmes SOPK.
- Naturel : Thé de menthe poivrée (2 tasses/jour réduit les androgènes libres — étude Phytotherapy Research 2010). Inositol.
- Médical : Spironolactone, pilule anti-androgénique, laser/IPL.

**💇‍♀️ Perte de cheveux**
- Comprendre : Alopécie androgénétique. Le DHT (dérivé de la testostérone) miniaturise les follicules.
- Naturel : Compléments zinc + biotine, massage cuir chevelu, réduction du stress.
- Médical : Minoxidil topique, spironolactone, PRP.

**😤 Acné hormonale**
- Comprendre : Localisée mâchoire/menton/cou (zone hormono-dépendante). Différente de l'acné d'adolescence.
- Naturel : Réduction des produits laitiers, zinc, niacinamide topique, réduction du sucre.
- Médical : Trétinoïne, spironolactone, pilule, isotrétinoïne (cas sévères).

**🤰 Fertilité**
- Comprendre : Le SOPK est la 1re cause d'infertilité par anovulation. Mais la majorité des femmes SOPK peuvent concevoir.
- Naturel : Perte de 5-10% du poids (si surpoids) restaure souvent l'ovulation. Inositol, régulation de l'insuline.
- Médical : Letrozole (1re ligne), clomifène, metformine, FIV en dernier recours.

**😴 Fatigue chronique**
- Comprendre : Multi-factorielle : insulinorésistance (= montagnes russes de glycémie), inflammation, apnée du sommeil (sous-diagnostiquée), carence en fer/B12/D.
- Naturel : Alimentation IG bas, fer si carence, vitamine D, mouvement régulier, hygiène de sommeil.
- Médical : Bilan sanguin complet (ferritine, B12, D, thyroïde), test apnée du sommeil.

**⚖️ Prise de poids**
- Comprendre : L'insulinorésistance favorise le stockage, surtout abdominal. La perte de poids est plus difficile, pas impossible.
- Naturel : Alimentation IG bas (pas de restriction calorique agressive), musculation (augmente la sensibilité à l'insuline), gestion du cortisol.
- Médical : Metformine, inositol, accompagnement nutritionnel spécialisé SOPK.

### Layout d'une fiche symptôme

```
┌──────────────────────────────┐
│  ← Hirsutisme 🪒             │
│                              │
│  [Comprendre]                │  ← Tabs ou accordéon
│  [Naturel]                   │
│  [Médical]                   │
│                              │
│  ─── Section active ───      │
│                              │
│  Texte formaté en            │
│  paragraphes courts,         │
│  avec sous-titres et         │
│  listes courtes si besoin.   │
│                              │
│  Compléments associés        │
│  ┌──────────┐ ┌──────────┐  │
│  │ Zinc     │ │ Inositol │  │  ← Liens vers la section compléments
│  └──────────┘ └──────────┘  │
└──────────────────────────────┘
```

---

## Section 3 : Le Coin des Études

Articles courts (300-400 mots) vulgarisant des études récentes. Contenu statique, mis à jour manuellement. Minimum 5 articles au lancement.

```typescript
type StudyArticle = {
  id: string;
  title: string;
  date: string;          // "Mars 2025"
  emoji: string;
  summary: string;       // 2 lignes pour la liste
  content: string;       // Article complet
  source: string;        // Référence
};
```

Idées d'articles :
1. "Le microbiote intestinal et le SOPK : un lien de plus en plus clair"
2. "Inositol vs Metformine : que disent les méta-analyses ?"
3. "Pourquoi le stress aggrave le SOPK (et que faire)"
4. "Vitamine D et fertilité dans le SOPK"
5. "L'exercice en résistance : meilleur que le cardio pour l'insulinorésistance ?"

---

## Composants React

```
src/pages/Encyclopedia.tsx
src/components/encyclopedia/
  DiagnosisPathway.tsx         ← Parcours 5 fiches avec progression
  PathwayCard.tsx              ← Une fiche du parcours (scrollable)
  SymptomGrid.tsx              ← Grille 2×3 des symptômes
  SymptomArticlePage.tsx       ← Vue détaillée d'un symptôme
  StudyFeed.tsx                ← Liste des articles études
  StudyArticlePage.tsx         ← Vue lecture d'un article
```

### Données statiques

```
src/data/
  diagnosis-pathway.ts         ← 5 fiches du parcours
  symptom-articles.ts          ← 6 fiches symptômes
  study-articles.ts            ← 5+ articles études
```

---

## Edge Cases

- **Contenu médical** : Toujours ajouter un disclaimer : "Ces informations ne remplacent pas un avis médical. Parle à ton médecin avant de commencer un traitement."
- **Parcours déjà terminé** : Montrer un badge "✓ Terminé" sur la card, mais permettre de relire
- **Liens entre sections** : La symptomathèque peut linker vers les compléments (spec 09) et vice-versa

---

## Critères d'acceptation

- [ ] Le parcours "Nouveau diagnostic" affiche 5 fiches avec navigation séquentielle
- [ ] La progression de lecture est sauvegardée (persist Zustand)
- [ ] La symptomathèque affiche 6 symptômes avec 3 onglets chacun
- [ ] Les articles du coin des études sont lisibles et sourcés
- [ ] Le disclaimer médical est présent sur chaque fiche
- [ ] Les liens vers les compléments associés fonctionnent
- [ ] Le contenu est entièrement en français, tutoiement, ton bienveillant
