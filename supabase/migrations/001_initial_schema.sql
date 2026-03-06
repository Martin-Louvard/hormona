-- ============================================================
-- Hormona — Migration initiale
-- Base de données pour le suivi SOPK
-- ============================================================

-- Extensions
create extension if not exists "pgcrypto";

-- ============================================================
-- ENUM TYPES
-- ============================================================

create type mood_type as enum ('sunny', 'cloudy', 'rainy', 'stormy', 'foggy');
create type meal_type as enum ('breakfast', 'lunch', 'dinner', 'snack');
create type time_of_day as enum ('morning', 'evening', 'both');
create type supplement_period as enum ('morning', 'evening');
create type post_effort_feeling as enum ('boosted', 'exhausted');
create type cycle_phase as enum ('menstrual', 'follicular', 'ovulatory', 'luteal');

-- ============================================================
-- PROFILES
-- ============================================================

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text not null default '',
  cycle_length_avg int not null default 28 check (cycle_length_avg between 20 and 45),
  last_period_start date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', ''));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================================
-- CYCLE ENTRIES
-- ============================================================

create table cycle_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  date date not null,
  period_started boolean not null default false,
  period_ended boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  unique(user_id, date)
);

alter table cycle_entries enable row level security;

create policy "Users can manage own cycle entries"
  on cycle_entries for all using (auth.uid() = user_id);

-- ============================================================
-- MOOD ENTRIES
-- ============================================================

create table mood_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  date date not null,
  mood mood_type not null,
  energy_level int not null check (energy_level between 1 and 5),
  created_at timestamptz not null default now(),
  unique(user_id, date)
);

alter table mood_entries enable row level security;

create policy "Users can manage own mood entries"
  on mood_entries for all using (auth.uid() = user_id);

-- ============================================================
-- MEALS
-- ============================================================

create table meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  date date not null,
  meal_type meal_type not null,
  items jsonb not null default '[]'::jsonb,
  fiber_first boolean default false,
  created_at timestamptz not null default now()
);

alter table meals enable row level security;

create policy "Users can manage own meals"
  on meals for all using (auth.uid() = user_id);

create index idx_meals_user_date on meals(user_id, date);

-- ============================================================
-- SYMPTOMS
-- ============================================================

create table symptoms (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  date date not null,
  skin_quality int check (skin_quality between 1 and 5),
  pelvic_pain_type text,
  pelvic_pain_intensity int check (pelvic_pain_intensity between 0 and 10),
  sleep_onset_minutes int,
  night_wakings int,
  notes text,
  created_at timestamptz not null default now(),
  unique(user_id, date)
);

alter table symptoms enable row level security;

create policy "Users can manage own symptoms"
  on symptoms for all using (auth.uid() = user_id);

-- ============================================================
-- EXERCISES
-- ============================================================

create table exercises (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  date date not null,
  type text not null,
  duration_minutes int not null check (duration_minutes > 0),
  post_effort_feeling post_effort_feeling,
  cycle_phase_at_time cycle_phase,
  created_at timestamptz not null default now()
);

alter table exercises enable row level security;

create policy "Users can manage own exercises"
  on exercises for all using (auth.uid() = user_id);

-- ============================================================
-- SUPPLEMENTS
-- ============================================================

create table supplements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  dosage text,
  time_of_day time_of_day not null default 'morning',
  stock_remaining_days int default 30,
  interaction_notes text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table supplements enable row level security;

create policy "Users can manage own supplements"
  on supplements for all using (auth.uid() = user_id);

-- ============================================================
-- SUPPLEMENT LOGS
-- ============================================================

create table supplement_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  supplement_id uuid not null references supplements(id) on delete cascade,
  taken_at timestamptz not null default now(),
  taken_date date not null default current_date,
  period supplement_period not null,
  unique(user_id, supplement_id, period, taken_date)
);

alter table supplement_logs enable row level security;

create policy "Users can manage own supplement logs"
  on supplement_logs for all using (auth.uid() = user_id);

-- ============================================================
-- JOURNAL ENTRIES
-- ============================================================

create table journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  date date not null,
  content text not null,
  created_at timestamptz not null default now(),
  unique(user_id, date)
);

alter table journal_entries enable row level security;

create policy "Users can manage own journal entries"
  on journal_entries for all using (auth.uid() = user_id);

-- ============================================================
-- STORAGE BUCKET (pour les PDF d'analyses médicales)
-- ============================================================

insert into storage.buckets (id, name, public)
values ('medical-documents', 'medical-documents', false);

create policy "Users can upload own medical documents"
  on storage.objects for insert
  with check (bucket_id = 'medical-documents' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can view own medical documents"
  on storage.objects for select
  using (bucket_id = 'medical-documents' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete own medical documents"
  on storage.objects for delete
  using (bucket_id = 'medical-documents' and auth.uid()::text = (storage.foldername(name))[1]);
