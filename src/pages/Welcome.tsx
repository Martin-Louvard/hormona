import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function Welcome() {
  return (
    <div className="flex min-h-screen-safe flex-col items-center justify-center p-6 bg-cream">
      <div className="flex flex-col items-center gap-4 mb-12">
        <div className="h-20 w-20 rounded-full bg-rose-soft/20 flex items-center justify-center">
          <span className="text-4xl">🌸</span>
        </div>
        <h1 className="font-serif text-display text-deep-plum">Hormona</h1>
        <p className="text-body text-warm-gray text-center max-w-xs">
          Ton alliee au quotidien pour comprendre et gerer ton SOPK, en douceur.
        </p>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-3">
        <Link to="/register">
          <Button size="lg" className="w-full">Commencer</Button>
        </Link>
        <Link to="/login" className="text-center">
          <Button variant="ghost" size="md" className="w-full">
            J'ai deja un compte
          </Button>
        </Link>
      </div>
    </div>
  );
}
