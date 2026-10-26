"use client";

import { useEffect, useRef } from "react";

function formatTr(value: number, decimals: number) {
  return value.toLocaleString("tr-TR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

type CountUpProps = {
  end: number;
  decimals?: number;
  prefix?: string;
  duration?: number;
  delayMs?: number;
  className?: string;
};

export function CountUp({
  end,
  decimals = 0,
  prefix = "",
  duration = 1600,
  delayMs = 0,
  className,
}: CountUpProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const finalLabel = `${prefix}${formatTr(end, decimals)}`;

  useEffect(() => {
    const node = rootRef.current;
    const valueNode = valueRef.current;
    if (!node || !valueNode) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      valueNode.textContent = finalLabel;
      return;
    }

    let started = false;
    let frame = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();

        const startAt = performance.now() + delayMs;

        const tick = (now: number) => {
          if (now < startAt) {
            frame = requestAnimationFrame(tick);
            return;
          }
          const progress = Math.min(1, (now - startAt) / duration);
          const eased = 1 - (1 - progress) ** 3;
          valueNode.textContent = `${prefix}${formatTr(end * eased, decimals)}`;
          if (progress < 1) frame = requestAnimationFrame(tick);
          else valueNode.textContent = finalLabel;
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end, decimals, prefix, duration, delayMs, finalLabel]);

  return (
    <span ref={rootRef} className={className} aria-label={finalLabel}>
      <span ref={valueRef} aria-hidden="true">
        {prefix}
        {formatTr(0, decimals)}
      </span>
    </span>
  );
}
