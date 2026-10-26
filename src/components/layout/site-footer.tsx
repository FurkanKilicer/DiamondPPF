import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Icon } from "@/components/ui/icon";
import { site } from "@/lib/mock-data/content";

const footerLinks = [
  { href: "/#garanti-takip", label: "Garanti Şartları" },
  { href: "/ornek-araclar", label: "Örnek Araçlar" },
  { href: "/ppf-nedir", label: "PPF Nedir?" },
  { href: "/biz-kimiz", label: "Biz Kimiz?" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export function SiteFooter() {
  return (
    <footer className="w-full bg-surface-card" style={{ viewTransitionName: "site-footer" }}>
      <div className="page-pad page-shell pt-10 pb-10 md:pt-24 md:pb-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <BrandLogo />
            <p className="max-w-sm text-[13px] leading-5 text-text-secondary">
              Bespoke boya koruma teknolojileri, hassas mühendislik ve klinik temizlik standartlarında lüks araç koruma
              atölyesi.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-sm font-semibold tracking-wider uppercase">Hizmetlerimiz</h2>
            <ul className="space-y-2 text-[13px] text-text-secondary">
              <li><Link href="/hizmetler#ppf" className="hover:text-text-primary">Diamond PPF Şeffaf Kaplama</Link></li>
              <li><Link href="/hizmetler#renkli-ppf" className="hover:text-text-primary">Renkli PPF Dönüşüm</Link></li>
              <li><Link href="/hizmetler#seramik" className="hover:text-text-primary">Klinik Seramik Kaplama</Link></li>
              <li><Link href="/hizmetler#far-stop" className="hover:text-text-primary">Far & Cam Koruma Kalkanı</Link></li>
              <li><Link href="/hizmetler#cila" className="hover:text-text-primary">Detaylı İç & Deri Restorasyon</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-sm font-semibold tracking-wider uppercase">İletişim & Lokasyon</h2>
            <div className="space-y-2 text-[13px] text-text-secondary">
              <p className="flex items-start gap-2">
                <Icon name="location_on" className="mt-0.5 text-[18px] text-primary-container" />
                {site.address}
              </p>
              <p className="flex items-center gap-2">
                <Icon name="call" className="text-[18px] text-primary-container" />
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
              </p>
              <p>
                <a href={site.mapsHref} target="_blank" rel="noreferrer" className="text-primary-container hover:underline">
                  Yol tarifi al ↗
                </a>
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-sm font-semibold tracking-wider uppercase">Çalışma Saatleri</h2>
            <div className="space-y-1 text-[13px] text-text-secondary">
              {site.hours.map((row) => (
                <div key={row.label} className="flex justify-between gap-4">
                  <span>{row.label}</span>
                  <span className="font-mono text-text-primary">{row.value}</span>
                </div>
              ))}
              <p className="pt-1 text-[12px] text-text-muted">{site.hoursNote}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center gap-5 border-t border-border-subtle pt-6 text-[13px] text-text-muted md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="text-center md:text-left">© 2026 Diamond PPF. Tüm hakları saklıdır.</p>
          <nav
            aria-label="Alt bağlantılar"
            className="flex w-full flex-wrap justify-center gap-2 md:w-auto md:justify-end md:gap-x-1 md:gap-y-2"
          >
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full border border-white/10 bg-surface-elevated/60 px-3.5 py-2 text-text-secondary hover:border-white/20 hover:text-text-primary md:border-0 md:bg-transparent md:px-2.5 md:py-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
