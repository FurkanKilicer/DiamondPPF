"use client";

import { FormEvent, useState } from "react";
import { FormName } from "@/components/ui/form-name";
import { FormPhone } from "@/components/ui/form-phone";
import { FormSelect } from "@/components/ui/form-select";
import { Icon } from "@/components/ui/icon";
import { buildQuoteWhatsAppMessage, carBrands, quoteServices, quoteWhatsAppHref } from "@/lib/mock-data/content";

const fieldClass = "form-field";

export function QuoteForm({ heading = "full" }: { heading?: "full" | "compact" | "none" }) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const phone = String(data.get("phone") ?? "");
    const brand = String(data.get("brand") ?? "");
    const model = String(data.get("model") ?? "Belirtilmedi");
    const service = String(data.get("service") ?? "");
    const notes = String(data.get("notes") ?? "Özel not yok");
    const message = buildQuoteWhatsAppMessage({
      name,
      phone,
      vehicle: `${brand} - ${model}`,
      service,
      notes,
    });
    window.open(quoteWhatsAppHref(message), "_blank", "noopener,noreferrer");
    setStatus("sent");
  }

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
      <form className="relative flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="label-caps text-text-secondary" htmlFor="userName">Ad Soyad *</label>
            <FormName id="userName" name="name" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="label-caps text-text-secondary" htmlFor="userPhone">Telefon *</label>
            <FormPhone id="userPhone" name="phone" required />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="label-caps text-text-secondary" htmlFor="carBrand">Araç Markası *</label>
            <FormSelect id="carBrand" name="brand" required placeholder="Marka seçin" options={carBrands} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="label-caps text-text-secondary" htmlFor="carModel">Model & Model Yılı</label>
            <input id="carModel" name="model" placeholder="Örn: 911 GT3 / 2024" className={fieldClass} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="label-caps text-text-secondary" htmlFor="serviceType">İlgilendiğiniz Hizmet *</label>
            <FormSelect id="serviceType" name="service" required placeholder="Hizmet seçin" options={quoteServices} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label-caps text-text-secondary" htmlFor="userNotes">Özel İstek / Mesajınız (İsteğe Bağlı)</label>
          <textarea id="userNotes" name="notes" rows={3} placeholder="Özel talepleriniz veya teslimat tercihiniz..." className={fieldClass} />
        </div>
        <button type="submit" className="cta-red mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-xl font-display text-sm font-bold tracking-wider uppercase">
          <Icon name="chat" className="text-[20px]" />
          WhatsApp’ta özel fiyat teklifi al
        </button>
        <p className="flex items-center justify-center gap-2 pt-1 text-center text-[11px] text-text-muted">
          <Icon name="lock" className="text-[14px] text-emerald-400" />
          Mesajınız WhatsApp’ta formatlanarak açılır; onaylamadan önce düzenleyebilirsiniz.
        </p>
        {status === "sent" ? (
          <p className="text-center text-sm text-primary-container" role="status">
            Taslak hazırlandı. Sunucuya kayıt yazılmaz.
          </p>
        ) : null}
      </form>
    </div>
  );
}
