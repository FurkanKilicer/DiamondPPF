-- Diamond PPF CMS (canlıya apply_migration name=cms ile uygulandı)
-- Kapsam: içerik yönetimi. quote_requests / lead / CRM YOK.
-- Tekrar çalıştırma: IF NOT EXISTS, DROP POLICY IF EXISTS, CREATE OR REPLACE.
-- Geri dönüş: bu dosya DROP TABLE CASCADE içermez. Geri almak ayrı, onaylı DROP ister.

create extension if not exists pgcrypto;

create schema if not exists private;

revoke usage on schema private from public, anon;
grant usage on schema private to authenticated;

-- ---------------------------------------------------------------------------
-- Admin yetkisi: yalnızca admin_profiles. authenticated tek başına yetmez.
-- SECURITY DEFINER private şemada; auth.uid() tablodaki satırla doğrulanır.
-- ---------------------------------------------------------------------------
create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id)
);

comment on table public.admin_profiles is
  'Davetli admin kullanıcıları. Self-insert yok; ilk satır Dashboard SQL ile.';

alter table public.admin_profiles enable row level security;
alter table public.admin_profiles force row level security;

revoke all on table public.admin_profiles from anon, authenticated, public;
grant select, insert, update, delete on table public.admin_profiles to service_role;

-- DEFINER gerekli: INVOKER, admin_profiles SELECT izni olmadan üyeliği okuyamaz.
-- search_path boş; nesneler şema-nitelikli. Sahip: migration rolü (postgres).
-- EXECUTE yalnız authenticated; anon public politikalarında bu fonksiyon yok.
create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = (select auth.uid())
  );
$$;

revoke all on function private.is_admin() from public, anon, authenticated;
grant execute on function private.is_admin() to authenticated;

-- INSERT/UPDATE/DELETE politikası yok (Dashboard SQL / service_role).
-- authenticated'a SELECT grant yok; yetki private.is_admin() ile.
drop policy if exists admin_profiles_select_self on public.admin_profiles;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Hizmetler
-- ---------------------------------------------------------------------------
create table if not exists public.cms_services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_path text,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cms_services_title_len check (char_length(title) between 1 and 160),
  constraint cms_services_description_len check (char_length(description) between 1 and 4000),
  constraint cms_services_image_path_len check (image_path is null or char_length(image_path) <= 500),
  constraint cms_services_sort_order_nonneg check (sort_order >= 0)
);

create index if not exists cms_services_published_sort_idx
  on public.cms_services (published, sort_order, created_at);

drop trigger if exists cms_services_set_updated_at on public.cms_services;
create trigger cms_services_set_updated_at
  before update on public.cms_services
  for each row
  execute function public.set_updated_at();

alter table public.cms_services enable row level security;
alter table public.cms_services force row level security;

revoke all on table public.cms_services from anon, authenticated, public;
grant select on table public.cms_services to anon, authenticated;
grant insert, update, delete on table public.cms_services to authenticated;
grant all on table public.cms_services to service_role;

drop policy if exists cms_services_public_read on public.cms_services;
create policy cms_services_public_read
  on public.cms_services
  for select
  to anon, authenticated
  using (published = true);

drop policy if exists cms_services_admin_select on public.cms_services;
create policy cms_services_admin_select
  on public.cms_services
  for select
  to authenticated
  using (private.is_admin());

drop policy if exists cms_services_admin_insert on public.cms_services;
create policy cms_services_admin_insert
  on public.cms_services
  for insert
  to authenticated
  with check (private.is_admin());

drop policy if exists cms_services_admin_update on public.cms_services;
create policy cms_services_admin_update
  on public.cms_services
  for update
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

drop policy if exists cms_services_admin_delete on public.cms_services;
create policy cms_services_admin_delete
  on public.cms_services
  for delete
  to authenticated
  using (private.is_admin());

-- ---------------------------------------------------------------------------
-- Galeri
-- ---------------------------------------------------------------------------
create table if not exists public.cms_gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_path text not null,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cms_gallery_title_len check (char_length(title) between 1 and 160),
  constraint cms_gallery_description_len check (char_length(description) between 1 and 2000),
  constraint cms_gallery_image_path_len check (char_length(image_path) between 1 and 500),
  constraint cms_gallery_sort_order_nonneg check (sort_order >= 0)
);

