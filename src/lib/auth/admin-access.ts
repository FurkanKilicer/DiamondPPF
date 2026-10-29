import type { AdminMembershipResolution } from "@/lib/auth/admin-membership";

export type AdminAccessDecision = "ok" | "forbidden" | "check_failed";

/**
 * JWT ile hatasız sonuç kesindir.
 * Sorgular hata verdiyse (determined=false) yetkisizlik varsayılmaz.
 */
export function decideAdminAccess(
  jwtLookup: AdminMembershipResolution,
  fallback: AdminMembershipResolution | null,
): AdminAccessDecision {
  if (jwtLookup.isAdmin) return "ok";
  if (jwtLookup.determined) return "forbidden";
  if (!fallback) return "check_failed";
  if (fallback.isAdmin) return "ok";
  if (fallback.determined) return "forbidden";
  return "check_failed";
}

export function logAdminLookupFailure(
  stage: string,
  error: { message: string; code?: string } | null,
  extras?: Record<string, string | boolean | number | null>,
) {
  console.error("[admin-auth]", stage, {
    code: error?.code ?? null,
    message: error?.message ?? null,
    ...extras,
  });
}
