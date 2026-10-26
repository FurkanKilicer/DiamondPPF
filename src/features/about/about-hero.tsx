import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { PageSection } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { VideoTrigger } from "@/features/home/video-modal";
import { aboutJumps } from "@/lib/mock-data/about";
import { site } from "@/lib/mock-data/content";

export function AboutHero() {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 bg-gradient-to-b from-brand-red/10 via-transparent to-transparent blur-3xl"
        aria-hidden
      />
    <PageSection bordered={false}>
      <nav aria-label="Sayfa konumu" className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-text-muted">
        <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-text-primary">
          <Icon name="home" className="text-[15px]" />
          Ana Sayfa
        </Link>
        <span className="text-text-muted/60" aria-hidden>/</span>
        <span className="font-medium text-text-primary">Biz Kimiz?</span>
      </nav>
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <Reveal variant="left" className="space-y-4 lg:col-span-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card px-3 py-1 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-red" />
            <span className="label-caps tracking-widest text-text-primary">Biz Kimiz?</span>
            <span className="font-mono text-[11px] text-text-muted">·</span>
            <span className="label-caps tracking-wider text-text-secondary">{site.name}</span>
          </div>
          <h1 className="max-w-3xl font-display text-[clamp(2.1rem,5.4vw,4rem)] font-bold leading-none tracking-tight">
            Her araç,{" "}
            <span className="bg-gradient-to-r from-text-primary via-brand-red to-[#FF3338] bg-clip-text text-transparent">
              referansımızdır.
            </span>
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-text-secondary md:text-lg">
            Ekibimizin 20 yılı aşkın tecrübesi · {site.name} 2023’ten beri {site.areaLabel}’da klinik hijyen ve
            milimetrik boya koruma standartlarıyla hizmetinizde.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-4">
            {aboutJumps.map((item) => (
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
              href="#fiyat-teklif"
              className="label-caps inline-flex items-center gap-1 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-2 tracking-wider text-[#FF3338] transition-all hover:bg-brand-red/20"
            >
              <Icon name="chat" className="text-[16px]" />
              Teklif Al
            </a>
          </div>
        </Reveal>
        <Reveal variant="right" className="w-full lg:col-span-4">
          <VideoTrigger className="group block w-full overflow-hidden rounded-xl border border-border-subtle bg-surface-card text-left shadow-xl transition-all hover:border-brand-red/50">
            <span className="relative block aspect-video overflow-hidden bg-surface-container-high">
              <Image
                src="/images/stitch-27.jpg"
                alt="Klinik ışıkta şeffaf PPF uygulanan spor otomobil"
                fill
                priority
                className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90"
                sizes="(min-width: 1024px) 30vw, 100vw"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/40 to-transparent" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand-red text-white shadow-[0_0_30px_rgba(227,30,36,0.6)] transition-transform group-hover:scale-110">
                  <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand-red/40" />
                  <Icon name="play_arrow" className="translate-x-0.5 text-[28px]" />
                </span>
              </span>
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded border border-border-subtle bg-surface-canvas/80 px-2 py-1 font-mono text-[11px] backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-red" />
                4K 60FPS ATÖLYE
              </span>
              <span className="absolute top-3 right-3 rounded border border-border-subtle bg-surface-card/80 px-2 py-0.5 font-mono text-[11px] text-text-muted backdrop-blur-md">
                3:48 DK
              </span>
            </span>
            <span className="block space-y-1 bg-surface-card p-4">
              <span className="flex items-center justify-between">
                <span className="label-caps font-bold tracking-wider text-[#FF3338]">Tanıtım filmi</span>
                <span className="font-mono text-[11px] text-text-muted">{site.workshopLabel}</span>
              </span>
              <span className="block font-display font-semibold">PPF kaplama: nasıl yapıyoruz?</span>
              <span className="block text-[13px] text-text-secondary">
                Klinik yıkamadan lazer kesim ve kenar kıvırmaya tüm süreç.
              </span>
            </span>
          </VideoTrigger>
        </Reveal>
      </div>
    </PageSection>
    </div>
  );
}
