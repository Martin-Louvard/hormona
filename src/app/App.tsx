import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppRoutes } from './routes';
import { Welcome } from '@/pages/Welcome';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Onboarding } from '@/pages/Onboarding';
import { OfflineBanner } from '@/components/ui/OfflineBanner';
import { InstallPrompt } from '@/components/ui/InstallPrompt';

export function App() {
  const { user, profile, loading, initialize } = useAuthStore();
  const isOnboarded = profile?.last_period_start != null;

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading) {
    return (
      <div className="flex min-h-screen-safe items-center justify-center bg-bg-base">
        <div className="text-center">
          <h1 className="font-serif-display text-display text-text-primary">Hormona</h1>
          <p className="mt-2 text-body text-text-muted">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    );
  }

  if (!isOnboarded) {
    return (
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-shell min-h-screen-safe bg-bg-base">
      <OfflineBanner />
      <main className="px-5 pt-4 pb-20">
        <AppRoutes />
      </main>
      <BottomNav />
      <InstallPrompt />
    </div>
  );
}
