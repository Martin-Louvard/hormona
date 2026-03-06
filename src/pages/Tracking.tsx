import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useJournalStore } from '@/stores/journalStore';
import { useCycle } from '@/hooks/useCycle';
import { Card } from '@/components/ui/Card';
import { TrackingTabs } from '@/components/tracking/TrackingTabs';
import { SymptomForm } from '@/components/tracking/SymptomForm';
import { SymptomTrendChart } from '@/components/tracking/SymptomTrendChart';
import { JournalEditor } from '@/components/tracking/JournalEditor';
import { JournalEntryCard } from '@/components/tracking/JournalEntryCard';

export function Tracking() {
  const [tab, setTab] = useState<'symptoms' | 'journal'>('symptoms');
  const { profile } = useAuthStore();
  const { entries, fetchEntries } = useJournalStore();
  const { cycleInfo } = useCycle();

  useEffect(() => {
    if (profile?.id && tab === 'journal') {
      fetchEntries(profile.id);
    }
  }, [profile?.id, tab, fetchEntries]);

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      <h1 className="font-serif text-title text-deep-plum">Journal</h1>

      <TrackingTabs active={tab} onChange={setTab} />

      {tab === 'symptoms' && (
        <>
          <SymptomForm />
          <Card>
            <p className="text-caption font-medium text-deep-plum mb-3">Tendances (30 jours)</p>
            <SymptomTrendChart />
          </Card>
        </>
      )}

      {tab === 'journal' && (
        <>
          <JournalEditor />
          {entries.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-caption font-medium text-deep-plum">Entries precedentes</p>
              {entries.slice(0, 10).map((entry) => (
                <JournalEntryCard
                  key={entry.id}
                  entry={entry}
                  phase={cycleInfo?.phase}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
