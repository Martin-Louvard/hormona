interface ActivityTypeSelectorProps {
  selected: string | null;
  onSelect: (type: string) => void;
}

const activityTypes = [
  { type: 'Yoga', emoji: '\uD83E\uDDD8' },
  { type: 'Muscu', emoji: '\uD83D\uDCAA' },
  { type: 'Cardio', emoji: '\uD83C\uDFC3' },
  { type: 'HIIT', emoji: '\uD83D\uDD25' },
  { type: 'Marche', emoji: '\uD83D\uDEB6' },
  { type: 'Natation', emoji: '\uD83C\uDFCA' },
  { type: 'Danse', emoji: '\uD83E\uDD38' },
  { type: 'Autre', emoji: '\u270F\uFE0F' },
];

export function ActivityTypeSelector({ selected, onSelect }: ActivityTypeSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {activityTypes.map(({ type, emoji }) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={`flex flex-col items-center gap-1 rounded-2xl py-3 transition-all min-h-[64px] justify-center ${
            selected === type
              ? 'bg-rose-soft/20 ring-2 ring-rose-soft'
              : 'bg-cream-dark hover:bg-cream-dark/80'
          }`}
        >
          <span className="text-xl">{emoji}</span>
          <span className="text-tiny font-medium text-warm-gray">{type}</span>
        </button>
      ))}
    </div>
  );
}
