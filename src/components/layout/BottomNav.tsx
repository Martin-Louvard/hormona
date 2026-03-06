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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-warm-gray/10 bg-white/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-2 text-tiny min-w-[48px] min-h-[48px] justify-center transition-colors ${
                isActive ? 'text-rose-deep' : 'text-warm-gray-light'
              }`
            }
          >
            <Icon size={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
