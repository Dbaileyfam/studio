-- Run in Supabase SQL editor (one time).
create table if not exists roster_profiles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'pending_payment'
    check (status in ('pending_payment', 'active', 'cancelled')),
  email text not null,
  full_name text not null,
  profile jsonb not null,
  stripe_checkout_session_id text,
  stripe_customer_id text,
  stripe_subscription_id text
);

create index if not exists roster_profiles_email_idx on roster_profiles (email);
create index if not exists roster_profiles_status_idx on roster_profiles (status);
