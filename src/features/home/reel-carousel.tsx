"use client";

import Image from "next/image";
import { useRef } from "react";
import { Icon } from "@/components/ui/icon";

const reels = [
  { src: "/images/stitch-03.jpg", brand: "BMW", title: "XM", meta: "Şeffaf PPF Komple Koruma", time: "0:13", featured: false },
  { src: "/images/stitch-04.jpg", brand: "Audi", title: "A3 Sedan", meta: "Mat PPF · Gece Paketi", time: "1:13 · Anlatımlı", featured: true },
  { src: "/images/stitch-05.jpg", brand: "Mercedes-Benz", title: "CLA", meta: "Mat PPF Kaplama", time: "0:46 · Anlatımlı", featured: false },
  { src: "/images/stitch-06.jpg", brand: "BMW", title: "i5", meta: "Mat PPF & Cam Filmi", time: "0:24", featured: false },
  { src: "/images/stitch-07.jpg", brand: "Audi", title: "S7 Sportback", meta: "Şeffaf PPF Zırh", time: "0:39", featured: false },
  { src: "/images/stitch-03.jpg", brand: "Porsche", title: "911 GT3", meta: "Şeffaf PPF Ön Koruma", time: "0:51", featured: false },
  { src: "/images/stitch-04.jpg", brand: "Tesla", title: "Model Y", meta: "Mat PPF Kaplama", time: "1:02 · Anlatımlı", featured: false },
  { src: "/images/stitch-05.jpg", brand: "Togg", title: "T10X", meta: "Şeffaf PPF & Cam Filmi", time: "0:28", featured: false },
  { src: "/images/stitch-06.jpg", brand: "Land Rover", title: "Defender", meta: "Mat PPF Komple Koruma", time: "0:44 · Anlatımlı", featured: true },
  { src: "/images/stitch-07.jpg", brand: "Mercedes-Benz", title: "G63", meta: "Şeffaf PPF Zırh", time: "1:08", featured: false },
];

const cardStep = 272;

export function ReelCarousel() {
  const scroller = useRef<HTMLDivElement>(null);

  function scrollBy(delta: number) {
    scroller.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="page-pad page-shell flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-ping rounded-full bg-brand-cyan" />
          <span className="label-caps tracking-wider text-text-secondary">10 video · dokunun, sesli izleyin</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Önceki"
            className="flex h-9 w-9 items-center justify-center rounded bg-surface-elevated text-text-primary"
            onClick={() => scrollBy(-cardStep)}
          >
            <Icon name="chevron_left" className="text-[18px]" />
          </button>
          <button
            type="button"
            aria-label="Sonraki"
            className="flex h-9 w-9 items-center justify-center rounded bg-surface-elevated text-text-primary"
            onClick={() => scrollBy(cardStep)}
          >
            <Icon name="chevron_right" className="text-[18px]" />
          </button>
        </div>
      </div>
      <div
        ref={scroller}
        className="reel-track hide-scrollbar flex gap-4 overflow-x-auto overscroll-y-auto overscroll-x-contain pb-4"
      >
        {reels.map((item) => (
          <article
            key={`${item.brand}-${item.title}`}
            className="relative aspect-[9/16] w-64 shrink-0 overflow-hidden rounded-xl bg-surface-card"
          >
            <Image
              src={item.src}
              alt={`${item.brand} ${item.title}`}
              fill
              sizes="256px"
              className="object-cover transition duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-canvas via-surface-canvas/30 to-transparent" />
            <div
              className={`absolute top-3 left-3 rounded px-2 py-1 font-mono text-[11px] font-semibold text-white ${
                item.featured ? "bg-brand-magenta" : "bg-black/70 backdrop-blur-md"
              }`}
            >
              {item.time}
            </div>
            <div className="absolute right-3 bottom-3 left-3">
              <span className="label-caps text-primary-container">{item.brand}</span>
              <h3 className="font-display text-base font-bold">{item.title}</h3>
              <p className="text-[13px] text-text-secondary">{item.meta}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
