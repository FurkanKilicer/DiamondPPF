import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getPublicSupabaseEnv } from "@/lib/supabase/env";

/**
 * Kullanıcı JWT'si ile cookie oturumu. Service-role kullanmaz.
 * Server Component, Server Action ve Route Handler için.
 */
export async function createUserSupabaseClient() {
  const env = getPublicSupabaseEnv();
  if (!env) return null;

  const cookieStore = await cookies();

  return createServerClient(env.url, env.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet, headers) {
        void headers;
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Component cookie yazamaz; oturum yenilemesi proxy.ts'tedir.
        }
      },
    },
  });
}
