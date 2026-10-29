import assert from "node:assert/strict";
import { test } from "node:test";
import {
  completeQuoteSubmission,
  quoteHomeContactInput,
  quoteSubmitUserMessage,
  shouldAcceptQuoteSubmit,
} from "@/lib/forms/quote-submit";
import { quoteServices } from "@/lib/mock-data/content";

test("pending iken tekrar gönderim kabul edilmez", () => {
  assert.equal(shouldAcceptQuoteSubmit("pending"), false);
  assert.equal(shouldAcceptQuoteSubmit("idle"), true);
});

test("form boş model ve not üretmez", () => {
  const data = new FormData();
  data.set("name", "Ali Veli");
  data.set("phone", "0532 601 45 77");
  data.set("brand", "BMW");
  data.set("service", quoteServices[0]);
  data.set("model", "  ");
  data.set("notes", "");
  const input = quoteHomeContactInput("home", data);
  assert.equal("model" in input && input.model !== undefined, false);
  assert.equal(input.notes, undefined);
});

test("API başarılı olunca WhatsApp sekmesi doldurulur", async () => {
  const tab = { closed: false, location: { replace(url: string) { this.href = url; }, href: "" } };
  let assigned: string | undefined;
  const result = await completeQuoteSubmission({
    input: {
      source: "home",
      name: "Ali Veli",
      phone: "0532 601 45 77",
      brand: "BMW",
      service: quoteServices[0],
    },
    whatsappHref: "https://api.whatsapp.com/send?phone=1&text=ok",
    target: {
      open: () => tab as unknown as Window,
      location: { assign: (url: string) => { assigned = url; } },
    },
    submit: async () => ({ ok: true, data: { id: "q1", createdAt: "t" } }),
  });
  assert.equal(result.ok, true);
  assert.equal(tab.location.href, "https://api.whatsapp.com/send?phone=1&text=ok");
  assert.equal(assigned, undefined);
  assert.match(quoteSubmitUserMessage(result), /kaydedildi/);
});

test("API başarısız olsa da WhatsApp taslağı açılır", async () => {
  const tab = {
    closed: false,
    closedByTest: false,
    close() { this.closedByTest = true; this.closed = true; },
    location: { replace(url: string) { this.href = url; }, href: "" },
  };
  let assigned: string | undefined;
  const result = await completeQuoteSubmission({
    input: { source: "services", vehicle: "Tesla Model Y", services: [] },
    whatsappHref: "https://api.whatsapp.com/send?phone=1&text=fail",
    target: {
      open: () => tab as unknown as Window,
      location: { assign: (url: string) => { assigned = url; } },
    },
    submit: async () => ({
      ok: false,
      status: 503,
      error: { code: "NOT_CONFIGURED", message: "Teklif kaydı şu anda kullanılamıyor." },
    }),
  });
  assert.equal(result.ok, false);
  assert.equal(tab.closedByTest, false);
  assert.equal(tab.location.href, "https://api.whatsapp.com/send?phone=1&text=fail");
  assert.equal(assigned, undefined);
  assert.equal(quoteSubmitUserMessage(result).includes("kaydedildi"), false);
  assert.match(quoteSubmitUserMessage(result), /WhatsApp taslağı açıldı/);
});
