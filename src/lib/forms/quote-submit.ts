import { submitQuote, type SubmitQuoteResult } from "@/lib/api/quotes";
import type { QuoteRequestInput, QuoteSource } from "@/types/quote";

export type QuoteFormUiStatus = "idle" | "pending" | "sent" | "error";

export function shouldAcceptQuoteSubmit(status: QuoteFormUiStatus) {
  return status !== "pending";
}

export function quoteHomeContactInput(
  source: Extract<QuoteSource, "home" | "contact">,
  data: FormData,
): QuoteRequestInput {
  const input: QuoteRequestInput = {
    source,
    name: String(data.get("name") ?? ""),
    phone: String(data.get("phone") ?? ""),
    brand: String(data.get("brand") ?? ""),
    service: String(data.get("service") ?? ""),
  };
  const model = String(data.get("model") ?? "").trim();
  const notes = String(data.get("notes") ?? "").trim();
  if (model) input.model = model;
  if (notes) input.notes = notes;
  return input;
}

export function quoteServicesInput(fields: {
  vehicle: string;
  year: string;
  services: string[];
  notes: string;
}): QuoteRequestInput {
  const input: QuoteRequestInput = {
    source: "services",
    vehicle: fields.vehicle,
    services: fields.services,
  };
  const year = fields.year.trim();
  const notes = fields.notes.trim();
  if (year) input.year = year;
  if (notes) input.notes = notes;
  return input;
}

export function openBlankTab(target: Pick<Window, "open">): Window | null {
  try {
    return target.open("about:blank", "_blank");
  } catch {
    return null;
  }
}

export function fulfillWhatsApp(
  tab: Window | null,
  href: string,
  fallback: (url: string) => void,
) {
  if (tab && !tab.closed) {
    tab.location.replace(href);
    return;
  }
  fallback(href);
}

export function abortOpenedTab(tab: Window | null) {
  try {
    tab?.close();
  } catch {
    /* pop-up kapanmayabilir */
  }
}

export async function completeQuoteSubmission(options: {
  input: QuoteRequestInput;
  whatsappHref: string;
  target: Pick<Window, "open"> & { location: { assign: (url: string) => void } };
  submit?: typeof submitQuote;
}): Promise<SubmitQuoteResult> {
  const tab = openBlankTab(options.target);
  const submit = options.submit ?? submitQuote;
  const result = await submit(options.input);

  fulfillWhatsApp(tab, options.whatsappHref, (url) => {
    options.target.location.assign(url);
  });
  return result;
}

export function quoteSubmitUserMessage(result: SubmitQuoteResult): string {
  if (result.ok) return "Talebiniz kaydedildi. WhatsApp taslağı açıldı.";
  if (result.error.code === "VALIDATION_ERROR") return result.error.message;
  if (result.error.code === "RATE_LIMITED") {
    return "Çok fazla deneme. Lütfen bir süre sonra tekrar deneyin.";
  }
  return "WhatsApp taslağı açıldı. Onaylamadan önce düzenleyebilirsiniz.";
}
