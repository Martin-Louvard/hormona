import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISSED_KEY = 'hormona-install-dismissed';

function isIOSSafari(): boolean {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && !('MSStream' in window) && /Safari/.test(ua);
}

function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches
    || ('standalone' in navigator && (navigator as unknown as { standalone: boolean }).standalone);
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(DISMISSED_KEY) === 'true');
  const [installed, setInstalled] = useState(isStandalone);

  useEffect(() => {
    if (installed || dismissed) return;

    if (isIOSSafari()) {
      setShowIOSPrompt(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstalled(true));

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [installed, dismissed]);

  const install = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalled(true);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const dismiss = useCallback(() => {
    setDismissed(true);
    setShowIOSPrompt(false);
    setDeferredPrompt(null);
    localStorage.setItem(DISMISSED_KEY, 'true');
  }, []);

  const canShow = !installed && !dismissed && (deferredPrompt != null || showIOSPrompt);

  return { canShow, isIOS: showIOSPrompt, install, dismiss };
}
