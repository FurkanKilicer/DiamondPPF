"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";

export function ChipSlider<T extends string>({
  items,
  value,
  onChange,
  label,
  tone = "light",
}: {
  items: readonly T[];
  value: T;
  onChange: (item: T) => void;
  label?: (item: T) => string;
  tone?: "light" | "dark";
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef(new Map<T, HTMLButtonElement>());

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    const chip = chipRefs.current.get(value);
    if (!scroller || !chip) return;

    const index = items.indexOf(value);
    const last = items.length - 1;
    const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    let left = 0;

    if (index <= 0) {
      left = 0;
    } else if (index >= last) {
      left = maxScroll;
    } else {
      left = chip.offsetLeft - scroller.clientWidth / 2 + chip.offsetWidth / 2;
      left = Math.min(maxScroll, Math.max(0, left));
    }

    scroller.scrollTo({ left, behavior: "smooth" });
  }, [items, value]);

  return (
    <div
      ref={scrollerRef}
      role="tablist"
      aria-label="Marka filtresi"
      className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {items.map((item) => {
        const selected = value === item;
        return (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={selected}
            ref={(node) => {
              if (node) chipRefs.current.set(item, node);
              else chipRefs.current.delete(item);
            }}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-lg px-4 py-2 font-display text-[11px] tracking-wider uppercase",
              selected
                ? "cta-red font-bold"
                : tone === "light"
                  ? "bg-white text-slate-500 hover:text-slate-900"
                  : "border border-white/10 bg-surface-card text-text-secondary hover:text-text-primary",
            )}
            onClick={() => onChange(item)}
          >
            {label ? label(item) : item}
          </button>
        );
      })}
    </div>
  );
}
