interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export function StepIndicator({ totalSteps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all ${
            i <= currentStep ? 'w-6 bg-rose-soft' : 'w-2 bg-warm-gray-light'
          }`}
        />
      ))}
    </div>
  );
}
