import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Pill, FileText, ChevronRight } from 'lucide-react';

export function More() {
  const { profile, signOut } = useAuthStore();

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      <h1 className="font-serif text-title text-deep-plum">Plus</h1>

      <Card>
        <p className="text-caption font-medium text-deep-plum">Profil</p>
        <p className="mt-1 text-body text-warm-gray">{profile?.display_name || 'Utilisatrice'}</p>
        <p className="text-tiny text-warm-gray/60">Cycle moyen : {profile?.cycle_length_avg ?? 28} jours</p>
      </Card>

      <Link to="/supplements">
        <Card variant="interactive" className="flex items-center gap-3">
          <Pill size={22} className="text-sage" />
          <div className="flex-1">
            <p className="text-caption font-medium text-deep-plum">Complements</p>
            <p className="text-tiny text-warm-gray">Gestion, suivi, interactions</p>
          </div>
          <ChevronRight size={18} className="text-warm-gray-light" />
        </Card>
      </Link>

      <Link to="/medical-export">
        <Card variant="interactive" className="flex items-center gap-3">
          <FileText size={22} className="text-phase-menstrual" />
          <div className="flex-1">
            <p className="text-caption font-medium text-deep-plum">Export medical</p>
            <p className="text-tiny text-warm-gray">Resume PDF pour ton medecin</p>
          </div>
          <ChevronRight size={18} className="text-warm-gray-light" />
        </Card>
      </Link>

      <Button variant="ghost" onClick={signOut} className="text-coral-warning">
        Se deconnecter
      </Button>
    </div>
  );
}
