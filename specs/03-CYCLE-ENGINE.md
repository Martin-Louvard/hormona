# 03 — Cycle Engine

## Contexte produit

Le moteur de cycle est le cerveau de l'app. C'est une **bibliothèque de fonctions pures** (aucun side effect, aucune dépendance UI) qui calcule la phase du cycle, le jour courant, et les prédictions. Tout le reste de l'app consomme ces fonctions.

C'est critique de le faire proprement car les conseils nutritionnels, sportifs et les insights du dashboard en dépendent directement. Un mauvais calcul = des conseils décalés = une perte de confiance.

---

## Fichier cible

```
src/lib/cycle.ts     ← Fonctions pures exportées
src/lib/cycle.test.ts ← Tests Vitest
src/hooks/useCycle.ts ← Hook React qui combine le store + les fonctions
```

---

## Modèle de données en entrée

```typescript
type CycleInput = {
  lastPeriodStart: Date;    // Date du 1er jour des dernières règles
  cycleLengthAvg: number;   // Durée moyenne du cycle (20-45 jours)
  today?: Date;             // Optionnel, pour les tests. Default = now
};
```

## Sorties attendues

```typescript
type CyclePhase = 'menstrual' | 'follicular' | 'ovulatory' | 'luteal';

type CycleInfo = {
  currentDay: number;           // Jour X du cycle (1 = premier jour des règles)
  totalDays: number;            // Durée totale du cycle
  phase: CyclePhase;            // Phase actuelle
  phaseDay: number;             // Jour X dans la phase actuelle
  phaseTotalDays: number;       // Durée totale de cette phase
  phaseProgress: number;        // 0.0 à 1.0, progression dans la phase
  cycleProgress: number;        // 0.0 à 1.0, progression globale du cycle
  nextPhase: CyclePhase;        // Prochaine phase
  daysUntilNextPhase: number;   // Jours restants avant changement
  estimatedNextPeriod: Date;    // Date estimée des prochaines règles
  isEstimate: boolean;          // true si on est au-delà du cycle prévu (retard)
};
```

---

## Algorithme de calcul des phases

Le cycle est divisé **proportionnellement** à la durée réelle, pas en jours fixes :

```
Phase Menstruelle  : Jour 1   → ~17% du cycle
Phase Folliculaire : ~17%     → ~46% du cycle
Phase Ovulatoire   : ~46%     → ~57% du cycle
Phase Lutéale      : ~57%     → 100% du cycle
```

### Formules concrètes pour un cycle de N jours

```typescript
function getPhaseRanges(cycleDays: number) {
  return {
    menstrual:  { start: 1, end: Math.round(cycleDays * 0.17) },
    follicular: { start: Math.round(cycleDays * 0.17) + 1, end: Math.round(cycleDays * 0.46) },
    ovulatory:  { start: Math.round(cycleDays * 0.46) + 1, end: Math.round(cycleDays * 0.57) },
    luteal:     { start: Math.round(cycleDays * 0.57) + 1, end: cycleDays },
  };
}
```

**Exemples concrets :**

| Cycle de 28j | Menstruelle | Folliculaire | Ovulatoire | Lutéale   |
|--------------|-------------|--------------|------------|-----------|
| Jours        | 1-5         | 6-13         | 14-16      | 17-28     |

| Cycle de 35j | Menstruelle | Folliculaire | Ovulatoire | Lutéale   |
|--------------|-------------|--------------|------------|-----------|
| Jours        | 1-6         | 7-16         | 17-20      | 21-35     |

---

## Fonctions à exporter

### `getCycleInfo(input: CycleInput): CycleInfo`
Fonction principale. Retourne toutes les infos du cycle.

### `getCyclePhase(day: number, cycleDays: number): CyclePhase`
Retourne la phase pour un jour donné.

### `getCycleDay(lastPeriodStart: Date, today?: Date): number`
Retourne le jour du cycle. Si la date dépasse le cycle prévu, on boucle (modulo cycleDays) pour estimer, mais `isEstimate` est true.

### `getPhaseEmoji(phase: CyclePhase): string`
```
menstrual → 🌙
follicular → 🌱
ovulatory → ☀️
luteal → 🍂
```

### `getPhaseLabel(phase: CyclePhase): string`
```
menstrual → "Menstruelle"
follicular → "Folliculaire"
ovulatory → "Ovulatoire"
luteal → "Lutéale"
```

### `getPhaseColor(phase: CyclePhase): string`
Retourne le token Tailwind de la couleur de phase.

---

## Hook React : `useCycle()`

```typescript
function useCycle(): CycleInfo & {
  isLoading: boolean;
  refresh: () => void;
} {
  // Lit lastPeriodStart et cycleLengthAvg depuis le cycleStore (Zustand)
  // Appelle getCycleInfo() avec ces données
  // Retourne le résultat + état de chargement
}
```

Le hook recalcule quand :
- Le store change (nouvelle date de règles saisie)
- Le jour change (vérifier avec un interval toutes les 60 secondes, ou au focus de l'app)

---

## Edge Cases critiques

### Cycle en retard
Si `currentDay > cycleDays` : on continue d'afficher la phase lutéale, mais :
- `isEstimate = true`
- `currentDay` continue d'incrémenter
- Afficher sur le dashboard : "Jour 32 — Tes règles ont du retard ? C'est courant avec le SOPK."

### Pas de date de règles
Si `lastPeriodStart` est null (onboarding skippé) :
- Toutes les fonctions retournent un état "inconnu"
- Le dashboard affiche : "Indique la date de tes dernières règles pour débloquer les conseils personnalisés."
- Les modules nutrition/sport fonctionnent quand même mais sans personnalisation par phase

### Nouveau cycle
Quand l'utilisatrice signale de nouvelles règles (via le tracking), on met à jour `lastPeriodStart` et on recalcule `cycleLengthAvg` comme une moyenne mobile sur les 3 derniers cycles connus.

---

## Tests unitaires (Vitest)

Écrire des tests pour :

```
✓ Cycle 28j, jour 1  → menstrual, phase day 1
✓ Cycle 28j, jour 5  → menstrual, phase day 5
✓ Cycle 28j, jour 6  → follicular, phase day 1
✓ Cycle 28j, jour 14 → ovulatory
✓ Cycle 28j, jour 17 → luteal
✓ Cycle 28j, jour 28 → luteal, dernière jour
✓ Cycle 35j, jour 20 → ovulatory (proportionnel)
✓ Cycle 21j, jour 15 → luteal (proportionnel)
✓ Jour > cycleDays   → luteal + isEstimate true
✓ lastPeriodStart null → retourne état "unknown"
✓ cycleProgress à jour 14/28 → 0.5
✓ estimatedNextPeriod correcte
✓ daysUntilNextPhase correcte à chaque transition
```

---

## Critères d'acceptation

- [ ] `cycle.ts` exporte toutes les fonctions listées ci-dessus
- [ ] Aucune dépendance UI dans `cycle.ts` (fonctions pures uniquement)
- [ ] Le calcul est proportionnel à la durée du cycle (pas de jours fixes)
- [ ] `useCycle()` hook fonctionne et se met à jour avec le store
- [ ] Tous les tests unitaires passent
- [ ] Edge case "retard de règles" géré avec `isEstimate`
- [ ] Edge case "pas de date" géré avec état "unknown"
