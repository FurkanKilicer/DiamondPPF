"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils/cn";

const filters = ["Tümü", "Mercedes-Benz", "Togg", "BMW", "Audi", "Land Rover", "Tesla", "Diğer"] as const;

const gallery = [
  { title: "i8", brand: "BMW", tag: "Şeffaf PPF", src: "/images/stitch-11.jpg" },
  { title: "CLA 45", brand: "Mercedes-Benz", tag: "Mat PPF", src: "/images/stitch-12.jpg" },
  { title: "Model Y", brand: "Tesla", tag: "Mat Kırmızı PPF", src: "/images/stitch-13.jpg" },
  { title: "T10F Fastback", brand: "Togg", tag: "Mat PPF", src: "/images/stitch-14.jpg" },
];

export function Gallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Tümü");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const items = useMemo(() => {
    if (filter === "Tümü") return gallery;
    if (filter === "Mercedes-Benz") {
      return gallery.filter((item) => item.brand.includes("Mercedes"));
    }
    return gallery.filter((item) => item.brand === filter);
  }, [filter]);

  return (
    <section id="ornek-araclar" className="light-band page-pad py-16 lg:py-24">
      <div className="page-shell flex flex-col gap-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal variant="left">
            <span className="label-caps mb-2 block tracking-widest text-brand-red">Gerçek Uygulamalar</span>
            <h2 className="headline-lg tracking-tight text-slate-900">Fotoğraflara değil, gerçek işçiliğimize bakın.</h2>
            <p className="mt-1 text-[15px] text-slate-600">Her araç marka, model ve uygulanan işlemle şeffaf olarak arşivlenir.</p>
          </Reveal>
          <Reveal variant="right" delayMs={80}>
          <Link href="/ornek-araclar" className="inline-flex items-center gap-2 font-display text-sm font-semibold whitespace-nowrap text-brand-red">
            Tüm Örnek Araçlar (32+)
            <Icon name="arrow_forward" className="text-[18px]" />
          </Link>
          </Reveal>
        </div>
        <Reveal variant="fade">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Marka filtresi">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              className={cn(
                "rounded px-4 py-2 font-display text-[11px] tracking-wider uppercase",
                filter === item ? "cta-red font-bold" : "bg-white text-slate-500 hover:text-slate-900",
              )}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        </Reveal>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li key={item.title}>
            <Reveal variant="up" delayMs={index * 90}>
            <div className="card-light group flex h-full flex-col overflow-hidden rounded-xl">
              <button
                type="button"
                className="relative aspect-[4/3] w-full overflow-hidden"
                onClick={() => setLightbox(index)}
                aria-label={`${item.brand} ${item.title} fotoğrafını büyüt`}
              >
                <Image src={item.src} alt={`${item.brand} ${item.title}`} fill className="object-cover transition duration-300 group-hover:scale-105" />
                <span className="label-caps absolute top-3 left-3 rounded bg-surface-canvas/80 px-2 py-0.5 text-primary-container backdrop-blur">
                  {item.tag}
                </span>
              </button>
              <div className="flex items-center justify-between p-4">
                <div>
                  <span className="label-caps text-slate-500">{item.brand}</span>
                  <h3 className="font-display text-base font-semibold text-slate-900">{item.title}</h3>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <Icon name="chevron_right" className="text-[18px]" />
                </span>
              </div>
            </div>
            </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <ImageLightbox
        items={items.map((item) => ({
          src: item.src,
          alt: `${item.brand} ${item.title}`,
          caption: `${item.brand} ${item.title}`,
        }))}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={setLightbox}
      />
    </section>
  );
}
