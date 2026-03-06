# 01 — Design System

## Philosophie

Hormona ne ressemble pas à une app de santé clinique. Elle ressemble à un carnet intime bien pensé — chaud, organique, rassurant. L'esthétique est **"soft editorial"** : typographie soignée, couleurs douces mais pas fades, beaucoup d'espace blanc, illustrations subtiles.

L'utilisatrice ouvre cette app quand elle ne se sent pas bien. Le design doit baisser son cortisol, pas l'augmenter.

---

## Typographie

```
Titres (h1, h2)  : DM Serif Display — serif élégant, chaleureux
Sous-titres (h3) : Plus Jakarta Sans 600 — géométrique, lisible
Corps             : Plus Jakarta Sans 400 — propre, moderne
Petits textes     : Plus Jakarta Sans 300 — léger, discret
Chiffres (data)   : JetBrains Mono — monospace pour les jours/scores
```

Import Google Fonts :
```
https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap
```

### Échelle typographique (mobile)

| Token           | Taille  | Line-height | Usage                        |
|-----------------|---------|-------------|------------------------------|
| `text-display`  | 28px    | 1.2         | Titre de page                |
| `text-title`    | 22px    | 1.3         | Titre de section             |
| `text-heading`  | 18px    | 1.4         | Titre de carte               |
| `text-body`     | 15px    | 1.6         | Texte courant                |
| `text-caption`  | 13px    | 1.5         | Labels, métadonnées          |
| `text-tiny`     | 11px    | 1.4         | Badges, indicateurs          |
| `text-data`     | 32px    | 1.0         | Chiffres en gros (jour cycle)|

---

## Palette de Couleurs

### Couleurs principales

| Token               | Hex       | Usage                                  |
|----------------------|-----------|----------------------------------------|
| `cream`              | `#FFF8F0` | Background principal                   |
| `cream-dark`         | `#F5EDE3` | Background secondaire, cards           |
| `warm-gray`          | `#6B5B73` | Texte body                             |
| `warm-gray-light`    | `#9B8BA3` | Texte secondaire, placeholders         |
| `deep-plum`          | `#4A2C5E` | Titres, texte emphase                  |
| `rose-soft`          | `#F2B5D4` | Accent principal, CTA                  |
| `rose-deep`          | `#D4839B` | Accent principal hover/active          |
| `lavender`           | `#C3B1E1` | Accent secondaire                      |
| `sage`               | `#A8C5A0` | Succès, validation                     |
| `sage-dark`          | `#7BA370` | Succès hover                           |
| `coral-warning`      | `#E8927C` | Avertissement (stock bas)              |
| `white`              | `#FFFFFF` | Surface des cartes                     |

### Couleurs des phases du cycle

| Phase         | Token              | Hex       | Emoji |
|---------------|--------------------|-----------|-------|
| Menstruelle   | `phase-menstrual`  | `#E88D9E` | 🌙    |
| Folliculaire  | `phase-follicular` | `#7EC8B8` | 🌱    |
| Ovulatoire    | `phase-ovulatory`  | `#FFD166` | ☀️    |
| Lutéale       | `phase-luteal`     | `#C3B1E1` | 🍂    |

Chaque phase a un dégradé associé (pour les headers et jauges) :
```css
--gradient-menstrual:  linear-gradient(135deg, #E88D9E 0%, #F2B5D4 100%);
--gradient-follicular: linear-gradient(135deg, #7EC8B8 0%, #A8E6CF 100%);
--gradient-ovulatory:  linear-gradient(135deg, #FFD166 0%, #FFE6A0 100%);
--gradient-luteal:     linear-gradient(135deg, #C3B1E1 0%, #DDD1F0 100%);
```

### Config Tailwind

Étendre le `tailwind.config.ts` avec ces tokens. Utiliser les noms sémantiques partout : `bg-cream`, `text-deep-plum`, `border-phase-follicular`, etc.

---

## Composants UI de Base

### `<Button>`

Trois variantes :

| Variante    | Style                                                   | Usage              |
|-------------|----------------------------------------------------------|--------------------|
| `primary`   | bg rose-soft, text white, rounded-2xl, shadow-sm         | Action principale  |
| `secondary` | bg transparent, border rose-soft, text deep-plum         | Action secondaire  |
| `ghost`     | bg transparent, text warm-gray, hover bg cream-dark      | Action tertiaire   |

Tailles : `sm` (h-10 px-4), `md` (h-12 px-6), `lg` (h-14 px-8).
Tous les boutons ont `min-h-[44px]` pour l'accessibilité tactile.
État loading : spinner animé + texte "Un instant…"
Border-radius : `rounded-2xl` (16px) partout.

### `<Card>`

```
bg-white rounded-3xl p-5 shadow-[0_2px_12px_rgba(74,44,94,0.06)]
```

Variante `highlight` : bordure gauche 3px avec couleur de phase.
Variante `interactive` : `hover:shadow-md active:scale-[0.98] transition-all`.

### `<Input>` / `<Textarea>`

