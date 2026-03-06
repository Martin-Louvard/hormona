import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/types';
import { supabase } from '@/lib/supabase';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,

  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    set({ user: session?.user ?? null, loading: false });
    if (session?.user) {
      await get().fetchProfile();
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
      if (session?.user) {
        get().fetchProfile();
      } else {
        set({ profile: null });
      }
    });
  },

  signUp: async (email, password, displayName) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });
    if (error) throw error;
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null, profile: null });
  },

  fetchProfile: async () => {
    const user = get().user;
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    set({ profile: data });
  },

  updateProfile: async (updates) => {
    const user = get().user;
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    set({ profile: data });
  },
}));
