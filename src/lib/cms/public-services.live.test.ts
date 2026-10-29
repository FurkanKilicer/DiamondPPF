import assert from "node:assert/strict";
import { test } from "node:test";
import { listCmsServices, listPublishedCmsServices } from "@/lib/cms/queries";
import { isPublicSupabaseConfigured, isSupabaseConfigured } from "@/lib/supabase/env";

const publicLive = isPublicSupabaseConfigured();
const adminLive = isSupabaseConfigured();

test("canlı public liste yalnızca published kayıt döner", { skip: !publicLive }, async () => {
  const result = await listPublishedCmsServices();
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.ok(result.items.every((item) => item.published === true));
  for (let index = 1; index < result.items.length; index += 1) {
    assert.ok(result.items[index].sortOrder >= result.items[index - 1].sortOrder);
  }
});

test("canlı admin liste taslakları da içerebilir; public süzmez", { skip: !adminLive || !publicLive }, async () => {
  const [admin, published] = await Promise.all([listCmsServices(), listPublishedCmsServices()]);
  assert.equal(admin.ok, true);
  assert.equal(published.ok, true);
  if (!admin.ok || !published.ok) return;
  assert.ok(published.items.length <= admin.items.length);
  assert.ok(published.items.every((item) => item.published));
});
