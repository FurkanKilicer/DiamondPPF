"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import type { PublicGalleryAtelier } from "@/lib/cms/public-gallery";
import { site } from "@/lib/mock-data/content";

export function GalleryAtelier({ items }: { items: PublicGalleryAtelier[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const photos = useMemo(
    () =>
      items.map((item, index) => ({
        src: item.src,
        alt: item.title || `Gayrettepe atölyesinden kare ${index + 1}`,
        caption: item.description ? `${item.title} — ${item.description}` : item.title || `Atölye karesi ${index + 1}`,
      })),
    [items],
  );

  if (items.length === 0) return null;

  return (
    <PageSection id="atolye-kareleri" tone="light">
      <Reveal variant="fade" className="mb-10 max-w-3xl space-y-3">
        <SectionKicker>Atelier · instabull galleria</SectionKicker>
        <h2 className="headline-lg font-bold tracking-tight text-slate-900">Atölyeden kareler</h2>
        <p className="text-[15px] text-slate-600">
          {site.workshopLabel} temiz oda standardı, lazer kesim ve infrared kürlenme anları.
        </p>
      </Reveal>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item, index) => (
          <li key={item.id}>
            <Reveal variant="up" delayMs={index * 40}>
              <button
                type="button"
                className="group relative aspect-square w-full overflow-hidden rounded-xl text-left"
                onClick={() => setLightbox(index)}
                aria-label={`${item.title} büyüt`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  sizes="(min-width: 640px) 25vw, 50vw"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:opacity-100" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-3 text-left transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:translate-y-0">
                  <span className="block font-display text-[13px] font-semibold leading-5 text-white sm:text-sm">
                    {item.title}
                  </span>
                  {item.description ? (
                    <span className="mt-0.5 block line-clamp-2 text-[11px] leading-4 text-white/80 sm:text-[12px]">
                      {item.description}
                    </span>
                  ) : null}
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>
      <ImageLightbox items={photos} index={lightbox} onClose={() => setLightbox(null)} onIndexChange={setLightbox} />
    </PageSection>
  );
}
