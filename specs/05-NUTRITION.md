# 05 — Nutrition & Métabolisme

## Contexte produit

L'insulinorésistance est le mécanisme central du SOPK. 70% des femmes SOPK ont un problème d'insuline, même minces. L'objectif de ce module n'est **pas** de compter les calories (interdit), mais d'apprendre à **construire une assiette** qui stabilise la glycémie.

Trois leviers :
1. **Catégoriser** les aliments (protéines, glucides IG bas/haut, lipides, fibres) au lieu de les peser
2. **L'ordre des aliments** : fibres → protéines/lipides → glucides (réduit le pic glycémique de ~30%)
3. **Gérer les fringales** avec des alternatives adaptées à la phase du cycle

---

## User Stories

- Je veux noter ce que j'ai mangé rapidement, sans peser ni compter
- Je veux vérifier l'index glycémique d'un aliment et trouver une alternative meilleure
- Je veux un "SOS Fringale" quand j'ai envie de craquer
- Je veux voir si j'ai un bon équilibre sur ma semaine

---

## Écran principal : `/nutrition`

```
┌──────────────────────────────┐
│  Alimentation                │  ← text-display
│  Phase folliculaire 🌱       │  ← PhaseIndicator
│                              │
│  ┌────────────────────────┐  │
│  │  🔍 Rechercher un IG   │  │  ← Barre de recherche IG
│  └────────────────────────┘  │
│                              │
│  Aujourd'hui                 │
│  ┌────────────────────────┐  │
│  │ 🌅 Petit-déjeuner      │  │  ← MealCard (tap → édition)
│  │ Œufs, avocat, pain IG…│  │
│  │ 🥬 Fibres en premier ✓ │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ ☀️ Déjeuner            │  │
│  │ Non renseigné          │  │  ← État vide, invitant
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 🌙 Dîner               │  │
│  │ Non renseigné          │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │ 🆘 SOS Fringale        │  │  ← Bouton highlight, rose-soft bg
│  └────────────────────────┘  │
│                              │
│  Équilibre de la semaine     │
│  ┌────────────────────────┐  │
│  │ [Barres empilées x 7j] │  │  ← Mini chart hebdo
│  └────────────────────────┘  │
│                              │
└──────────────────────────────┘
```

---

## Sous-écran : Saisie d'un repas

Modal ou page dédiée. Pas de formulaire complexe — on ajoute des "items" un par un.

```
┌──────────────────────────────┐
│  ← Petit-déjeuner            │
│                              │
│  Qu'as-tu mangé ?            │
│  ┌────────────────────────┐  │
│  │ Nom de l'aliment…      │  │  ← Input texte libre
│  └────────────────────────┘  │
│                              │
│  Catégorie                   │
│  ┌──────┐ ┌──────┐          │
│  │🥩 Prot│ │🍞 Gluc│         │  ← Boutons de catégorie
│  └──────┘ └──────┘          │
│  ┌──────┐ ┌──────┐          │
│  │🥑 Lip │ │🥬 Fib │         │
│  └──────┘ └──────┘          │
│                              │
│  Si Glucide sélectionné :    │
│  ┌──────────┐ ┌──────────┐  │
│  │ IG Bas 🟢│ │ IG Haut 🔴│  │  ← Sous-catégorie
│  └──────────┘ └──────────┘  │
│                              │
│  Si Protéine sélectionné :   │
│  ┌──────────┐ ┌──────────┐  │
│  │ Animale  │ │ Végétale │  │
│  └──────────┘ └──────────┘  │
│                              │
│  ┌───────────────────────┐   │
│  │   + Ajouter           │   │  ← Ajoute l'item à la liste
│  └───────────────────────┘   │
│                              │
│  Items ajoutés :             │
│  🥩 Œufs brouillés          │  ← Chip supprimable
│  🥑 Avocat                   │
│  🍞🟢 Pain complet           │
│                              │
│  ┌────────────────────────┐  │
│  │ 🥬 Fibres en premier ? │  │  ← Toggle avec explication
│  │    ○ Oui   ● Non       │  │
│  └────────────────────────┘  │
│                              │
│  ┌───────────────────────┐   │
│  │   Enregistrer         │   │
│  └───────────────────────┘   │
└──────────────────────────────┘
```

### Rappel visuel "Ordre des aliments"

Quand l'utilisatrice coche "Fibres en premier : Non", afficher un encart doux (pas une alerte) :

> 💡 Manger les fibres et protéines avant les glucides peut réduire ton pic de glycémie de 30%. Essaie demain ?

Ne jamais culpabiliser. Le ton est informatif et encourageant.

---

## Sous-écran : Recherche Index Glycémique

```
┌──────────────────────────────┐
│  ← Index Glycémique          │
│                              │
│  ┌────────────────────────┐  │
│  │ 🔍 Rechercher…         │  │  ← Recherche instantanée
│  └────────────────────────┘  │
│                              │
│  Résultat pour "Riz blanc" : │
│  ┌────────────────────────┐  │
│  │  Riz blanc              │  │
│  │  IG : 72  🔴 Élevé     │  │
│  │                         │  │
│  │  💡 Alternative :       │  │
│  │  Riz basmati complet    │  │
│  │  IG : 50  🟢 Bas       │  │
│  │                         │  │
│  │  Ou ajoute des brocolis │  │
│  │  pour baisser la charge │  │
│  │  glycémique globale.    │  │
│  └────────────────────────┘  │
│                              │
│  Catégories populaires       │
│  🍞 Céréales & féculents    │  ← Filtres par catégorie
│  🍎 Fruits                   │
│  🥛 Produits laitiers        │
│  🍫 Sucres & snacks          │
└──────────────────────────────┘
```

