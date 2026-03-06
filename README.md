# 🌸 Hormona

Application PWA d'auto-coaching pour le SOPK (Syndrome des Ovaires Polykystiques).

## Démarrage rapide

### Prérequis
- Node.js 20+
- Un projet [Supabase](https://supabase.com) (gratuit)

### Installation

```bash
# Cloner et installer
git clone <repo-url>
cd hormona
npm install

# Configurer l'environnement
cp .env.example .env
# → Remplir VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY

# Lancer la base de données
# → Copier le contenu de supabase/migrations/001_initial_schema.sql
#   dans l'éditeur SQL de votre dashboard Supabase

# Lancer le dev server
npm run dev
```

### Structure du projet

Voir **CLAUDE.md** pour l'architecture complète, le schéma de base de données, les conventions de code et le planning de sprints.

## Modules

| Module | Description |
|--------|-------------|
| 🏠 Dashboard | Mood du jour, jauge de cycle, conseils contextuels |
| 🥗 Nutrition | Journal alimentaire sans calories, recherche IG, SOS Fringale |
| 🏃‍♀️ Mouvement | Sport synchronisé au cycle, suivi fatigue post-effort |
| 📖 Encyclopédie | Parcours nouveau diagnostic, symptomathèque, études |
| 📝 Tracking | Journal de pensées, symptômes physiques, export médical |
| 💊 Compléments | Gestion de stock, interactions, rappels |

## Tech Stack

React 18 · TypeScript · Tailwind CSS · Supabase · Vite · Zustand · Recharts
