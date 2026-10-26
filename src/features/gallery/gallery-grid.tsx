"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ChipSlider } from "@/components/ui/chip-slider";
import { Icon } from "@/components/ui/icon";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import {
  galleryFilters,
  galleryVehicles,
  galleryWhatsAppHref,
  type GalleryBrand,
} from "@/lib/mock-data/gallery";

type Filter = (typeof galleryFilters)[number];

function matches(filter: Filter, brand: GalleryBrand, itemFilter: string) {
  if (filter === "Tümü") return true;
  if (filter === "Mercedes-AMG") return itemFilter === "Mercedes-AMG" || brand === "Mercedes";
  return itemFilter === filter || brand === filter;
}

export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("Tümü");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const items = useMemo(
    () => galleryVehicles.filter((item) => matches(filter, item.brand, item.filter)),
    [filter],
  );
  const photos = useMemo(
    () =>
      items.map((item) => ({
        src: item.src,
        alt: `${item.brand} ${item.title}`,
        caption: item.title,
      })),
    [items],
  );

  return (
    <PageSection id="arac-arsivi">
      <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <Reveal variant="left" className="space-y-2">
          <SectionKicker icon="directions_car">Marka filtresi</SectionKicker>
          <h2 className="headline-lg font-bold tracking-tight">Gerçek referanslar</h2>
        </Reveal>
        <p className="text-[13px] text-text-muted">{items.length} gerçek referans</p>
      </div>
      <div className="mb-8">
        <ChipSlider
          items={galleryFilters}
          value={filter}
          onChange={setFilter}
          tone="dark"
          label={(item) => {
            const count =
              item === "Tümü"
                ? galleryVehicles.length
                : galleryVehicles.filter((vehicle) => matches(item, vehicle.brand, vehicle.filter)).length;
            return `${item} (${count})`;
          }}
        />
      </div>
      {items.length === 0 ? (
        <p className="text-[15px] text-text-muted">Bu markada henüz arşiv kartı yok.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <li key={item.id}>
              <Reveal variant="up" delayMs={index * 60}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-card">
                  <button
                    type="button"
                    className="relative aspect-[16/10] w-full overflow-hidden"
                    onClick={() => setLightbox(index)}
                    aria-label={`${item.brand} ${item.title} fotoğrafını büyüt`}
                  >
                    <Image
                      src={item.src}
                      alt={`${item.brand} ${item.title}`}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="label-caps rounded bg-surface-canvas/80 px-2 py-0.5 text-primary-container backdrop-blur"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <p className="label-caps text-text-muted">{item.kicker}</p>
                    <h3 className="font-display text-xl font-bold">{item.title}</h3>
                    <p className="text-[13px] text-brand-red">{item.package}</p>
                    <p className="text-[14px] leading-relaxed text-text-secondary">{item.body}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-text-muted">
                        <Icon name="timer" className="text-[16px]" />
                        Kürlenme: {item.cure}
                      </span>
                      <a
                        href={galleryWhatsAppHref(item.title)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[13px] font-semibold text-text-primary transition-colors hover:text-brand-red"
                      >
                        Detay & fiyat iste
                        <Icon name="arrow_outward" className="text-[16px]" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
      <ImageLightbox items={photos} index={lightbox} onClose={() => setLightbox(null)} onIndexChange={setLightbox} />
    </PageSection>
  );
}
