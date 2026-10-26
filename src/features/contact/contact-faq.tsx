import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { FaqList } from "@/components/ui/faq-list";
import { Reveal } from "@/components/ui/reveal";
import { contactFaqs } from "@/lib/mock-data/contact";

export function ContactFaq() {
  return (
    <PageSection id="sss">
      <Reveal variant="fade" className="mx-auto mb-10 max-w-3xl space-y-3 text-center">
        <SectionKicker>Sıkça sorulanlar</SectionKicker>
        <h2 className="headline-lg font-bold tracking-tight">Merak edilenler.</h2>
        <p className="text-[15px] text-text-secondary">
          Fiyatlandırma, atölye süreci ve randevu yönetimine ilişkin en sık yöneltilen sorular.
        </p>
      </Reveal>
      <FaqList items={contactFaqs} />
    </PageSection>
  );
}
