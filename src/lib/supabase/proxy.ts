import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { adminProxyDecision } from "@/lib/auth/admin-paths";
import { getPublicSupabaseEnv } from "@/lib/supabase/env";

function copyAuthCookies(from: NextResponse, to: NextResponse) {
  for (const cookie of from.cookies.getAll()) {
    to.cookies.set(cookie);
  }
  for (const header of ["cache-control", "expires", "pragma"] as const) {
    const value = from.headers.get(header);
    if (value) to.headers.set(header, value);
  }
  return to;
}

export async function updateSession(request: NextRequest) {
  const env = getPublicSupabaseEnv();
  if (!env) {
    if (adminProxyDecision(request.nextUrl.pathname, false) === "redirect-login") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(env.url, env.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
        Object.entries(headers).forEach(([key, value]) => supabaseResponse.headers.set(key, value));
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const hasVerifiedUser = Boolean(data?.claims);

  if (adminProxyDecision(request.nextUrl.pathname, hasVerifiedUser) === "redirect-login") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    const redirectResponse = NextResponse.redirect(url);
    return copyAuthCookies(supabaseResponse, redirectResponse);
  }

  return supabaseResponse;
}
