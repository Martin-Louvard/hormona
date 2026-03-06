# 11 — Offline & PWA

## Contexte produit

L'utilisatrice note ses repas dans le métro, ses symptômes dans une salle d'attente, son journal dans son lit. Ces moments-là, le réseau n'est pas garanti. L'app doit fonctionner **sans connexion** pour la saisie, puis synchroniser quand le réseau revient.

La PWA est aussi ce qui permet l'installation sur l'écran d'accueil sans App Store — crucial pour ne pas perdre l'utilisatrice entre "j'ai envie de l'installer" et "je la télécharge".

---

## User Stories

- Je veux noter mes repas/symptômes même sans réseau
- Je veux installer l'app sur mon écran d'accueil en 1 tap
- Je veux que mes données se synchronisent automatiquement quand je retrouve le réseau

---

## PWA : Configuration

### `vite.config.ts` avec VitePWA

```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Hormona',
        short_name: 'Hormona',
        description: 'Ton compagnon SOPK, jour après jour.',
        theme_color: '#FFF8F0',
        background_color: '#FFF8F0',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
});
```

### Icônes PWA

Générer 3 icônes :
- `icon-192.png` (192×192)
- `icon-512.png` (512×512)
- `icon-512-maskable.png` (512×512, avec zone de sécurité pour le masquage Android)

Design : Le logo Hormona (une fleur stylisée ou initiale "H") sur fond `cream`. Couleurs douces, reconnaissable à petite taille.

---

## Offline : Stratégie

### Principe

Deux types de données dans l'app :

| Type | Exemples | Stratégie offline |
|------|----------|-------------------|
| **Lecture seule** | Encyclopédie, tips, IG database, interactions compléments | Tout est embarqué dans le bundle (données statiques). Toujours disponible. |
| **Lecture/écriture** | Repas, symptômes, journal, mood, exercices, supplement logs | File d'attente locale → sync au retour réseau |

### File d'attente offline : `src/lib/offline-queue.ts`

```typescript
type QueuedAction = {
  id: string;               // UUID local
  table: string;            // "meals", "symptoms", etc.
  action: 'insert' | 'update' | 'delete';
  data: Record<string, any>;
  createdAt: string;        // ISO timestamp
  retries: number;          // Nombre de tentatives échouées
};

class OfflineQueue {
  private queue: QueuedAction[] = [];

  // Ajouter une action à la queue (quand offline)
  enqueue(action: Omit<QueuedAction, 'id' | 'createdAt' | 'retries'>): void;

  // Synchroniser toutes les actions en queue (quand online)
  async flush(supabase: SupabaseClient): Promise<{ success: number; failed: number }>;

  // Nombre d'actions en attente
  get pendingCount(): number;

  // Persistance dans IndexedDB (pas localStorage — taille limitée)
  private async save(): Promise<void>;
  private async load(): Promise<void>;
}
```

### Hook : `useOffline()`

```typescript
function useOffline() {
  return {
    isOnline: boolean;           // navigator.onLine + event listeners
    pendingActions: number;      // Nombre d'actions en queue
    isSyncing: boolean;          // En cours de sync
    lastSyncAt: Date | null;     // Dernière sync réussie
  };
}
```

### Détection réseau

```typescript
// Écouter les événements
window.addEventListener('online', handleOnline);
window.addEventListener('offline', handleOffline);

// Au retour en ligne : flush automatique de la queue
async function handleOnline() {
  const result = await offlineQueue.flush(supabase);
  if (result.failed > 0) {
    // Notification discrète : "X actions n'ont pas pu être synchronisées"
  }
}
```

### Indicateur visuel

Quand offline, afficher un **banner discret** en haut de l'écran :

```
┌──────────────────────────────┐
│ 📡 Mode hors-ligne · 2 en attente │
└──────────────────────────────┘
```

- Fond : `warm-gray` avec opacity 90%
- Texte : blanc
- Disparaît automatiquement 3 secondes après le retour en ligne (avec "✓ Synchronisé")

---

## Install Prompt

### Sur iOS (Safari)
iOS ne supporte pas l'événement `beforeinstallprompt`. Détecter iOS et afficher un encart manuel :

```
┌────────────────────────────┐
│ 📲 Installe Hormona        │
│ Tap sur "Partager" puis    │
│ "Sur l'écran d'accueil"   │
│                     [OK]   │
└────────────────────────────┘
```

Afficher une seule fois (flag dans Zustand persist). Ne pas re-montrer si elle dismiss.

### Sur Android (Chrome)
Intercepter l'événement `beforeinstallprompt` et afficher un bouton custom :

```
┌────────────────────────────┐
│ 📲 Installe Hormona pour   │
│ un accès rapide.           │
│ [Installer] [Plus tard]   │
└────────────────────────────┘
```

---

## Stores persistés

Utiliser Zustand `persist` middleware avec `IndexedDB` (via `idb-keyval` ou l'adapter custom) pour persister :

- `cycleStore` (profil cycle — toujours disponible offline)
- `supplementStore` (liste des compléments)
- Données du jour en cours (mood, symptômes)

Ne PAS persister :
- Les données historiques complètes (trop lourd)
- Le journal (données sensibles, pas en cache local)

---

## Composants React

```
src/components/ui/
  OfflineBanner.tsx             ← Banner hors-ligne
  InstallPrompt.tsx             ← Prompt d'installation PWA
  SyncIndicator.tsx             ← Petit badge "X en attente"

src/hooks/
  useOffline.ts                 ← Détection réseau + queue
  useInstallPrompt.ts           ← Gestion du prompt install
```

---

## Edge Cases

- **Conflit de sync** : Si la même entrée est modifiée offline et en ligne (improbable pour un usage mono-device), last-write-wins. Pas de résolution de conflit complexe.
- **Queue très longue** : Si > 50 actions en queue (usage prolongé offline), afficher un warning : "Tu as beaucoup de données en attente. Connecte-toi au Wi-Fi pour synchroniser."
- **Erreur de sync** : Retry automatique 3 fois avec backoff exponentiel. Après 3 échecs, garder dans la queue et notifier.
- **App fermée pendant offline** : La queue est persistée dans IndexedDB. Au prochain lancement en ligne, flush automatique.
- **Service worker update** : Auto-update avec notification discrète "Nouvelle version disponible. Recharge pour mettre à jour."

---

## Critères d'acceptation

- [ ] L'app est installable sur Android (Chrome) et iOS (Safari)
- [ ] Le manifest PWA est correct (icônes, couleurs, orientation portrait)
- [ ] Le service worker cache tous les assets statiques
- [ ] La saisie (repas, symptômes, mood, exercices, compléments) fonctionne offline
- [ ] Les actions offline sont mises en queue dans IndexedDB
- [ ] La synchronisation se lance automatiquement au retour en ligne
- [ ] Le banner "Mode hors-ligne" est visible quand le réseau est absent
- [ ] Le nombre d'actions en attente est affiché
- [ ] Le prompt d'installation est adapté à la plateforme (iOS vs Android)
- [ ] Les données encyclopédiques et IG sont disponibles offline (statiques dans le bundle)
- [ ] L'app fonctionne même sans aucune connexion initiale (après le premier chargement)
