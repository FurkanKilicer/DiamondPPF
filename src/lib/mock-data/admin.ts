/** Demo kimlik; gerçek şifre veya üretim hesabı değil. */
export const mockAdminIdentity = "admin@diamondppf.com";

export function isMockAdminIdentity(value: string) {
  const identity = value.trim().toLowerCase();
  return identity === "admin" || identity === mockAdminIdentity;
}
