"use client";

import { useLayoutEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

type WordRevealProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delayMs?: number;
  stepMs?: number;
};

export function WordReveal({
  text,
  className,
  wordClassName,
  delayMs = 0,
  stepMs = 45,
}: WordRevealProps) {
  const [play, setPlay] = useState(false);
  const words = text.trim().split(/\s+/).filter(Boolean);

  useLayoutEffect(() => {
    setPlay(false);
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPlay(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [text]);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={`${text}-${word}-${index}`} className="inline-block whitespace-nowrap">
          <span
            className={play ? "hero-word-enter" : "hero-word-wait"}
            style={{ animationDelay: play ? `${delayMs + index * stepMs}ms` : "0ms" }}
          >
            <span className={wordClassName}>{word}</span>
          </span>
          {index < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}

export function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
