import assert from "node:assert/strict";
import { test } from "node:test";
import { getPublicSupabaseEnv, isPublicSupabaseConfigured } from "@/lib/supabase/env";

test("publishable env yoksa CMS istemcisi kurulmaz", () => {
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: "",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_example",
  };
  assert.equal(getPublicSupabaseEnv(env), null);
  assert.equal(isPublicSupabaseConfigured(env), false);
});

test("url ve publishable key birlikte yeter", () => {
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_example",
  };
  const parsed = getPublicSupabaseEnv(env);
  assert.ok(parsed);
  assert.equal(parsed.url, "https://example.supabase.co");
});

test("SUPABASE_URL ve anon key yedek adları kabul edilir", () => {
  const parsed = getPublicSupabaseEnv({
    SUPABASE_URL: "https://example.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-example",
  });
  assert.ok(parsed);
  assert.equal(parsed.url, "https://example.supabase.co");
  assert.equal(parsed.publishableKey, "anon-example");
});
