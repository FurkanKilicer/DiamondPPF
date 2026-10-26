"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { WordReveal, wordCount } from "@/components/ui/word-reveal";
import { VideoTrigger } from "@/features/home/video-modal";
import { site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

const ROTATE_MS = 10000;

const slides = [
  {
    n: "01",
    title: "Biz Kimiz?",
    body: "20 yılı aşkın tecrübe",
    kicker: "Diamond PPF",
    heading: "Her araç,",
    accent: "referansımızdır",
    copy: "Diamond PPF: Görünmez kalkan, görünür işçilik. Söylemiyoruz. Gösteriyoruz. Kliniğimizde her parça mikron hassasiyetinde işlenir.",
    image: "/images/stitch-02.jpg",
    imageAlt: "Temiz atölyede şeffaf PPF uygulanan spor otomobil",
    badge: "Bay 01 · Canlı İşlem",
    captionKicker: "Diamond PPF 200µ",
    captionTitle: "Porsche 911 GT3 RS",
    captionMeta: "0,195 mm",
  },
  {
    n: "02",
    title: "Diamond PPF",
    body: "Kendi markamız, garantimiz",
    kicker: "Diamond PPF",
    heading: "Görünmez kalkan,",
    accent: "görünür işçilik",
    copy: "Kendi markamız, kendi 7 yıl garantimiz. 200 mikron poliüretan optik netlik ve hidrofobik, kendini onaran üst katman.",
    image: "/images/stitch-08.jpg",
    imageAlt: "Mikron hassasiyetinde kesilen Diamond PPF filmi",
    badge: "200µ · Laboratuvar Onaylı",
    captionKicker: "Optik netlik",
    captionTitle: "7 yıl film garantisi",
    captionMeta: "195µ",
  },
  {
    n: "03",
    title: "Test Lab",
    body: "Kamera önünde 9 test",
    kicker: "Test Lab",
    heading: "Söylemiyoruz.",
    accent: "Gösteriyoruz.",
    copy: "Çizik, darbe, kalınlık, UV ve hidrofobi. Diamond PPF’yi kamera önünde, kontrollü testlerle kanıtlıyoruz.",
    image: "/images/stitch-15.jpg",
    imageAlt: "Kamera önünde PPF çizik ve kendini toparlama testi",
    badge: "TEST 01 / 09 · Canlı",
    captionKicker: "Ölçülen kalınlık",
    captionTitle: "0,195 mm (195µ)",
    captionMeta: "9 test",
  },
  {
    n: "04",
    title: "Garanti & Takip",
    body: "Anlık canlı telefon takibi",
    kicker: "Dijital Takip",
    heading: "Aracınız bizdeyken,",
    accent: "kontrol sizde.",
    copy: "Hangi bay odasında, hangi ustada, kaçıncı adımda olduğunu telefonunuzdan anlık izlersiniz. Teslimatta QR’lı garanti belgesi açılır.",
    image: "/images/stitch-20.jpg",
    imageAlt: "Atölyede canlı takip edilen PPF uygulama süreci",
    badge: "Canlı akış · %62",
    captionKicker: "Full PPF",
    captionTitle: "Mercedes-Benz CLA",
    captionMeta: "7 yıl",
  },
] as const;

export function Hero() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setActive((index) => (index + 1) % slides.length);
    }, ROTATE_MS);

    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <section className="page-pad relative w-full overflow-hidden bg-surface-canvas pt-4 pb-10 md:pt-10 md:pb-16 lg:pt-16 lg:pb-24">
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary-container/10 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/2 -left-48 h-80 w-80 rounded-full bg-brand-magenta/10 blur-[120px]" />
      <div className="page-shell relative flex flex-col gap-6 md:gap-10 lg:gap-16">
        <Reveal variant="fade">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
            <div className="label-caps inline-flex max-w-full items-center gap-2 rounded bg-surface-elevated px-2.5 py-1 text-primary-container sm:px-3">
              <span className="h-2 w-2 shrink-0 animate-ping rounded-full bg-primary-container" />
              <span className="min-w-0 leading-snug">Endura PPF · Yetkili uygulama</span>
            </div>
            <div className="label-caps flex flex-wrap items-center gap-x-2 gap-y-1 text-text-secondary">
              <span>{site.areaLabel}</span>
              <span className="text-text-muted">•</span>
              <span className="text-text-primary">Klinik Standart</span>
            </div>
          </div>
        </Reveal>
        <div id="hero-stage" className="grid grid-cols-1 items-center gap-5 md:gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-4 md:gap-6 lg:col-span-7">
            <div key={slide.n} className="space-y-2 md:space-y-3">
              <span className="block font-display text-[11px] font-semibold tracking-widest text-primary-container uppercase md:text-sm">
                <WordReveal text={slide.kicker} stepMs={40} />
              </span>
              <h1
                className="display-title tracking-tight text-text-primary"
                aria-label={`${slide.heading} ${slide.accent}`}
              >
                <WordReveal text={slide.heading} delayMs={40} stepMs={50} />
                <br />
                <WordReveal
                  text={slide.accent}
                  delayMs={40 + wordCount(slide.heading) * 50}
                  stepMs={50}
                  wordClassName="gradient-word"
                />
              </h1>
            </div>
            <p key={`${slide.n}-copy`} className="max-w-xl text-[15px] leading-6 text-text-secondary md:text-lg md:leading-7">
              <WordReveal
                text={slide.copy}
                delayMs={80 + (wordCount(slide.heading) + wordCount(slide.accent)) * 50}
                stepMs={18}
              />
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1 md:gap-4 md:pt-2">
              <a
                href="#teklif-bolumu"
                className="cta-red inline-flex items-center gap-2 rounded px-4 py-2.5 font-display text-[11px] font-bold tracking-wider uppercase md:px-6 md:py-3.5 md:text-sm"
              >
                <Icon name="request_quote" className="text-[18px] md:text-[20px]" />
                Teklif Al
              </a>
              <a
                href="#hikayemiz"
                className="inline-flex items-center gap-2 rounded bg-surface-elevated px-4 py-2.5 font-display text-[11px] tracking-wider uppercase hover:bg-surface-container-high md:px-6 md:py-3.5 md:text-sm"
              >
                Hikâyemiz
                <Icon name="arrow_forward" className="text-[16px] text-primary-container md:text-[18px]" />
              </a>
              <VideoTrigger className="group hidden items-center gap-2 rounded bg-surface-card px-4 py-3.5 text-text-secondary hover:bg-surface-elevated hover:text-text-primary md:inline-flex">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-container/20 text-primary-container">
                  <Icon name="play_arrow" className="text-[18px]" />
                </span>
                <span className="label-caps tracking-wider">Filmi İzleyin (3:48)</span>
              </VideoTrigger>
            </div>
          </div>
          <Reveal variant="right" delayMs={120} className="relative lg:col-span-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-card shadow-2xl md:aspect-[4/3]">
              {slides.map((item, index) => (
                <Image
                  key={item.n}
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className={cn(
                    "object-cover transition-opacity duration-700",
                    index === active ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-canvas via-transparent to-transparent" />
              <div
                key={`${slide.n}-badge`}
                className="hero-copy-enter absolute top-2.5 left-2.5 flex max-w-[calc(100%-1.25rem)] items-center gap-2 rounded-full bg-surface-card/80 px-2.5 py-1 backdrop-blur-md md:top-4 md:left-4 md:px-3 md:py-1.5"
              >
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-brand-magenta" />
                <span className="label-caps tracking-widest">{slide.badge}</span>
              </div>
              <div
                key={`${slide.n}-caption`}
                className="hero-copy-enter absolute right-2.5 bottom-2.5 left-2.5 flex items-center justify-between gap-2 rounded bg-surface-card/90 px-3 py-2.5 backdrop-blur-md md:right-4 md:bottom-4 md:left-4 md:p-4"
              >
                <div className="min-w-0">
                  <p className="label-caps tracking-wider text-primary-container">{slide.captionKicker}</p>
                  <p className="font-display truncate text-sm font-semibold md:text-base">{slide.captionTitle}</p>
                </div>
                <span className="shrink-0 rounded bg-surface-elevated px-2 py-1 text-[10px] text-text-secondary md:px-2.5 md:text-[11px]">
                  {slide.captionMeta}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2 md:grid-cols-4 md:gap-3 md:pt-6" role="tablist" aria-label="Hero slaytları">
          {slides.map((item, index) => {
            const selected = index === active;
            return (
              <Reveal key={item.n} variant="up" delayMs={index * 80}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="hero-stage"
                  className={cn(
                    "group relative flex h-full w-full flex-col gap-0.5 overflow-hidden rounded bg-surface-card p-2.5 text-left hover:bg-surface-elevated md:gap-1 md:p-4",
                    selected && "bg-surface-elevated",
                  )}
                  onClick={() => setActive(index)}
                >
                  <span className="font-mono text-[10px] tracking-widest text-primary-container md:text-[11px]">{item.n}</span>
                  <span
                    className={cn(
                      "font-display text-[13px] font-semibold leading-tight md:text-base",
                      selected ? "text-primary-container" : "group-hover:text-primary-container",
                    )}
                  >
                    {item.title}
                  </span>
                  <span className="text-[11px] leading-snug text-text-muted md:text-[13px]">{item.body}</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10" aria-hidden>
                    {selected ? (
                      <span
                        key={`${item.n}-progress`}
                        className="hero-tab-progress"
                        style={{ animationDuration: `${ROTATE_MS}ms` }}
                      />
                    ) : null}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
