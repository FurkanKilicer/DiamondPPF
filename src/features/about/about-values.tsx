import { Icon } from "@/components/ui/icon";
import { PageSection } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { aboutValues } from "@/lib/mock-data/about";
import { cn } from "@/lib/utils/cn";

export function AboutValues() {
  return (
    <PageSection id="degerlerimiz">
      <Reveal variant="fade" className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
        <span className="label-caps inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card px-3 py-1 tracking-widest text-[#FF3338]">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
          Kurumsal prensipler
        </span>
        <h2 className="headline-lg font-bold tracking-tight">Neye önem veriyoruz?</h2>
        <p className="text-[15px] leading-relaxed text-text-secondary md:text-lg">
          Her araç, bir sonraki müşterimize gururla gösterebileceğimiz canlı bir referanstır. Bu bilinçle işimizin her
          milimetresinde kalite kontrol ve ekip sorumluluğunu en üst seviyede tutuyoruz.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {aboutValues.map((item, index) => (
          <Reveal key={item.n} variant="up" delayMs={index * 80}>
            <article className="group flex h-full flex-col justify-between rounded-xl border border-border-subtle bg-surface-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/60">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[14px] font-bold text-brand-red">{item.n} / Değer</span>
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg border transition-transform group-hover:scale-110",
                      item.iconTone === "red"
                        ? "border-brand-red/30 bg-brand-red/10 text-brand-red"
                        : "border-white/10 bg-surface-elevated text-primary-container",
                    )}
                  >
                    <Icon name={item.icon} className="text-[22px]" />
                  </span>
                </div>
                <div>
                  <h3 className="mb-3 font-display text-xl font-bold">{item.title}</h3>
                  <p className="leading-relaxed text-text-secondary">{item.body}</p>
                </div>
              </div>
              <p className="mt-6 flex items-center gap-2 border-t border-border-subtle/50 pt-6 text-[12px] tracking-wider text-text-muted uppercase">
                <span className="h-1 w-1 rounded-full bg-brand-red" />
                {item.foot}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </PageSection>
  );
}
