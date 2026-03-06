import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useSupplementStore } from '@/stores/supplementStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ComplianceBar } from '@/components/supplements/ComplianceBar';
import { SupplementCard } from '@/components/supplements/SupplementCard';
import { SupplementEditor } from '@/components/supplements/SupplementEditor';
import { InteractionCards } from '@/components/supplements/InteractionCards';
import type { Supplement, SupplementPeriod, TimeOfDay } from '@/types';
import { Plus } from 'lucide-react';

export function Supplements() {
  const { profile } = useAuthStore();
  const { supplements, todayLogs, loading, fetchSupplements, addSupplement, updateSupplement, deleteSupplement, toggleLog, getComplianceRate } = useSupplementStore();
  const [editing, setEditing] = useState<Supplement | null>(null);
  const [adding, setAdding] = useState(false);
  const [compliance, setCompliance] = useState(0);

  useEffect(() => {
    if (profile?.id) {
      fetchSupplements(profile.id);
      getComplianceRate(profile.id, 7).then(setCompliance);
    }
  }, [profile?.id, fetchSupplements, getComplianceRate]);

  const handleToggle = async (supplementId: string, period: SupplementPeriod) => {
    if (!profile) return;
    await toggleLog(profile.id, supplementId, period);
    const rate = await getComplianceRate(profile.id, 7);
    setCompliance(rate);
  };

  const handleSave = async (data: { name: string; dosage: string; time_of_day: TimeOfDay; stock_remaining_days: number }) => {
    if (!profile) return;
    if (editing) {
      await updateSupplement(editing.id, data);
      setEditing(null);
    } else {
      await addSupplement(profile.id, data);
      setAdding(false);
    }
  };

  const handleDelete = async () => {
    if (!editing) return;
    await deleteSupplement(editing.id);
    setEditing(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 p-4 pb-24">
        <h1 className="font-serif text-title text-deep-plum">Complements</h1>
        <div className="animate-pulse space-y-3">
          <div className="h-16 rounded-3xl bg-cream-dark" />
          <div className="h-24 rounded-3xl bg-cream-dark" />
          <div className="h-24 rounded-3xl bg-cream-dark" />
        </div>
      </div>
    );
  }

  if (adding || editing) {
    return (
      <div className="flex flex-col gap-4 p-4 pb-24">
        <h1 className="font-serif text-title text-deep-plum">
          {editing ? 'Modifier' : 'Ajouter un complement'}
        </h1>
        <Card>
          <SupplementEditor
            initial={editing ?? undefined}
            onSave={handleSave}
            onDelete={editing ? handleDelete : undefined}
            onCancel={() => { setAdding(false); setEditing(null); }}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      <h1 className="font-serif text-title text-deep-plum">Complements</h1>

      {supplements.length > 0 && (
        <Card>
          <ComplianceBar rate={compliance} />
        </Card>
      )}

      {supplements.length === 0 ? (
        <Card className="text-center py-8">
          <p className="text-body text-warm-gray mb-4">
            Tu n'as pas encore ajoute de complement. Commence par les essentiels du SOPK.
          </p>
          <Button onClick={() => setAdding(true)}>
            <Plus size={18} className="mr-2" />
            Ajouter un complement
          </Button>
        </Card>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {supplements.map((supplement) => (
              <SupplementCard
                key={supplement.id}
                supplement={supplement}
                logs={todayLogs}
                onToggle={(period) => handleToggle(supplement.id, period)}
                onEdit={() => setEditing(supplement)}
              />
            ))}
          </div>

          <Button variant="secondary" onClick={() => setAdding(true)} className="self-center">
            <Plus size={18} className="mr-2" />
            Ajouter
          </Button>
        </>
      )}

      <InteractionCards activeSupplementNames={supplements.map((s) => s.name)} />
    </div>
  );
}
