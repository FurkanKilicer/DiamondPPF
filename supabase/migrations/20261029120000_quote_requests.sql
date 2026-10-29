-- Diamond PPF: teklif talepleri
-- Uygulama: Supabase SQL Editor veya `supabase db push`
-- Public (anon/authenticated) bu tabloyu okuyamaz/yazamaz.
-- Insert yalnızca sunucu service_role ile (Next.js Route Handler).

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'quote_source') then
    create type public.quote_source as enum ('home', 'services', 'contact');
  end if;
  if not exists (select 1 from pg_type where typname = 'quote_status') then
    create type public.quote_status as enum ('new', 'contacted', 'closed');
  end if;
end
$$;

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  source public.quote_source not null,
  name text,
  phone text,
  brand text,
  model text,
  vehicle text,
  year text,
  services text[] not null default '{}'::text[],
  notes text,
  status public.quote_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint quote_requests_name_len check (name is null or char_length(name) <= 80),
  constraint quote_requests_phone_len check (phone is null or char_length(phone) <= 20),
  constraint quote_requests_notes_len check (notes is null or char_length(notes) <= 2000)
);

create index if not exists quote_requests_created_at_idx
  on public.quote_requests (created_at desc);

create index if not exists quote_requests_phone_idx
  on public.quote_requests (phone);

create or replace function public.set_quote_requests_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists quote_requests_set_updated_at on public.quote_requests;
create trigger quote_requests_set_updated_at
  before update on public.quote_requests
  for each row
  execute procedure public.set_quote_requests_updated_at();

alter table public.quote_requests enable row level security;
alter table public.quote_requests force row level security;

-- Politika yok: anon ve authenticated SELECT/INSERT/UPDATE/DELETE yapamaz.
-- service_role RLS'i bypass eder; API yalnızca o anahtarla yazar.

revoke all on table public.quote_requests from anon, authenticated, public;
grant all on table public.quote_requests to service_role;
