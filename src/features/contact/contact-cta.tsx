import { Icon } from "@/components/ui/icon";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/mock-data/content";

export function ContactCta() {
  return (
    <PageSection>
      <Reveal variant="fade" className="flex flex-col items-center justify-between gap-8 md:flex-row md:text-left">
        <div className="max-w-2xl space-y-2 text-center md:text-left">
          <SectionKicker>Randevunuzu planlayın</SectionKicker>
          <h2 className="headline-lg font-bold tracking-tight">Aracınız için konuşalım.</h2>
          <p className="text-[15px] text-text-secondary">
            Optik şeffaflıkta PPF, 7 yıl garanti ve atölye randevusu için ekibimiz bir tık uzağınızda.
          </p>
        </div>
        <div className="grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2 md:w-[24rem] md:max-w-none">
          <a
            href="#quote-section"
            className="cta-red label-caps inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg tracking-wider"
          >
            Teklif al
          </a>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="label-caps inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] tracking-wider text-text-primary transition-colors hover:border-emerald-500 hover:bg-emerald-600"
          >
            <Icon name="chat" className="text-[18px]" />
            WhatsApp
          </a>
        </div>
      </Reveal>
    </PageSection>
  );
}
