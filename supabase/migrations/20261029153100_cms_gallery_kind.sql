alter table public.cms_gallery
  add column if not exists kind text not null default 'vehicle';

alter table public.cms_gallery
  drop constraint if exists cms_gallery_kind_check;

alter table public.cms_gallery
  add constraint cms_gallery_kind_check
  check (kind in ('vehicle', 'detail', 'video', 'atelier'));

create index if not exists cms_gallery_kind_published_sort_idx
  on public.cms_gallery (kind, published, sort_order);
