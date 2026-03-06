# 07 — Tracking & Journaling

## Contexte produit

Le SOPK est une maladie aux symptômes diffus : la peau change, le sommeil se dégrade, les douleurs varient, l'humeur oscille. Sans tracking, l'utilisatrice a l'impression que "tout va mal tout le temps". Avec un suivi, elle découvre des patterns : "Ma peau empire toujours en phase lutéale" ou "Je dors mieux quand je fais du yoga".

Le journal de pensées est un espace thérapeutique. Le cortisol (hormone du stress) aggrave directement le SOPK. Écrire ses frustrations réduit le cortisol mesurable. C'est un outil médical déguisé en carnet intime.

---

## User Stories

- Je veux noter mes symptômes en < 30 secondes pour ne pas décrocher
- Je veux écrire librement quand j'ai besoin de vider ma tête
- Je veux voir l'évolution de mes symptômes sur le mois pour repérer les patterns
- Je veux pouvoir montrer un résumé à mon médecin (voir spec 10)

---

## Écran principal : `/tracking`

Deux onglets en haut : **Symptômes** | **Journal**

### Onglet Symptômes

```
┌──────────────────────────────┐
│  Suivi                       │
│  [Symptômes] [Journal]       │  ← Tabs, active = underline rose
│                              │
│  Aujourd'hui · Jour 8 🌱     │
│                              │
│  Peau                        │
│  ┌────────────────────────┐  │
│  │ Comment est ta peau ?  │  │
│  │ ○  ○  ●  ○  ○         │  │  ← SliderScale 1-5
│  │ Pire       Meilleure   │  │
│  └────────────────────────┘  │
│                              │
│  Douleurs pelviennes         │
│  ┌────────────────────────┐  │
│  │ Type : [Crampes ▼]    │  │  ← Select: crampes, tiraillements,
│  │                        │  │    pression, aigu, aucune
│  │ Intensité : ●●●●○○○○○○│  │  ← SliderScale 0-10
│  └────────────────────────┘  │
│                              │
│  Sommeil                     │
│  ┌────────────────────────┐  │
│  │ Temps d'endormissement │  │
│  │ [< 15min ▼]            │  │  ← Select: <15, 15-30, 30-60, >60
│  │                        │  │
│  │ Réveils nocturnes      │  │
│  │ [0] [1] [2] [3+]      │  │  ← Chips
│  └────────────────────────┘  │
│                              │
│  Notes libres                │
│  ┌────────────────────────┐  │
│  │ Quelque chose à noter? │  │  ← Textarea optionnel
│  └────────────────────────┘  │
│                              │
│  ┌───────────────────────┐   │
│  │   Enregistrer         │   │
│  └───────────────────────┘   │
│                              │
│  Tendances du mois           │
│  ┌────────────────────────┐  │
│  │ [Line chart peau 30j]  │  │  ← Recharts LineChart
│  │ Points colorés par     │  │
│  │ phase du cycle          │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

### Design des sliders

La SliderScale pour la peau (1-5) : 5 cercles de taille croissante.
- 1 = 😟 petit cercle, teinté `coral-warning`
- 3 = 😐 moyen, teinté `lavender`
- 5 = 😊 grand, teinté `sage`

L'intensité de douleur (0-10) : barre de 10 points.
- 0 = vert, pas de douleur
- Gradient vers rouge pour 10

### Onglet Journal

```
┌──────────────────────────────┐
│  Suivi                       │
│  [Symptômes] [Journal]       │
│                              │
│  ┌────────────────────────┐  │
│  │                        │  │
│  │  Écris ce que tu       │  │  ← Grande Textarea
│  │  ressens…              │  │     min-height: 200px
│  │                        │  │     Font: Plus Jakarta 400
│  │                        │  │     bg: white
│  │                        │  │
│  └────────────────────────┘  │
│                              │
│  ┌───────────────────────┐   │
│  │   Enregistrer         │   │
│  └───────────────────────┘   │
│                              │
│  Entrées précédentes         │
│  ┌────────────────────────┐  │
│  │ Hier · 🌱 Folliculaire │  │
│  │ "Je me sens mieux…"   │  │  ← Aperçu 1 ligne, tap pour lire
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 3 mars · 🌙 Menstruelle│  │
│  │ "Journée difficile…"  │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │ 🔒 Tes pensées sont    │  │  ← Encart rassurant
│  │ chiffrées et privées.  │  │
│  │ Personne ne peut les   │  │
│  │ lire à part toi.       │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

