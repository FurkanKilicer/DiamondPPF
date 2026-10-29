export const siteConfig = {
  name: "Diamond PPF",
  locale: "tr_TR",
  language: "tr",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** Client nav’da metadata title düşerse tarayıcı URL gösterir; bu harita onu geri yazar. */
export const routeTitles: Record<string, string> = {
  "/": siteConfig.name,
  "/hizmetler": `Hizmetler | ${siteConfig.name}`,
  "/ppf-nedir": `PPF Nedir? | ${siteConfig.name}`,
  "/ornek-araclar": `Örnek Araçlar | ${siteConfig.name}`,
  "/biz-kimiz": `Biz Kimiz? | ${siteConfig.name}`,
  "/iletisim": `İletişim | ${siteConfig.name}`,
  "/admin": `Genel bakış | ${siteConfig.name}`,
  "/admin/login": `Admin Giriş | ${siteConfig.name}`,
  "/admin/hizmetler": `Hizmetler | ${siteConfig.name}`,
  "/admin/galeri": `Araç Galerisi | ${siteConfig.name}`,
  "/admin/sss": `SSS | ${siteConfig.name}`,
  "/admin/sayfalar": `Sayfa İçerikleri | ${siteConfig.name}`,
  "/admin/ayarlar": `Site Ayarları | ${siteConfig.name}`,
};

export function documentTitleForPath(pathname: string): string {
  return routeTitles[pathname] ?? siteConfig.name;
}
