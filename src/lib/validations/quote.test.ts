import assert from "node:assert/strict";
import { test } from "node:test";
import { quoteServices } from "@/lib/mock-data/content";
import { quoteRequestSchema } from "@/lib/validations/quote";

const homeBase = {
  source: "home" as const,
  name: "Ali Veli",
  phone: "0532 601 45 77",
  brand: "BMW",
  service: quoteServices[0],
};

test("geçerli home gövdesi telefonu normalize eder ve status new üretir", () => {
  const parsed = quoteRequestSchema.parse(homeBase);
  assert.equal(parsed.phone, "05326014577");
  assert.equal(parsed.status, "new");
  assert.deepEqual(parsed.services, [quoteServices[0]]);
});

test("id / status / created_at kabul edilmez", () => {
  const result = quoteRequestSchema.safeParse({
    ...homeBase,
    id: "00000000-0000-0000-0000-000000000000",
    status: "closed",
    created_at: "2020-01-01T00:00:00.000Z",
  });
  assert.equal(result.success, false);
});

test("geçersiz hizmet reddedilir", () => {
  const result = quoteRequestSchema.safeParse({ ...homeBase, service: "SQL DROP TABLE" });
  assert.equal(result.success, false);
});

test("services kaynağında ad/telefon zorunlu değildir", () => {
  const parsed = quoteRequestSchema.parse({
    source: "services",
    vehicle: "Tesla Model Y",
    services: ["Komple PPF Kaplama"],
  });
  assert.equal(parsed.name, undefined);
  assert.equal(parsed.phone, undefined);
  assert.deepEqual(parsed.services, ["Komple PPF Kaplama"]);
});
