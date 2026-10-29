import { cache } from "react";
import { unstable_cache } from "next/cache";
import { connection } from "next/server";
import { logAdminLookupFailure } from "@/lib/auth/admin-access";
import type { AdminMembershipResolution } from "@/lib/auth/admin-membership";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { createUserSupabaseClient } from "@/lib/supabase/user-server";

export type AdminUser = {
  id: string;
  email: string | null;
};

export type AdminAuthState =
  | { status: "unauthenticated" }
  | { status: "forbidden"; user: AdminUser }
  | { status: "check_failed"; user: AdminUser }
  | { status: "ok"; user: AdminUser; membership: AdminMembershipResolution };

export async function requireAdminAuth(): Promise<Extract<AdminAuthState, { status: "ok" }> | null> {
  const state = await getAdminAuthState();
  return state.status === "ok" ? state : null;
}

const lookupAdminProfileCached = unstable_cache(
  async (userId: string): Promise<AdminMembershipResolution> => lookupAdminProfileWithServiceRole(userId),
  ["admin-profile-membership"],
  { revalidate: 60 },
);

export const getAdminAuthState = cache(async (): Promise<AdminAuthState> => {
  await connection();
  const supabase = await createUserSupabaseClient();
  if (!supabase) return { status: "unauthenticated" };

  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const sub = typeof claims?.sub === "string" ? claims.sub : null;
  if (error || !sub) return { status: "unauthenticated" };

  const user: AdminUser = {
    id: sub,
    email: typeof claims.email === "string" ? claims.email : null,
  };

  const membership = await lookupAdminProfileCached(sub);
  if (!membership.determined) {
    return { status: "check_failed", user };
  }
  if (!membership.isAdmin) {
    return { status: "forbidden", user };
  }
  return { status: "ok", user, membership };
});

async function lookupAdminProfileWithServiceRole(userId: string): Promise<AdminMembershipResolution> {
  if (!isSupabaseConfigured()) {
    return { isAdmin: false, determined: false, source: "none" };
  }

  try {
    const admin = getSupabaseAdmin();
    const { data, error, count, status } = await admin
      .from("admin_profiles")
      .select("user_id", { count: "exact" })
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      logAdminLookupFailure("service-role admin_profiles", { message: error.message, code: error.code }, {
        httpStatus: status,
        count: count ?? null,
      });
      return { isAdmin: false, determined: false, source: "none" };
    }

    const rowId = data && typeof data === "object" && "user_id" in data ? data.user_id : null;
    const isAdmin = rowId === userId;
    return { isAdmin, determined: true, source: "admin_profiles" };
  } catch (caught) {
    logAdminLookupFailure("service-role admin_profiles threw", {
      message: caught instanceof Error ? caught.message : "unknown",
    });
    return { isAdmin: false, determined: false, source: "none" };
  }
}
