import type { Exercise, PostEffortFeeling, CyclePhase } from '@/types';
import { useState } from 'react';
import { X } from 'lucide-react';

interface PostEffortPromptProps {
  exercise: Exercise;
  onSubmit: (feeling: PostEffortFeeling) => void;
  onDismiss: () => void;
  phase?: CyclePhase;
}

export function PostEffortPrompt({ exercise, onSubmit, onDismiss, phase }: PostEffortPromptProps) {
  const [selected, setSelected] = useState<PostEffortFeeling | null>(null);

  const handleSelect = (feeling: PostEffortFeeling) => {
    setSelected(feeling);
    onSubmit(feeling);
  };

  const showTip = selected === 'exhausted' && (phase === 'luteal' || phase === 'menstrual');

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-deep-plum/30 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-t-3xl bg-white p-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-heading text-deep-plum">Comment te sens-tu ?</h3>
          <button onClick={onDismiss} className="min-w-[44px] min-h-[44px] flex items-center justify-center">
            <X size={22} className="text-warm-gray" />
          </button>
        </div>

        <p className="text-caption text-warm-gray mb-4">
          Apres ta seance de {exercise.type} ({exercise.duration_minutes} min)
        </p>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => handleSelect('boosted')}
            className={`flex-1 flex flex-col items-center gap-2 rounded-2xl py-4 transition-all min-h-[80px] justify-center ${
              selected === 'boosted'
                ? 'bg-sage/20 ring-2 ring-sage'
                : 'bg-cream-dark hover:bg-cream-dark/80'
            }`}
          >
            <span className="text-2xl">{'\u2728'}</span>
            <span className="text-caption font-medium text-deep-plum">Boostee</span>
          </button>
          <button
            onClick={() => handleSelect('exhausted')}
            className={`flex-1 flex flex-col items-center gap-2 rounded-2xl py-4 transition-all min-h-[80px] justify-center ${
              selected === 'exhausted'
                ? 'bg-coral-warning/20 ring-2 ring-coral-warning'
                : 'bg-cream-dark hover:bg-cream-dark/80'
            }`}
          >
            <span className="text-2xl">{'\uD83D\uDE2E\u200D\uD83D\uDCA8'}</span>
            <span className="text-caption font-medium text-deep-plum">Epuisee</span>
          </button>
        </div>

        {showTip && (
          <div className="rounded-2xl bg-lavender/15 p-4">
            <p className="text-caption text-warm-gray">
              En phase {phase === 'luteal' ? 'luteale' : 'menstruelle'}, c'est normal de se sentir plus fatiguee apres l'effort.
              Reduis l'intensite et privilegia le yoga ou la marche les prochains jours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
