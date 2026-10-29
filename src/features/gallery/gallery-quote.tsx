import { Icon } from "@/components/ui/icon";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { QuoteForm } from "@/features/home/quote-form";
import { site } from "@/lib/mock-data/content";

export function GalleryQuote() {
  return (
    <PageSection id="fiyat-teklif">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <Reveal variant="left" className="space-y-6 lg:col-span-5">
          <div className="space-y-3">
            <SectionKicker icon="request_quote">Hızlı WhatsApp fiyat</SectionKicker>
            <h2 className="headline-lg font-bold tracking-tight">Aracınız da galeride yer alsın.</h2>
            <p className="leading-relaxed text-text-secondary md:text-lg">
              Marka ve modelinizi yazın; Gayrettepe ekibi paketi ve şeffaf fiyatı WhatsApp üzerinden iletsin.
            </p>
          </div>
          <div className="space-y-3">
            <a
              href={site.phoneHref}
              className="group flex items-center justify-between rounded-xl border border-border-subtle bg-surface-card p-4"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                  <Icon name="call" className="text-[20px]" />
                </span>
                <span>
                  <span className="block text-[12px] text-text-muted">Santral</span>
                  <span className="font-display font-bold">{site.phoneDisplay}</span>
                </span>
              </span>
              <Icon name="chevron_right" className="text-text-muted" />
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl border border-border-subtle bg-surface-card p-4"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Icon name="chat" className="text-[20px]" />
                </span>
                <span>
                  <span className="block text-[12px] text-text-muted">Doğrudan atölye hattı</span>
                  <span className="font-display font-bold">{site.whatsappDisplay}</span>
                </span>
              </span>
              <Icon name="chevron_right" className="text-text-muted" />
            </a>
          </div>
        </Reveal>
        <Reveal variant="right" className="lg:col-span-7">
          <QuoteForm heading="none" source="home" />
        </Reveal>
      </div>
    </PageSection>
  );
}
