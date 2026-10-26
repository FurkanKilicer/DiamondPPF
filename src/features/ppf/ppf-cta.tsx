import { Icon } from "@/components/ui/icon";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/mock-data/content";

export function PpfCta() {
  return (
    <PageSection>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface-card px-8 py-12 text-center shadow-2xl sm:px-12 lg:px-16">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(227,30,36,0.15),transparent_70%)]"
          aria-hidden
        />
        <Reveal variant="fade" className="relative space-y-8">
          <span className="label-caps inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-3.5 py-1.5 tracking-widest text-brand-red">
            <span className="h-2 w-2 rounded-full bg-brand-red" />
            Kişiye özel projelendirme
          </span>
          <div className="mx-auto max-w-2xl space-y-3">
            <SectionKicker>Randevu</SectionKicker>
            <h2 className="headline-lg font-bold tracking-tight">Aracınız için kusursuz PPF zırhı konuşalım.</h2>
            <p className="text-[15px] text-text-secondary">
              Marka, model ve boya kondisyonuna göre paketi Gayrettepe ekibiyle birlikte belirleyin.
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="cta-red label-caps inline-flex h-12 items-center justify-center gap-2 rounded-lg tracking-wider"
            >
              <Icon name="chat" className="text-[18px]" />
              WhatsApp
            </a>
            <a
              href={site.phoneHref}
              className="label-caps inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/10 bg-surface-elevated tracking-wider"
            >
              <Icon name="call" className="text-[18px] text-primary-container" />
              {site.phoneDisplay}
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 border-t border-border-subtle/80 pt-6 text-[13px] text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="location_on" className="text-[18px] text-brand-red" />
              {site.workshopLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="verified" className="text-[18px] text-primary-container" />
              7 yıl garantili uygulama
            </span>
          </div>
        </Reveal>
      </div>
    </PageSection>
  );
}
