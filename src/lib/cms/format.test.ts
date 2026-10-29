import assert from "node:assert/strict";
import { test } from "node:test";
import { formatCmsDate } from "@/lib/cms/format";

test("geçersiz tarih tire döner", () => {
  assert.equal(formatCmsDate("not-a-date"), "—");
});

test("ISO tarih Türkçe biçimlenir", () => {
  const formatted = formatCmsDate("2026-10-29T10:00:00.000Z");
  assert.equal(formatted.includes("2026"), true);
});
