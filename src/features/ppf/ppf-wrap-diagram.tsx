"use client";

import { useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils/cn";
import { ppfWrapParts, type PpfWrapPartId } from "@/lib/mock-data/ppf";
import { wrapCam, wrapCizgi, wrapParca, wrapViewBox } from "@/features/ppf/ppf-wrap-paths";

const labels = Object.fromEntries(ppfWrapParts.map((part) => [part.id, part.label])) as Record<
  PpfWrapPartId,
  string
>;

export function PpfWrapDiagram({
  selected,
  onToggle,
}: {
  selected: ReadonlySet<PpfWrapPartId>;
  onToggle: (id: PpfWrapPartId) => void;
}) {
  const [hover, setHover] = useState<{ id: PpfWrapPartId; x: number; y: number } | null>(null);

  function setPointer(id: PpfWrapPartId, event: MouseEvent<SVGPathElement>) {
    const svg = event.currentTarget.ownerSVGElement;
    if (!svg) return;
    const box = svg.getBoundingClientRect();
    setHover({
      id,
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
    });
  }

  return (
    <div className="relative">
      <svg
        viewBox={wrapViewBox}
        className="h-auto w-full overflow-visible"
        fillRule="evenodd"
        clipRule="evenodd"
        role="img"
        aria-label="PPF kaplama krokisi"
      >
        <defs>
          <linearGradient id="ppfCoverFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF4B89" />
            <stop offset="45%" stopColor="#E31E24" />
            <stop offset="100%" stopColor="#8F0019" />
          </linearGradient>
        </defs>
        <g className="pointer-events-none" aria-hidden>
          {wrapCam.map((d, index) => (
            <path key={index} d={d} className="fill-slate-200/90" />
          ))}
        </g>
        <g>
          {wrapParca.map((part) => {
            const on = selected.has(part.id);
            const label = labels[part.id];
            return (
              <path
                key={part.id}
                d={part.d}
                data-parca={part.id}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={label}
                className={cn(
                  "cursor-pointer outline-none transition-[filter,fill,opacity] duration-150 ease-out",
                  on ? "stroke-none" : "fill-slate-100 hover:fill-rose-50",
                )}
                fill={on ? "url(#ppfCoverFill)" : undefined}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onToggle(part.id)}
                onMouseEnter={(event) => setPointer(part.id, event)}
                onMouseMove={(event) => setPointer(part.id, event)}
                onMouseLeave={() => setHover(null)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onToggle(part.id);
                  }
                }}
              />
            );
          })}
        </g>
        <g className="pointer-events-none fill-slate-400" aria-hidden>
          {wrapCizgi.map((d, index) => (
            <path key={index} d={d} />
          ))}
        </g>
      </svg>
      {hover ? (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[120%] rounded-md bg-slate-900 px-2.5 py-1 font-display text-[12px] font-semibold whitespace-nowrap text-white shadow-lg"
          style={{ left: `${hover.x}%`, top: `${hover.y}%` }}
        >
          {labels[hover.id]}
        </div>
      ) : null}
    </div>
  );
}
