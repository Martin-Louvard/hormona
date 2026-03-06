# 🌸 Hormona — Guide Projet Claude

## Vision
Hormona est une PWA d'auto-coaching thérapeutique pour les femmes atteintes de SOPK (Syndrome des Ovaires Polykystiques). L'app aide à comprendre, suivre et gérer les symptômes au quotidien en synchronisant alimentation, sport et bien-être avec le cycle menstruel.

**Utilisatrice cible :** Femme 20-40 ans, diagnostiquée SOPK ou en cours de diagnostic, qui veut reprendre le contrôle de sa santé sans se sentir submergée.

**Ton & Personnalité de l'app :** Bienveillant, jamais culpabilisant. Comme une amie qui a fait des études de médecine. Tutoiement. Emojis utilisés avec parcimonie.

---

## Stack Technique

| Couche | Technologie | Justification |
|--------|-------------|---------------|
| Frontend | **React 18 + TypeScript** | Typage fort, écosystème riche |
| Routing | **React Router v6** | SPA navigation |
| Style | **Tailwind CSS 3** | Utility-first, rapide à itérer |
| State | **Zustand** | Léger, simple, parfait pour une PWA |
| Backend | **Supabase** | Auth, PostgreSQL, Storage, Realtime |
| PWA | **Vite PWA Plugin** | Service worker + manifest auto |
| Charts | **Recharts** | Graphiques de suivi intégrés React |
| Date | **date-fns** | Manipulation de dates (calculs de cycle) |
| Icons | **Lucide React** | Icons cohérentes et légères |
| Forms | **React Hook Form + Zod** | Validation robuste |

---

## Architecture du Projet

