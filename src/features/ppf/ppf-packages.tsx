"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { PpfWrapDiagram } from "@/features/ppf/ppf-wrap-diagram";
import {
  ppfPackages,
  ppfWhatsAppHref,
  ppfWrapParts,
  type PpfPackageId,
  type PpfWrapPartId,
} from "@/lib/mock-data/ppf";
import { cn } from "@/lib/utils/cn";

function sameParts(a: readonly PpfWrapPartId[], b: ReadonlySet<PpfWrapPartId>) {
  if (a.length !== b.size) return false;
  return a.every((id) => b.has(id));
}

export function PpfPackages() {
  const [pkg, setPkg] = useState<PpfPackageId>("front");
  const [selected, setSelected] = useState<Set<PpfWrapPartId>>(
    () => new Set(ppfPackages.find((item) => item.id === "front")?.parts ?? []),
  );

  const current = ppfPackages.find((item) => item.id === pkg) ?? ppfPackages[0]!;
  const selectedParts = useMemo(
    () => ppfWrapParts.filter((part) => selected.has(part.id)),
    [selected],
  );

  function selectPackage(id: PpfPackageId) {
    const next = ppfPackages.find((item) => item.id === id);
    if (!next) return;
    setPkg(id);
    setSelected(new Set(next.parts));
  }

  function togglePart(id: PpfWrapPartId) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
    const match = ppfPackages.find((item) => item.id !== "custom" && sameParts(item.parts, next));
    setPkg(match?.id ?? "custom");
  }

  return (
    <PageSection id="kaplama-haritasi" tone="light">
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <Reveal variant="left" className="space-y-3">
          <SectionKicker icon="layers">Kaplama haritası</SectionKicker>
          <h2 className="headline-lg font-bold tracking-tight text-slate-900">Hangi alanlar kaplanır?</h2>
        </Reveal>
        <p className="max-w-lg text-[15px] text-slate-600">
          Bir paket seçin ya da krokide panellere dokunun. Seçiminizle size özel fiyat çıkaralım.
        </p>
      </div>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <Reveal variant="left" className="lg:col-span-6">
          <div className="card-light rounded-2xl p-4 sm:p-8">
            <PpfWrapDiagram selected={selected} onToggle={togglePart} />
            <div className="mt-4 flex items-center justify-center gap-5 text-[12px] text-slate-500">
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-gradient-to-br from-[#FF4B89] via-brand-red to-[#8F0019]" />
                Kaplanacak
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm border border-slate-300 bg-slate-100" />
                Kaplanmayacak
              </span>
            </div>
          </div>
        </Reveal>
        <Reveal variant="right" className="lg:col-span-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="PPF paketleri">
              {ppfPackages.map((item) => {
                const on = pkg === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    className={cn(
                      "label-caps rounded-lg px-4 py-2.5 tracking-wider transition-colors",
                      on
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900",
                    )}
                    onClick={() => selectPackage(item.id)}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold text-slate-900">{current.title}</h3>
              <p className="max-w-md text-[15px] leading-relaxed text-slate-600">{current.body}</p>
              <p className="pt-1 font-mono text-[12px] text-slate-400">{selectedParts.length} parça seçili</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedParts.length === 0 ? (
                <span className="text-[13px] text-slate-400">Krokide bir panel seçin.</span>
              ) : (
                selectedParts.map((part) => (
                  <button
                    key={part.id}
                    type="button"
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-700 transition-colors hover:border-brand-red/50 hover:text-brand-red"
                    onClick={() => togglePart(part.id)}
                  >
                    {part.label}
                  </button>
                ))
              )}
            </div>
            <a
              href={ppfWhatsAppHref(
                current.title,
                selectedParts.map((part) => part.label),
              )}
              target="_blank"
              rel="noreferrer"
              className="cta-red label-caps inline-flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-lg tracking-wider sm:w-auto sm:px-8"
            >
              <Icon name="chat" className="text-[18px]" />
              Bu seçimle fiyat al
            </a>
            <p className="max-w-md text-[12px] leading-relaxed text-slate-500">
              Krokide görünmeyen far, ayna ve kapı kolu çukurları seçtiğiniz pakete göre eklenir. Kesin kapsamı aracınıza
              göre teklifte birlikte belirleriz.
            </p>
          </div>
        </Reveal>
      </div>
    </PageSection>
  );
}
