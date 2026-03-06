interface ComplianceBarProps {
  rate: number; // 0-1
}

function getMessage(rate: number): { text: string; color: string } {
  if (rate >= 0.9) return { text: 'Excellente regularite, bravo !', color: '#A8C5A0' };
  if (rate >= 0.7) return { text: 'Bonne regularite, continue comme ca !', color: '#7EC8B8' };
  if (rate >= 0.5) return { text: 'Pas mal, mais tu peux faire mieux.', color: '#FFD166' };
  return { text: 'Essaie de ne pas oublier tes complements.', color: '#E8927C' };
}

export function ComplianceBar({ rate }: ComplianceBarProps) {
  const { text, color } = getMessage(rate);
  const percent = Math.round(rate * 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-caption font-medium text-warm-gray">Regularite</span>
        <span className="text-caption font-bold" style={{ color }}>{percent}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-cream-dark overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-tiny text-warm-gray">{text}</p>
    </div>
  );
}
