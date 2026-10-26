import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { PageSection } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import {
  brandRecommendation,
  defaultServiceBrand,
  serviceBrands,
} from "@/lib/mock-data/services";
import { site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

export function ServicesHero({
  brandId,
  onBrand,
}: {
  brandId: string;
  onBrand: (id: string) => void;
}) {
  const brand = serviceBrands.find((item) => item.id === brandId) ?? defaultServiceBrand;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 bg-gradient-to-b from-brand-red/10 via-transparent to-transparent blur-3xl"
        aria-hidden
      />
      <PageSection bordered={false} id="hizmet-ust">
        <nav aria-label="Sayfa konumu" className="mb-8 flex flex-wrap items-center gap-2 text-[13px] text-text-muted">
          <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-text-primary">
            <Icon name="home" className="text-[15px]" />
            Ana Sayfa
          </Link>
          <span className="text-text-muted/60" aria-hidden>
            /
          </span>
          <span className="font-medium text-text-primary">Hizmetler</span>
        </nav>
        <div className="flex flex-col gap-6">
          <Reveal variant="left" className="flex max-w-4xl flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-surface-card px-3 py-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
              <span className="label-caps tracking-widest text-text-primary">
                Atölye uygulamaları & bespoke çözümler · {site.workshopLabel}
              </span>
            </span>
            <h1 className="font-display text-[clamp(2.1rem,5.4vw,4rem)] font-bold leading-none tracking-tight">
              Benim aracıma{" "}
              <span className="bg-gradient-to-r from-text-primary via-white to-brand-red bg-clip-text text-transparent">
                ne yapılabilir?
              </span>
            </h1>
            <p className="max-w-2xl text-[15px] leading-relaxed text-text-secondary md:text-lg">
              Aracınızın marka, model ve kullanım dinamiklerine göre milimetrik toleransla uygulanan koruma, OEM konfor,
              güvenlik ve cerrahi restorasyon çözümleri.
            </p>
          </Reveal>
          <Reveal variant="up" className="flex flex-col gap-4 rounded-xl border border-white/10 bg-surface-card/90 p-5 shadow-xl backdrop-blur-xl md:p-6">
            <div className="flex flex-col justify-between gap-4 border-b border-white/5 pb-4 lg:flex-row lg:items-center">
              <div className="flex items-center gap-3">
                <Icon name="directions_car" className="text-[24px] text-primary-container" />
                <div>
                  <span className="label-caps tracking-wider text-text-muted">Hızlı analiz motoru</span>
                  <p className="font-display text-lg font-bold">Aracınızı seçin</p>
                </div>
              </div>
              <p className="flex items-center gap-2 text-[12px] text-text-secondary">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                Veritabanında 140+ güncel şasi & panel şablonu hazır
              </p>
            </div>
            <ul className="grid grid-cols-4 gap-2 md:grid-cols-8">
              {serviceBrands.map((item) => {
                const active = item.id === brand.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onBrand(item.id)}
                      className={cn(
                        "flex h-full w-full flex-col items-center justify-center rounded-lg border p-3 text-center transition-all",
                        active
                          ? "border-brand-red/60 bg-surface-elevated"
                          : "border-white/5 bg-surface-elevated hover:border-primary-container/40",
                      )}
                    >
                      <span className={cn("text-[13px] font-semibold", active ? "text-brand-red" : "text-text-primary")}>
                        {item.name}
                      </span>
                      <span className="text-[10px] text-text-muted">{item.line}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-col justify-between gap-3 rounded-lg border border-primary-container/30 bg-surface-canvas/90 p-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-container/10 text-primary">
                  <Icon name="recommend" className="text-[20px]" />
                </span>
                <div>
                  <span className="label-caps text-text-muted">Seçilen araç için optimize paket</span>
                  <p className="text-[15px] font-medium text-text-primary">{brandRecommendation(brand)}</p>
                </div>
              </div>
              <a
                href="#quick-quote-panel"
                className="label-caps inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-white/10 bg-surface-elevated px-4 py-2 tracking-wider text-text-primary transition-colors hover:bg-brand-red hover:text-white"
              >
                Konfigüre et
                <Icon name="arrow_downward" className="text-[16px]" />
              </a>
            </div>
          </Reveal>
        </div>
      </PageSection>
    </div>
  );
}
