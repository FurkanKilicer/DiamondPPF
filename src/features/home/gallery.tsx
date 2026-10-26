"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChipSlider } from "@/components/ui/chip-slider";
import { Icon } from "@/components/ui/icon";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { Reveal } from "@/components/ui/reveal";
import { GalleryCardSlider } from "@/features/home/gallery-card-slider";

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
          <ChipSlider items={filters} value={filter} onChange={setFilter} />
        </Reveal>
        <Reveal variant="up">
          <GalleryCardSlider items={items} onOpen={setLightbox} />
        </Reveal>
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
