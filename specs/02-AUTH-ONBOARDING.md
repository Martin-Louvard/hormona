# 02 — Auth & Onboarding

## Contexte produit

L'onboarding est le moment le plus critique. Une femme qui vient de recevoir un diagnostic SOPK est souvent perdue, stressée, submergée d'infos contradictoires. Le premier contact avec l'app doit lui dire : "Tu es au bon endroit. On va y aller doucement."

L'inscription doit être rapide (< 2 minutes) et ne demander que le strict nécessaire pour que le moteur de cycle fonctionne.

---

## User Stories

- En tant que nouvelle utilisatrice, je veux m'inscrire en 3 étapes maximum pour ne pas abandonner
- En tant qu'utilisatrice existante, je veux me connecter rapidement et retrouver mes données
- En tant que nouvelle utilisatrice, je veux configurer mon cycle pour que l'app me donne des conseils pertinents dès le premier jour

---

## Flux complet

### Écran 1 : Welcome Screen

```
┌─────────────────────────┐
│                         │
│     [Illustration]      │
│    Fleur qui éclot      │
│                         │
│   Hormona               │  ← DM Serif Display, 32px, deep-plum
│                         │
│   Ton compagnon SOPK,   │  ← Plus Jakarta 400, warm-gray
│   jour après jour.      │
│                         │
│  ┌───────────────────┐  │
│  │   Commencer       │  │  ← Button primary, full width
│  └───────────────────┘  │
│                         │
│   Déjà un compte ?      │  ← ghost link, text-caption
│   Se connecter          │
│                         │
└─────────────────────────┘
```

- Pas de long texte explicatif. L'utilisatrice est déjà intéressée si elle est là.
- Illustration : un SVG simple et doux (pas un dessin médical).

### Écran 2 : Inscription / Connexion

**Inscription** : email + mot de passe. C'est tout. Pas de nom obligatoire.
**Connexion** : email + mot de passe.

Utiliser Supabase Auth avec `signUp` et `signInWithPassword`.

Pas de login social (Google, Apple) dans le MVP — complexifie le setup.
Pas de vérification email bloquante — on envoie l'email mais on laisse passer.

### Écran 3 : Onboarding — Profil Cycle (3 étapes)

Affiché une seule fois après la première inscription. Un stepper visuel en haut (3 points).

**Étape 1/3 — Prénom**
```
"Comment je peux t'appeler ?"

[ Prénom ou surnom        ]

Ce n'est visible que par toi.
```

**Étape 2/3 — Durée du cycle**
```
"Combien de jours dure ton cycle en moyenne ?"

         ← 28 →              ← Sélecteur rotatif ou +/- buttons

Pas sûre ? 28 jours est une bonne base.
On pourra ajuster plus tard.
```

Plage : 20 à 45 jours. Default : 28.
Afficher un texte explicatif discret : "Du premier jour de tes règles au premier jour des suivantes."

**Étape 3/3 — Date des dernières règles**
```
"Quand ont commencé tes dernières règles ?"

   [ Calendrier mois ]

Si tu ne t'en souviens pas,
choisis une date approximative.
```

Calendrier simplifié : mois courant + mois précédent. Pas de date dans le futur.
Style du calendrier : grille minimaliste, jour sélectionné = cercle `rose-soft`.

**Écran de fin**
```
"Tout est prêt, [Prénom] !"

Tu es actuellement en phase folliculaire 🌱
Jour 8 de ton cycle.

  ┌───────────────────┐
  │   Découvrir       │
  └───────────────────┘
```

Afficher la phase calculée en temps réel à partir des données saisies. Premier "wow moment" : l'app sait déjà où elle en est.

---

## Composants React

```
src/pages/
  Welcome.tsx
  Login.tsx
  Register.tsx
  Onboarding.tsx              ← Gère les 3 étapes avec état local

src/components/auth/
  AuthForm.tsx                ← Formulaire email/password réutilisable
  OnboardingStep.tsx          ← Layout d'une étape (titre, contenu, boutons)
  CycleLengthPicker.tsx       ← Sélecteur de durée (boutons +/-)
  PeriodDatePicker.tsx        ← Mini calendrier
  StepIndicator.tsx           ← Les 3 points du stepper
```

### Props & état

**AuthForm**
```typescript
type AuthFormProps = {
  mode: 'login' | 'register';
  onSuccess: () => void;
};
// État interne : email, password, loading, error
```

**CycleLengthPicker**
```typescript
type CycleLengthPickerProps = {
  value: number;
  onChange: (days: number) => void;
};
```

**PeriodDatePicker**
```typescript
type PeriodDatePickerProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  maxDate?: Date; // default: today
};
```

---

## Logique métier

### Après l'inscription
1. Supabase crée le user → le trigger `on_auth_user_created` crée le profil
2. L'onboarding met à jour le profil via `supabase.from('profiles').update()`
3. Le store Zustand `authStore` contient `user`, `profile`, `isOnboarded`
4. `isOnboarded` est vrai si `last_period_start` est non-null dans le profil

### Routing protégé
```
/ → Si pas authentifié → /welcome
/ → Si authentifié mais pas onboardé → /onboarding
/ → Si authentifié + onboardé → /dashboard
```

### Persistance de session
Supabase gère la session via le localStorage. Au chargement de l'app, appeler `supabase.auth.getSession()` puis écouter `onAuthStateChange`.

---

## Edge Cases

- **Mot de passe trop court** : Supabase requiert 6 caractères. Afficher l'erreur sous le champ.
- **Email déjà utilisé** : Message "Cette adresse est déjà associée à un compte. Te connecter ?"
- **Pas de date de règles** : Si elle ne se souvient vraiment pas, permettre de skip avec un disclaimer "Les conseils seront moins précis, tu pourras ajouter la date plus tard dans les réglages."
- **Cycle très court/long** : Sous 21 jours ou au-dessus de 40, afficher un petit texte : "C'est fréquent avec le SOPK. L'app s'adapte à ton rythme."
- **Retour arrière dans l'onboarding** : Permettre de revenir à l'étape précédente. Les données saisies sont conservées.

---

## Design spécifique

- Background de l'onboarding : `cream` uni, pas de bottom nav visible
- Transitions entre étapes : slide horizontal doux (200ms)
- Le stepper en haut utilise la couleur `rose-soft` pour les étapes complétées, `warm-gray-light` pour les futures
- Bouton "Suivant" toujours en bas de l'écran, fixe, `primary` full width

---

## Critères d'acceptation

- [ ] L'inscription crée un user Supabase + profil automatique
- [ ] La connexion restaure la session et redirige vers le dashboard
- [ ] L'onboarding en 3 étapes met à jour le profil (display_name, cycle_length_avg, last_period_start)
- [ ] Le routing protège les pages : non-auth → welcome, non-onboarded → onboarding
- [ ] Le cycle length picker est borné entre 20 et 45
- [ ] Le date picker ne permet pas de date future
- [ ] L'écran de fin affiche la phase calculée correctement
- [ ] Les erreurs d'auth sont affichées clairement sous les champs
