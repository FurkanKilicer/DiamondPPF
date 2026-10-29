import assert from "node:assert/strict";
import { test } from "node:test";

function signInGuard(email: string, password: string): "missing" | "invalid" | "ok" {
  const trimmed = email.trim();
  if (!trimmed || !password) return "missing";
  if (trimmed.length > 320 || password.length > 256 || !trimmed.includes("@")) return "invalid";
  return "ok";
}

test("boş e-posta veya parola reddedilir", () => {
  assert.equal(signInGuard("", "secret"), "missing");
  assert.equal(signInGuard("a@b.com", ""), "missing");
});

test("e-posta formatı ve uzunluk sınırları güvenli reddedilir", () => {
  assert.equal(signInGuard("not-an-email", "secret"), "invalid");
  assert.equal(signInGuard("a@b.com", "x".repeat(257)), "invalid");
});

test("geçerli biçim sonraki auth adımına bırakılır", () => {
  assert.equal(signInGuard("furkn.klcr@gmail.com", "not-logged"), "ok");
});
