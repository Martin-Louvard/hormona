import { useEffect, useState, useRef, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useJournalStore } from '@/stores/journalStore';
import { Card } from '@/components/ui/Card';
import { Check } from 'lucide-react';

export function JournalEditor() {
  const profile = useAuthStore((s) => s.profile);
  const { todayEntry, fetchToday, saveEntry } = useJournalStore();
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const contentRef = useRef(content);
  contentRef.current = content;

  useEffect(() => {
    if (profile?.id) fetchToday(profile.id);
  }, [profile?.id, fetchToday]);

  useEffect(() => {
    if (todayEntry) setContent(todayEntry.content);
  }, [todayEntry]);

  const doSave = useCallback(async (text: string) => {
    if (!profile) return;
    await saveEntry(profile.id, text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [profile, saveEntry]);

  const handleChange = (text: string) => {
    setContent(text);
    setSaved(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSave(text), 3000);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (contentRef.current && profile) {
        saveEntry(profile.id, contentRef.current);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        if (contentRef.current && profile) {
          saveEntry(profile.id, contentRef.current);
        }
      }
    };
  }, [profile, saveEntry]);

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <div className="flex items-center justify-between mb-2">
          <span className="text-caption font-medium text-warm-gray">Qu'est-ce qui te traverse l'esprit ?</span>
          {saved && (
            <span className="flex items-center gap-1 text-tiny text-sage-dark">
              <Check size={12} /> Sauvegarde
            </span>
          )}
        </div>
        <textarea
          value={content}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Ecris librement, c'est ton espace..."
          className="w-full rounded-2xl border border-warm-gray/20 bg-cream-dark px-4 py-3 text-body text-warm-gray placeholder:text-warm-gray/40 focus:border-rose-soft focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-soft/20 min-h-[200px] resize-y transition-colors"
        />
      </Card>

      <div className="flex items-center gap-2 rounded-2xl bg-lavender/10 px-4 py-3">
        <span className="text-sm">{'\uD83D\uDD12'}</span>
        <p className="text-tiny text-warm-gray">Ton journal est prive et chiffre. Personne d'autre ne peut le lire.</p>
      </div>
    </div>
  );
}
