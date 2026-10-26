import { Icon } from "@/components/ui/icon";
import { PageSection } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { ServicesQuoteForm } from "@/features/services/services-quote-form";
import { servicePromise } from "@/lib/mock-data/services";
import { site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

export function ServicesQuote({
  vehicle,
  onVehicleChange,
}: {
  vehicle: string;
  onVehicleChange: (value: string) => void;
}) {
  return (
    <PageSection id="quick-quote-panel">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#12151B] p-6 shadow-2xl md:p-10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(227,30,36,0.12),transparent_55%)]"
          aria-hidden
        />
        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal variant="left" className="flex flex-col justify-between gap-6 lg:col-span-5">
            <div className="flex flex-col gap-4">
              <span className="label-caps inline-flex w-fit items-center gap-2 rounded-md bg-brand-red/10 px-3 py-1 tracking-wider text-brand-red">
                Bespoke danışmanlık
              </span>
              <h2 className="headline-lg font-bold tracking-tight">Aradığınızı bulamadınız mı?</h2>
              <p className="leading-relaxed text-text-secondary">
                Her otomobilin gövde yapısı, boya sertliği ve sürücüsünün beklentisi farklıdır. İhtiyacınızı belirtin;
                Gayrettepe atölyesinin teknik ekibi aracınıza uygun paketi iletsin.
              </p>
            </div>
            <ul className="flex flex-col gap-3 border-t border-white/10 pt-6">
              {servicePromise.map((item) => (
                <li key={item.title} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-elevated",
                      item.tone === "red" ? "text-brand-red" : "text-primary",
                    )}
                  >
                    <Icon name={item.icon} className="text-[18px]" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold">{item.title}</h3>
                    <p className="text-[12px] text-text-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href={site.phoneHref} className="inline-flex items-center gap-2 font-display text-lg hover:text-primary">
                <Icon name="call" className="text-[22px] text-primary" />
                {site.phoneDisplay}
              </a>
              <span className="text-text-muted" aria-hidden>
                |
              </span>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] text-emerald-400 hover:text-emerald-300"
              >
                <Icon name="chat" className="text-[18px]" />
                WhatsApp: {site.whatsappDisplay}
              </a>
            </div>
          </Reveal>
          <Reveal variant="right" className="flex flex-col gap-5 rounded-xl border border-white/10 bg-surface-canvas/90 p-6 lg:col-span-7 lg:p-8">
            <h3 className="flex items-center justify-between border-b border-white/5 pb-3 font-display text-lg font-bold">
              <span>Hızlı teklif formu</span>
              <span className="text-[12px] font-normal text-primary">Hazır WhatsApp entegrasyonu</span>
            </h3>
            <ServicesQuoteForm vehicle={vehicle} onVehicleChange={onVehicleChange} />
            <p className="text-center text-[11px] text-text-muted sm:text-left">
              Form butonuna dokunduğunuzda talebiniz WhatsApp’ta hazır mesaj olarak açılır; onaylamadan önce
              düzenleyebilirsiniz.
            </p>
          </Reveal>
        </div>
      </div>
    </PageSection>
  );
}