create index if not exists cms_gallery_published_sort_idx
  on public.cms_gallery (published, sort_order, created_at);

drop trigger if exists cms_gallery_set_updated_at on public.cms_gallery;
create trigger cms_gallery_set_updated_at
  before update on public.cms_gallery
  for each row
  execute function public.set_updated_at();

alter table public.cms_gallery enable row level security;
alter table public.cms_gallery force row level security;

revoke all on table public.cms_gallery from anon, authenticated, public;
grant select on table public.cms_gallery to anon, authenticated;
grant insert, update, delete on table public.cms_gallery to authenticated;
grant all on table public.cms_gallery to service_role;

drop policy if exists cms_gallery_public_read on public.cms_gallery;
create policy cms_gallery_public_read
  on public.cms_gallery
  for select
  to anon, authenticated
  using (published = true);

drop policy if exists cms_gallery_admin_select on public.cms_gallery;
create policy cms_gallery_admin_select
  on public.cms_gallery
  for select
  to authenticated
  using (private.is_admin());

drop policy if exists cms_gallery_admin_insert on public.cms_gallery;
create policy cms_gallery_admin_insert
  on public.cms_gallery
  for insert
  to authenticated
  with check (private.is_admin());

drop policy if exists cms_gallery_admin_update on public.cms_gallery;
create policy cms_gallery_admin_update
  on public.cms_gallery
  for update
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

drop policy if exists cms_gallery_admin_delete on public.cms_gallery;
create policy cms_gallery_admin_delete
  on public.cms_gallery
  for delete
  to authenticated
  using (private.is_admin());

-- ---------------------------------------------------------------------------
-- SSS (collection: public sayfa grubu)
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'cms_faq_collection') then
    create type public.cms_faq_collection as enum ('contact', 'ppf');
  end if;
end
$$;

create table if not exists public.cms_faqs (
  id uuid primary key default gen_random_uuid(),
  collection public.cms_faq_collection not null,
  question text not null,
  answer text not null,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cms_faqs_question_len check (char_length(question) between 1 and 240),
  constraint cms_faqs_answer_len check (char_length(answer) between 1 and 4000),
  constraint cms_faqs_sort_order_nonneg check (sort_order >= 0)
);

create index if not exists cms_faqs_collection_published_sort_idx
  on public.cms_faqs (collection, published, sort_order);

drop trigger if exists cms_faqs_set_updated_at on public.cms_faqs;
create trigger cms_faqs_set_updated_at
  before update on public.cms_faqs
  for each row
  execute function public.set_updated_at();

alter table public.cms_faqs enable row level security;
alter table public.cms_faqs force row level security;

revoke all on table public.cms_faqs from anon, authenticated, public;
grant select on table public.cms_faqs to anon, authenticated;
grant insert, update, delete on table public.cms_faqs to authenticated;
grant all on table public.cms_faqs to service_role;

drop policy if exists cms_faqs_public_read on public.cms_faqs;
create policy cms_faqs_public_read
  on public.cms_faqs
  for select
  to anon, authenticated
  using (published = true);

drop policy if exists cms_faqs_admin_select on public.cms_faqs;
create policy cms_faqs_admin_select
  on public.cms_faqs
  for select
  to authenticated
  using (private.is_admin());

drop policy if exists cms_faqs_admin_insert on public.cms_faqs;
create policy cms_faqs_admin_insert
  on public.cms_faqs
  for insert
  to authenticated
  with check (private.is_admin());

drop policy if exists cms_faqs_admin_update on public.cms_faqs;
create policy cms_faqs_admin_update
  on public.cms_faqs
  for update
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

drop policy if exists cms_faqs_admin_delete on public.cms_faqs;
create policy cms_faqs_admin_delete
  on public.cms_faqs
  for delete
  to authenticated
  using (private.is_admin());

-- ---------------------------------------------------------------------------
-- Sayfa içerikleri (mevcut public rotalar)
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'cms_page_slug') then
    create type public.cms_page_slug as enum ('home', 'about', 'ppf', 'services', 'contact');
  end if;
end
$$;

create table if not exists public.cms_pages (
  slug public.cms_page_slug primary key,
  title text not null,
  sections jsonb not null default '{}'::jsonb,
  published boolean not null default false,
  updated_at timestamptz not null default now(),
  constraint cms_pages_title_len check (char_length(title) between 1 and 160),
  constraint cms_pages_sections_object check (jsonb_typeof(sections) = 'object')
);

