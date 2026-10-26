import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { PageSection } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { ppfJumps, ppfStats } from "@/lib/mock-data/ppf";
import { site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

export function PpfHero() {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 bg-gradient-to-b from-brand-red/10 via-transparent to-transparent blur-3xl"
        aria-hidden
      />
      <PageSection bordered={false}>
        <nav aria-label="Sayfa konumu" className="mb-8 flex flex-wrap items-center gap-2 text-[13px] text-text-muted">
          <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-text-primary">
            <Icon name="home" className="text-[15px]" />
            Ana Sayfa
          </Link>
          <span className="text-text-muted/60" aria-hidden>
            /
          </span>
          <span className="font-medium text-text-primary">PPF nedir?</span>
        </nav>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <Reveal variant="left" className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card px-3.5 py-1.5 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-brand-red" />
              <span className="label-caps tracking-widest text-text-primary">Optik polimer · 195 mikron taş kalkanı</span>
            </div>
            <h1 className="max-w-3xl font-display text-[clamp(2.1rem,5.4vw,4rem)] font-bold leading-none tracking-tight">
              Boyanızın üstünde,{" "}
              <span className="bg-gradient-to-r from-text-primary via-primary-container to-brand-red bg-clip-text text-transparent">
                görünmeyen zırh.
              </span>
            </h1>
            <p className="max-w-2xl text-[15px] leading-relaxed text-text-secondary md:text-lg">
              <strong className="font-medium text-text-primary">PPF (Paint Protection Film)</strong>, fabrika boyanızı taş
              darbesine, mikro çiziklere, asit yağmuruna ve UV solmasına karşı koruyan, ısıyla kendini onarabilen{" "}
              <span className="text-primary-container">195 mikron alifatik TPU</span> kalkandır.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {ppfJumps.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="label-caps inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-card px-4 py-2 tracking-wider text-text-secondary transition-all hover:border-brand-red/50 hover:bg-surface-elevated hover:text-text-primary"
                >
                  {item.featured ? <span className="h-1.5 w-1.5 rounded-full bg-brand-red" /> : null}
                  {item.label}
                </a>
              ))}
              <a
                href="/iletisim#quote-section"
                className="label-caps inline-flex items-center gap-1 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-2 tracking-wider text-[#FF3338] transition-all hover:bg-brand-red/20"
              >
                <Icon name="chat" className="text-[16px]" />
                Teklif al
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-[13px] text-text-secondary">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="verified_user" className="text-[18px] text-primary-container" />
                Resmi garanti sertifikası
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="precision_manufacturing" className="text-[18px] text-brand-red" />
                Lazer kesim · {site.workshopLabel}
              </span>
            </div>
          </Reveal>
          <Reveal variant="right" className="lg:col-span-5">
            <div className="relative rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-2xl sm:p-8">
              <div className="flex items-center justify-between border-b border-border-subtle/80 pb-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded border border-border-subtle bg-surface-elevated text-primary-container">
                    <Icon name="auto_fix_high" className="text-[22px]" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-bold tracking-tight">Diamond PPF</h2>
                    <p className="label-caps text-text-muted">Teknik performans metrikleri</p>
                  </div>
                </div>
                <span className="rounded bg-brand-red/10 px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider text-brand-red">
                  195µm TPU
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-6">
                {ppfStats.map((item) => (
                  <article key={item.label} className="space-y-1 rounded-xl border border-border-subtle/70 bg-surface-elevated p-4">
                    <p
                      className={cn(
                        "font-display text-[clamp(1.6rem,3vw,2.15rem)] leading-none font-bold tracking-tight",
                        item.accent === "red" ? "text-brand-red" : "text-text-primary",
                      )}
                    >
                      {item.value}
                      {item.unit ? (
                        <span className="ml-0.5 text-[0.45em] font-normal text-primary-container">{item.unit}</span>
                      ) : null}
                    </p>
                    <p className="label-caps text-text-secondary">{item.label}</p>
                    <p className="text-[12px] leading-relaxed text-text-muted">{item.note}</p>
                  </article>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between rounded-lg border border-border-subtle bg-surface-canvas/80 px-3 py-3 font-mono text-[11px] text-text-secondary">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Termoplastik poliüretan (TPU)
                </span>
                <span className="text-text-muted">Sıfır PVC katkısı</span>
              </div>
            </div>
          </Reveal>
        </div>
      </PageSection>
    </div>
  );
}
