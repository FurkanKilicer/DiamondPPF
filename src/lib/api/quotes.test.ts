import assert from "node:assert/strict";
import { test } from "node:test";
import { submitQuote } from "@/lib/api/quotes";
import { quoteServices } from "@/lib/mock-data/content";

const input = {
  source: "contact" as const,
  name: "Ali Veli",
  phone: "0532 601 45 77",
  brand: "BMW",
  service: quoteServices[0],
};

test("submitQuote 201 gövdesini başarı olarak okur", async () => {
  const result = await submitQuote(input, async () =>
    new Response(JSON.stringify({ ok: true, data: { id: "q1", createdAt: "t" } }), { status: 201 }),
  );
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.data.id, "q1");
});

test("submitQuote 503 ve 429 durumlarını ayırır", async () => {
  const unavailable = await submitQuote(input, async () =>
    new Response(JSON.stringify({ ok: false, error: { code: "NOT_CONFIGURED", message: "yok" } }), { status: 503 }),
  );
  assert.equal(unavailable.ok, false);
  if (!unavailable.ok) {
    assert.equal(unavailable.status, 503);
    assert.equal(unavailable.error.code, "NOT_CONFIGURED");
  }

  const limited = await submitQuote(input, async () =>
    new Response(JSON.stringify({ ok: false, error: { code: "RATE_LIMITED", message: "yavaş" } }), { status: 429 }),
  );
  assert.equal(limited.ok, false);
  if (!limited.ok) assert.equal(limited.status, 429);
});

test("submitQuote ağ hatasını sahte başarı saymaz", async () => {
  const result = await submitQuote(input, async () => {
    throw new Error("offline");
  });
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.status, 0);
});
