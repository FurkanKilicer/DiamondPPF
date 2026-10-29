import assert from "node:assert/strict";
import { test } from "node:test";
import { isAllowedQuoteOrigin } from "@/lib/http/origin";

function requestWith(headers: Record<string, string>, url = "http://localhost:3000/api/quotes") {
  return new Request(url, { method: "POST", headers });
}

test("aynı origin kabul edilir", () => {
  const allowed = isAllowedQuoteOrigin(requestWith({ origin: "http://localhost:3000" }), {
    NODE_ENV: "development",
    NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  });
  assert.equal(allowed, true);
});

test("beklenmeyen Origin reddedilir", () => {
  const allowed = isAllowedQuoteOrigin(requestWith({ origin: "https://evil.example" }), {
    NODE_ENV: "production",
    NEXT_PUBLIC_SITE_URL: "https://diamondppf.example",
  });
  assert.equal(allowed, false);
});

test("üretimde Origin yoksa reddedilir", () => {
  const allowed = isAllowedQuoteOrigin(requestWith({}), {
    NODE_ENV: "production",
    NEXT_PUBLIC_SITE_URL: "https://diamondppf.example",
  });
  assert.equal(allowed, false);
});

test("geliştirmede Origin yoksa kabul edilir", () => {
  const allowed = isAllowedQuoteOrigin(requestWith({}), {
    NODE_ENV: "development",
    NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  });
  assert.equal(allowed, true);
});
