# 10 — Export "Rendez-vous Médical"

## Contexte produit

Le rendez-vous gynéco/endocrino dure 15-20 minutes. L'utilisatrice oublie la moitié de ce qu'elle voulait dire. Le médecin n'a pas le temps de parcourir 3 mois de notes manuscrites. Ce module génère un **résumé structuré** des 3 derniers mois, prêt à être montré sur le téléphone ou envoyé par email en PDF.

C'est le "killer feature" qui donne une vraie valeur médicale à l'app.

---

## User Stories

- Je veux montrer un résumé clair de mes 3 derniers mois à mon médecin
- Je veux un PDF que je peux envoyer par email avant la consultation
- Je veux que le résumé soit professionnel et lisible pour un médecin

---

## Écran : `/medical-export`

Accessible depuis le menu "Plus" de la bottom nav.

```
┌──────────────────────────────┐
│  Export médical               │
│                              │
│  Prépare un résumé de tes   │
│  3 derniers mois pour ton   │
│  médecin.                    │
│                              │
│  ┌────────────────────────┐  │
│  │ Période                │  │
│  │ 6 déc. 2025 →          │  │
│  │ 6 mars 2026            │  │
│  └────────────────────────┘  │
│                              │
│  Inclure :                   │
│  ☑ Cycles (durées, phases)  │
│  ☑ Symptômes (peau,        │
│    douleurs, sommeil)       │
│  ☑ Humeur & énergie        │
│  ☑ Compléments (régularité)│
│  ☐ Sport (activités)       │  ← Décochable
│  ☐ Notes du journal        │  ← Décochée par défaut (privé)
│                              │
│  ┌────────────────────────┐  │
│  │  Aperçu                │  │  ← Button secondary
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │  Générer le PDF 📄     │  │  ← Button primary
│  └────────────────────────┘  │
│                              │
│  Ou partager directement :  │
│  [📧 Email] [📱 Afficher]  │
└──────────────────────────────┘
```

---

## Contenu du résumé

### Structure du PDF / Aperçu

```
╔══════════════════════════════╗
║  Hormona — Résumé de Suivi  ║
║  [Prénom] · 6 déc. → 6 mars ║
╠══════════════════════════════╣
║                              ║
║  CYCLES                      ║
║  Nombre de cycles : 3        ║
║  Durée moyenne : 32 jours    ║
║  Écart : 28-36 jours         ║
║  Régularité : Irrégulier     ║
║                              ║
║  SYMPTÔMES                   ║
║  Peau (moy.) : 2.8/5        ║
║  ┌──────────────────────┐   ║
║  │ [Sparkline 90 jours] │   ║  ← Mini graphique
║  └──────────────────────┘   ║
║  Douleurs pelviennes :       ║
║  - Fréquence : 18/90 jours  ║
║  - Intensité moy. : 4.2/10  ║
║  - Type prédominant : Crampes║
║  Sommeil :                   ║
║  - Endormissement moy : 25min║
║  - Réveils nocturnes moy: 1.2║
║                              ║
║  HUMEUR & ÉNERGIE            ║
║  Humeur prédominante : ⛅    ║
║  Énergie moyenne : 3.1/5    ║
║  Corrélation phases :        ║
║  - Folliculaire : ☀️ 3.8/5  ║
║  - Lutéale : 🌧️ 2.4/5       ║
║                              ║
║  COMPLÉMENTS                 ║
║  Inositol : 89% régularité  ║
║  Magnésium : 72% régularité ║
║  Vitamine D : 95% régularité║
║                              ║
║  ────────────────────────    ║
║  Généré par Hormona          ║
║  Ce document ne constitue    ║
║  pas un avis médical.        ║
╚══════════════════════════════╝
```

---

## Logique de génération

### Données agrégées à calculer

