import { createBrowserClient } from "@supabase/ssr";
import { getPublicSupabaseEnv } from "@/lib/supabase/env";

export function createBrowserSupabaseClient() {
  const env = getPublicSupabaseEnv();
  if (!env) return null;
  return createBrowserClient(env.url, env.publishableKey);
}
