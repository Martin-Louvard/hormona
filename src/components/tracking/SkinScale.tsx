interface SkinScaleProps {
  value: number | null;
  onChange: (value: number) => void;
}

const skinEmojis = ['\uD83D\uDE1F', '\uD83D\uDE15', '\uD83D\uDE10', '\uD83D\uDE42', '\uD83D\uDE0A'];
const skinLabels = ['Tres mauvaise', 'Mauvaise', 'Correcte', 'Bonne', 'Tres bonne'];

export function SkinScale({ value, onChange }: SkinScaleProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-caption font-medium text-warm-gray">Qualite de la peau</span>
      <div className="flex justify-between gap-1">
        {skinEmojis.map((emoji, i) => {
          const n = i + 1;
          const isActive = value === n;
          const color = n <= 2 ? '#E8927C' : n === 3 ? '#FFD166' : '#A8C5A0';
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 transition-all min-w-[56px] min-h-[56px] justify-center ${
                isActive ? 'scale-110' : ''
              }`}
              style={isActive ? { backgroundColor: `${color}20` } : undefined}
              aria-label={skinLabels[i]}
            >
              <span className={`text-xl transition-all ${isActive ? '' : 'opacity-50'}`}>{emoji}</span>
              <span className="text-[9px] text-warm-gray">{skinLabels[i].split(' ').pop()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
