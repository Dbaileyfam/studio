-- Run once in Supabase SQL editor (after roster_profiles.sql).
alter table roster_profiles
  add column if not exists edit_token uuid default gen_random_uuid();

update roster_profiles
  set edit_token = gen_random_uuid()
  where edit_token is null;

alter table roster_profiles
  alter column edit_token set not null;

create unique index if not exists roster_profiles_edit_token_idx
  on roster_profiles (edit_token);
