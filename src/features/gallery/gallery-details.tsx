"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { galleryDetails } from "@/lib/mock-data/gallery";

export function GalleryDetails() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const photos = useMemo(
    () =>
      galleryDetails.map((item) => ({
        src: item.src,
        alt: item.title,
        caption: `${item.title} · ${item.note}`,
      })),
    [],
  );

  return (
    <PageSection id="mikron-detay" tone="light">
      <Reveal variant="fade" className="mx-auto mb-10 max-w-3xl space-y-3 text-center">
        <SectionKicker>Sıfır açıklık · mikron seviyede bitiş</SectionKicker>
        <h2 className="headline-lg font-bold tracking-tight text-slate-900">
          Mikron düzeyinde detaylar. Yakından inceleyin.
        </h2>
        <p className="text-[15px] text-slate-600">
          Bıçaksız plotter kesim ve panellerin arkasına kıvrılan kenarlar sayesinde film varlığı gözle ayırt edilemez.
        </p>
      </Reveal>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {galleryDetails.map((item, index) => (
          <li key={item.title}>
            <Reveal variant="up" delayMs={index * 70}>
              <article className="card-light overflow-hidden rounded-2xl">
                <button
                  type="button"
                  className="relative aspect-square w-full"
                  onClick={() => setLightbox(index)}
                  aria-label={`${item.title} fotoğrafını büyüt`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 22vw, 50vw"
                  />
                </button>
                <div className="space-y-1 p-4">
                  <h3 className="font-display text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="text-[12px] text-brand-red">{item.note}</p>
                  <p className="text-[13px] leading-relaxed text-slate-600">{item.body}</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
      <ImageLightbox items={photos} index={lightbox} onClose={() => setLightbox(null)} onIndexChange={setLightbox} />
    </PageSection>
  );
}
