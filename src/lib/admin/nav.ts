export const adminNav = [
  { href: "/admin", label: "Genel bakış", icon: "dashboard", exact: true },
  { href: "/admin/hizmetler", label: "Hizmetler", icon: "layers", exact: false },
  { href: "/admin/galeri", label: "Araç Galerisi", icon: "grid_view", exact: false },
  { href: "/admin/sss", label: "SSS", icon: "help_outline", exact: false },
  { href: "/admin/sayfalar", label: "Sayfa İçerikleri", icon: "article", exact: false },
  { href: "/admin/ayarlar", label: "Site Ayarları", icon: "tune", exact: false },
] as const;

export function isAdminNavActive(pathname: string, href: string, exact: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}
