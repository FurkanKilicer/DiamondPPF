-- Uygulanmadı (Faz 1 canlı DB'ye dokunmadı).
-- PostgREST yalnızca public şemadaki RPC'leri varsayılan olarak görür.
-- authenticated, admin_profiles SELECT edemez; yetki private.is_admin() ile.
-- Bu sarmalayıcı, kullanıcı JWT'si ile supabase.rpc('is_admin') çağrısını mümkün kılar.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_admin();
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;