### Base de données IG : `src/lib/gi-database.ts`

Données statiques embarquées dans l'app (pas d'API externe). Minimum 80 aliments couvrant les catégories courantes.

```typescript
type GIEntry = {
  id: string;
  name: string;            // "Riz blanc"
  gi: number;              // 72
  level: 'low' | 'medium' | 'high';
  category: string;        // "Céréales & féculents"
  alternatives: string[];  // ["Riz basmati complet", "Quinoa"]
  tip?: string;            // "Ajoute des brocolis pour baisser la CG"
};
```

Seuils IG :
- 🟢 Bas : < 55
- 🟡 Moyen : 55-69
- 🔴 Élevé : ≥ 70

Recherche : filtrage fuzzy simple sur `name` (normalize, lowercase, includes). Pas besoin de Fuse.js — un `filter` suffit.

---

## SOS Fringale

Bouton toujours accessible. Au tap, ouvre un mini flow :

**Étape 1 :** "C'est quel genre de fringale ?"
- 🍫 Sucré
- 🧀 Salé
- 🍕 Gras / Réconfort

**Étape 2 :** L'app connaît la phase du cycle et propose une collation adaptée.

```typescript
type CravingResponse = {
  phase: CyclePhase;
  cravingType: 'sweet' | 'salty' | 'comfort';
  suggestion: string;    // "Poignée d'amandes + 2 carrés de chocolat noir 85%"
  explanation: string;   // "Le magnésium du chocolat noir aide à calmer..."
};
```

**Exemples de réponses :**

| Phase | Fringale | Suggestion |
|-------|----------|------------|
| Lutéale | Sucré | "Yaourt grec + miel + noix. Les protéines stabilisent ta glycémie pendant que le miel satisfait l'envie." |
| Lutéale | Salé | "Houmous + bâtonnets de concombre. Le sel du houmous + les fibres du concombre." |
| Folliculaire | Sucré | "Pomme + beurre de cacahuète. L'énergie est là, un snack léger suffit." |
| Menstruelle | Réconfort | "Chocolat noir 85% + banane. Le magnésium aide les crampes, le potassium détend les muscles." |

Minimum 3 suggestions par combinaison phase × type de fringale = 36 entrées.

---

## Graphique hebdomadaire

Mini barres empilées (Recharts `BarChart` avec `stackOffset`). 7 jours, chaque barre montre la répartition des catégories du jour :

- 🥩 Protéines : `deep-plum`
- 🍞 Glucides IG bas : `sage`
- 🍞 Glucides IG haut : `coral-warning`
- 🥑 Lipides : `lavender`
- 🥬 Fibres : `phase-follicular`

Pas de valeurs numériques sur le chart — c'est un aperçu visuel. Légende en dessous avec les couleurs.

Si un jour n'a aucun repas logué : barre vide avec trait pointillé.

---

## Composants React

```
src/pages/Nutrition.tsx
src/components/nutrition/
  GISearchBar.tsx              ← Input + résultats en dropdown
  GIResultCard.tsx             ← Affichage d'un résultat IG
  MealCard.tsx                 ← Card d'un repas sur l'écran principal
  MealEditor.tsx               ← Écran de saisie d'un repas
  FoodItemInput.tsx            ← Saisie d'un item (nom + catégorie)
  FoodItemChip.tsx             ← Chip d'un item ajouté (supprimable)
  FiberFirstToggle.tsx         ← Toggle "fibres en premier" + tip
  SOSCravingFlow.tsx           ← Modal en 2 étapes pour les fringales
  WeeklyBalanceChart.tsx       ← Barres empilées Recharts
```

---

## Store Zustand : `mealStore`

```typescript
type MealStore = {
  meals: Meal[];
  todayMeals: Meal[];
  weekMeals: Meal[];
  isLoading: boolean;
  fetchMeals: (dateRange: { from: Date; to: Date }) => Promise<void>;
  addMeal: (meal: Omit<Meal, 'id' | 'created_at'>) => Promise<void>;
  updateMeal: (id: string, updates: Partial<Meal>) => Promise<void>;
  deleteMeal: (id: string) => Promise<void>;
};
```

---

## Edge Cases

- **Aucun repas logué** : Afficher les 3 MealCards vides avec texte invitant "Tap pour noter ton petit-déjeuner"
- **Recherche IG sans résultat** : "Aliment non trouvé. Essaie un terme plus simple ou une catégorie."
- **Aliment ambigu** : "Riz" → afficher "Riz blanc", "Riz basmati", "Riz complet", etc.
- **SOS Fringale sans cycle** : Proposer quand même des snacks sains, sans personnalisation par phase
- **Jour de la semaine sans données** : Barre vide dans le chart, pas de faux zéro

---

## Critères d'acceptation

- [ ] L'écran principal affiche les 3 repas du jour (petit-déj, déjeuner, dîner) + collations optionnelles
- [ ] La saisie d'un repas permet d'ajouter N items avec nom libre + catégorie obligatoire
- [ ] Le toggle "fibres en premier" est présent et affiche le tip quand "Non"
- [ ] La recherche IG fonctionne avec au moins 80 aliments
- [ ] Les résultats IG affichent le niveau coloré + alternatives
- [ ] Le SOS Fringale est fonctionnel avec suggestions par phase × type
- [ ] Le chart hebdomadaire affiche la répartition des catégories
- [ ] Aucune mention de calories nulle part dans l'interface
