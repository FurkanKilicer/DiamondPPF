import assert from "node:assert/strict";
import { test } from "node:test";
import { decideAdminAccess } from "@/lib/auth/admin-access";
import type { AdminMembershipResolution } from "@/lib/auth/admin-membership";

const admin: AdminMembershipResolution = {
  isAdmin: true,
  determined: true,
  source: "admin_profiles",
};
const notAdmin: AdminMembershipResolution = {
  isAdmin: false,
  determined: true,
  source: "admin_profiles",
};
const failed: AdminMembershipResolution = {
  isAdmin: false,
  determined: false,
  source: "none",
};

test("JWT ile admin bulunan kullanıcıya erişim verilir", () => {
  assert.equal(decideAdminAccess(admin, null), "ok");
});

test("hatasız boş profil yetkisizliktir", () => {
  assert.equal(decideAdminAccess(notAdmin, admin), "forbidden");
});

test("JWT sorgu hatası yetkisizlik sayılmaz; fallback admin ise ok", () => {
  assert.equal(decideAdminAccess(failed, admin), "ok");
});

test("JWT ve fallback sorgu hatası check_failed döner", () => {
  assert.equal(decideAdminAccess(failed, failed), "check_failed");
  assert.equal(decideAdminAccess(failed, null), "check_failed");
});
