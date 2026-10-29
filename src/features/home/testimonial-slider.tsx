"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import type { GoogleReview } from "@/lib/mock-data/reviews";
import { cn } from "@/lib/utils/cn";

const ROTATE_MS = 8000;

export function TestimonialSlider({ items }: { items: readonly GoogleReview[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = items.length;

  const go = useCallback(
    (next: number) => {
      if (total === 0) return;
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (paused || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => go(index + 1), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [go, index, paused, total]);

  if (total === 0) return null;

  return (
    <div
      className="flex w-full max-w-4xl flex-col items-center gap-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (next instanceof Node && event.currentTarget.contains(next)) return;
        setPaused(false);
      }}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Google müşteri yorumları"
        className="flex w-full flex-col items-center gap-8"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            go(index + 1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            go(index - 1);
          }
        }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Önceki yorum"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-surface-card text-text-primary hover:bg-white/8"
            onClick={() => go(index - 1)}
          >
            <Icon name="chevron_left" className="text-[22px]" />
          </button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Yorum slaytları">
            {items.map((review, reviewIndex) => {
              const selected = reviewIndex === index;
              return (
                <button
                  key={review.id}
                  type="button"
                  role="tab"
                  aria-label={`${review.author} yorumu`}
                  aria-selected={selected}
                  className={cn(
                    "h-2 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none",
                    selected ? "w-6 bg-brand-magenta" : "w-2 bg-white/20 hover:bg-white/40",
                  )}
                  onClick={() => go(reviewIndex)}
                />
              );
            })}
          </div>
          <button
            type="button"
            aria-label="Sonraki yorum"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-surface-card text-text-primary hover:bg-white/8"
            onClick={() => go(index + 1)}
          >
            <Icon name="chevron_right" className="text-[22px]" />
          </button>
        </div>

        <div className="grid w-full max-w-3xl">
          {items.map((review, reviewIndex) => {
            const selected = reviewIndex === index;
            return (
              <figure
                key={review.id}
                className={cn(
                  "col-start-1 row-start-1 flex flex-col items-center gap-6 transition-opacity duration-300 motion-reduce:transition-none",
                  selected ? "relative z-10 opacity-100" : "pointer-events-none opacity-0",
                )}
                aria-hidden={!selected}
              >
                <blockquote className="headline-lg text-center leading-snug md:text-[40px] md:leading-[1.2]">
                  <p aria-live={selected ? "polite" : undefined}>“{review.quote}”</p>
                </blockquote>
                <figcaption className="mt-auto flex flex-col items-center gap-1">
                  <span className="font-display text-base font-bold">{review.author}</span>
                  <span className="text-[13px] text-text-secondary">{review.context}</span>
                  <span className="mt-1 text-[11px] tracking-wide text-text-muted uppercase">Google yorumu</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
