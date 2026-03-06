import type { JournalEntry, CyclePhase } from '@/types';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getPhaseEmoji } from '@/lib/cycle';

interface JournalEntryCardProps {
  entry: JournalEntry;
  phase?: CyclePhase;
  onClick?: () => void;
}

export function JournalEntryCard({ entry, phase, onClick }: JournalEntryCardProps) {
  const date = parseISO(entry.date);
  const dateStr = format(date, 'd MMMM', { locale: fr });
  const preview = entry.content.length > 80 ? entry.content.slice(0, 80) + '...' : entry.content;

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl bg-white p-4 shadow-[0_1px_4px_rgba(74,44,94,0.04)] transition-all hover:shadow-md min-h-[44px]"
    >
      <div className="flex items-center gap-2 mb-1">
        {phase && <span className="text-sm">{getPhaseEmoji(phase)}</span>}
        <span className="text-tiny font-medium text-warm-gray/60">{dateStr}</span>
      </div>
      <p className="text-caption text-warm-gray line-clamp-1">{preview}</p>
    </button>
  );
}
