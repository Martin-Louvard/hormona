import { Button } from '@/components/ui/Button';

interface OnboardingStepProps {
  title: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}

export function OnboardingStep({
  title,
  children,
  onNext,
  onBack,
  nextLabel = 'Continuer',
  nextDisabled = false,
}: OnboardingStepProps) {
  return (
    <div className="flex h-screen-safe flex-col px-6 pt-12" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
      <div className="flex-1 overflow-y-auto">
        <h2 className="font-serif text-title text-deep-plum mb-6">{title}</h2>
        {children}
      </div>

      <div className="flex flex-col gap-3 pt-4 shrink-0">
        <Button onClick={onNext} disabled={nextDisabled} size="lg" className="w-full">
          {nextLabel}
        </Button>
        {onBack && (
          <Button variant="ghost" onClick={onBack} size="md" className="w-full">
            Retour
          </Button>
        )}
      </div>
    </div>
  );
}
