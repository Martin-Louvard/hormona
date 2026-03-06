# 06 — Mouvement & Énergie

## Contexte produit

Le sport avec le SOPK est un terrain miné. Trop de HIIT peut augmenter le cortisol et aggraver les symptômes. Pas assez de mouvement aggrave l'insulinorésistance. La clé c'est le **Cycle Syncing** : adapter l'intensité au cycle hormonal.

Ce module ne remplace pas un coach. Il **suggère** le bon type d'activité au bon moment et apprend des retours de l'utilisatrice.

---

## User Stories

- Je veux savoir quel type de sport est adapté à ma phase actuelle
- Je veux noter mon activité rapidement
- Je veux donner un feedback post-effort pour que l'app apprenne
- Je veux voir mon historique pour repérer mes patterns

---

## Écran principal : `/movement`

```
┌──────────────────────────────┐
│  Mouvement                   │
│  Phase folliculaire 🌱       │
│                              │
│  ┌────────────────────────┐  │
│  │ Recommandation du jour │  │
│  │                        │  │
│  │ 💪 Musculation         │  │  ← Activité recommandée #1
│  │ ou                     │  │
│  │ 🏃 Cardio modéré       │  │  ← Activité recommandée #2
│  │                        │  │
│  │ "Ton énergie remonte,  │  │
│  │  profites-en pour      │  │
│  │  challenger tes        │  │
│  │  muscles !"            │  │
│  └────────────────────────┘  │
│                              │
│  ┌───────────────────────┐   │
│  │ + Noter une activité  │   │  ← Button primary
│  └───────────────────────┘   │
│                              │
│  Cette semaine               │
│  ┌────────────────────────┐  │
│  │ Lun  Mar  Mer  Jeu ... │  │
│  │  🧘   💪   ·    🏃  … │  │  ← Grille semaine avec emojis
│  └────────────────────────┘  │
│                              │
│  Historique récent            │
│  ┌────────────────────────┐  │
│  │ Hier · Yoga · 30min    │  │
│  │ Ressenti : Boostée ✨  │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ Lundi · HIIT · 25min   │  │
│  │ Ressenti : Épuisée 😮‍💨 │  │
│  │ 💡 Essaie de baisser   │  │  ← Suggestion si "épuisée"
│  │ l'intensité prochaine…  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

---

## Recommandations par phase (Cycle Syncing)

```typescript
type PhaseRecommendation = {
  phase: CyclePhase;
  activities: ActivitySuggestion[];
  explanation: string;
  intensity: 'low' | 'moderate' | 'high';
  emoji: string;
};

