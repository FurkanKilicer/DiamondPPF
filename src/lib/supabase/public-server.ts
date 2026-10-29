import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getPublicSupabaseEnv } from "@/lib/supabase/env";

let cached: SupabaseClient | null = null;

/**
 * Publishable/anon anahtar. RLS uygulanır; service-role yok.
 * Public Server Component okumaları için. Cookie oturumu taşımaz.
 */
export function createPublicSupabaseClient(): SupabaseClient | null {
  const env = getPublicSupabaseEnv();
  if (!env) return null;
  if (cached) return cached;
  cached = createClient(env.url, env.publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return cached;
}
