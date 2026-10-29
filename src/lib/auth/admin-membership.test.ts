import assert from "node:assert/strict";
import { test } from "node:test";
import { loadAdminMembership, resolveAdminMembership, type LookupResult } from "@/lib/auth/admin-membership";

const userId = "11111111-1111-1111-1111-111111111111";
const ok = <T>(data: T): LookupResult<T> => ({ data, error: null });
const fail = <T>(data: T, message = "permission denied"): LookupResult<T> => ({
  data,
  error: { message, code: "42501" },
});

test("private rpc true ise admin", () => {
  const result = resolveAdminMembership({
    userId,
    rpcPrivate: ok(true),
    rpcPublic: fail(null),
    profile: fail(null),
  });
  assert.equal(result.isAdmin, true);
  assert.equal(result.source, "rpc_private");
});

test("private rpc false ise admin değil; sonraki kanala bakılmaz", () => {
  const result = resolveAdminMembership({
    userId,
    rpcPrivate: ok(false),
    rpcPublic: ok(true),
    profile: ok({ user_id: userId }),
  });
  assert.equal(result.isAdmin, false);
  assert.equal(result.source, "rpc_private");
});

test("private rpc hata, public rpc true ise admin", () => {
  const result = resolveAdminMembership({
    userId,
    rpcPrivate: fail(null),
    rpcPublic: ok(true),
    profile: fail(null),
  });
  assert.equal(result.isAdmin, true);
  assert.equal(result.source, "rpc_public");
});

test("yalnızca eşleşen admin_profiles satırı admin yapar", () => {
  const result = resolveAdminMembership({
    userId,
    rpcPrivate: fail(null),
    rpcPublic: fail(null),
    profile: ok({ user_id: userId }),
  });
  assert.equal(result.isAdmin, true);
  assert.equal(result.source, "admin_profiles");
});

test("admin_profiles boş satır admin değildir", () => {
  const result = resolveAdminMembership({
    userId,
    rpcPrivate: fail(null),
    rpcPublic: fail(null),
    profile: ok(null),
  });
  assert.equal(result.isAdmin, false);
  assert.equal(result.determined, true);
});

test("tüm kanallar hatalıysa fail-closed", () => {
  const result = resolveAdminMembership({
    userId,
    rpcPrivate: fail(null),
    rpcPublic: fail(null),
    profile: fail(null),
  });
  assert.equal(result.isAdmin, false);
  assert.equal(result.determined, false);
  assert.equal(result.source, "none");
});

test("farklı user_id satırı admin sayılmaz", () => {
  const result = resolveAdminMembership({
    userId,
    rpcPrivate: fail(null),
    rpcPublic: fail(null),
    profile: ok({ user_id: "00000000-0000-0000-0000-000000000000" }),
  });
  assert.equal(result.isAdmin, false);
});

test("loadAdminMembership gerçek istemci şeklini kullanır", async () => {
  const client = {
    schema: () => ({
      rpc: async () => ({ data: null, error: { message: "schema not exposed", code: "PGRST202" } }),
    }),
    rpc: async () => ({ data: true, error: null }),
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: null, error: { message: "permission denied" } }),
        }),
      }),
    }),
  };

  const result = await loadAdminMembership(client, userId);
  assert.equal(result.isAdmin, true);
  assert.equal(result.source, "rpc_public");
});
