import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { PpfCompare } from "@/features/ppf/ppf-compare";
import { ppfLayers } from "@/lib/mock-data/ppf";
import { cn } from "@/lib/utils/cn";

export function PpfAnatomy() {
  return (
    <PageSection id="anatomi" tone="light">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal variant="left" className="max-w-2xl space-y-3">
          <SectionKicker icon="biotech">Mikroskobik mühendislik & optik netlik</SectionKicker>
          <h2 className="headline-lg font-bold tracking-tight text-slate-900">PPF nasıl korur? Katman katman anatomi</h2>
        </Reveal>
        <p className="max-w-md text-[15px] text-slate-600">
          Sıradan folyoların aksine Diamond PPF, moleküler düzeyde kaynaşmış dört koruma katmanından oluşur.
        </p>
      </div>
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <Reveal variant="left" className="lg:col-span-6">
          <PpfCompare />
        </Reveal>
        <div className="space-y-4 lg:col-span-6">
          {ppfLayers.map((layer, index) => (
            <Reveal key={layer.n} variant="right" delayMs={index * 60}>
              <article className="rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-red/40">
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border font-display font-bold",
                      layer.tone === "red" && "border-brand-red/30 bg-brand-red/10 text-brand-red",
                      layer.tone === "cyan" && "border-cyan-500/30 bg-cyan-50 text-cyan-700",
                      layer.tone === "neutral" && "border-slate-200 bg-slate-50 text-slate-700",
                    )}
                  >
                    {layer.n}
                  </span>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display font-bold text-slate-900">{layer.title}</h3>
                      <span className="shrink-0 font-mono text-[11px] text-slate-500">{layer.thick}</span>
                    </div>
                    <p className="text-[13px] leading-relaxed text-slate-600">{layer.body}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