drop trigger if exists cms_pages_set_updated_at on public.cms_pages;
create trigger cms_pages_set_updated_at
  before update on public.cms_pages
  for each row
  execute function public.set_updated_at();

alter table public.cms_pages enable row level security;
alter table public.cms_pages force row level security;

revoke all on table public.cms_pages from anon, authenticated, public;
grant select on table public.cms_pages to anon, authenticated;
grant insert, update, delete on table public.cms_pages to authenticated;
grant all on table public.cms_pages to service_role;

drop policy if exists cms_pages_public_read on public.cms_pages;
create policy cms_pages_public_read
  on public.cms_pages
  for select
  to anon, authenticated
  using (published = true);

drop policy if exists cms_pages_admin_select on public.cms_pages;
create policy cms_pages_admin_select
  on public.cms_pages
  for select
  to authenticated
  using (private.is_admin());

drop policy if exists cms_pages_admin_insert on public.cms_pages;
create policy cms_pages_admin_insert
  on public.cms_pages
  for insert
  to authenticated
  with check (private.is_admin());

drop policy if exists cms_pages_admin_update on public.cms_pages;
create policy cms_pages_admin_update
  on public.cms_pages
  for update
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

drop policy if exists cms_pages_admin_delete on public.cms_pages;
create policy cms_pages_admin_delete
  on public.cms_pages
  for delete
  to authenticated
  using (private.is_admin());

-- ---------------------------------------------------------------------------
-- Site ayarları: public vs internal ayrı tablolar (kolon sızıntısı yok)
-- ---------------------------------------------------------------------------
create table if not exists public.cms_site_settings_public (
  id integer primary key default 1,
  whatsapp_digits text not null default '',
  phone_display text not null default '',
  phone_e164 text not null default '',
  address text not null default '',
  address_short text not null default '',
  hours_line text not null default '',
  hours_note text not null default '',
  maps_href text not null default '',
  maps_embed_query text not null default '',
  youtube_url text not null default '',
  instagram_url text not null default '',
  updated_at timestamptz not null default now(),
  constraint cms_site_settings_public_singleton check (id = 1),
  constraint cms_site_settings_whatsapp_digits check (
    whatsapp_digits = '' or whatsapp_digits ~ '^[0-9]{10,15}$'
  ),
  constraint cms_site_settings_phone_e164 check (
    phone_e164 = '' or phone_e164 ~ '^\+[0-9]{10,15}$'
  ),
  constraint cms_site_settings_url_youtube check (
    youtube_url = '' or youtube_url ~ '^https://'
  ),
  constraint cms_site_settings_url_instagram check (
    instagram_url = '' or instagram_url ~ '^https://'
  ),
  constraint cms_site_settings_text_lens check (
    char_length(phone_display) <= 40
    and char_length(address) <= 300
    and char_length(address_short) <= 200
    and char_length(hours_line) <= 120
    and char_length(hours_note) <= 200
    and char_length(maps_href) <= 500
    and char_length(maps_embed_query) <= 400
    and char_length(youtube_url) <= 300
    and char_length(instagram_url) <= 300
  )
);

create table if not exists public.cms_site_settings_internal (
  id integer primary key default 1,
  internal_notes text,
  updated_at timestamptz not null default now(),
  constraint cms_site_settings_internal_singleton check (id = 1),
  constraint cms_site_settings_internal_notes_len check (
    internal_notes is null or char_length(internal_notes) <= 4000
  )
);

drop trigger if exists cms_site_settings_public_set_updated_at on public.cms_site_settings_public;
create trigger cms_site_settings_public_set_updated_at
  before update on public.cms_site_settings_public
  for each row
  execute function public.set_updated_at();

drop trigger if exists cms_site_settings_internal_set_updated_at on public.cms_site_settings_internal;
create trigger cms_site_settings_internal_set_updated_at
  before update on public.cms_site_settings_internal
  for each row
  execute function public.set_updated_at();

alter table public.cms_site_settings_public enable row level security;
alter table public.cms_site_settings_public force row level security;
alter table public.cms_site_settings_internal enable row level security;
alter table public.cms_site_settings_internal force row level security;

