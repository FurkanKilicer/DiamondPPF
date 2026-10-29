import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { PageSection } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { galleryHeroStats } from "@/lib/cms/public-gallery";
import { site } from "@/lib/mock-data/content";

export function GalleryHero({ archiveCount }: { archiveCount: number }) {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 bg-gradient-to-b from-brand-red/10 via-transparent to-transparent blur-3xl"
        aria-hidden
      />
      <PageSection bordered={false}>
        <nav aria-label="Sayfa konumu" className="mb-8 flex flex-wrap items-center gap-2 text-[13px] text-text-muted">
          <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-text-primary">
            <Icon name="home" className="text-[15px]" />
            Ana Sayfa
          </Link>
          <span className="text-text-muted/60" aria-hidden>
            /
          </span>
          <span className="font-medium text-text-primary">Örnek araçlar</span>
        </nav>
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <Reveal variant="left" className="space-y-6 lg:col-span-8">
            <span className="label-caps tracking-widest text-brand-red">
              Gerçek uygulamalar & atölye portfolyosu · {site.workshopLabel}
            </span>
            <h1 className="max-w-3xl font-display text-[clamp(2.1rem,5.4vw,4rem)] font-bold leading-none tracking-tight">
              Fotoğraflara değil,{" "}
              <span className="bg-gradient-to-r from-text-primary via-primary-container to-brand-red bg-clip-text text-transparent">
                işçiliğimize bakın.
              </span>
            </h1>
            <p className="max-w-2xl text-[15px] leading-relaxed text-text-secondary md:text-lg">
              Atölyeden çıkan her araç; marka, model ve 195µm Diamond PPF zırhıyla arşivlenir. Fabrika boyasını
              sökmeden koruyan, kenarları kusursuz kıvrılmış uygulama.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="cta-red label-caps inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 tracking-wider"
              >
                <Icon name="chat" className="text-[18px]" />
                Teklif al
              </a>
              <Link
                href="/iletisim#quote-section"
                className="label-caps inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/10 bg-surface-card px-6 tracking-wider"
              >
                <Icon name="calendar_month" className="text-[18px] text-brand-red" />
                Atölye randevusu
              </Link>
            </div>
          </Reveal>
          <Reveal variant="right" className="grid grid-cols-2 gap-4 lg:col-span-4">
            {galleryHeroStats(archiveCount).map((item) => (
              <div key={item.label} className="rounded-xl border border-border-subtle bg-surface-card p-4">
                <Icon name={item.icon} className="text-[22px] text-brand-red" />
                <p className="mt-3 font-display text-xl font-bold">{item.value}</p>
                <p className="text-[12px] text-text-muted">{item.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </PageSection>
    </div>
  );
}
