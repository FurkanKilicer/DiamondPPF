import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { FaqList } from "@/components/ui/faq-list";
import { Reveal } from "@/components/ui/reveal";
import { ppfFaqs } from "@/lib/mock-data/ppf";

export function PpfFaq() {
  return (
    <PageSection id="sss" tone="light">
      <Reveal variant="fade" className="mx-auto mb-10 max-w-3xl space-y-3 text-center">
        <SectionKicker>Merak edilenler & detaylar</SectionKicker>
        <h2 className="headline-lg font-bold tracking-tight text-slate-900">PPF hakkında sıkça sorulan sorular</h2>
        <p className="text-[15px] text-slate-600">Atölyemize gelen araç sahiplerinin en çok sorduğu teknik ve uygulama soruları.</p>
      </Reveal>
      <FaqList items={ppfFaqs} />
    </PageSection>
  );
}
