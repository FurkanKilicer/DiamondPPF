import assert from "node:assert/strict";
import { test } from "node:test";
import { matchGalleryFilter, publicGalleryFilters, splitPublishedGallery, toPublicGalleryCard } from "@/lib/cms/public-gallery";
import type { CmsGalleryItem } from "@/lib/cms/types";

function item(partial: Partial<CmsGalleryItem> & Pick<CmsGalleryItem, "id" | "title">): CmsGalleryItem {
  return {
    description: "CMS gövde",
    imagePath: "/images/cms.jpg",
    kind: "vehicle",
    published: true,
    sortOrder: 0,
    updatedAt: "2026-10-29T00:00:00.000Z",
    ...partial,
  };
}

test("CMS açıklama ve görsel mock gövdenin önüne geçer", () => {
  const card = toPublicGalleryCard(
    item({
      id: "11111111-1111-4111-8111-111111111111",
      title: "BMW i8 Coupé",
      description: "CMS açıklama",
      imagePath: "/images/cms-i8.jpg",
    }),
  );
  assert.equal(card.body, "CMS açıklama");
  assert.equal(card.src, "/images/cms-i8.jpg");
  assert.equal(card.brand, "BMW");
  assert.equal(card.filter, "BMW");
});

test("eşleşmeyen başlık Diğer olur", () => {
  const card = toPublicGalleryCard(item({ id: "2", title: "Yeni referans" }));
  assert.equal(card.brand, "Diğer");
  assert.equal(card.filter, "Diğer");
  assert.equal(matchGalleryFilter("Tümü", card), true);
  assert.equal(matchGalleryFilter("BMW", card), false);
});

test("filtre listesi yalnızca dolu markaları tutar", () => {
  const cards = [
    toPublicGalleryCard(item({ id: "1", title: "BMW i8 Coupé" })),
    toPublicGalleryCard(item({ id: "2", title: "Yeni referans" })),
  ];
  const filters = publicGalleryFilters(cards);
  assert.deepEqual(filters, ["Tümü", "BMW", "Diğer"]);
});

test("yayın listesi bölümlere ayrılır", () => {
  const split = splitPublishedGallery([
    item({ id: "1", title: "BMW i8 Coupé" }),
    item({ id: "2", title: "0 mm pay", kind: "detail" }),
    item({ id: "3", title: "BMW XM — Şeffaf PPF 195 mikron", kind: "video" }),
    item({ id: "4", title: "Atölye karesi 1", kind: "atelier" }),
  ]);
  assert.equal(split.vehicles.length, 1);
  assert.equal(split.details[0]?.note, "Izgara & rozet");
  assert.equal(split.videos[0]?.meta, "0:13 · Hızlı kesit");
  assert.equal(split.atelier[0]?.src, "/images/cms.jpg");
  assert.equal(split.atelier[0]?.title, "Atölye karesi 1");
  assert.equal(split.atelier[0]?.description, "CMS gövde");
});