type ActivitySuggestion = {
  name: string;
  emoji: string;
  duration: string;      // "20-30 min"
  description: string;   // Brève explication
};
```

### Données

**Phase Menstruelle (Jour 1-5)** — Intensité : 🟢 Basse
- 🧘 Étirements doux (15-20 min) — "Détends ton bassin et ton dos"
- 🚶 Marche lente (20-30 min) — "En plein air si possible, la lumière aide"
- 🧘‍♀️ Yin Yoga (30 min) — "Postures au sol, respirations longues"
- Explication : "Tes hormones sont au plus bas. Ton corps se régénère. Respecte ce rythme."

**Phase Folliculaire (Jour 6-13)** — Intensité : 🟡 Modérée à haute
- 💪 Musculation (30-45 min) — "Les œstrogènes montent : tes muscles récupèrent mieux"
- 🏃 Cardio modéré (25-35 min) — "Course, vélo, natation"
- 🤸 Danse / Cours collectif (45 min) — "L'énergie sociale remonte aussi"
- Explication : "C'est ta fenêtre de puissance. Profites-en pour pousser un peu plus."

**Phase Ovulatoire (Jour 14-16)** — Intensité : 🔴 Haute
- 🔥 HIIT (20-25 min) — "Intervalles courts, récupération active"
- 💪 Musculation intense (40 min) — "Charges lourdes, peu de répétitions"
- 🏃‍♀️ Course intense / Sprint (20 min) — "Ton pic de testostérone aide la performance"
- Explication : "Pic d'énergie et de confiance. Ton corps est prêt pour l'intensité."

**Phase Lutéale (Jour 17-28)** — Intensité : 🟢 Basse à modérée
- 🧘 Pilates (30 min) — "Renforcement profond sans cortisol"
- 🧘‍♀️ Yoga Vinyasa (30 min) — "Fluidité et respiration"
- 🚶 Marche active (30-40 min) — "Maintiens le mouvement sans forcer"
- 🏊 Natation douce (30 min) — "L'eau apaise et l'impact est nul"
- Explication : "La progestérone monte, le cortisol aussi. Évite l'intensité qui stresse ton corps."

---

## Sous-écran : Noter une activité

```
┌──────────────────────────────┐
│  ← Nouvelle activité         │
│                              │
│  Qu'as-tu fait ?             │
│                              │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐       │
│  │🧘│ │💪│ │🏃│ │🔥│       │  ← Sélection rapide (les plus courants)
│  │Yog│ │Mus│ │Car│ │HIIT│   │
│  └──┘ └──┘ └──┘ └──┘       │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐       │
│  │🚶│ │🏊│ │🤸│ │✏️│       │
│  │Mar│ │Nat│ │Dan│ │Autr│   │  ← "Autre" ouvre un input texte
│  └──┘ └──┘ └──┘ └──┘       │
│                              │
│  Durée                       │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ │
│  │15 │ │20│ │30│ │45│ │60│ │  ← Chips prédéfinies (minutes)
│  └──┘ └──┘ └──┘ └──┘ └──┘ │
│                              │
│  ┌───────────────────────┐   │
│  │   Enregistrer         │   │
│  └───────────────────────┘   │
└──────────────────────────────┘
```

La saisie est conçue pour < 10 secondes. Pas de formulaire complexe.
Tout se fait par tap (pas de clavier sauf "Autre").

Au save : `cycle_phase_at_time` est auto-rempli par le cycle engine.

---

## Suivi Post-Effort

2 heures après l'enregistrement d'une activité (si l'app supporte les notifications — sinon, au prochain ouverture de l'app ce jour-là) :

```
┌────────────────────────────┐
│  Comment tu te sens après  │
│  ton yoga de ce matin ?    │
│                            │
│  ┌──────────┐ ┌──────────┐│
│  │ ✨ Boostée│ │😮‍💨 Épuisée││
│  └──────────┘ └──────────┘│
└────────────────────────────┘
```

Si "Épuisée" **et** que l'activité était d'intensité modérée/haute **et** que la phase est lutéale ou menstruelle :

> "C'est normal en phase [phase]. La prochaine fois, essaie [activité plus douce] à la place. Ton corps te remerciera."

Si "Épuisée" de manière récurrente (3x sur les 2 dernières semaines) :

> "Tu sembles souvent épuisée après le sport. Pense à réduire l'intensité globale cette semaine."

---

## Grille de la semaine

7 colonnes (Lun-Dim), chaque cellule montre :
- L'emoji de l'activité si logée
- Un point gris si rien
- Aujourd'hui est entouré d'un cercle phase-color

Tap sur une cellule : ouvre le détail de l'activité de ce jour.

---

## Composants React

```
src/pages/Movement.tsx
src/components/movement/
  PhaseRecommendation.tsx      ← Card avec les suggestions du jour
  ActivityLogger.tsx           ← Écran de saisie rapide
  ActivityTypeSelector.tsx     ← Grille d'emojis d'activités
  DurationPicker.tsx           ← Chips de durée
  PostEffortPrompt.tsx         ← Prompt "Boostée / Épuisée"
  WeekGrid.tsx                 ← Grille 7 jours
  ExerciseHistoryCard.tsx      ← Card d'historique avec feedback
```

---

## Edge Cases

- **Phase inconnue** : Afficher les recommandations "générales" (marche, yoga, musculation légère) sans mention de phase
- **Activité logée mais pas de feedback** : Rappeler au prochain lancement de l'app
- **Plusieurs activités le même jour** : Permis. Chaque entrée est indépendante
- **Durée personnalisée** : Si aucune chip ne convient, afficher un input numérique

---

## Critères d'acceptation

- [ ] Les recommandations changent selon la phase du cycle
- [ ] La saisie d'activité est possible en < 10 secondes (type + durée + save)
- [ ] La phase est auto-enregistrée avec l'activité
- [ ] Le prompt post-effort s'affiche (au retour dans l'app si pas de notif)
- [ ] Le feedback "Épuisée" génère un conseil adapté
- [ ] La grille de la semaine est visuelle et tappable
- [ ] L'historique récent affiche le type, durée et ressenti
