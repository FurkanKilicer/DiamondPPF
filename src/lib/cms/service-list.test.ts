import assert from "node:assert/strict";
import { test } from "node:test";
import {
  applyFilteredOrder,
  filterServicesByTab,
  moveItem,
  paginateItems,
  parseReorderIds,
  parseServiceListTab,
  parseServicePage,
  parseServicePageSize,
  serviceCategoryTab,
} from "@/lib/cms/service-list";
import type { CmsServiceItem } from "@/lib/cms/types";

function item(id: string, title: string): CmsServiceItem {
  return {
    id,
    title,
    description: "x",
    imagePath: null,
    published: true,
    sortOrder: 0,
    updatedAt: "2026-10-29T00:00:00.000Z",
  };
}

test("bilinen başlık mock kategorisine düşer", () => {
  assert.equal(serviceCategoryTab("PPF kaplama (boya koruma filmi)"), "koruma");
  assert.equal(serviceCategoryTab("Olmayan hizmet"), "diger");
});

test("geçersiz tab all olur", () => {
  assert.equal(parseServiceListTab("koruma"), "koruma");
  assert.equal(parseServiceListTab("nope"), "all");
});

test("sayfa boyutu yalnızca 10/20/50", () => {
  assert.equal(parseServicePageSize("20"), 20);
  assert.equal(parseServicePageSize("7"), 10);
});

test("filtre ve sayfalama dilimi doğru", () => {
  const items = [
    item("1", "PPF kaplama (boya koruma filmi)"),
    item("2", "Akıllı elektrikli yan basamak"),
    item("3", "Olmayan"),
  ];
  const koruma = filterServicesByTab(items, "koruma");
  assert.equal(koruma.length, 1);
  const page = paginateItems(items, 1, 2);
  assert.equal(page.slice.length, 2);
  assert.equal(page.from, 1);
  assert.equal(page.to, 2);
  assert.equal(page.pageCount, 2);
  assert.equal(parseServicePage("9", page.pageCount), 2);
});

test("sürükle-bırak öğeyi taşır", () => {
  assert.deepEqual(moveItem(["a", "b", "c"], 0, 2), ["b", "c", "a"]);
});

test("filtrelenmiş sıra diğer kayıtları bozmaz", () => {
  const all = [item("1", "A"), item("2", "B"), item("3", "C")];
  const next = applyFilteredOrder(all, [all[2], all[0]]);
  assert.deepEqual(next.map((row) => row.id), ["3", "2", "1"]);
});

test("reorder id listesi doğrulanır", () => {
  assert.equal(parseReorderIds([]).ok, false);
  assert.equal(parseReorderIds(["a", "a"]).ok, false);
  assert.equal(parseReorderIds(["a", "b"]).ok, true);
});
