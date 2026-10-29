"use client";

import { FormEvent, useRef, useState } from "react";
import { FormName } from "@/components/ui/form-name";
import { FormPhone } from "@/components/ui/form-phone";
import { FormSelect } from "@/components/ui/form-select";
import { Icon } from "@/components/ui/icon";
import {
  completeQuoteSubmission,
  quoteHomeContactInput,
  quoteSubmitUserMessage,
  shouldAcceptQuoteSubmit,
  type QuoteFormUiStatus,
} from "@/lib/forms/quote-submit";
import { buildQuoteWhatsAppMessage, carBrands, quoteServices, quoteWhatsAppHref } from "@/lib/mock-data/content";
import type { QuoteSource } from "@/types/quote";

const fieldClass = "form-field";

export function QuoteForm({
  heading = "full",
  source,
}: {
  heading?: "full" | "compact" | "none";
  source: Extract<QuoteSource, "home" | "contact">;
}) {
  const [status, setStatus] = useState<QuoteFormUiStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const busy = useRef(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || !shouldAcceptQuoteSubmit(status)) return;
    busy.current = true;
    setStatus("pending");
    setFormError(null);
    setSentMessage(null);
    setFieldErrors({});

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const phone = String(data.get("phone") ?? "");
    const brand = String(data.get("brand") ?? "");
    const model = String(data.get("model") ?? "").trim() || "Belirtilmedi";
    const service = String(data.get("service") ?? "");
    const notes = String(data.get("notes") ?? "").trim() || "Özel not yok";
    const message = buildQuoteWhatsAppMessage({
      name,
      phone,
      vehicle: `${brand} - ${model}`,
      service,
      notes,
    });

    try {
      const result = await completeQuoteSubmission({
        input: quoteHomeContactInput(source, data),
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
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface-card p-6 text-text-primary shadow-2xl sm:p-8">
      <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand-red/10 blur-2xl" />
      {heading === "full" ? (
        <div className="relative mb-6">
          <span className="label-caps mb-1 block tracking-wider text-primary-container">Teklif Al</span>
          <h3 className="font-display text-2xl font-bold">Aracınıza özel fiyat hesaplayın</h3>
          <p className="mt-1 text-[13px] text-text-secondary">
            Bilgilerinizi yazın; teklif mesajınız WhatsApp’ta otomatik açılsın, uzman ekibimiz hemen yanıtlasın.
          </p>
        </div>
      ) : heading === "compact" ? (
        <h3 className="relative mb-6 font-display text-xl font-bold">Teklif formu</h3>
      ) : (
        <h3 className="sr-only">Teklif formu</h3>
      )}
      <form className="relative flex flex-col gap-4" onSubmit={onSubmit} aria-busy={pending}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="label-caps text-text-secondary" htmlFor="userName">Ad Soyad *</label>
            <FormName id="userName" name="name" required />
            {fieldErrors.name ? <p className="text-[12px] text-brand-red">{fieldErrors.name}</p> : null}
          </div>
          <div className="flex flex-col gap-2">
            <label className="label-caps text-text-secondary" htmlFor="userPhone">Telefon *</label>
            <FormPhone id="userPhone" name="phone" required />
            {fieldErrors.phone ? <p className="text-[12px] text-brand-red">{fieldErrors.phone}</p> : null}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="label-caps text-text-secondary" htmlFor="carBrand">Araç Markası *</label>
            <FormSelect id="carBrand" name="brand" required placeholder="Marka seçin" options={carBrands} />
            {fieldErrors.brand ? <p className="text-[12px] text-brand-red">{fieldErrors.brand}</p> : null}
          </div>
          <div className="flex flex-col gap-2">
            <label className="label-caps text-text-secondary" htmlFor="carModel">Model & Model Yılı</label>
            <input id="carModel" name="model" placeholder="Örn: 911 GT3 / 2024" maxLength={80} className={fieldClass} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="label-caps text-text-secondary" htmlFor="serviceType">İlgilendiğiniz Hizmet *</label>
            <FormSelect id="serviceType" name="service" required placeholder="Hizmet seçin" options={quoteServices} />
            {fieldErrors.service ? <p className="text-[12px] text-brand-red">{fieldErrors.service}</p> : null}
        </div>
        <div className="flex flex-col gap-2">
          <label className="label-caps text-text-secondary" htmlFor="userNotes">Özel İstek / Mesajınız (İsteğe Bağlı)</label>
          <textarea id="userNotes" name="notes" rows={3} maxLength={2000} placeholder="Özel talepleriniz veya teslimat tercihiniz..." className={fieldClass} />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="cta-red mt-1 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-center font-display text-[12px] font-bold leading-snug tracking-wide uppercase sm:h-12 sm:px-6 sm:py-0 sm:text-sm sm:tracking-wider disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Icon name="chat" className="shrink-0 text-[20px]" />
          <span className="min-w-0">{pending ? "Kaydediliyor…" : "WhatsApp’ta özel fiyat teklifi al"}</span>
        </button>
        <p className="flex items-center justify-center gap-2 pt-1 text-center text-[11px] text-text-muted">
          <Icon name="lock" className="text-[14px] text-emerald-400" />
          Mesajınız WhatsApp’ta formatlanarak açılır; onaylamadan önce düzenleyebilirsiniz.
        </p>
        {status === "sent" && sentMessage ? (
          <p className="text-center text-sm text-primary-container" role="status">
            {sentMessage}
          </p>
        ) : null}
        {formError ? (
          <p className="text-center text-sm text-brand-red" role="alert">
            {formError}
          </p>
        ) : null}
      </form>
    </div>
  );
}
