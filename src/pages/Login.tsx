import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { AuthForm } from '@/components/auth/AuthForm';

export function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen-safe flex-col items-center justify-center p-6 bg-cream">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-display text-deep-plum">Bon retour !</h1>
        <p className="mt-2 text-body text-warm-gray">Connecte-toi pour retrouver tes donnees</p>
      </div>

      <Card className="w-full max-w-sm">
        <AuthForm mode="login" onSuccess={() => navigate('/')} />
      </Card>

      <Link
        to="/register"
        className="mt-4 text-caption text-warm-gray hover:text-deep-plum transition-colors"
      >
        Pas encore de compte ? S'inscrire
      </Link>
    </div>
  );
}
