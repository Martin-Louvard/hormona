import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSuccess?: () => void;
}

export function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const { signIn, signUp } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'register') {
        await signUp(email, password, displayName);
      } else {
        await signIn(email, password);
      }
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {mode === 'register' && (
        <Input
          id="displayName"
          label="Prenom"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Ton prenom"
          required
        />
      )}

      <Input
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ton@email.com"
        required
      />

      <Input
        id="password"
        label="Mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        minLength={6}
        required
      />

      {error && <p className="text-tiny text-coral-warning">{error}</p>}

      <Button type="submit" loading={loading}>
        {mode === 'register' ? "S'inscrire" : 'Se connecter'}
      </Button>
    </form>
  );
}