---

## Graphique de tendances

LineChart (Recharts) pour la qualité de peau sur 30 jours.

Configuration :
- Axe X : dates (format "1", "2"… du mois)
- Axe Y : score 1-5
- Chaque point est coloré selon la phase du cycle à cette date
- Zones de fond colorées (bandes verticales) pour visualiser les phases
- Lissage : `type="monotone"` pour la courbe

Possibilité de switcher entre métriques via des tabs en dessous du chart :
- Peau | Douleurs | Sommeil

---

## Composants React

```
src/pages/Tracking.tsx
src/components/tracking/
  SymptomForm.tsx              ← Formulaire complet des symptômes du jour
  SkinScale.tsx                ← SliderScale spécialisée peau (emojis)
  PainInput.tsx                ← Type + intensité de douleur
  SleepInput.tsx               ← Endormissement + réveils
  JournalEditor.tsx            ← Textarea + bouton save
  JournalEntryCard.tsx         ← Card d'une entrée précédente
  SymptomTrendChart.tsx        ← LineChart avec phases colorées
  TrackingTabs.tsx             ← Onglets Symptômes / Journal
```

---

## Store Zustand : `symptomStore`

```typescript
type SymptomStore = {
  todaySymptoms: Symptom | null;
  monthSymptoms: Symptom[];
  isLoading: boolean;
  fetchToday: () => Promise<void>;
  fetchMonth: (month: Date) => Promise<void>;
  saveSymptoms: (data: Omit<Symptom, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  // Upsert: si une entrée existe déjà pour aujourd'hui, on la met à jour
};
```

### Journal store (séparé pour le chiffrement)

```typescript
type JournalStore = {
  entries: JournalEntry[];
  todayEntry: JournalEntry | null;
  isLoading: boolean;
  fetchEntries: (limit?: number) => Promise<void>;
  saveEntry: (content: string, date?: Date) => Promise<void>;
};
```

---

## Sécurité : Journal chiffré

Les entrées de journal sont des données particulièrement sensibles. Deux niveaux :

1. **RLS Supabase** : chaque utilisatrice ne voit que ses propres entrées (déjà en place)
2. **Chiffrement applicatif** (optionnel MVP+) : utiliser `pgcrypto` côté Supabase pour chiffrer le contenu avec une clé dérivée du user ID

Pour le MVP, le RLS suffit. Afficher quand même le message "🔒 Tes pensées sont chiffrées et privées" comme engagement de confiance.

---

## Logique de sauvegarde

- **Symptômes** : UPSERT par (user_id, date). Si elle revient modifier dans la journée, on écrase.
- **Journal** : UPSERT par (user_id, date). Même logique. Pas d'historique de versions.
- Auto-save du journal après 3 secondes d'inactivité de frappe (debounce). Indicateur discret "Sauvegardé ✓".

---

## Edge Cases

- **Aucun symptôme à saisir** : L'utilisatrice peut save un formulaire vide (tout null). C'est volontaire — ne pas forcer la saisie.
- **Retour sur un jour passé** : Permettre de saisir/modifier les symptômes des 7 derniers jours (sélecteur de date en haut). Au-delà, lecture seule.
- **Journal vide** : Les entrées précédentes montrent "Pas encore d'entrée ce mois-ci. Prends un moment pour toi." 
- **Données insuffisantes pour le chart** : Moins de 5 jours de données → afficher "Continue le suivi quelques jours pour voir tes tendances apparaître" à la place du chart.
- **Markdown dans le journal** : Non. Texte brut uniquement. Pas de formatting.

---

## Critères d'acceptation

- [ ] Le formulaire symptômes couvre : peau (1-5), douleur (type + 0-10), sommeil (endormissement + réveils), notes libres
- [ ] Chaque champ est optionnel — on peut sauvegarder un formulaire partiellement rempli
- [ ] Les symptômes sont upsert par jour (modifier dans la journée écrase)
- [ ] Le journal a l'auto-save avec indicateur visuel
- [ ] Les entrées de journal précédentes sont listées avec aperçu + phase du cycle
- [ ] Le graphique de tendances affiche 30 jours avec points colorés par phase
- [ ] Le switch entre métriques (Peau / Douleurs / Sommeil) fonctionne
- [ ] Le message "🔒 privé et chiffré" est visible
- [ ] La saisie rétroactive fonctionne sur les 7 derniers jours
