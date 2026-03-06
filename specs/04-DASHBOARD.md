# 04 — Dashboard

## Contexte produit

Le dashboard est le rituel quotidien. L'utilisatrice l'ouvre chaque matin comme elle ouvrirait un journal. En 5 secondes, elle doit savoir :
1. Où elle en est dans son cycle
2. Comment elle se sent (et l'exprimer)
3. Ce qu'elle peut faire aujourd'hui pour aller mieux
4. Si elle a pris ses compléments

C'est un écran de **confort**, pas un tableau de bord analytique. Pas de surcharge. Chaque élément a une raison d'être.

---

## User Stories

- Je veux savoir en un coup d'œil quel jour de mon cycle je suis et dans quelle phase
- Je veux exprimer mon humeur en 1 tap pour garder une trace
- Je veux recevoir un conseil adapté à ma phase actuelle
- Je veux cocher mes compléments du matin/soir sans naviguer ailleurs

---

## Layout de l'écran

```
┌──────────────────────────────┐
│  Bonjour, Léa 🌱             │  ← Salutation + emoji phase
│  Jour 8 · Phase folliculaire │  ← Sous-titre caption
│                              │
│  ┌────────────────────────┐  │
│  │    ╭──────────╮        │  │
│  │    │  JOUR 8  │        │  │  ← ProgressRing avec jour au centre
│  │    │  /28     │        │  │     Couleur = couleur de phase
│  │    ╰──────────╯        │  │
│  │  Folliculaire 🌱       │  │  ← PhaseIndicator badge
│  │  "Ton énergie remonte… │  │  ← Conseil contextuel (1-2 lignes)
│  └────────────────────────┘  │
│                              │
│  Comment tu te sens ?        │  ← text-heading
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐  │
│  │☀️│ │⛅│ │🌧│ │⛈│ │🌫│  │  ← MoodSelector
│  └──┘ └──┘ └──┘ └──┘ └──┘  │
│                              │
│  Tes compléments             │  ← text-heading
│  ┌────────────────────────┐  │
│  │ ☐ Inositol (matin)     │  │  ← CheckboxCard pour chaque complément
│  │ ☐ Magnésium (matin)    │  │
│  │ ☑ Vitamine D (matin)   │  │  ← Déjà coché = style success
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │ 💡 Le savais-tu ?      │  │  ← Card "tip du jour"
│  │ En phase folliculaire, │  │     Contenu tiré de tips.ts
│  │ ton corps répond mieux │  │     Change chaque jour
│  │ à l'exercice intense…  │  │
│  └────────────────────────┘  │
│                              │
│         [Bottom Nav]         │
└──────────────────────────────┘
```

---

## Composants React

```
src/pages/Dashboard.tsx                ← Page principale
src/components/dashboard/
  Greeting.tsx                         ← "Bonjour, Léa 🌱"
  CycleRing.tsx                        ← ProgressRing + infos cycle
  ContextualTip.tsx                    ← Conseil adapté à la phase
  SupplementChecklist.tsx              ← Liste des compléments à cocher
  DailyInsight.tsx                     ← Card "Le savais-tu ?"
```

### Greeting

```typescript
type GreetingProps = {
  displayName: string;
  phase: CyclePhase;
  cycleDay: number;
};
```

Logique de salutation selon l'heure :
- 5h-12h : "Bonjour"
- 12h-18h : "Bon après-midi"
- 18h-22h : "Bonsoir"
- 22h-5h : "Bonne nuit"

### CycleRing

Consomme le hook `useCycle()`. Affiche :
- Le ProgressRing SVG (couleur de phase, progression du cycle)
- Le jour au centre en `text-data` (gros chiffre)
- Le total sous le chiffre en `text-caption`
- Le badge PhaseIndicator en dessous
- Le conseil contextuel (1 phrase) extrait de `tips.ts`

Quand `isEstimate` est true : le ring devient en pointillés et affiche un message spécifique.

### ContextualTip

```typescript
type ContextualTipProps = {
  phase: CyclePhase;
  phaseDay: number;
};
```

Tire un conseil depuis `src/lib/tips.ts`. Système de rotation : pas le même conseil si elle revient le lendemain. Utiliser `phaseDay` comme seed pour choisir dans un tableau de conseils par phase.

### SupplementChecklist

```typescript
// Récupère les compléments actifs du user depuis supplementStore
// Filtre par time_of_day en fonction de l'heure actuelle
// Croise avec supplement_logs du jour pour savoir ce qui est déjà coché
```

Chaque item est une `Card interactive` avec une checkbox. Au tap :
1. Animation check (scale bounce)
2. Écriture dans `supplement_logs` (Supabase)
3. Décrémentation de `stock_remaining_days` dans le supplement
4. Si stock ≤ 5 : afficher un badge `coral-warning` "Plus que 5 jours"

Afficher "matin" ou "soir" selon l'heure (pivot à 14h).

### DailyInsight

Card avec icône 💡. Contenu rotatif tiré d'un fichier de données statique. Un insight par jour, lié à la phase. Pas de répétition sur 14 jours minimum.

---

## Données : `src/lib/tips.ts`

Structure :

```typescript
type Tip = {
  id: string;
  phase: CyclePhase | 'all';
  category: 'nutrition' | 'movement' | 'mindset' | 'science';
  text: string;        // Le conseil (1-2 phrases, tutoiement)
  source?: string;     // Référence scientifique optionnelle
};

// Minimum 10 tips par phase = 40+ tips au total
```

**Exemples par phase :**

Menstruelle :
- "Sois douce avec toi-même. Le magnésium avant le coucher peut réduire les crampes."
- "Ton corps a besoin de fer cette semaine. Pense aux lentilles ou aux épinards."

Folliculaire :
- "Ton énergie remonte ! C'est le meilleur moment pour essayer un nouveau sport."
- "Les œstrogènes augmentent : ta peau devrait s'améliorer ces jours-ci."

Ovulatoire :
- "Pic d'énergie et de confiance. Profite de cette fenêtre pour tes défis sociaux."
- "Ton métabolisme accélère : tu peux te permettre un repas plus copieux."

Lutéale :
- "Privilégie les glucides complexes ce soir — patate douce, riz complet — pour mieux dormir."
- "Le cortisol monte : 10 minutes de respiration profonde peuvent faire la différence."

---

## États de l'écran

### État nominal
Toutes les données sont disponibles. Affichage complet.

### État "Première visite du jour"
Le mood n'est pas encore saisi. Le MoodSelector est mis en avant visuellement (légère pulsation du titre "Comment tu te sens ?").

### État "Mood déjà saisi"
Le MoodSelector affiche le choix avec son style sélectionné. Possibilité de changer en re-tapant.

### État "Pas de compléments configurés"
La section compléments est remplacée par une Card : "Tu prends des compléments ? Configure-les pour ne rien oublier." avec un lien vers /supplements.

### État "Cycle inconnu"
Le CycleRing affiche un cercle vide avec "?" au centre. Message : "Indique tes dernières règles dans les réglages pour des conseils personnalisés."

### État loading
Skeleton screens sur chaque section (rectangles arrondis animés en pulse).

---

## Interactions

| Action | Résultat |
|--------|----------|
| Tap sur un mood | Sauvegarde en DB, animation bounce, remplacement du sélecteur par l'état sélectionné |
| Tap sur checkbox complément | Toggle dans supplement_logs, animation check, mise à jour stock |
| Tap sur le CycleRing | Navigation vers une vue détaillée du cycle (future feature, pour l'instant no-op) |
| Pull-to-refresh | Recharge les données depuis Supabase |

---

## Critères d'acceptation

- [ ] La salutation utilise le prénom et change selon l'heure
- [ ] Le ProgressRing affiche le jour correct et la couleur de la phase
- [ ] Le MoodSelector sauvegarde en DB et affiche l'état persisté
- [ ] La checklist de compléments reflète l'heure (matin/soir) et les logs du jour
- [ ] Cocher un complément décrémente le stock et affiche l'alerte si ≤ 5 jours
- [ ] Le conseil contextuel change selon la phase et le jour
- [ ] L'état "cycle inconnu" est géré proprement avec un message d'invitation
- [ ] L'état "pas de compléments" redirige vers la configuration
- [ ] Le skeleton loading est affiché pendant le chargement initial
