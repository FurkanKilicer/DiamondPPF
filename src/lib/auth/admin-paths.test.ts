import assert from "node:assert/strict";
import { test } from "node:test";
import { adminProxyDecision, isAdminLoginPath, isProtectedAdminPath } from "@/lib/auth/admin-paths";

test("giriş yolu korumalı değildir", () => {
  assert.equal(isAdminLoginPath("/admin/login"), true);
  assert.equal(isProtectedAdminPath("/admin/login"), false);
});

test("panel ve alt rotalar korumalıdır", () => {
  assert.equal(isProtectedAdminPath("/admin"), true);
  assert.equal(isProtectedAdminPath("/admin/hizmetler"), true);
  assert.equal(isProtectedAdminPath("/hizmetler"), false);
});

test("oturum yoksa korumalı admin yolu girişe yönlenir", () => {
  assert.equal(adminProxyDecision("/admin", false), "redirect-login");
  assert.equal(adminProxyDecision("/admin/ayarlar", false), "redirect-login");
  assert.equal(adminProxyDecision("/admin/hizmetler/yeni", false), "redirect-login");
  assert.equal(adminProxyDecision("/admin/hizmetler/2c7f1b6a-4d3e-4a91-9c0b-1f2a3b4c5d6e", false), "redirect-login");
});

test("oturum yokken login sayfası açık kalır", () => {
  assert.equal(adminProxyDecision("/admin/login", false), "continue");
});

test("doğrulanmış kullanıcı korumalı yolda devam eder; yetki layout'ta", () => {
  assert.equal(adminProxyDecision("/admin", true), "continue");
});
