"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { galleryAtelier } from "@/lib/mock-data/gallery";
import { site } from "@/lib/mock-data/content";

export function GalleryAtelier() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const photos = useMemo(
    () =>
      galleryAtelier.map((src, index) => ({
        src,
        alt: `Gayrettepe atölyesinden kare ${index + 1}`,
        caption: `Atölye karesi ${index + 1}`,
      })),
    [],
  );

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
        {galleryAtelier.map((src, index) => (
          <li key={src}>
            <Reveal variant="up" delayMs={index * 40}>
              <button
                type="button"
                className="relative aspect-square w-full overflow-hidden rounded-xl"
                onClick={() => setLightbox(index)}
                aria-label={`Atölye karesi ${index + 1} büyüt`}
              >
                <Image
                  src={src}
                  alt={`Gayrettepe atölyesinden kare ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 25vw, 50vw"
                />
              </button>
            </Reveal>
          </li>
        ))}
      </ul>
      <ImageLightbox items={photos} index={lightbox} onClose={() => setLightbox(null)} onIndexChange={setLightbox} />
    </PageSection>
  );
}
