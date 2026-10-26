"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";

export function PpfCompare() {
  const [value, setValue] = useState(50);

  return (
    <div className="space-y-6 rounded-2xl border border-border-subtle bg-surface-card p-6 text-text-primary lg:p-8">
      <div className="flex items-center justify-between gap-3">
        <span className="label-caps tracking-wider text-text-primary">Etki simülasyonu</span>
        <span className="font-mono text-[12px] text-primary-container">Kaydırın & karşılaştırın</span>
      </div>
      <div className="relative h-80 w-full overflow-hidden rounded-xl border border-white/10 select-none sm:h-96">
        <Image
          src="/images/stitch-16.jpg"
          alt="Korumasız boyada taş izi ve hareler"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
        <span className="absolute bottom-4 left-4 rounded border border-border-subtle bg-surface-card/90 px-3 py-1.5 font-mono text-[11px] tracking-wider text-red-400 uppercase backdrop-blur-md">
          Korumasız vernik
        </span>
        <div
          className="absolute inset-0 border-r-2 border-brand-red"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <Image
            src="/images/stitch-23.jpg"
            alt="Diamond PPF ile korunan parlak yüzey"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <span className="absolute bottom-4 left-4 rounded border border-border-subtle bg-surface-card/90 px-3 py-1.5 font-mono text-[11px] tracking-wider text-primary-container uppercase backdrop-blur-md">
            Diamond PPF zırhı
          </span>
        </div>
        <div
          className="pointer-events-none absolute top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-red text-white shadow-[0_0_25px_rgba(227,30,36,0.8)]"
          style={{ left: `${value}%` }}
          aria-hidden
        >
          <Icon name="swap_horiz" className="text-[20px]" />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          aria-label="PPF karşılaştırma kaydırıcısı"
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          onChange={(event) => setValue(Number(event.currentTarget.value))}
        />
      </div>
      <div className="flex items-center justify-between text-[13px] text-text-secondary">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="error_outline" className="text-[18px] text-brand-red" />
          Sol: korunmasız boya
        </span>
        <span className="inline-flex items-center gap-1.5 text-primary-container">
          Sağ: 195µm optik derinlik
          <Icon name="verified" className="text-[18px]" />
        </span>
      </div>
    </div>
  );
}