revoke all on table public.cms_site_settings_public from anon, authenticated, public;
grant select on table public.cms_site_settings_public to anon, authenticated;
grant insert, update, delete on table public.cms_site_settings_public to authenticated;
grant all on table public.cms_site_settings_public to service_role;

revoke all on table public.cms_site_settings_internal from anon, authenticated, public;
grant select, insert, update, delete on table public.cms_site_settings_internal to authenticated;
grant all on table public.cms_site_settings_internal to service_role;

drop policy if exists cms_site_settings_public_read on public.cms_site_settings_public;
create policy cms_site_settings_public_read
  on public.cms_site_settings_public
  for select
  to anon, authenticated
  using (true);

drop policy if exists cms_site_settings_public_admin_select on public.cms_site_settings_public;
create policy cms_site_settings_public_admin_select
  on public.cms_site_settings_public
  for select
  to authenticated
  using (private.is_admin());

drop policy if exists cms_site_settings_public_admin_insert on public.cms_site_settings_public;
create policy cms_site_settings_public_admin_insert
  on public.cms_site_settings_public
  for insert
  to authenticated
  with check (private.is_admin());

drop policy if exists cms_site_settings_public_admin_update on public.cms_site_settings_public;
create policy cms_site_settings_public_admin_update
  on public.cms_site_settings_public
  for update
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

drop policy if exists cms_site_settings_public_admin_delete on public.cms_site_settings_public;
create policy cms_site_settings_public_admin_delete
  on public.cms_site_settings_public
  for delete
  to authenticated
  using (private.is_admin());

drop policy if exists cms_site_settings_internal_admin_select on public.cms_site_settings_internal;
create policy cms_site_settings_internal_admin_select
  on public.cms_site_settings_internal
  for select
  to authenticated
  using (private.is_admin());

drop policy if exists cms_site_settings_internal_admin_insert on public.cms_site_settings_internal;
create policy cms_site_settings_internal_admin_insert
  on public.cms_site_settings_internal
  for insert
  to authenticated
  with check (private.is_admin());

drop policy if exists cms_site_settings_internal_admin_update on public.cms_site_settings_internal;
create policy cms_site_settings_internal_admin_update
  on public.cms_site_settings_internal
  for update
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

drop policy if exists cms_site_settings_internal_admin_delete on public.cms_site_settings_internal;
create policy cms_site_settings_internal_admin_delete
  on public.cms_site_settings_internal
  for delete
  to authenticated
  using (private.is_admin());

insert into public.cms_site_settings_public (id)
values (1)
on conflict (id) do nothing;

insert into public.cms_site_settings_internal (id)
values (1)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Storage: cms-media — PRIVATE bucket.
-- Public bucket indirme URL'si RLS SELECT'i atlar; draft/ sızardı.
-- Boyut: 5 MiB. MIME: jpeg, png, webp (bucket + insert WITH CHECK).
-- Klasörler: published/ (anon SELECT) ve draft/ (yalnız admin).
-- Public sayfalar signed URL veya anon JWT + RLS ile okur.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-media',
  'cms-media',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']::text[]
)
on conflict (id) do update set
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types,
  public = excluded.public;

drop policy if exists cms_media_public_read on storage.objects;
create policy cms_media_public_read
  on storage.objects
  for select
  to anon
  using (
    bucket_id = 'cms-media'
    and (storage.foldername(name))[1] = 'published'
  );

drop policy if exists cms_media_admin_read on storage.objects;
create policy cms_media_admin_read
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'cms-media' and private.is_admin());

drop policy if exists cms_media_admin_insert on storage.objects;
create policy cms_media_admin_insert
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'cms-media'
    and private.is_admin()
    and (storage.foldername(name))[1] in ('draft', 'published')
    and coalesce(metadata->>'mimetype', '') in ('image/jpeg', 'image/png', 'image/webp')
  );

drop policy if exists cms_media_admin_update on storage.objects;
create policy cms_media_admin_update
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'cms-media' and private.is_admin())
  with check (
    bucket_id = 'cms-media'
    and private.is_admin()
    and (storage.foldername(name))[1] in ('draft', 'published')
  );

drop policy if exists cms_media_admin_delete on storage.objects;
create policy cms_media_admin_delete
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'cms-media' and private.is_admin());