```
hormona/
├── public/
│   ├── icons/              # PWA icons (192x192, 512x512)
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── App.tsx         # Layout principal + routing
│   │   └── routes.tsx      # Définition des routes
│   ├── components/
│   │   ├── ui/             # Composants génériques (Button, Card, Modal, Input...)
│   │   ├── dashboard/      # Composants du dashboard
│   │   ├── nutrition/      # Composants alimentation
│   │   ├── movement/       # Composants sport
│   │   ├── tracking/       # Composants suivi & journal
│   │   ├── encyclopedia/   # Composants encyclopédie
│   │   └── supplements/    # Composants compléments
│   ├── hooks/
│   │   ├── useCycle.ts     # Logique de calcul du cycle
│   │   ├── useSupabase.ts  # Client Supabase
│   │   ├── useOffline.ts   # Gestion mode hors-ligne
│   │   └── useReminders.ts # Notifications & rappels
│   ├── lib/
│   │   ├── supabase.ts     # Config client Supabase
│   │   ├── cycle.ts        # Fonctions pures : calcul phase, jour du cycle
│   │   ├── gi-database.ts  # Base de données Index Glycémique
│   │   ├── tips.ts         # Conseils contextuels par phase
│   │   └── offline-queue.ts # File d'attente sync offline
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── cycleStore.ts
│   │   ├── mealStore.ts
│   │   ├── symptomStore.ts
│   │   └── supplementStore.ts
│   ├── types/
│   │   └── index.ts        # Types TypeScript centralisés
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Nutrition.tsx
│   │   ├── Movement.tsx
│   │   ├── Tracking.tsx
│   │   ├── Encyclopedia.tsx
│   │   ├── Supplements.tsx
│   │   └── MedicalExport.tsx
│   └── main.tsx
├── supabase/
│   └── migrations/         # Migrations SQL
│       └── 001_initial_schema.sql
├── .env.example
├── CLAUDE.md               # CE FICHIER
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

---

## Base de Données (Supabase PostgreSQL)

### Tables principales

**profiles**
- `id` (uuid, FK auth.users)
- `display_name` (text)
- `cycle_length_avg` (int, default 28)
- `last_period_start` (date)
- `created_at` (timestamptz)

**cycle_entries**
- `id` (uuid, PK)
- `user_id` (uuid, FK profiles)
- `date` (date, unique per user)
- `period_started` (boolean)
- `period_ended` (boolean)
- `notes` (text, nullable)

**mood_entries**
- `id` (uuid, PK)
- `user_id` (uuid, FK profiles)
- `date` (date)
- `mood` (enum: 'sunny', 'cloudy', 'rainy', 'stormy', 'foggy')
- `energy_level` (int 1-5)
- `created_at` (timestamptz)

**meals**
- `id` (uuid, PK)
- `user_id` (uuid, FK profiles)
- `date` (date)
- `meal_type` (enum: 'breakfast', 'lunch', 'dinner', 'snack')
- `items` (jsonb) — tableau d'objets `{ name, category, gi_level }`
- `fiber_first` (boolean) — a-t-elle mangé les fibres en premier ?
- `created_at` (timestamptz)

**symptoms**
- `id` (uuid, PK)
- `user_id` (uuid, FK profiles)
- `date` (date)
- `skin_quality` (int 1-5)
- `pelvic_pain_type` (text, nullable)
- `pelvic_pain_intensity` (int 0-10)
- `sleep_onset_minutes` (int, nullable)
- `night_wakings` (int, nullable)
- `notes` (text, nullable)

**exercises**
- `id` (uuid, PK)
- `user_id` (uuid, FK profiles)
- `date` (date)
- `type` (text) — yoga, HIIT, marche, musculation...
- `duration_minutes` (int)
- `post_effort_feeling` (enum: 'boosted', 'exhausted', nullable) — rempli 2h après
- `cycle_phase_at_time` (text)

**supplements**
- `id` (uuid, PK)
- `user_id` (uuid, FK profiles)
- `name` (text) — Inositol, Magnésium, Vitamine D...
- `dosage` (text)
- `time_of_day` (enum: 'morning', 'evening', 'both')
- `stock_remaining_days` (int)
- `interaction_notes` (text, nullable)

**supplement_logs**
- `id` (uuid, PK)
- `user_id` (uuid, FK profiles)
- `supplement_id` (uuid, FK supplements)
- `taken_at` (timestamptz)
- `period` (enum: 'morning', 'evening')

**journal_entries**
- `id` (uuid, PK)
- `user_id` (uuid, FK profiles)
- `date` (date)
- `content` (text, encrypted)
- `created_at` (timestamptz)

---

## Logique Métier Clé

### Calcul de la phase du cycle
```
Jour 1-5    → Phase Menstruelle
Jour 6-13   → Phase Folliculaire
Jour 14-16  → Phase Ovulatoire
Jour 17-28  → Phase Lutéale
```
Le calcul se base sur `last_period_start` et `cycle_length_avg` du profil. Les jours sont ajustés proportionnellement si le cycle est plus court/long que 28 jours.

### Conseils contextuels (exemples)
- **Lutéale** → "Privilégie les glucides complexes ce soir pour éviter les insomnies."
- **Folliculaire** → "Ton énergie remonte ! C'est le moment idéal pour tester un nouveau sport."
- **Menstruelle** → "Sois douce avec toi-même. Une tisane de gingembre peut aider les crampes."
- **Ovulatoire** → "Pic d'énergie et de confiance ! Profites-en pour tes projets sociaux."

### Index Glycémique — Structure des données
```typescript
type GIEntry = {
  name: string;           // "Riz blanc"
  gi: number;             // 72
  level: 'low' | 'medium' | 'high'; // > 70 = high, 55-70 = medium, < 55 = low
  suggestion?: string;    // "Remplace par du riz complet..."
  category: string;       // "Céréales"
}
```

---

## Conventions de Code

- **Langue du code :** Anglais (noms de variables, composants, fonctions)
- **Langue du contenu :** Français (UI, textes, conseils)
- **Composants :** Functional components uniquement, hooks pour la logique
- **Fichiers :** Un composant par fichier, PascalCase pour les composants, camelCase pour les hooks/utils
- **CSS :** Tailwind uniquement, pas de CSS custom sauf animations complexes
- **Commits :** Format conventionnel (`feat:`, `fix:`, `docs:`, `refactor:`)
- **Tests :** Vitest pour les fonctions pures (calcul de cycle, GI lookup)

---

## Palette de Couleurs

```css
:root {
  /* Couleurs principales — doux et organique */
  --rose-soft: #F2B5D4;      /* Accent principal */
  --lavender: #C3B1E1;        /* Accent secondaire */
  --sage: #A8C5A0;             /* Succès, positif */
  --cream: #FFF8F0;            /* Background principal */
  --warm-gray: #6B5B73;        /* Texte principal */
  --deep-plum: #4A2C5E;        /* Titres, emphase */

  /* Couleurs des phases du cycle */
  --phase-menstrual: #E88D9E;  /* Rouge doux */
  --phase-follicular: #7EC8B8; /* Vert menthe */
  --phase-ovulatory: #FFD166;  /* Jaune doré */
  --phase-luteal: #C3B1E1;     /* Lavande */
}
```

---

## Priorité d'Implémentation

### Sprint 1 — Fondations (Semaine 1-2)
- [ ] Setup projet (Vite + React + TS + Tailwind + Supabase)
- [ ] Auth (inscription/connexion email)
- [ ] Profil utilisatrice (durée de cycle, date dernières règles)
- [ ] Dashboard : mood du jour + jauge de cycle + phase actuelle
- [ ] Navigation bottom bar (Dashboard, Nutrition, Sport, Journal, Plus)

### Sprint 2 — Tracking (Semaine 3-4)
- [ ] Journal alimentaire (saisie par catégorie, sans calories)
- [ ] Suivi des symptômes quotidiens
- [ ] Journal de pensées (espace libre)
- [ ] Rappels compléments (checkbox matin/soir)

### Sprint 3 — Intelligence (Semaine 5-6)
- [ ] Conseils contextuels selon la phase
- [ ] Recherche Index Glycémique + suggestions
- [ ] Recommandations sport par phase (Cycle Syncing)
- [ ] Bouton "SOS Fringale"

### Sprint 4 — Contenu & Export (Semaine 7-8)
- [ ] Encyclopédie SOPK (fiches statiques)
- [ ] Symptomathèque
- [ ] Gestionnaire de compléments (stock + interactions)
- [ ] Export PDF "Rendez-vous Médical"

### Sprint 5 — Polish (Semaine 9-10)
- [ ] Mode offline (service worker + queue de sync)
- [ ] Notifications (rappels compléments, suivi post-effort)
- [ ] Animations & micro-interactions
- [ ] PWA : manifest, icons, install prompt

---

## Sécurité & RGPD

- Les données de santé sont **chiffrées au repos** via Supabase (pgcrypto pour les champs sensibles comme le journal)
- **Row Level Security (RLS)** activée sur toutes les tables : chaque utilisatrice ne voit que ses propres données
- **Aucune donnée revendue** — l'app est un projet personnel
- Export et suppression de compte disponibles (droit à l'oubli)
- Les PDF d'analyses médicales sont stockés dans Supabase Storage avec accès restreint par utilisatrice

---

## Instructions pour Claude

Quand tu travailles sur ce projet :

1. **Toujours vérifier la phase du cycle** avant de donner un conseil — les recommandations changent selon la phase
2. **Jamais de comptage de calories** — on parle en catégories (protéines, glucides IG bas/haut, lipides, fibres)
3. **Ton bienveillant** — le SOPK est une maladie chronique stressante, le ton doit être encourageant
4. **Mobile-first** — tout le design part du mobile, le desktop est secondaire
5. **Accessibilité** — contraste suffisant, tailles de touch targets ≥ 44px, labels sur les inputs
6. **Performance** — lazy loading des pages, images optimisées, bundle splitting
7. **Données fictives** — pour le développement, utiliser des données de test réalistes (cycle de 30 jours, symptômes variés)
