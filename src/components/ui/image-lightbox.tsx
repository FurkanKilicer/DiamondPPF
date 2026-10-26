"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils/cn";

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string;
};

const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const ZOOM_STEP = 0.25;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function ImageLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: readonly LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const open = index !== null && items[index] !== undefined;
  const current = open ? items[index] : null;
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const resetView = useCallback(() => {
    setZoom(1);
    setRotate(0);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetView();
  }, [index, resetView]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const node = rootRef.current;
    function onNativeWheel(event: WheelEvent) {
      event.preventDefault();
      const delta = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      setZoom((value) => {
        const next = clamp(value + delta, ZOOM_MIN, ZOOM_MAX);
        if (next === 1) setPan({ x: 0, y: 0 });
        return next;
      });
    }
    node?.addEventListener("wheel", onNativeWheel, { passive: false });
    return () => {
      document.body.style.overflow = previousOverflow;
      node?.removeEventListener("wheel", onNativeWheel);
    };
  }, [open]);

  const go = useCallback(
    (next: number) => {
      if (items.length === 0) return;
      const wrapped = (next + items.length) % items.length;
      onIndexChange(wrapped);
    },
    [items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open || index === null) return;
    const currentIndex = index;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(currentIndex + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(currentIndex - 1);
      }
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        setZoom((value) => clamp(value + ZOOM_STEP, ZOOM_MIN, ZOOM_MAX));
      }
      if (event.key === "-" || event.key === "_") {
        event.preventDefault();
        setZoom((value) => clamp(value - ZOOM_STEP, ZOOM_MIN, ZOOM_MAX));
      }
      if (event.key === "r" || event.key === "R") {
        event.preventDefault();
        setRotate((value) => value + 90);
        setPan({ x: 0, y: 0 });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, onClose, open]);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (zoom <= 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    setPan({
      x: drag.current.panX + (event.clientX - drag.current.x),
      y: drag.current.panY + (event.clientY - drag.current.y),
    });
  }

  function endDrag() {
    drag.current = null;
  }

  if (!open || !current || index === null) return null;
  const activeIndex = index;

  const tools: { label: string; icon: string; onClick: () => void }[] = [
    {
      label: "Sola döndür",
      icon: "rotate_left",
      onClick: () => {
        setRotate((value) => value - 90);
        setPan({ x: 0, y: 0 });
      },
    },
    {
      label: "Sağa döndür",
      icon: "rotate_right",
      onClick: () => {
        setRotate((value) => value + 90);
        setPan({ x: 0, y: 0 });
      },
    },
    {
      label: "Uzaklaştır",
      icon: "zoom_out",
      onClick: () => {
        setZoom((value) => {
          const next = clamp(value - ZOOM_STEP, ZOOM_MIN, ZOOM_MAX);
          if (next === 1) setPan({ x: 0, y: 0 });
          return next;
        });
      },
    },
    {
      label: "Yakınlaştır",
      icon: "zoom_in",
      onClick: () => setZoom((value) => clamp(value + ZOOM_STEP, ZOOM_MIN, ZOOM_MAX)),
    },
    { label: "Sıfırla", icon: "restart_alt", onClick: resetView },
  ];

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[70] flex flex-col bg-surface-canvas/92 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={current.caption ?? current.alt}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="min-w-0 truncate font-display text-sm text-text-primary">
          {current.caption ?? current.alt}
          <span className="ml-2 text-text-muted">
            {activeIndex + 1} / {items.length}
          </span>
        </p>
        <button
          ref={closeRef}
          type="button"
          aria-label="Kapat"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-card text-text-primary"
          onClick={onClose}
        >
          <Icon name="close" className="text-[22px]" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 py-2">
        {items.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Önceki fotoğraf"
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-surface-card/90 text-text-primary"
              onClick={() => go(activeIndex - 1)}
            >
              <Icon name="chevron_left" className="text-[28px]" />
            </button>
            <button
              type="button"
              aria-label="Sonraki fotoğraf"
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-surface-card/90 text-text-primary"
              onClick={() => go(activeIndex + 1)}
            >
              <Icon name="chevron_right" className="text-[28px]" />
            </button>
          </>
        ) : null}

        <div
          className={cn(
            "relative h-[min(78vh,820px)] w-[min(92vw,1100px)] touch-none",
            zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in",
          )}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onDoubleClick={() => {
            setZoom((value) => (value > 1 ? 1 : 2));
            setPan({ x: 0, y: 0 });
          }}
        >
          <div
            className="relative h-full w-full origin-center will-change-transform motion-reduce:transition-none"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) rotate(${rotate}deg) scale(${zoom})`,
              transition: drag.current ? "none" : "transform 180ms ease-out",
            }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="92vw"
              priority
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 px-4 pb-5">
        {tools.map((tool) => (
          <button
            key={tool.icon}
            type="button"
            aria-label={tool.label}
            title={tool.label}
            className="flex h-11 items-center gap-2 rounded-lg bg-surface-card px-3 text-[13px] text-text-primary"
            onClick={tool.onClick}
          >
            <Icon name={tool.icon} className="text-[20px]" />
            <span className="hidden sm:inline">{tool.label}</span>
          </button>
        ))}
        <span className="label-caps px-2 text-text-muted">{Math.round(zoom * 100)}%</span>
      </div>
    </div>
  );
}
