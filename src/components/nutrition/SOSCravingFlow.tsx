import { useState } from 'react';
import type { CyclePhase } from '@/types';
import { type CravingType, cravingLabels, getCravingSuggestion, type CravingResponse } from '@/data/craving-responses';
import { Card } from '@/components/ui/Card';
import { X, RefreshCw } from 'lucide-react';

interface SOSCravingFlowProps {
  phase: CyclePhase;
  onClose: () => void;
}

export function SOSCravingFlow({ phase, onClose }: SOSCravingFlowProps) {
  const [step, setStep] = useState<'type' | 'result'>('type');
  const [selectedType, setSelectedType] = useState<CravingType | null>(null);
  const [result, setResult] = useState<CravingResponse | null>(null);

  const handleSelectType = (type: CravingType) => {
    setSelectedType(type);
    setResult(getCravingSuggestion(phase, type));
    setStep('result');
  };

  const handleRefresh = () => {
    if (selectedType) {
      setResult(getCravingSuggestion(phase, selectedType));
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-deep-plum/30 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-t-3xl bg-white p-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] animate-[slideUp_0.3s_ease-out]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-heading text-deep-plum">SOS Fringale</h3>
          <button onClick={onClose} className="min-w-[44px] min-h-[44px] flex items-center justify-center">
            <X size={22} className="text-warm-gray" />
          </button>
        </div>

        {step === 'type' && (
          <div className="flex flex-col gap-3">
            <p className="text-caption text-warm-gray mb-2">Qu'est-ce qui te ferait plaisir ?</p>
            {(Object.keys(cravingLabels) as CravingType[]).map((type) => (
              <button
                key={type}
                onClick={() => handleSelectType(type)}
                className="flex items-center gap-3 rounded-2xl bg-cream-dark px-4 py-4 text-left transition-all hover:bg-cream-dark/80 min-h-[56px]"
              >
                <span className="text-2xl">{cravingLabels[type].emoji}</span>
                <span className="text-body font-medium text-deep-plum">{cravingLabels[type].label}</span>
              </button>
            ))}
          </div>
        )}

        {step === 'result' && result && (
          <div className="flex flex-col gap-4">
            <Card variant="highlight" phaseColor="#A8C5A0">
              <p className="text-body font-medium text-deep-plum mb-2">{result.suggestion}</p>
              <p className="text-caption text-warm-gray">{result.explanation}</p>
            </Card>

            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 rounded-2xl bg-cream-dark px-4 py-2 text-caption text-warm-gray min-h-[44px] hover:bg-cream-dark/80"
              >
                <RefreshCw size={16} />
                Autre idee
              </button>
              <button
                onClick={() => setStep('type')}
                className="flex-1 rounded-2xl bg-cream-dark px-4 py-2 text-caption text-warm-gray min-h-[44px] hover:bg-cream-dark/80"
              >
                Changer de type
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
