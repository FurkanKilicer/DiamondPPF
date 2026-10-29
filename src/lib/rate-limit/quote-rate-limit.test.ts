import assert from "node:assert/strict";
import { test } from "node:test";
import { enforceQuoteRateLimit, quoteClientIp } from "@/lib/rate-limit/quote-rate-limit";

const request = new Request("http://localhost:3000/api/quotes", {
  method: "POST",
  headers: { origin: "http://localhost:3000", "x-forwarded-for": "203.0.113.9, 10.0.0.1" },
});

test("güvenilmeyen ortamda x-forwarded-for kullanılmaz", () => {
  assert.equal(quoteClientIp(request, { NODE_ENV: "development" }), "unknown");
});

test("Vercel ortamında ilk x-forwarded-for adresi kullanılır", () => {
  assert.equal(quoteClientIp(request, { VERCEL: "1" }), "203.0.113.9");
});

test("RATE_LIMIT_TRUST_PROXY açıkken proxy IP'si okunur", () => {
  assert.equal(quoteClientIp(request, { RATE_LIMIT_TRUST_PROXY: "true" }), "203.0.113.9");
});

test("geliştirmede Upstash yoksa limit atlanır", async () => {
  const gate = await enforceQuoteRateLimit(request, { NODE_ENV: "development" });
  assert.equal(gate.ok, true);
});

test("üretimde Upstash yoksa fail-closed 503", async () => {
  const gate = await enforceQuoteRateLimit(request, { NODE_ENV: "production" });
  assert.equal(gate.ok, false);
  if (!gate.ok) {
    assert.equal(gate.response.status, 503);
    const body = (await gate.response.json()) as { error: { code: string } };
    assert.equal(body.error.code, "NOT_CONFIGURED");
  }
});
