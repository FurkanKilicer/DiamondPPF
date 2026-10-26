import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { QuoteForm } from "@/features/home/quote-form";
import { site } from "@/lib/mock-data/content";

export function Contact() {
  return (
    <section id="teklif-bolumu" className="page-pad bg-surface-container-lowest py-20">
      <div className="page-shell grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <Reveal variant="left">
            <span className="label-caps mb-2 block tracking-widest text-primary-container">İletişim & Hızlı Randevu</span>
            <h2 className="headline-lg tracking-tight">Size nasıl yardımcı olalım?</h2>
            <p className="mt-3 text-[15px] leading-6 text-text-secondary">
              Fiyat, randevu ya da aracınızın mevcut boya durumu hakkında bir sorunuz için bize dilediğiniz kanaldan
              ulaşın. Kaplama sonrası periyodik servis kontrolü için de online randevu alabilirsiniz.
            </p>
          </Reveal>
          <div className="flex flex-col gap-4">
            <Reveal variant="left" delayMs={40}>
            <a href={site.phoneHref} className="group flex items-center gap-4 rounded-xl bg-surface-card p-5 hover:bg-surface-elevated">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary-container/20 text-primary-container">
                <Icon name="call" className="text-[24px]" />
              </div>
              <div>
                <span className="label-caps text-text-muted">Telefon</span>
                <h3 className="font-display text-base font-bold">{site.phoneDisplay}</h3>
                <p className="text-[13px] text-text-secondary">{site.hoursLine}</p>
              </div>
            </a>
            </Reveal>
            <Reveal variant="left" delayMs={110}>
            <a href={site.whatsappHref} className="group flex items-center gap-4 rounded-xl bg-surface-card p-5 hover:bg-surface-elevated">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-brand-magenta/20 text-brand-magenta">
                <Icon name="chat" className="text-[24px]" />
              </div>
              <div>
                <span className="label-caps text-text-muted">Doğrudan WhatsApp Hattı</span>
                <h3 className="font-display text-base font-bold">{site.whatsappDisplay}</h3>
                <p className="text-[13px] text-text-secondary">Aracınızın fotoğraflarını gönderip anında yaklaşık fiyat alın.</p>
              </div>
            </a>
            </Reveal>
            <Reveal variant="left" delayMs={180}>
            <a
              href={site.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-xl bg-surface-card p-5 hover:bg-surface-elevated"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-surface-elevated text-primary-container">
                <Icon name="location_on" className="text-[24px]" />
              </div>
              <div>
                <span className="label-caps text-text-muted">Atölye Adresi</span>
                <h3 className="font-display text-base font-bold">{site.workshopLabel}</h3>
                <p className="text-[13px] text-text-secondary">{site.address}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-[13px] text-primary-container">
                  Yol tarifi
                  <Icon name="arrow_forward" className="text-[16px]" />
                </span>
              </div>
            </a>
            </Reveal>
          </div>
        </div>
        <Reveal variant="right" delayMs={120} className="lg:col-span-7">
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  );
}
