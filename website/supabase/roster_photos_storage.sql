-- Run once in Supabase SQL editor (Storage → or SQL).
-- Public bucket for musician roster profile photos (uploaded via Vercel API).

insert into storage.buckets (id, name, public)
values ('roster-photos', 'roster-photos', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read roster photos" on storage.objects;
create policy "Public read roster photos"
  on storage.objects for select
  using (bucket_id = 'roster-photos');
