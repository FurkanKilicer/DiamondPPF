import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { aboutStudioTiles } from "@/lib/mock-data/about";
import { site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

export function AboutStudio() {
  return (
    <PageSection id="atolyemiz">
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <Reveal variant="left" className="space-y-3">
          <SectionKicker icon="pin_drop">Lokasyon ve tesis</SectionKicker>
          <h2 className="headline-lg font-bold tracking-tight">{site.workshopLabel}.</h2>
          <p className="flex items-center gap-2 text-text-secondary">
            <Icon name="location_on" className="text-[18px] text-brand-red" />
            {site.address}
          </p>
        </Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={site.mapsHref}
            target="_blank"
            rel="noreferrer"
            className="label-caps inline-flex items-center gap-2 rounded border border-border-subtle bg-surface-card px-5 py-2.5 tracking-wider hover:border-brand-red hover:bg-surface-elevated"
          >
            <Icon name="directions" className="text-[18px] text-brand-red" />
            Yol tarifi al ↗
          </a>
          <a href={site.phoneHref} className="cta-red label-caps inline-flex items-center gap-2 rounded px-5 py-2.5 tracking-wider">
            <Icon name="call" className="text-[18px]" />
            {site.phoneDisplay}
          </a>
        </div>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-12 md:[grid-template-rows:repeat(2,minmax(190px,1fr))_minmax(240px,auto)]">
        {aboutStudioTiles.map((tile, index) => (
          <Reveal key={tile.title} variant="up" delayMs={index * 60} className={cn("min-h-0", tile.span)}>
            <figure
              className={cn(
                "group relative h-full overflow-hidden rounded-xl border border-border-subtle bg-surface-card",
                tile.minH,
              )}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-surface-canvas via-surface-canvas/30 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-6">
                <div>
                  <span className="label-caps mb-1 block font-bold tracking-widest text-[#FF3338]">{tile.kicker}</span>
                  <h3 className="font-display text-sm font-bold md:text-lg">{tile.title}</h3>
                  {tile.body ? <p className="mt-1 text-[12px] text-text-secondary md:text-[13px]">{tile.body}</p> : null}
                </div>
                {tile.badge ? (
                  <span className="shrink-0 rounded border border-border-subtle bg-surface-canvas/90 px-3 py-1 font-mono text-[11px] backdrop-blur-md">
                    {tile.badge}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-surface-card via-surface-elevated to-surface-card p-8 shadow-2xl lg:flex-row md:p-10">
        <div className="pointer-events-none absolute top-0 right-0 h-full w-80 bg-brand-red/5 blur-3xl" />
        <div className="z-10 space-y-2 text-center lg:text-left">
          <SectionKicker icon="coffee">Davetlisiniz</SectionKicker>
          <h3 className="font-display text-2xl font-bold">Atölyemizde tanışalım.</h3>
          <p className="max-w-xl text-text-secondary">
            Bir kahvemizi için, film numunelerini test kabininde birlikte deneyimleyin ve aracınızın boya koruma
            ihtiyacını şeffafça belirleyelim.
          </p>
        </div>
        <div className="z-10 flex shrink-0 flex-wrap items-center justify-center gap-4">
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="label-caps inline-flex items-center gap-2 rounded bg-emerald-600 px-6 py-3 tracking-wider text-white shadow-lg hover:bg-emerald-500"
          >
            <Icon name="chat" className="text-[18px]" />
            WhatsApp ile yazın
          </a>
          <a href="#fiyat-teklif" className="cta-red label-caps inline-flex items-center gap-2 rounded px-6 py-3 tracking-wider">
            <Icon name="calendar_month" className="text-[18px]" />
            Randevu oluştur
          </a>
        </div>
      </div>
    </PageSection>
  );
}
