"use client";

import Image from "next/image";
import { createContext, useContext, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { site } from "@/lib/mock-data/content";

const VideoModalContext = createContext<{ open: () => void } | null>(null);

export function useVideoModal() {
  const value = useContext(VideoModalContext);
  if (!value) throw new Error("VideoModalProvider gerekli");
  return value;
}

export function VideoModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <VideoModalContext.Provider value={{ open: () => setOpen(true) }}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-surface-canvas/90 p-4 backdrop-blur-xl">
          <div className="relative flex w-full max-w-4xl flex-col gap-4 rounded-2xl bg-surface-card p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 font-display text-sm tracking-wider uppercase">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-cyan" />
                Diamond PPF Turkey · Atölye Belgeseli
              </p>
              <button
                type="button"
                aria-label="Kapat"
                className="flex h-8 w-8 items-center justify-center rounded bg-surface-elevated"
                onClick={() => setOpen(false)}
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-surface-canvas">
              <Image
                src="/images/stitch-27.jpg"
                alt="Klinik aydınlatmada PPF uygulayan teknisyen"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-surface-canvas/40">
                <div className="text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-container text-on-primary">
                    <Icon name="play_arrow" className="text-[32px]" />
                  </span>
                  <p className="mt-2 font-display font-semibold">4K 60FPS Çekim Yayında</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[13px] text-text-secondary">
              <span>Süre: 3:48 · 20 Yıllık Deneyim</span>
              <a className="text-primary-container hover:underline" href={site.youtube} target="_blank" rel="noreferrer">
                YouTube Kanalında Aç ↗
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </VideoModalContext.Provider>
  );
}

export function VideoTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useVideoModal();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}
