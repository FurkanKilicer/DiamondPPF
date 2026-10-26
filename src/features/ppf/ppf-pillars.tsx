import { Icon } from "@/components/ui/icon";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { ppfPillars } from "@/lib/mock-data/ppf";
import { cn } from "@/lib/utils/cn";

export function PpfPillars() {
  return (
    <PageSection>
      <Reveal variant="fade" className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
        <SectionKicker>Neden yaptırmalısınız?</SectionKicker>
        <h2 className="headline-lg font-bold tracking-tight">Boyanız, fabrikadan çıktığı ilk günkü gibi kalsın.</h2>
        <p className="text-[15px] text-text-secondary">
          Otomobilinizin en değerli parçası orijinal boyasıdır. Değişen ya da yeniden boyanan her panel değer kaybı
          demektir.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {ppfPillars.map((item, index) => (
          <Reveal key={item.title} variant="up" delayMs={index * 70}>
            <article className="flex h-full flex-col justify-between space-y-6 rounded-2xl border border-border-subtle bg-surface-card p-7 transition-all hover:-translate-y-1 hover:border-brand-red/50">
              <div className="space-y-4">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl border",
                    item.tone === "red" && "border-brand-red/30 bg-brand-red/10 text-brand-red",
                    item.tone === "cyan" && "border-primary-container/30 bg-primary-container/10 text-primary-container",
                    item.tone === "neutral" && "border-border-subtle bg-surface-elevated text-text-primary",
                  )}
                >
                  <Icon name={item.icon} className="text-[26px]" />
                </span>
                <h3 className="font-display text-lg font-bold">{item.title}</h3>
                <p className="text-[13px] leading-relaxed text-text-secondary">{item.body}</p>
              </div>
              <p className="flex items-center gap-2 border-t border-border-subtle/80 pt-4 font-mono text-[11px] tracking-wider text-primary-container uppercase">
                <Icon name="check_circle" className="text-[16px]" />
                {item.foot}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </PageSection>
  );
}
