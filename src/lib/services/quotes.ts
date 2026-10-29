import { getSupabaseAdmin } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { QuoteCreateResult, QuoteRequestRecord } from "@/types/quote";

export class QuotesNotConfiguredError extends Error {
  readonly code = "NOT_CONFIGURED" as const;

  constructor() {
    super("not_configured");
    this.name = "QuotesNotConfiguredError";
  }
}

export class QuotesInsertError extends Error {
  readonly code = "INTERNAL_ERROR" as const;

  constructor() {
    super("insert_failed");
    this.name = "QuotesInsertError";
  }
}

function toDbRow(record: QuoteRequestRecord) {
  return {
    source: record.source,
    name: record.name ?? null,
    phone: record.phone ?? null,
    brand: record.brand ?? null,
    model: record.model ?? null,
    vehicle: record.vehicle ?? null,
    year: record.year ?? null,
    services: record.services,
    notes: record.notes ?? null,
    status: "new" as const,
  };
}

export async function insertQuoteRequest(record: QuoteRequestRecord): Promise<QuoteCreateResult> {
  if (!isSupabaseConfigured()) {
    throw new QuotesNotConfiguredError();
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("quote_requests")
    .insert(toDbRow(record))
    .select("id, created_at")
    .maybeSingle();

  if (error || !data?.id || !data.created_at) {
    console.error("[quotes] insert failed", { code: error?.code ?? "empty" });
    throw new QuotesInsertError();
  }

  return { id: String(data.id), createdAt: String(data.created_at) };
}

export async function deleteQuoteRequest(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    throw new QuotesNotConfiguredError();
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("quote_requests").delete().eq("id", id);
  if (error) {
    console.error("[quotes] delete failed", { code: error.code });
    return false;
  }
  return true;
}
