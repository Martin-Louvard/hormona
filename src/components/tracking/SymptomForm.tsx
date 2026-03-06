import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useSymptomStore } from '@/stores/symptomStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SkinScale } from './SkinScale';
import { PainInput } from './PainInput';
import { SleepInput } from './SleepInput';

export function SymptomForm() {
  const profile = useAuthStore((s) => s.profile);
  const { todaySymptoms, fetchToday, saveSymptoms } = useSymptomStore();

  const [skinQuality, setSkinQuality] = useState<number | null>(null);
  const [painType, setPainType] = useState<string | null>(null);
  const [painIntensity, setPainIntensity] = useState<number | null>(null);
  const [sleepOnset, setSleepOnset] = useState<number | null>(null);
  const [nightWakings, setNightWakings] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile?.id) fetchToday(profile.id);
  }, [profile?.id, fetchToday]);

  useEffect(() => {
    if (todaySymptoms) {
      setSkinQuality(todaySymptoms.skin_quality);
      setPainType(todaySymptoms.pelvic_pain_type);
      setPainIntensity(todaySymptoms.pelvic_pain_intensity);
      setSleepOnset(todaySymptoms.sleep_onset_minutes);
      setNightWakings(todaySymptoms.night_wakings);
      setNotes(todaySymptoms.notes ?? '');
    }
  }, [todaySymptoms]);

  const handleSave = async () => {
    if (!profile) return;
    await saveSymptoms(profile.id, {
      skin_quality: skinQuality,
      pelvic_pain_type: painType,
      pelvic_pain_intensity: painType ? painIntensity : null,
      sleep_onset_minutes: sleepOnset,
      night_wakings: nightWakings,
      notes: notes || null,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <SkinScale value={skinQuality} onChange={setSkinQuality} />
      </Card>

      <Card>
        <PainInput
          type={painType}
          intensity={painIntensity}
          onTypeChange={setPainType}
          onIntensityChange={setPainIntensity}
        />
      </Card>

      <Card>
        <SleepInput
          onsetMinutes={sleepOnset}
          nightWakings={nightWakings}
          onOnsetChange={setSleepOnset}
          onWakingsChange={setNightWakings}
        />
      </Card>

      <Card>
        <label className="text-caption font-medium text-warm-gray">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Autres symptomes, observations..."
          className="mt-2 w-full rounded-2xl border border-warm-gray/20 bg-cream-dark px-4 py-3 text-body text-warm-gray placeholder:text-warm-gray/40 focus:border-rose-soft focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-soft/20 min-h-[80px] resize-y"
        />
      </Card>

      <Button onClick={handleSave}>
        {saved ? 'Sauvegarde !' : 'Enregistrer'}
      </Button>
    </div>
  );
}
