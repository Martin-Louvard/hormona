interface TrackingTabsProps {
  active: 'symptoms' | 'journal';
  onChange: (tab: 'symptoms' | 'journal') => void;
}

export function TrackingTabs({ active, onChange }: TrackingTabsProps) {
  const tabs = [
    { key: 'symptoms' as const, label: 'Symptomes' },
    { key: 'journal' as const, label: 'Journal' },
  ];

  return (
    <div className="flex border-b border-warm-gray/10">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 py-3 text-caption font-medium transition-all min-h-[44px] ${
            active === key
              ? 'text-deep-plum border-b-2 border-rose-soft'
              : 'text-warm-gray'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
