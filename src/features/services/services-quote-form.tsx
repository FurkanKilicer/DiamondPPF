"use client";

import { FormEvent, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import {
  completeQuoteSubmission,
  quoteServicesInput,
  quoteSubmitUserMessage,
  shouldAcceptQuoteSubmit,
  type QuoteFormUiStatus,
} from "@/lib/forms/quote-submit";
import { serviceQuoteOptions } from "@/lib/mock-data/services";
import { buildQuoteWhatsAppMessage, quoteWhatsAppHref, site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

const fieldClass = "form-field";

export function ServicesQuoteForm({ vehicle, onVehicleChange }: { vehicle: string; onVehicleChange: (value: string) => void }) {
  const [status, setStatus] = useState<QuoteFormUiStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const busy = useRef(false);
  const [checked, setChecked] = useState<string[]>(
    serviceQuoteOptions.filter((item) => item.checked).map((item) => item.value),
  );

  function toggle(value: string) {
    setChecked((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || !shouldAcceptQuoteSubmit(status)) return;
    busy.current = true;
    setStatus("pending");
    setFormError(null);
    setSentMessage(null);
    setFieldErrors({});

    const data = new FormData(event.currentTarget);
    const year = String(data.get("year") ?? "");
    const notes = String(data.get("notes") ?? "");
    const servicesText = checked.length > 0 ? checked.join(", ") : "Genel danışmanlık";
    const message = buildQuoteWhatsAppMessage({
      greeting: "Merhaba Diamond PPF Atölyesi, web sitenizden yazıyorum.",
      vehicle: year ? `${vehicle} (${year})` : vehicle,
      service: servicesText,
      notes: notes || undefined,
      closing: "Fiyat ve müsaitlik durumu hakkında bilgi alabilir miyim?",
    });

    try {
      const result = await completeQuoteSubmission({
        input: quoteServicesInput({ vehicle, year, services: checked, notes }),
        whatsappHref: quoteWhatsAppHref(message),
        target: window,
      });
      if (result.ok || result.error.code !== "VALIDATION_ERROR") {
        setStatus("sent");
        setSentMessage(quoteSubmitUserMessage(result));
        return;
      }
      setStatus("error");
      setFieldErrors(result.error.fields ?? {});
      setFormError(quoteSubmitUserMessage(result));
    } finally {
      busy.current = false;
    }
  }

  const pending = status === "pending";

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit} aria-busy={pending}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="label-caps text-text-muted" htmlFor="form-vehicle">
            Marka & model *
          </label>
          <input
            id="form-vehicle"
            name="vehicle"
            required
            value={vehicle}
            maxLength={120}
            onChange={(event) => onVehicleChange(event.target.value)}
            placeholder="Örn: Tesla Model Y / Porsche Taycan"
            className={fieldClass}
          />
          {fieldErrors.vehicle ? <p className="text-[12px] text-brand-red">{fieldErrors.vehicle}</p> : null}
        </div>
        <div className="flex flex-col gap-2">
          <label className="label-caps text-text-muted" htmlFor="form-year">
            Model yılı / paket
          </label>
          <input id="form-year" name="year" maxLength={40} placeholder="Örn: 2024 Long Range" className={fieldClass} />
        </div>
      </div>
      <fieldset className="flex flex-col gap-3">
        <legend className="label-caps float-left w-full pb-1 text-text-muted">
          İlgilendiğiniz uygulamalar (birden fazla seçebilirsiniz)
        </legend>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {serviceQuoteOptions.map((item) => {
            const selected = checked.includes(item.value);
            return (
              <label
                key={item.value}
                className="flex cursor-pointer items-center gap-2.5 rounded-2xl border border-white/10 bg-surface-card p-2.5 text-[12px] transition-colors duration-300 ease-out hover:border-white/20"
              >
                <input
                  type="checkbox"
                  name="services"
                  value={item.value}
                  checked={selected}
                  onChange={() => toggle(item.value)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "relative flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[7px] border transition-[background-color,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] peer-focus-visible:ring-2 peer-focus-visible:ring-primary-container peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-canvas",
                    selected
                      ? "border-brand-red bg-brand-red"
                      : "border-white/25 bg-surface-elevated",
                  )}
                >
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden
                    className={cn(
                      "h-2.5 w-2.5 text-white transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      selected ? "scale-100 opacity-100" : "scale-50 opacity-0",
                    )}
                  >
                    <path
                      d="M3.2 8.4 6.4 11.5 12.8 4.4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-text-primary">{item.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
      <div className="flex flex-col gap-2">
        <label className="label-caps text-text-muted" htmlFor="form-note">
          Özel istek / varsa çizik-hasar notunuz
        </label>
        <textarea
          id="form-note"
          name="notes"
          rows={3}
          maxLength={2000}
          placeholder="Örn: Ön tamponda hafif taş izleri var, mat saten dönüşüm istiyorum..."
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col items-center gap-3 pt-1 sm:flex-row">
        <button
          type="submit"
          disabled={pending}
          className="cta-red label-caps inline-flex h-12 w-full flex-1 items-center justify-center gap-2 rounded-xl px-6 tracking-wider disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Icon name="send" className="text-[20px]" />
          {pending ? "Kaydediliyor…" : "WhatsApp ile hızlı fiyat al"}
        </button>
        <a
          href={site.phoneHref}
          className="label-caps inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-surface-elevated px-5 tracking-wider sm:w-auto"
        >
          <Icon name="phone_in_talk" className="text-[18px]" />
          {site.phoneDisplay}
        </a>
      </div>
      {status === "sent" && sentMessage ? (
        <p className="text-sm text-primary-container" role="status">
          {sentMessage}
        </p>
      ) : null}
      {formError ? (
        <p className="text-sm text-brand-red" role="alert">
          {formError}
        </p>
      ) : null}
    </form>
  );
}
