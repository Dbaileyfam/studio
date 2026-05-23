-- Run after roster_profiles.sql — allows the public browse page to read active listings
-- when VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY are set on the frontend build.

alter table roster_profiles enable row level security;

drop policy if exists "Public read active roster" on roster_profiles;

create policy "Public read active roster"
  on roster_profiles
  for select
  to anon, authenticated
  using (status = 'active');
