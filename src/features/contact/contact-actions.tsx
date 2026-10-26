"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { FormPhone } from "@/components/ui/form-phone";
import { Icon } from "@/components/ui/icon";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { contactActions } from "@/lib/mock-data/contact";
import { site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

type Modal = "sorgula" | "garanti" | null;

const toneBorder = {
  red: "hover:border-brand-red/50",
  cyan: "hover:border-primary-container/50",
  violet: "hover:border-violet-400/50",
} as const;

const toneIcon = {
  red: "border-brand-red/30 bg-brand-red/10 text-brand-red group-hover:bg-brand-red group-hover:text-white",
  cyan: "border-cyan-500/30 bg-cyan-50 text-cyan-700 group-hover:bg-cyan-500 group-hover:text-white",
  violet: "border-violet-300 bg-violet-50 text-violet-700 group-hover:bg-violet-500 group-hover:text-white",
} as const;

const toneAction = {
  red: "text-brand-red",
  cyan: "text-cyan-700",
  violet: "text-violet-700",
} as const;

const fieldClass = "form-field";

export function ContactActions() {
  const [modal, setModal] = useState<Modal>(null);
  const [queryStatus, setQueryStatus] = useState<"idle" | "empty">("idle");
  const [warrantyStatus, setWarrantyStatus] = useState<"idle" | "empty">("idle");
  const queryTitleId = useId();
  const warrantyTitleId = useId();

  useEffect(() => {
    if (!modal) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setModal(null);
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [modal]);

  function onQuery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQueryStatus("empty");
  }

  function onWarranty(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWarrantyStatus("empty");
  }

  return (
    <PageSection id="islemler" tone="light">
      <Reveal variant="left" className="mb-10 max-w-2xl space-y-3">
        <SectionKicker icon="touch_app">Kullanıcı işlemleri</SectionKicker>
        <h2 className="headline-lg font-bold tracking-tight text-slate-900">Ne yapmak istersiniz?</h2>
        <p className="text-[15px] text-slate-600">
          Servis kaydı, yol tarifi veya garanti önizlemesi. Randevu ve sertifika sorguları bu aşamada sunucuya
          bağlanmaz.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {contactActions.map((item, index) => {
          const className = cn(
            "card-light group flex h-full flex-col justify-between rounded-xl p-6 text-left transition-all",
            toneBorder[item.tone],
          );
          const inner = (
            <>
              <div className="space-y-3">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl border transition-all group-hover:scale-110",
                    toneIcon[item.tone],
                  )}
                >
                  <Icon name={item.icon} className="text-[22px]" />
                </span>
                <h3 className="font-display text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-[13px] leading-relaxed text-slate-600">{item.body}</p>
              </div>
              <span
                className={cn(
                  "label-caps mt-6 flex items-center justify-between border-t border-slate-200 pt-4 tracking-wider",
                  toneAction[item.tone],
                )}
              >
                {item.action}
                <Icon name="arrow_forward" className="text-[16px] transition-transform group-hover:translate-x-1" />
              </span>
            </>
          );
          return (
            <Reveal key={item.id} variant="up" delayMs={index * 60}>
              {"href" in item && item.href ? (
                <a
                  href={item.href}
                  {...(item.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  className={className}
                >
                  {inner}
                </a>
              ) : (
                <button type="button" className={className} onClick={() => setModal(item.id as Modal)}>
                  {inner}
                </button>
              )}
            </Reveal>
          );
        })}
      </div>

      {modal === "sorgula" ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-surface-canvas/90 p-4 backdrop-blur-xl"
          onClick={() => setModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={queryTitleId}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-white/15 bg-surface-card p-6 text-text-primary shadow-2xl sm:p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 id={queryTitleId} className="font-display text-lg font-bold">
                Randevu sorgula
              </h3>
              <button type="button" className="rounded-full p-1 text-text-muted hover:text-text-primary" onClick={() => setModal(null)} aria-label="Kapat">
                <Icon name="close" className="text-[22px]" />
              </button>
            </div>
            <p className="mb-4 text-[13px] text-text-secondary">
              Randevu kaydınızda belirttiğiniz cep telefonunu girin. Bu önizlemede takvim okunmaz.
            </p>
            <form className="flex flex-col gap-3" onSubmit={onQuery}>
              <label className="label-caps text-text-secondary" htmlFor="query-phone">
                Telefon numarası
              </label>
              <FormPhone id="query-phone" name="phone" required />
              <button type="submit" className="cta-red label-caps mt-2 rounded-lg py-3 tracking-wider">
                Sorgula
              </button>
            </form>
            {queryStatus === "empty" ? (
              <p className="mt-4 text-sm text-primary-container" role="status">
                Kayıt bulunamadı. Sunucuya bağlanılmaz; değişiklik için {site.phoneDisplay} veya WhatsApp kullanın.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {modal === "garanti" ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-surface-canvas/90 p-4 backdrop-blur-xl"
          onClick={() => setModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={warrantyTitleId}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-white/15 bg-surface-card p-6 text-text-primary shadow-2xl sm:p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 id={warrantyTitleId} className="font-display text-lg font-bold">
                Garanti sertifikası
              </h3>
              <button type="button" className="rounded-full p-1 text-text-muted hover:text-text-primary" onClick={() => setModal(null)} aria-label="Kapat">
                <Icon name="close" className="text-[22px]" />
              </button>
            </div>
            <p className="mb-4 text-[13px] text-text-secondary">
              Plaka ve kayıtlı telefonun son 4 hanesi. Sertifika bu aşamada doğrulanmaz.
            </p>
            <form className="flex flex-col gap-3" onSubmit={onWarranty}>
              <label className="label-caps text-text-secondary" htmlFor="warranty-plate">
                Araç plakası
              </label>
              <input id="warranty-plate" name="plate" required className={fieldClass} placeholder="34 ABC 123" />
              <label className="label-caps text-text-secondary" htmlFor="warranty-last4">
                Telefon son 4 hane
              </label>
              <input id="warranty-last4" name="last4" inputMode="numeric" maxLength={4} required className={fieldClass} placeholder="••••" />
              <button type="submit" className="cta-red label-caps mt-2 rounded-lg py-3 tracking-wider">
                Sertifikayı görüntüle
              </button>
            </form>
            {warrantyStatus === "empty" ? (
              <p className="mt-4 text-sm text-primary-container" role="status">
                Önizlemede belge çekilmez.{" "}
                <a href={site.guaranteeUrl} className="underline" target="_blank" rel="noreferrer">
                  Resmi garanti sayfası
                </a>
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </PageSection>
  );
}
