import * as z from "zod";
import { carBrands, quoteServices } from "@/lib/mock-data/content";
import { serviceQuoteOptions } from "@/lib/mock-data/services";
import type { QuoteRequestRecord } from "@/types/quote";

const allowedBrands = new Set<string>(carBrands);
const allowedServices = new Set<string>([
  ...quoteServices,
  ...serviceQuoteOptions.map((item) => item.value),
]);

const NAME_MAX = 80;
const PHONE_MAX = 20;
const BRAND_MAX = 48;
const MODEL_MAX = 80;
const VEHICLE_MAX = 120;
const YEAR_MAX = 40;
const SERVICE_MAX = 120;
const SERVICES_MAX = 12;
const NOTES_MAX = 2000;

function blankToUndefined(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeTrPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("90")) digits = digits.slice(2);
  if (digits.startsWith("5") && digits.length === 10) digits = `0${digits}`;
  return digits;
}

const optionalText = (max: number) =>
  z
    .string()
    .max(max)
    .optional()
    .transform((value) => blankToUndefined(value));

export const quoteSourceSchema = z.enum(["home", "services", "contact"]);

const quoteInputObject = z
  .strictObject({
    source: quoteSourceSchema,
    name: optionalText(NAME_MAX),
    phone: optionalText(PHONE_MAX),
    brand: optionalText(BRAND_MAX),
    model: optionalText(MODEL_MAX),
    vehicle: optionalText(VEHICLE_MAX),
    year: optionalText(YEAR_MAX),
    service: optionalText(SERVICE_MAX),
    services: z.array(z.string().trim().min(1).max(SERVICE_MAX)).max(SERVICES_MAX).optional(),
    notes: optionalText(NOTES_MAX),
  })
  .superRefine((value, ctx) => {
    if (value.source === "home" || value.source === "contact") {
      if (!value.name) {
        ctx.addIssue({ code: "custom", message: "Ad soyad gerekli.", path: ["name"] });
      } else if (/\d/.test(value.name)) {
        ctx.addIssue({ code: "custom", message: "Ad soyad rakam içeremez.", path: ["name"] });
      }
      if (!value.phone) {
        ctx.addIssue({ code: "custom", message: "Telefon gerekli.", path: ["phone"] });
      }
      if (!value.brand) {
        ctx.addIssue({ code: "custom", message: "Araç markası gerekli.", path: ["brand"] });
      }
      if (!value.service) {
        ctx.addIssue({ code: "custom", message: "Hizmet seçimi gerekli.", path: ["service"] });
      }
    }

    if (value.source === "services") {
      if (!value.vehicle) {
        ctx.addIssue({ code: "custom", message: "Marka ve model gerekli.", path: ["vehicle"] });
      }
    }

    if (value.phone) {
      const digits = normalizeTrPhone(value.phone);
      if (!/^05\d{9}$/.test(digits)) {
        ctx.addIssue({ code: "custom", message: "Telefon 05XX XXX XX XX formatında olmalı.", path: ["phone"] });
      }
    }

    if (value.brand && !allowedBrands.has(value.brand)) {
      ctx.addIssue({ code: "custom", message: "Geçersiz araç markası.", path: ["brand"] });
    }

    if (value.service && !allowedServices.has(value.service)) {
      ctx.addIssue({ code: "custom", message: "Geçersiz hizmet seçimi.", path: ["service"] });
    }

    if (value.services) {
      value.services.forEach((item, index) => {
        if (!allowedServices.has(item)) {
          ctx.addIssue({ code: "custom", message: "Geçersiz hizmet seçimi.", path: ["services", index] });
        }
      });
    }
  });

export const quoteRequestSchema = quoteInputObject.transform((value): QuoteRequestRecord => {
  const fromSingle = value.service ? [value.service] : [];
  const listed = value.services ?? [];
  const services = [...new Set([...fromSingle, ...listed])];

  return {
    source: value.source,
    name: value.name,
    phone: value.phone ? normalizeTrPhone(value.phone) : undefined,
    brand: value.brand,
    model: value.model,
    vehicle: value.vehicle,
    year: value.year,
    services,
    notes: value.notes,
    status: "new",
  };
});

export type QuoteRequestParsed = z.infer<typeof quoteRequestSchema>;

export function formatQuoteValidationError(error: z.ZodError) {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".") || "body";
    if (!fields[key]) fields[key] = issue.message;
  }
  return fields;
}
