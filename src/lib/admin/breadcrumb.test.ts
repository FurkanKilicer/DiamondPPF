import assert from "node:assert/strict";
import { test } from "node:test";
import { adminBreadcrumbs } from "@/lib/admin/breadcrumb";

test("genel bakış CMS ve sayfa adını gösterir", () => {
  const crumbs = adminBreadcrumbs("/admin");
  assert.deepEqual(
    crumbs.map((item) => item.label),
    ["CMS", "Genel bakış"],
  );
});

test("hizmet listesi hangi sekmede olduğunu gösterir", () => {
  const crumbs = adminBreadcrumbs("/admin/hizmetler");
  assert.deepEqual(
    crumbs.map((item) => item.label),
    ["CMS", "Hizmetler"],
  );
});

test("düzenleme alt yolu eklenir", () => {
  const crumbs = adminBreadcrumbs("/admin/hizmetler/2c7f1b6a-4d3e-4a91-9c0b-1f2a3b4c5d6e");
  assert.equal(crumbs.at(-1)?.label, "Düzenle");
  assert.equal(crumbs[1]?.label, "Hizmetler");
});
