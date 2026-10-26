import { Icon } from "@/components/ui/icon";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { QuoteForm } from "@/features/home/quote-form";
import { contactQuoteSteps } from "@/lib/mock-data/contact";
import { cn } from "@/lib/utils/cn";

export function ContactQuote() {
  return (
    <PageSection id="quote-section">
      <Reveal variant="left" className="mb-10 max-w-3xl space-y-3">
        <SectionKicker icon="calculate">Şeffaf hesaplama</SectionKicker>
        <h2 className="headline-lg font-bold tracking-tight">Aracınıza özel fiyat.</h2>
        <p className="text-[15px] leading-relaxed text-text-secondary md:text-lg">
          Marka ve modelinizi yazın; mesajınız WhatsApp’ta hazır açılsın. Ekibimiz boya kondisyonuna ve seçtiğiniz film
          paketine göre fiyatı iletsin.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-5">
          {contactQuoteSteps.map((step, index) => (
            <Reveal key={step.n} variant="left" delayMs={index * 70}>
              <article className="flex items-start gap-4 rounded-xl border border-border-subtle bg-surface-card p-5">
                <span
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border font-mono text-xl font-black",
                    step.tone === "red"
                      ? "border-brand-red/30 bg-brand-red/10 text-brand-red"
                      : "border-primary-container/30 bg-primary-container/10 text-primary-container",
                  )}
                >
                  {step.n}
                </span>
                <div>
                  <h3 className="font-display font-bold">{step.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">{step.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal variant="fade" delayMs={80}>
            <div className="flex items-start gap-3 rounded-xl border border-brand-red/20 bg-brand-red/5 p-5">
              <Icon name="workspace_premium" className="text-[28px] text-brand-red" />
              <div>
                <p className="font-display font-bold">7 yıl resmi garanti</p>
                <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
                  Diamond PPF uygulamaları sararma, çatlama ve soyulmaya karşı karekodlu garanti belgesiyle mühürlenir.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal variant="right" className="lg:col-span-7">
          <QuoteForm heading="none" />
        </Reveal>
      </div>
    </PageSection>
  );
}
