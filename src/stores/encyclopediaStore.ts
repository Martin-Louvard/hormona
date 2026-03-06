import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EncyclopediaState {
  readPathwayCards: string[];
  markRead: (id: string) => void;
}

export const useEncyclopediaStore = create<EncyclopediaState>()(
  persist(
    (set) => ({
      readPathwayCards: [],
      markRead: (id) =>
        set((s) => ({
          readPathwayCards: s.readPathwayCards.includes(id)
            ? s.readPathwayCards
            : [...s.readPathwayCards, id],
        })),
    }),
    { name: 'hormona-encyclopedia' }
  )
);
