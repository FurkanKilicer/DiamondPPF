import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";

let cached: SupabaseClient | null = null;

/**
 * Service-role istemcisi. RLS'i bypass eder; yalnızca Route Handler / server service.
 * Tarayıcıya import etme. Değişken yoksa getSupabaseEnv hata verir; sahte kayıt yok.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const { url, serviceRoleKey } = getSupabaseEnv();
  cached = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return cached;
}
