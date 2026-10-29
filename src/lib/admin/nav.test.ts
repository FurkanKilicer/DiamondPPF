import assert from "node:assert/strict";
import { test } from "node:test";
import { isAdminNavActive } from "@/lib/admin/nav";

test("genel bakış yalnızca tam eşleşmede aktif", () => {
  assert.equal(isAdminNavActive("/admin", "/admin", true), true);
  assert.equal(isAdminNavActive("/admin/hizmetler", "/admin", true), false);
});

test("alt rota kendi menü öğesini aktif eder", () => {
  assert.equal(isAdminNavActive("/admin/hizmetler", "/admin/hizmetler", false), true);
});
