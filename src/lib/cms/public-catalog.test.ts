import assert from "node:assert/strict";
import { test } from "node:test";
import {
  cardsInCategory,
  publicCategoryMeta,
  publicServiceNavItems,
  toPublicServiceCard,
} from "@/lib/cms/public-catalog";
import type { CmsServiceItem } from "@/lib/cms/types";

function item(partial: Partial<CmsServiceItem> & Pick<CmsServiceItem, "id" | "title">): CmsServiceItem {
  return {
    description: "CMS açıklama",
    imagePath: null,
    published: true,
    sortOrder: 0,
    updatedAt: "2026-10-29T00:00:00.000Z",
    ...partial,
  };
}

test("CMS başlık ve açıklama mock gövdenin önüne geçer", () => {
  const card = toPublicServiceCard(
    item({
      id: "11111111-1111-4111-8111-111111111111",
      title: "PPF kaplama (boya koruma filmi)",
      description: "CMS metni",
      imagePath: "/images/cms.jpg",
    }),
  );
  assert.equal(card.body, "CMS metni");
  assert.equal(card.imagePath, "/images/cms.jpg");
  assert.equal(card.htmlId, "ppf");
  assert.equal(card.layout, "featured");
  assert.equal(card.category, "koruma");
});

test("eşleşmeyen başlık compact ve diger olur", () => {
  const card = toPublicServiceCard(item({ id: "22222222-2222-4222-8222-222222222222", title: "Yeni özel paket" }));
  assert.equal(card.category, "diger");
  assert.equal(card.layout, "compact");
  assert.equal(card.htmlId, card.id);
});

test("nav yalnızca dolu kategorileri sayıyla üretir", () => {
  const cards = [
    toPublicServiceCard(item({ id: "1", title: "PPF kaplama (boya koruma filmi)" })),
    toPublicServiceCard(item({ id: "2", title: "Yeni özel paket" })),
  ];
  const nav = publicServiceNavItems(cards);
  assert.deepEqual(
    nav.map((entry) => entry.id),
    ["koruma", "diger"],
  );
  assert.equal(nav[0].label, "Koruma (1)");
  assert.equal(nav[1].label, "Diğer (1)");
  assert.equal(cardsInCategory(cards, "konfor").length, 0);
  assert.equal(publicCategoryMeta("konfor", 0), null);
  assert.equal(publicCategoryMeta("koruma", 1)?.count, "1 hizmet");
});
