/**
 * Supabase ortamı. Modül import'u uygulamayı kırmaz;
 * service-role değerleri eksikse getSupabaseEnv() açık hata fırlatır.
 * Publishable anahtar tarayıcıya gider; service-role asla NEXT_PUBLIC_ olmaz.
 */
export type SupabaseEnv = {
  url: string;
  serviceRoleKey: string;
};

export type PublicSupabaseEnv = {
  url: string;
  publishableKey: string;
};

export function isSupabaseConfigured() {
  const url = process.env.SUPABASE_URL?.trim() || process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return Boolean(url && serviceRoleKey);
}

export type PublicSupabaseEnvSource = {
  NEXT_PUBLIC_SUPABASE_URL?: string;
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
  SUPABASE_URL?: string;
};

function publicEnvFrom(env: PublicSupabaseEnvSource): PublicSupabaseEnv | null {
  const url = env.NEXT_PUBLIC_SUPABASE_URL?.trim() || env.SUPABASE_URL?.trim();
  const publishableKey =
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() || env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !publishableKey) return null;
  return { url, publishableKey };
}

export function getPublicSupabaseEnv(env?: PublicSupabaseEnvSource): PublicSupabaseEnv | null {
  return publicEnvFrom(
    env ?? {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_URL: process.env.SUPABASE_URL,
    },
  );
}

export function isPublicSupabaseConfigured(env?: PublicSupabaseEnvSource) {
  return getPublicSupabaseEnv(env) !== null;
}

export function getSupabaseEnv(): SupabaseEnv {
  const url = process.env.SUPABASE_URL?.trim() || process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase yapılandırılmadı. SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY sunucu ortamında tanımlı olmalı. .env.example dosyasına bakın.",
    );
  }

  return { url, serviceRoleKey };
}
