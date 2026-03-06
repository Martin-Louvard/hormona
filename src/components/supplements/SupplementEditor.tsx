import { useState } from 'react';
import type { Supplement, TimeOfDay } from '@/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { supplementPresets } from '@/data/supplement-presets';
import { SupplementPresets } from './SupplementPresets';

interface SupplementEditorProps {
  initial?: Supplement;
  onSave: (data: { name: string; dosage: string; time_of_day: TimeOfDay; stock_remaining_days: number }) => void;
  onDelete?: () => void;
  onCancel: () => void;
}

const timeOptions: { value: TimeOfDay; label: string }[] = [
  { value: 'morning', label: 'Matin' },
  { value: 'evening', label: 'Soir' },
  { value: 'both', label: 'Les deux' },
];

export function SupplementEditor({ initial, onSave, onDelete, onCancel }: SupplementEditorProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [dosage, setDosage] = useState(initial?.dosage ?? '');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(initial?.time_of_day ?? 'morning');
  const [stock, setStock] = useState(initial?.stock_remaining_days ?? 30);

  const handlePresetSelect = (presetName: string) => {
    const preset = supplementPresets.find((p) => p.name === presetName);
    if (preset) {
      setName(preset.name);
      setDosage(preset.dosage);
      setTimeOfDay(preset.timeOfDay);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), dosage, time_of_day: timeOfDay, stock_remaining_days: stock });
  };

  return (
    <div className="flex flex-col gap-4">
      {!initial && (
        <SupplementPresets onSelect={handlePresetSelect} selectedName={name} />
      )}

      <Input
        label="Nom du complement"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ex: Inositol, Magnesium..."
      />

      <Input
        label="Dosage"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
        placeholder="Ex: 300mg / jour"
      />

      <div className="flex flex-col gap-1">
        <span className="text-caption font-medium text-warm-gray">Quand le prendre ?</span>
        <div className="flex gap-2">
          {timeOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setTimeOfDay(value)}
              className={`flex-1 rounded-2xl py-2.5 text-caption font-medium transition-all min-h-[44px] ${
                timeOfDay === value
                  ? 'bg-rose-soft/20 text-deep-plum ring-2 ring-rose-soft'
                  : 'bg-cream-dark text-warm-gray'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <Input
        label="Stock restant (jours)"
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        min={0}
      />

      <div className="flex gap-3 pt-2">
        <Button variant="secondary" onClick={onCancel} className="flex-1">
          Annuler
        </Button>
        <Button onClick={handleSubmit} className="flex-1" disabled={!name.trim()}>
          {initial ? 'Modifier' : 'Ajouter'}
        </Button>
      </div>

      {initial && onDelete && (
        <button
          onClick={onDelete}
          className="text-caption text-coral-warning hover:underline text-center min-h-[44px]"
        >
          Supprimer ce complement
        </button>
      )}
    </div>
  );
}
