# 📋 Hormona — Index des Spécifications

## Comment utiliser ce dossier

Chaque fichier est une **spec autonome** pour un module de l'app. Lis-les dans l'ordre numéroté. Chaque spec contient :

- **Contexte produit** — Pourquoi ce module existe, quel problème il résout
- **User stories** — Ce que l'utilisatrice veut accomplir
- **Composants** — Arbre des composants React avec props et états
- **Écrans & interactions** — Description précise de chaque écran, état par état
- **Logique métier** — Algorithmes, règles, données
- **Design** — Directives visuelles spécifiques au module
- **Edge cases** — Les cas limites à gérer
- **Critères d'acceptation** — Comment vérifier que c'est terminé

## Ordre d'implémentation

Respecter cet ordre — chaque module dépend des précédents :

```
01-DESIGN-SYSTEM.md      ← Fondation visuelle, composants UI de base
02-AUTH-ONBOARDING.md     ← Inscription, connexion, setup du profil cycle
03-CYCLE-ENGINE.md        ← Moteur de calcul du cycle (lib pure, pas d'UI)
04-DASHBOARD.md           ← Écran d'accueil dynamique
05-NUTRITION.md           ← Journal alimentaire, IG, SOS Fringale
06-MOVEMENT.md            ← Sport synchronisé au cycle
07-TRACKING.md            ← Journal, symptômes, humeur
08-ENCYCLOPEDIA.md        ← Contenu éducatif SOPK
09-SUPPLEMENTS.md         ← Gestion compléments alimentaires
10-MEDICAL-EXPORT.md      ← Export PDF pour le médecin
11-OFFLINE-PWA.md         ← Service worker, sync, install prompt
```

## Dépendances entre modules

```
01 Design System ──→ Tous les modules
02 Auth ──→ Tous les modules (user context)
03 Cycle Engine ──→ 04 Dashboard, 05 Nutrition, 06 Movement, 10 Export
04 Dashboard ──→ consomme 03, 07, 09
07 Tracking ──→ 10 Medical Export
09 Supplements ──→ 04 Dashboard (rappels)
```

## Règles globales (rappel)

- **Mobile-first** : tout se conçoit pour un écran 375px, le desktop est un bonus
- **Pas de calories** : jamais. On parle en catégories alimentaires
- **Tutoiement** : l'app tutoie toujours l'utilisatrice
- **Touch targets** : minimum 44×44px sur tous les éléments interactifs
- **Offline-ready** : chaque saisie doit fonctionner sans réseau (spec 11)
- **Données sensibles** : les entrées de journal sont chiffrées côté serveur
