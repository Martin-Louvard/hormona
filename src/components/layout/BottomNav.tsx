import { NavLink } from 'react-router-dom';
import { Home, Utensils, Activity, BookHeart, MoreHorizontal } from 'lucide-react';

const links = [
  { to: '/', icon: Home, label: 'Accueil' },
  { to: '/nutrition', icon: Utensils, label: 'Nutrition' },
  { to: '/movement', icon: Activity, label: 'Sport' },
  { to: '/tracking', icon: BookHeart, label: 'Journal' },
  { to: '/more', icon: MoreHorizontal, label: 'Plus' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-[12px] shadow-[0_-2px_12px_rgba(45,34,53,0.04)] pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex h-14 max-w-[480px] items-center justify-around px-2">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-0.5 px-3 py-2 text-[10px] min-w-[48px] min-h-[48px] justify-center transition-colors ${
                isActive ? 'text-accent-primary' : 'text-text-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={1.75} />
                <span>{label}</span>
                {isActive && (
                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-accent-primary" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
