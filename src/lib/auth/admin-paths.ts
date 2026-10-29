export function isAdminLoginPath(pathname: string) {
  return pathname === "/admin/login" || pathname.startsWith("/admin/login/");
}

export function isAdminAreaPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function isProtectedAdminPath(pathname: string) {
  return isAdminAreaPath(pathname) && !isAdminLoginPath(pathname);
}

export type AdminProxyDecision = "continue" | "redirect-login";

/** Proxy yalnızca oturum varlığını doğrular; admin_profiles kontrolü layout'tadır. */
export function adminProxyDecision(pathname: string, hasVerifiedUser: boolean): AdminProxyDecision {
  if (isProtectedAdminPath(pathname) && !hasVerifiedUser) {
    return "redirect-login";
  }
  return "continue";
}
