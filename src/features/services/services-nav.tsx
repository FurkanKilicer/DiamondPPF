"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { serviceFilters, type ServiceCategoryId } from "@/lib/mock-data/services";
import { cn } from "@/lib/utils/cn";

const categoryIds = serviceFilters.map((item) => item.id);

export function ServicesNav() {
  const rowRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);
  const [active, setActive] = useState<ServiceCategoryId>("koruma");
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const selected = row.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!selected) return;
    setPill({ left: selected.offsetLeft, width: selected.offsetWidth, ready: true });
  }, [active]);

  useEffect(() => {
    let ticking = false;

    function sync() {
      if (lockRef.current) return;
      const line = 128;
      let current: ServiceCategoryId = categoryIds[0];
      for (const id of categoryIds) {
        const node = document.getElementById(id);
        if (!node) continue;
        if (node.getBoundingClientRect().top <= line) current = id;
      }
      setActive((prev) => (prev === current ? prev : current));
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sync();
        ticking = false;
      });
    }

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function go(id: ServiceCategoryId) {
    const target = document.getElementById(id);
    if (!target) return;
    lockRef.current = true;
    setActive(id);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      lockRef.current = false;
    }, 700);
  }

  return (
    <nav aria-label="Hizmet kategorileri" className="sticky top-14 z-40 w-full sm:top-12 md:top-[3.75rem]">
      <div className="page-pad py-2">
        <div className="page-shell">
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-canvas/85 px-2 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-md md:rounded-full md:px-3">
            <div className="relative py-1.5">
              <div ref={rowRef} className="relative flex w-max min-w-full flex-nowrap items-center gap-1" role="tablist">
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute top-0 left-0 z-0 h-full rounded-full border border-primary-container/60 bg-surface-elevated",
                    pill.ready ? "transition-[transform,width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" : "opacity-0",
                  )}
                  style={{ width: pill.width, transform: `translateX(${pill.left}px)` }}
                />
                {serviceFilters.map((item) => {
                  const selected = active === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => go(item.id)}
                      className={cn(
                        "relative z-10 rounded-full border border-transparent px-4 py-2 text-[13px] tracking-wider whitespace-nowrap transition-colors duration-300",
                        selected ? "text-primary" : "text-text-secondary hover:text-text-primary",
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
