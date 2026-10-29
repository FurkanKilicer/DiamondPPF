import assert from "node:assert/strict";
import { test } from "node:test";
import { listCmsGallery, listPublishedCmsGallery } from "@/lib/cms/queries";
import { isPublicSupabaseConfigured, isSupabaseConfigured } from "@/lib/supabase/env";

const publicLive = isPublicSupabaseConfigured();
const adminLive = isSupabaseConfigured();

test("canlı public galeri yalnızca published kayıt döner", { skip: !publicLive }, async () => {
  const result = await listPublishedCmsGallery();
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.ok(result.items.every((item) => item.published === true));
  const kinds = new Set(result.items.map((item) => item.kind));
  assert.ok(kinds.has("vehicle"));
  assert.ok(kinds.has("detail"));
  assert.ok(kinds.has("video"));
  assert.ok(kinds.has("atelier"));
  for (const kind of kinds) {
    const group = result.items.filter((item) => item.kind === kind);
    for (let index = 1; index < group.length; index += 1) {
      assert.ok(group[index].sortOrder >= group[index - 1].sortOrder);
    }
  }
});

test("canlı admin galeri taslakları da içerebilir; public süzmez", { skip: !adminLive || !publicLive }, async () => {
  const [admin, published] = await Promise.all([listCmsGallery(), listPublishedCmsGallery()]);
  assert.equal(admin.ok, true);
  assert.equal(published.ok, true);
  if (!admin.ok || !published.ok) return;
  assert.ok(published.items.length <= admin.items.length);
  assert.ok(published.items.every((item) => item.published));
});
