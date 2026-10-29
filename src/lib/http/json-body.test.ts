import assert from "node:assert/strict";
import { test } from "node:test";
import { BodyLimitError, InvalidJsonError, QUOTE_BODY_MAX_BYTES, readJsonObject } from "@/lib/http/json-body";

test("geçerli JSON nesnesi okunur", async () => {
  const request = new Request("http://localhost/api/quotes", {
    method: "POST",
    body: JSON.stringify({ source: "home" }),
  });
  const parsed = await readJsonObject(request);
  assert.equal(parsed.source, "home");
});

test("hatalı JSON InvalidJsonError fırlatır", async () => {
  const request = new Request("http://localhost/api/quotes", { method: "POST", body: "{not-json" });
  await assert.rejects(() => readJsonObject(request), InvalidJsonError);
});

test("aşırı büyük gövde reddedilir", async () => {
  const request = new Request("http://localhost/api/quotes", {
    method: "POST",
    headers: { "content-length": String(QUOTE_BODY_MAX_BYTES + 1) },
    body: "x",
  });
  await assert.rejects(() => readJsonObject(request), BodyLimitError);
});
