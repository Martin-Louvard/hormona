import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { searchGIDatabase } from '@/lib/gi-database';
import type { GIEntry } from '@/lib/gi-database';
import { GIResultCard } from './GIResultCard';

export function GISearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GIEntry[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selected, setSelected] = useState<GIEntry | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      setResults(searchGIDatabase(query));
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  const handleSelect = (entry: GIEntry) => {
    setSelected(entry);
    setShowResults(false);
    setQuery('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray-light" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          placeholder="Chercher un aliment (IG)..."
          className="w-full rounded-2xl border border-warm-gray/20 bg-cream-dark py-3 pl-11 pr-4 text-body text-warm-gray placeholder:text-warm-gray/40 focus:border-rose-soft focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-soft/20 min-h-[44px] transition-colors"
        />
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-60 overflow-y-auto rounded-2xl bg-white shadow-lg border border-warm-gray/10">
          {results.map((entry) => (
            <button
              key={entry.id}
              onClick={() => handleSelect(entry)}
              className="w-full text-left px-4 py-3 hover:bg-cream-dark transition-colors border-b border-warm-gray/5 last:border-b-0 min-h-[44px]"
            >
              <span className="text-body text-deep-plum">{entry.name}</span>
              <span className="ml-2 text-tiny text-warm-gray">IG {entry.gi}</span>
            </button>
          ))}
        </div>
      )}

      {showResults && query.length >= 2 && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-2xl bg-white shadow-lg border border-warm-gray/10 p-4">
          <p className="text-caption text-warm-gray text-center">Aucun aliment trouve</p>
        </div>
      )}

      {selected && (
        <div className="mt-3">
          <GIResultCard entry={selected} onClose={() => setSelected(null)} />
        </div>
      )}
    </div>
  );
}
