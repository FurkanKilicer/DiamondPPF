import { Icon } from "@/components/ui/icon";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { QuoteForm } from "@/features/home/quote-form";
import { site } from "@/lib/mock-data/content";

export function AboutQuote() {
  return (
    <PageSection id="fiyat-teklif" tone="light">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <Reveal variant="left" className="space-y-6 lg:col-span-5">
          <div className="space-y-3">
            <SectionKicker icon="request_quote">Hızlı teklif & danışma</SectionKicker>
            <h2 className="headline-lg font-bold tracking-tight text-slate-900">Aracınıza özel fiyat.</h2>
            <p className="leading-relaxed text-slate-600 md:text-lg">
              Bilgilerinizi yazın; uzman ekibimiz araç modelinizin gövde yapısına ve talebinize en uygun paket
              opsiyonlarını WhatsApp üzerinden anında paylaşsın.
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <a
              href={site.phoneHref}
              className="card-light group flex items-center justify-between rounded-xl p-4 transition-all hover:border-brand-red/50"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-red/30 bg-brand-red/10 text-brand-red">
                  <Icon name="call" className="text-[20px]" />
                </span>
                <span>
                  <span className="block text-[12px] text-slate-500">Doğrudan santral</span>
                  <span className="font-display font-bold text-slate-900">{site.phoneDisplay}</span>
                </span>
              </span>
              <Icon name="chevron_right" className="text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-slate-900" />
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="card-light group flex items-center justify-between rounded-xl p-4 transition-all hover:border-emerald-500/60"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-50 text-emerald-600">
                  <Icon name="chat" className="text-[20px]" />
                </span>
                <span>
                  <span className="block text-[12px] text-slate-500">WhatsApp danışma hattı</span>
                  <span className="font-display font-bold text-slate-900">{site.whatsappDisplay}</span>
                </span>
              </span>
              <Icon name="chevron_right" className="text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-slate-900" />
            </a>
            <div className="card-light flex items-start gap-3 rounded-xl p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700">
                <Icon name="schedule" className="text-[20px]" />
              </span>
              <div className="space-y-0.5 text-[13px]">
                <p className="font-medium text-slate-900">Çalışma saatleri</p>
                <p className="text-slate-600">
                  Pazartesi – Pazar: <span className="font-mono text-slate-900">{site.hours[0]?.value}</span>
                </p>
                <p className="text-[12px] text-brand-red">{site.hoursNote}</p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal variant="right" className="lg:col-span-7">
          <QuoteForm heading="none" />
        </Reveal>
      </div>
    </PageSection>
  );
}
