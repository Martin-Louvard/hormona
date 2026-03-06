import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { StepIndicator } from '@/components/auth/StepIndicator';
import { OnboardingStep } from '@/components/auth/OnboardingStep';
import { CycleLengthPicker } from '@/components/auth/CycleLengthPicker';
import { PeriodDatePicker } from '@/components/auth/PeriodDatePicker';
import { Input } from '@/components/ui/Input';
import { PhaseIndicator } from '@/components/ui/PhaseIndicator';
import { getCycleInfo } from '@/lib/cycle';
import { format } from 'date-fns';

export function Onboarding() {
  const navigate = useNavigate();
  const { updateProfile } = useAuthStore();

  const [step, setStep] = useState(0);
  const [displayName, setDisplayName] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [periodDate, setPeriodDate] = useState<Date | null>(null);
  const [saving, setSaving] = useState(false);

  const handleFinish = async () => {
    if (!periodDate) return;
    setSaving(true);
    try {
      await updateProfile({
        display_name: displayName,
        cycle_length_avg: cycleLength,
        last_period_start: format(periodDate, 'yyyy-MM-dd'),
      });
      setStep(3);
    } catch {
      setSaving(false);
    }
  };

  const cycleInfo = periodDate
    ? getCycleInfo({ lastPeriodStart: periodDate, cycleLengthAvg: cycleLength })
    : null;

  if (step === 3 && cycleInfo) {
    return (
      <div className="flex min-h-screen-safe flex-col items-center justify-center p-6 bg-cream text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-rose-soft/20 flex items-center justify-center">
            <span className="text-4xl">✨</span>
          </div>
          <h1 className="font-serif text-display text-deep-plum">
            C'est parti, {displayName} !
          </h1>
          <p className="text-body text-warm-gray max-w-xs">
            Tu es actuellement en phase
          </p>
          <PhaseIndicator phase={cycleInfo.phase} />
          <p className="text-caption text-warm-gray-light">
            Jour {cycleInfo.currentDay} sur {cycleInfo.totalDays}
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center justify-center rounded-2xl bg-rose-soft px-8 h-14 text-body font-medium text-white shadow-sm transition-all active:scale-[0.97]"
          >
            Voir mon dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream">
      <div className="pt-6 px-6">
        <StepIndicator totalSteps={3} currentStep={step} />
      </div>

      {step === 0 && (
        <OnboardingStep
          title="Comment tu t'appelles ?"
          onNext={() => setStep(1)}
          nextDisabled={!displayName.trim()}
        >
          <Input
            id="onboarding-name"
            placeholder="Ton prenom"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoFocus
          />
        </OnboardingStep>
      )}

      {step === 1 && (
        <OnboardingStep
          title="Ton cycle"
          onNext={() => setStep(2)}
          onBack={() => setStep(0)}
        >
          <CycleLengthPicker value={cycleLength} onChange={setCycleLength} />
        </OnboardingStep>
      )}

      {step === 2 && (
        <OnboardingStep
          title="Tes dernieres regles"
          onNext={handleFinish}
          onBack={() => setStep(1)}
          nextLabel={saving ? 'Un instant...' : 'Terminer'}
          nextDisabled={!periodDate || saving}
        >
          <PeriodDatePicker value={periodDate} onChange={setPeriodDate} />
        </OnboardingStep>
      )}
    </div>
  );
}
