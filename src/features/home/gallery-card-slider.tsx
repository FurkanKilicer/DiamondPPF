"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils/cn";

export type GallerySlide = {
  title: string;
  brand: string;
  tag: string;
  src: string;
};

function GalleryCard({
  item,
  onOpen,
  sizes,
}: {
  item: GallerySlide;
  onOpen?: () => void;
  sizes: string;
}) {
  const media = (
    <>
      <Image
        src={item.src}
        alt={`${item.brand} ${item.title}`}
        fill
        sizes={sizes}
        className={cn(
          "object-cover",
          onOpen && "transition duration-500 group-hover:scale-105 motion-reduce:transition-none",
        )}
        draggable={false}
      />
      <span className="label-caps absolute top-3 left-3 rounded bg-surface-canvas/80 px-2 py-0.5 text-primary-container backdrop-blur">
        {item.tag}
      </span>
    </>
  );

  return (
    <div className="card-light group flex h-full flex-col overflow-hidden rounded-xl">
      {onOpen ? (
        <button
          type="button"
          className="relative aspect-[4/3] w-full overflow-hidden"
          onClick={onOpen}
          aria-label={`${item.brand} ${item.title} fotoğrafını büyüt`}
        >
          {media}
        </button>
      ) : (
        <div className="relative aspect-[4/3] w-full overflow-hidden">{media}</div>
      )}
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
  );
}

export function GalleryCardSlider({
  items,
  onOpen,
}: {
  items: readonly GallerySlide[];
  onOpen: (index: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    setActive(0);
    trackRef.current?.scrollTo({ left: 0 });
  }, [items]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const sync = () => {
      const mid = track.scrollLeft + track.clientWidth / 2;
      const children = Array.from(track.children) as HTMLElement[];
      let next = 0;
      let nearest = Number.POSITIVE_INFINITY;

      children.forEach((child, index) => {
        const center = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(center - mid);
        if (distance < nearest) {
          nearest = distance;
          next = index;
        }

        const inner = child.firstElementChild as HTMLElement | null;
        if (!inner) return;

        const progress = 1 - Math.min(1, distance / Math.max(child.offsetWidth * 0.85, 1));
        const eased = progress * progress * (3 - 2 * progress);
        const scale = reduced ? (progress > 0.5 ? 1 : 0.9) : 0.9 + 0.1 * eased;
        const opacity = reduced ? (progress > 0.5 ? 1 : 0.75) : 0.75 + 0.25 * eased;
        inner.style.transform = `scale(${scale})`;
        inner.style.opacity = String(opacity);
      });

      setActive((current) => (current === next ? current : next));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    sync();
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  function goTo(index: number) {
    const track = trackRef.current;
    const child = track?.children[index] as HTMLElement | undefined;
    if (!track || !child) return;
    const left = child.offsetLeft - (track.clientWidth - child.offsetWidth) / 2;
    track.scrollTo({ left, behavior: "smooth" });
  }

  if (items.length === 0) return null;

  return (
    <>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Örnek araçlar"
        className="flex flex-col gap-5 lg:hidden"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(Math.min(items.length - 1, active + 1));
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(Math.max(0, active - 1));
          }
        }}
      >
        <div
          ref={trackRef}
          className={cn(
            "hide-scrollbar flex snap-x snap-mandatory items-center overflow-x-auto overscroll-x-contain",
            items.length === 1 ? "px-0" : "px-[6%] sm:px-[12%]",
          )}
          tabIndex={0}
        >
          {items.map((item, index) => {
            const selected = index === active;
            return (
              <article
                key={`${item.brand}-${item.title}`}
                aria-current={selected}
                className={cn(
                  items.length === 1 ? "w-full" : "w-[88%] shrink-0 snap-center px-2 sm:w-[70%]",
                  selected ? "z-10" : "z-0",
                )}
              >
                <div className="origin-center will-change-transform" style={{ transform: "scale(0.9)", opacity: 0.75 }}>
                  <GalleryCard item={item} sizes="(max-width: 1023px) 88vw, 1px" />
                </div>
              </article>
            );
          })}
        </div>
        {items.length > 1 ? (
          <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Slayt">
            {items.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={`${item.brand}-${item.title}-dot`}
                  type="button"
                  role="tab"
                  aria-label={`${item.brand} ${item.title}`}
                  aria-selected={selected}
                  className={cn(
                    "h-2 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none",
                    selected ? "w-6 bg-brand-red" : "w-2 bg-slate-300 hover:bg-slate-400",
                  )}
                  onClick={() => goTo(index)}
                />
              );
            })}
          </div>
        ) : null}
      </div>
      <ul className="hidden gap-6 lg:grid lg:grid-cols-4">
        {items.map((item, index) => (
          <li key={`${item.brand}-${item.title}`}>
            <GalleryCard
              item={item}
              onOpen={() => onOpen(index)}
              sizes="(min-width: 1024px) 25vw, 1px"
            />
          </li>
        ))}
      </ul>
    </>
  );
}