```
bg-cream-dark rounded-2xl px-4 py-3 text-body text-deep-plum
placeholder:text-warm-gray-light
focus:ring-2 focus:ring-rose-soft/40 focus:bg-white
```

Label toujours visible au-dessus (pas de floating label — trop fragile en mobile).
Message d'erreur : `text-coral-warning text-caption mt-1`.

### `<Badge>`

Pill arrondi pour les catégories/tags.
```
inline-flex items-center px-3 py-1 rounded-full text-tiny font-medium
```
Couleurs par contexte : phase du cycle, catégorie alimentaire, niveau IG.

### `<BottomNav>`

5 onglets fixes en bas de l'écran. Barre blanche avec ombre supérieure.

| Onglet       | Icône Lucide     | Route         |
|--------------|------------------|---------------|
| Accueil      | `Home`           | `/`           |
| Nutrition    | `Utensils`       | `/nutrition`  |
| Sport        | `Activity`       | `/movement`   |
| Journal      | `BookHeart`      | `/tracking`   |
| Plus         | `MoreHorizontal` | `/more`       |

Icône active : `text-rose-deep`, icône inactive : `text-warm-gray-light`.
Label sous l'icône en `text-tiny`.
Hauteur totale : 64px + safe area bottom (env(safe-area-inset-bottom)).

### `<PhaseIndicator>`

Petit badge arrondi avec l'emoji de la phase + nom :
```
🌱 Folliculaire  (sur fond phase-follicular/20)
```

### `<ProgressRing>`

Cercle SVG pour la jauge du cycle. Anime de 0 à la valeur avec `transition` CSS.
Diamètre : 120px sur le dashboard. Couleur = couleur de la phase en cours.

### `<MoodSelector>`

5 boutons en ligne, chacun une météo :

| Mood    | Emoji | Label    | Couleur sélection       |
|---------|-------|----------|-------------------------|
| sunny   | ☀️    | Radieuse | `#FFD166`               |
| cloudy  | ⛅    | Mitigée  | `#C3B1E1`               |
| rainy   | 🌧️   | Triste   | `#7EC8B8`               |
| stormy  | ⛈️   | Agitée   | `#E88D9E`               |
| foggy   | 🌫️   | Perdue   | `#9B8BA3`               |

Au tap : scale bounce (0.9 → 1.05 → 1.0) + bg-color avec opacity 20%.
Taille de chaque bouton : 56×56px minimum.

### `<SliderScale>`

Pour les scores 1-5 (peau, énergie). Pas un slider HTML natif — 5 cercles alignés qu'on tap.
Cercle actif : rempli avec couleur contextuelle. Inactifs : bordure seule.

---

## Animations & Micro-interactions

### Principes
- Durée par défaut : `200ms ease-out`
- Transitions de page : fade 150ms (pas de slide — trop lourd en mobile)
- Aucune animation bloquante > 300ms
- `prefers-reduced-motion` respecté : tout est `transition: none`

### Animations clés
- **Entrée des cartes** : fade-in + translateY(8px → 0) staggeré (50ms entre chaque)
- **Tap sur bouton** : `active:scale-[0.97]` avec spring
- **Mood sélectionné** : bounce scale + ripple sur le cercle
- **Checkbox complément pris** : ✓ apparaît avec scale 0 → 1 + petite rotation
- **Progress ring** : stroke-dashoffset animé sur 600ms ease-in-out

---

## Spacing & Layout

- **Padding page** : `px-5 pt-6 pb-24` (24 = espace pour la bottom nav)
- **Gap entre sections** : `space-y-6`
- **Gap entre cartes dans une section** : `space-y-3`
- **Border radius global** : `rounded-2xl` (16px) pour les cartes, `rounded-3xl` (24px) pour les modales
- **Max width desktop** : `max-w-md mx-auto` (448px) — l'app reste centrée, format téléphone

---

## Iconographie

Lucide React exclusivement. Taille par défaut : 20px. Couleur héritée du texte parent.
Icônes avec signification médicale/santé : utiliser des emojis à la place (plus chaleureux).

---

## Dark Mode

Pas dans le scope initial. Prévoir les tokens via CSS variables pour faciliter l'ajout futur. Ne pas utiliser de couleurs en dur dans les composants — toujours passer par les tokens Tailwind.

---

## Critères d'acceptation

- [ ] Tailwind config étendue avec tous les tokens de couleur et typographie
- [ ] Google Fonts importées dans `index.html`
- [ ] Composants UI de base créés dans `src/components/ui/` : Button, Card, Input, Textarea, Badge, BottomNav, PhaseIndicator, ProgressRing, MoodSelector, SliderScale
- [ ] Chaque composant UI accepte les variantes via props
- [ ] La BottomNav est visible sur toutes les pages, fixée en bas
- [ ] Les animations respectent `prefers-reduced-motion`
- [ ] Les touch targets sont tous ≥ 44×44px
- [ ] Le layout est correct sur iPhone SE (375px) et iPhone 14 Pro Max (430px)
