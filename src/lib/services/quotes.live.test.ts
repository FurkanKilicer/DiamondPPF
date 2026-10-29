import assert from "node:assert/strict";
import { test } from "node:test";
import { quoteServices } from "@/lib/mock-data/content";
import { deleteQuoteRequest, insertQuoteRequest } from "@/lib/services/quotes";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const live = isSupabaseConfigured();

test("canlı Supabase insert ve silme", { skip: !live }, async () => {
  const created = await insertQuoteRequest({
    source: "home",
    name: "Asama Dort Probe",
    phone: "05001112233",
    brand: "BMW",
    services: [quoteServices[0]],
    notes: "asama4-live-probe",
    status: "new",
  });

  assert.match(created.id, /^[0-9a-f-]{36}$/i);
  assert.ok(created.createdAt.length > 0);

  const removed = await deleteQuoteRequest(created.id);
  assert.equal(removed, true);
});
