# 09 — Compléments Alimentaires

## Contexte produit

Les compléments sont un pilier du traitement SOPK : Inositol, Magnésium, Zinc, Vitamine D, Oméga-3… Mais c'est un enfer logistique : lesquels prendre, quand, avec quoi, ne pas oublier, gérer les stocks. Ce module transforme ce chaos en routine simple.

Important : l'app **n'est pas un prescripteur**. Elle aide à gérer ce que l'utilisatrice prend déjà sur recommandation de son médecin/naturopathe.

---

## User Stories

- Je veux configurer ma liste de compléments une fois et les cocher chaque jour
- Je veux savoir quand mon stock est bientôt vide pour racheter à temps
- Je veux comprendre les interactions (ex : ne pas prendre Fer avec Thé)
- Je veux voir mon taux de régularité

---

## Écran principal : `/supplements`

```
┌──────────────────────────────┐
│  Compléments                 │
│                              │
│  Régularité ce mois          │
│  ┌────────────────────────┐  │
│  │  ████████░░  82%       │  │  ← Barre de progression
│  │  "Bien joué, continue!│  │
│  └────────────────────────┘  │
│                              │
│  Mes compléments             │
│  ┌────────────────────────┐  │
│  │ 💊 Myo-Inositol        │  │
│  │ 2g matin + 2g soir     │  │
│  │ Stock : 18 jours       │  │
│  │              Modifier → │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 🧲 Magnésium Bisglycin.│  │
│  │ 300mg le soir           │  │
│  │ Stock : 4 jours  ⚠️    │  │  ← Warning si ≤ 5 jours
│  │              Modifier → │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ ☀️ Vitamine D3          │  │
│  │ 2000 UI matin           │  │
│  │ Stock : 45 jours        │  │
│  │              Modifier → │  │
│  └────────────────────────┘  │
│                              │
│  ┌───────────────────────┐   │
│  │ + Ajouter un complément│  │
│  └───────────────────────┘   │
│                              │
│  💡 Interactions à connaître │
│  ┌────────────────────────┐  │
│  │ Le Fer se prend loin   │  │  ← Cartes de tips, swipeable
│  │ du Thé et du Calcium…  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

---

## Sous-écran : Ajouter / Modifier un complément

```
┌──────────────────────────────┐
│  ← Nouveau complément        │
│                              │
│  Nom                         │
│  ┌────────────────────────┐  │
│  │ Saisir ou choisir ▼   │  │  ← Autocomplete avec presets
│  └────────────────────────┘  │
│                              │
│  Suggestions :               │
│  [Inositol] [Magnésium]     │
│  [Zinc] [Vitamine D]        │  ← Chips des plus courants SOPK
│  [Oméga-3] [Fer] [Berbérine]│
│  [NAC] [Vitamine B12]       │
│                              │
│  Dosage                      │
│  ┌────────────────────────┐  │
│  │ ex: 2g, 300mg, 1 caps │  │  ← Texte libre
│  └────────────────────────┘  │
│                              │
│  Quand le prendre ?          │
│  ┌──────┐ ┌──────┐ ┌──────┐│
│  │ Matin│ │ Soir │ │Les 2 ││  ← Single select
│  └──────┘ └──────┘ └──────┘│
│                              │
│  Stock restant (en jours)    │
│  ┌────────────────────────┐  │
│  │        [30]            │  │  ← Input numérique
│  └────────────────────────┘  │
│                              │
│  ┌───────────────────────┐   │
│  │   Enregistrer         │   │
│  └───────────────────────┘   │
│                              │
│  ┌───────────────────────┐   │
│  │   Supprimer           │   │  ← Ghost button, rouge discret
│  └───────────────────────┘   │    (visible en mode édition)
└──────────────────────────────┘
```

---

## Fiches d'interaction

Données statiques dans `src/data/supplement-interactions.ts`.

```typescript
type SupplementInteraction = {
  id: string;
  title: string;            // "Fer & Thé : attention"
  supplements: string[];    // ["Fer"]
  description: string;      // Explication courte
  rule: string;             // "Prends le fer au moins 2h avant ou après le thé/café"
  reason: string;           // "Les tanins bloquent l'absorption du fer jusqu'à 60%"
};
```

### Interactions essentielles (minimum)

| Interaction | Règle | Pourquoi |
|-------------|-------|----------|
| Fer + Thé/Café | 2h d'écart minimum | Les tanins bloquent l'absorption du fer |
| Fer + Calcium | Ne pas prendre ensemble | Le calcium inhibe l'absorption du fer |
| Vitamine D + Repas gras | Prendre pendant un repas avec lipides | La vitamine D est liposoluble |
| Magnésium + Soir | Prendre le soir de préférence | Effet relaxant, aide au sommeil |
| Inositol + Estomac vide | Prendre 15-30 min avant le repas | Meilleure absorption |
| Zinc + Estomac plein | Prendre pendant un repas | Évite les nausées |
| Oméga-3 + Repas | Prendre pendant un repas gras | Meilleure absorption |
| NAC + Matin | Prendre le matin à jeun | Meilleure biodisponibilité |

### Affichage contextuel

Quand l'utilisatrice a configuré ses compléments, l'app filtre les interactions pertinentes. Si elle prend du Fer et du Magnésium, elle ne voit que les interactions qui la concernent.

---

## Calcul de régularité

```typescript
function getComplianceRate(
  supplements: Supplement[],
  logs: SupplementLog[],
  dateRange: { from: Date; to: Date }
): number {
  // Pour chaque jour dans la plage :
  //   Pour chaque complément actif :
  //     Vérifier si un log existe pour ce supplement + ce jour + le bon period
  // Taux = logs trouvés / logs attendus × 100
}
```

Afficher un message encourageant selon le taux :
- ≥ 90% : "Impressionnant ! Tu es super régulière."
- 70-89% : "Bien joué, continue sur cette lancée !"
- 50-69% : "Pas mal ! Chaque prise compte."
- < 50% : "Les habitudes prennent du temps. L'important c'est de recommencer."

Jamais de ton négatif, même à 0%.

---

## Gestion du stock

- Le stock est en jours, pas en comprimés (plus simple mentalement)
- Quand l'utilisatrice coche un complément (dashboard), le stock est décrémenté de 0.5 si "matin" ou "soir", de 1 si "les deux" mais pris une fois
- Alert visuelle quand stock ≤ 5 jours : badge `coral-warning` sur la card
- Alert quand stock = 0 : "Stock épuisé ! Pense à racheter."
- L'utilisatrice peut réinitialiser le stock manuellement (après rachat)

---

## Composants React

```
src/pages/Supplements.tsx
src/components/supplements/
  ComplianceBar.tsx            ← Barre de régularité + message
  SupplementCard.tsx           ← Card d'un complément avec stock
  SupplementEditor.tsx         ← Formulaire ajout/modif
  SupplementPresets.tsx        ← Chips de compléments courants
  InteractionCards.tsx         ← Carrousel de fiches interaction
  StockWarning.tsx             ← Badge/banner d'alerte stock
```

---

## Edge Cases

- **Aucun complément configuré** : Écran accueillant "Tu prends des compléments ? Ajoute-les ici pour ne rien oublier." avec les presets affichés directement
- **Complément désactivé** : Possibilité de mettre un complément en pause (active: false) sans le supprimer. Il disparaît du dashboard mais garde l'historique.
- **Stock négatif** : Clamper à 0. Ne pas afficher de nombre négatif.
- **Modifier le stock** : Après un rachat, l'utilisatrice tape le nouveau stock manuellement. Pas de calcul automatique de la taille du paquet.

---

## Critères d'acceptation

- [ ] L'ajout de complément fonctionne avec nom (libre ou preset), dosage, moment, stock
- [ ] La modification et la suppression fonctionnent
- [ ] La désactivation (pause) cache le complément du dashboard
- [ ] Le stock est décrémenté à chaque prise cochée
- [ ] L'alerte ≤ 5 jours est visible sur la card et le dashboard
- [ ] La barre de régularité calcule correctement sur le mois en cours
- [ ] Les messages de régularité sont toujours bienveillants
- [ ] Les fiches d'interaction sont filtrées selon les compléments actifs
- [ ] Les presets couvrent les compléments SOPK courants
