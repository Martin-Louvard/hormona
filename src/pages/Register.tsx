import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { AuthForm } from '@/components/auth/AuthForm';

export function Register() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen-safe flex-col items-center justify-center p-6 bg-cream">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-display text-deep-plum">Creer ton compte</h1>
        <p className="mt-2 text-body text-warm-gray">Quelques secondes et c'est parti</p>
      </div>

      <Card className="w-full max-w-sm">
        <AuthForm mode="register" onSuccess={() => navigate('/onboarding')} />
      </Card>

      <Link
        to="/login"
        className="mt-4 text-caption text-warm-gray hover:text-deep-plum transition-colors"
      >
        Deja un compte ? Se connecter
      </Link>
    </div>
  );
}
