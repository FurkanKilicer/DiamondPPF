import assert from "node:assert/strict";
import { test } from "node:test";
import { isCmsGalleryId, parseCmsGalleryForm } from "@/lib/cms/gallery-input";

function form(entries: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(entries)) data.set(key, value);
  return data;
}

const valid = {
  title: "BMW i8 Coupé",
  description: "PPF uygulama",
  imagePath: "/images/stitch-11.jpg",
  kind: "vehicle",
  sortOrder: "0",
};

test("boş başlık, açıklama ve görsel reddedilir", () => {
  const result = parseCmsGalleryForm(form({ title: " ", description: "", imagePath: "", sortOrder: "0" }));
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.fieldErrors.title, "Başlık gerekli.");
  assert.equal(result.fieldErrors.description, "Açıklama gerekli.");
  assert.equal(result.fieldErrors.imagePath, "Görsel seçin.");
});

test("açıklama 2000 karakteri aşamaz", () => {
  const result = parseCmsGalleryForm(form({ ...valid, description: "a".repeat(2001) }));
  assert.equal(result.ok, false);
});

test("dosya seçildiyse yol boş kalabilir", () => {
  const data = form({ ...valid, imagePath: "" });
  data.set("imageFile", new File(["x"], "arac.webp", { type: "image/webp" }));
  const result = parseCmsGalleryForm(data);
  assert.equal(result.ok, true);
});

test("geçerli yayınlanan kart parse edilir", () => {
  const result = parseCmsGalleryForm(form({ ...valid, published: "on" }));
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.data.published, true);
  assert.equal(result.data.imagePath, "/images/stitch-11.jpg");
  assert.equal("userId" in result.data, false);
});

test("uuid biçimi doğrulanır", () => {
  assert.equal(isCmsGalleryId("06ac3498-0baa-4f70-903b-d61c5200c58a"), true);
  assert.equal(isCmsGalleryId("nope"), false);
});

test("geçersiz bölüm reddedilir", () => {
  const result = parseCmsGalleryForm(form({ ...valid, kind: "hero" }));
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.fieldErrors.kind, "Bölüm seçin.");
});

test("mikron detay bölümü parse edilir", () => {
  const result = parseCmsGalleryForm(form({ ...valid, kind: "detail", title: "0 mm pay" }));
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.data.kind, "detail");
});
