import assert from "node:assert/strict";
import { test } from "node:test";
import { initialCmsServiceFormState, isCmsServiceId, parseCmsServiceForm } from "@/lib/cms/service-input";

function form(entries: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(entries)) data.set(key, value);
  return data;
}

test("boş başlık ve açıklama reddedilir", () => {
  const result = parseCmsServiceForm(form({ title: "  ", description: "", sortOrder: "0" }));
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.fieldErrors.title, "Başlık gerekli.");
  assert.equal(result.fieldErrors.description, "Açıklama gerekli.");
});

test("uzunluk sınırları reddedilir", () => {
  const result = parseCmsServiceForm(
    form({ title: "a".repeat(161), description: "b".repeat(4001), sortOrder: "1", imagePath: "c".repeat(501) }),
  );
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.match(result.fieldErrors.title ?? "", /160/);
  assert.match(result.fieldErrors.description ?? "", /4000/);
  assert.match(result.fieldErrors.imagePath ?? "", /500/);
});

test("negatif sıra reddedilir", () => {
  const result = parseCmsServiceForm(form({ title: "PPF", description: "Kaplama", sortOrder: "-1" }));
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.ok(result.fieldErrors.sortOrder);
});

test("geçerli taslak kayıt parse edilir", () => {
  const result = parseCmsServiceForm(
    form({ title: " Full body ", description: " Şeffaf film ", sortOrder: "3", imagePath: "draft/a.webp" }),
  );
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.data.title, "Full body");
  assert.equal(result.data.published, false);
  assert.equal(result.data.sortOrder, 3);
  assert.equal(result.data.imagePath, "draft/a.webp");
});

test("yayın kutusu işaretliyse published true olur", () => {
  const result = parseCmsServiceForm(
    form({ title: "PPF", description: "Kaplama", sortOrder: "0", published: "on" }),
  );
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.data.published, true);
  assert.equal(result.data.imagePath, null);
});

test("başlangıç form state fieldErrors içerir", () => {
  const state = initialCmsServiceFormState();
  assert.equal(state.fieldErrors.title, undefined);
  assert.equal(state.values.title, "");
});

test("uuid biçimi doğrulanır", () => {
  assert.equal(isCmsServiceId("not-a-uuid"), false);
  assert.equal(isCmsServiceId("2c7f1b6a-4d3e-4a91-9c0b-1f2a3b4c5d6e"), true);
});
