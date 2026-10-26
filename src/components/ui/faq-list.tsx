"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils/cn";

export function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {items.map((item, index) => {
        const expanded = open === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <Reveal key={item.q} variant="up" delayMs={index * 50}>
            <div className="faq-card rounded-xl">
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  className="faq-toggle flex w-full items-center justify-between gap-4 p-5 text-left"
                  onClick={() => setOpen(expanded ? null : index)}
                >
                  <span className="pr-2 font-display font-bold">{item.q}</span>
                  <span className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-brand-red">
                    <Icon
                      name="expand_more"
                      className={cn(
                        "text-[20px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                        expanded && "rotate-180",
                      )}
                    />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!expanded}
                className={cn(
                  "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                  expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="faq-a px-5 pt-4 pb-5 text-[14px] leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
