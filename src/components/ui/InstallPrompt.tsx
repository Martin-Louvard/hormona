import { X, Share, PlusSquare, Download } from 'lucide-react';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';

export function InstallPrompt() {
  const { canShow, isIOS, install, dismiss } = useInstallPrompt();

  if (!canShow) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-lg animate-slide-up">
      <div className="rounded-2xl bg-white p-4 shadow-lg ring-1 ring-deep-plum/10">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-soft/20">
            <Download size={20} className="text-rose-soft" />
          </div>
          <div className="flex-1">
            <p className="text-caption font-medium text-deep-plum">Installer Hormona</p>
            {isIOS ? (
              <p className="mt-1 text-tiny text-warm-gray">
                Appuie sur <Share size={12} className="inline" /> puis <PlusSquare size={12} className="inline" /> "Sur l'ecran d'accueil"
              </p>
            ) : (
              <p className="mt-1 text-tiny text-warm-gray">
                Ajoute l'app sur ton ecran d'accueil pour un acces rapide.
              </p>
            )}
            {!isIOS && (
              <button
                onClick={install}
                className="mt-2 rounded-xl bg-rose-soft px-4 py-2 text-tiny font-medium text-white active:scale-[0.97]"
              >
                Installer
              </button>
            )}
          </div>
          <button
            onClick={dismiss}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-cream"
          >
            <X size={16} className="text-warm-gray" />
          </button>
        </div>
      </div>
    </div>
  );
}