```typescript
type MedicalReport = {
  period: { from: Date; to: Date };
  displayName: string;

  cycles: {
    count: number;
    avgLength: number;
    minLength: number;
    maxLength: number;
    regularity: 'regular' | 'irregular' | 'very_irregular';
    // regular: écart < 5j, irregular: 5-10j, very_irregular: > 10j
  };

  symptoms: {
    skin: {
      average: number;
      trend: 'improving' | 'stable' | 'worsening';
      dataPoints: number;   // nombre de jours avec données
    };
    pain: {
      frequency: number;    // jours avec douleur > 0
      avgIntensity: number;
      predominantType: string;
    };
    sleep: {
      avgOnsetMinutes: number;
      avgNightWakings: number;
    };
  };

  mood: {
    predominant: MoodType;
    avgEnergy: number;
    byPhase: Record<CyclePhase, { avgEnergy: number; predominantMood: MoodType }>;
  };

  supplements: {
    items: Array<{
      name: string;
      complianceRate: number;
    }>;
  };

  exercises?: {
    totalSessions: number;
    avgPerWeek: number;
    mostCommonType: string;
    effortFeedback: { boosted: number; exhausted: number };
  };
};
```

### Calcul de tendance (peau)
Comparer la moyenne des 30 premiers jours vs les 30 derniers jours :
- Différence > +0.5 → "improving"
- Différence < -0.5 → "worsening"
- Sinon → "stable"

---

## Génération PDF

Utiliser une librairie côté client pour générer le PDF. Options :
- **jsPDF** + **jsPDF-AutoTable** pour un layout tabulaire propre
- Ou **html2canvas** + **jsPDF** pour capturer un rendu HTML

Recommandation : **jsPDF** directement. Plus léger, plus fiable, pas besoin de rendu HTML intermédiaire.

Le PDF doit être :
- Format A4, marges confortables
- Typographie lisible (pas de serif fancy — Helvetica/Arial)
- Logo Hormona discret en haut
- Disclaimer en pied de page
- Taille < 500Ko

---

## Partage

Deux options :
1. **Afficher sur téléphone** : Ouvre l'aperçu en plein écran (page dédiée) pour le montrer au médecin directement
2. **Télécharger le PDF** : Utilise `window.open(blob URL)` ou `<a download>` pour télécharger le fichier

L'email sera un bonus post-MVP (nécessite un backend email).

---

## Composants React

```
src/pages/MedicalExport.tsx
src/components/medical/
  ReportConfig.tsx             ← Checkboxes de sections à inclure
  ReportPreview.tsx            ← Aperçu du rapport (composant React)
  ReportGenerator.tsx          ← Logique de génération PDF
```

```
src/lib/
  report-aggregator.ts         ← Fonctions pures d'agrégation des données
  report-pdf.ts                ← Génération du PDF avec jsPDF
```

---

## Edge Cases

- **Pas assez de données** : Si < 14 jours de données sur la période, afficher "Pas assez de données pour générer un rapport fiable. Continue le suivi pendant encore [X] jours."
- **Sections sans données** : Si aucun symptôme logué, la section "Symptômes" affiche "Aucune donnée sur cette période" au lieu de moyennes à 0.
- **Journal privé** : Les notes de journal sont **décochées par défaut** et accompagnées de "Tes pensées sont privées. Ne les partage que si tu le souhaites."
- **Données partielles** : Afficher le nombre de jours avec données / nombre total. Ex: "Peau : 2.8/5 (sur 43 jours renseignés / 90)"

---

## Critères d'acceptation

- [ ] L'écran de configuration permet de choisir la période et les sections
- [ ] L'aperçu affiche le rapport dans l'app
- [ ] Le PDF se génère et se télécharge correctement
- [ ] Les données sont agrégées correctement (moyennes, fréquences, tendances)
- [ ] Le rapport est lisible et professionnel
- [ ] Le disclaimer médical est présent
- [ ] Les sections sans données affichent un message clair
- [ ] Le journal est décoché par défaut
- [ ] Le rapport ne dépasse pas 2 pages / 500Ko
