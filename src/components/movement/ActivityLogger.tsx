import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ActivityTypeSelector } from './ActivityTypeSelector';
import { DurationPicker } from './DurationPicker';
import { ArrowLeft } from 'lucide-react';

interface ActivityLoggerProps {
  onSave: (type: string, duration: number) => void;
  onBack: () => void;
}

export function ActivityLogger({ onSave, onBack }: ActivityLoggerProps) {
  const [type, setType] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  const handleSave = () => {
    if (type && duration) {
      onSave(type, duration);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-4 pb-24">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="min-w-[44px] min-h-[44px] flex items-center justify-center">
          <ArrowLeft size={22} className="text-deep-plum" />
        </button>
        <h2 className="font-serif text-title text-deep-plum">Noter une activite</h2>
      </div>

      <div>
        <p className="text-caption font-medium text-warm-gray mb-3">Quel type d'activite ?</p>
        <ActivityTypeSelector selected={type} onSelect={setType} />
      </div>

      <div>
        <p className="text-caption font-medium text-warm-gray mb-3">Combien de temps ?</p>
        <DurationPicker selected={duration} onSelect={setDuration} />
      </div>

      <Button
        onClick={handleSave}
        disabled={!type || !duration}
        className="mt-2"
      >
        Enregistrer
      </Button>
    </div>
  );
}
