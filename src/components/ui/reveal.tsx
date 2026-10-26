"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type RevealVariant = "up" | "left" | "right" | "fade";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  variant?: RevealVariant;
};

const pending = new Map<Element, () => void>();

let sharedObserver: IntersectionObserver | null = null;

function observer() {
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const done = pending.get(entry.target);
        if (!done) continue;
        pending.delete(entry.target);
        sharedObserver?.unobserve(entry.target);
        done();
      }
    },
    { threshold: 0, rootMargin: "0px 0px -6% 0px" },
  );

  return sharedObserver;
}

export function Reveal({ children, className, delayMs = 0, variant = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    setArmed(true);
    pending.set(node, () => setVisible(true));
    observer().observe(node);

    return () => {
      pending.delete(node);
      sharedObserver?.unobserve(node);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(armed && "reveal-block", armed && `reveal-${variant}`, visible && "is-visible", className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
