import assert from "node:assert/strict";
import { test } from "node:test";
import { handleCreateQuote } from "@/lib/http/create-quote";
import { QuotesInsertError } from "@/lib/services/quotes";
import { quoteServices } from "@/lib/mock-data/content";
import { QUOTE_BODY_MAX_BYTES } from "@/lib/http/json-body";

const validBody = {
  source: "home",
  name: "Ali Veli",
  phone: "0532 601 45 77",
  brand: "BMW",
  service: quoteServices[0],
};

const env = {
  NODE_ENV: "development",
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
} as NodeJS.ProcessEnv;

function post(body: string, headers: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/quotes", {
    method: "POST",
    headers: { origin: "http://localhost:3000", "content-type": "application/json", ...headers },
    body,
  });
}

async function read(response: Response) {
  return { status: response.status, body: (await response.json()) as Record<string, unknown> };
}

test("geçerli body ve başarılı insert 201 döner", async () => {
  const { status, body } = await read(
    await handleCreateQuote(post(JSON.stringify(validBody)), {
      env,
      isConfigured: () => true,
      insertQuote: async () => ({ id: "q1", createdAt: "2026-10-29T00:00:00.000Z" }),
    }),
  );
  assert.equal(status, 201);
  assert.equal(body.ok, true);
  assert.deepEqual(body.data, { id: "q1", createdAt: "2026-10-29T00:00:00.000Z" });
});

test("hatalı JSON 400 döner", async () => {
  const { status, body } = await read(
    await handleCreateQuote(post("{"), { env, isConfigured: () => true, insertQuote: async () => ({ id: "x", createdAt: "t" }) }),
  );
  assert.equal(status, 400);
  assert.equal(body.ok, false);
  assert.equal((body.error as { code: string }).code, "VALIDATION_ERROR");
});

test("geçersiz alanlar 400 döner", async () => {
  const { status, body } = await read(
    await handleCreateQuote(post(JSON.stringify({ ...validBody, phone: "12" })), {
      env,
      isConfigured: () => true,
      insertQuote: async () => ({ id: "x", createdAt: "t" }),
    }),
  );
  assert.equal(status, 400);
  assert.equal((body.error as { code: string }).code, "VALIDATION_ERROR");
});

test("eksik Supabase yapılandırması 503 NOT_CONFIGURED döner", async () => {
  let inserted = false;
  const { status, body } = await read(
    await handleCreateQuote(post(JSON.stringify(validBody)), {
      env,
      isConfigured: () => false,
      insertQuote: async () => {
        inserted = true;
        return { id: "x", createdAt: "t" };
      },
    }),
  );
  assert.equal(status, 503);
  assert.equal((body.error as { code: string }).code, "NOT_CONFIGURED");
  assert.equal(inserted, false);
});

test("veritabanı hatasında sahte 201 dönülmez", async () => {
  const { status, body } = await read(
    await handleCreateQuote(post(JSON.stringify(validBody)), {
      env,
      isConfigured: () => true,
      insertQuote: async () => {
        throw new QuotesInsertError();
      },
    }),
  );
  assert.equal(status, 500);
  assert.notEqual(status, 201);
  assert.equal(body.ok, false);
  assert.equal((body.error as { code: string }).code, "INTERNAL_ERROR");
  assert.equal(JSON.stringify(body).includes("insert_failed"), false);
});

test("beklenmeyen Origin 403 döner", async () => {
  const { status, body } = await read(
    await handleCreateQuote(post(JSON.stringify(validBody), { origin: "https://evil.example" }), {
      env: { NODE_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://diamondppf.example" },
      isConfigured: () => true,
      insertQuote: async () => ({ id: "x", createdAt: "t" }),
    }),
  );
  assert.equal(status, 403);
  assert.equal((body.error as { code: string }).code, "FORBIDDEN");
});

test("yönetim alanları kabul edilmez", async () => {
  const { status } = await read(
    await handleCreateQuote(
      post(JSON.stringify({ ...validBody, status: "closed", id: "abc", created_at: "now" })),
      { env, isConfigured: () => true, insertQuote: async () => ({ id: "x", createdAt: "t" }) },
    ),
  );
  assert.equal(status, 400);
});

test("aşırı büyük istek reddedilir", async () => {
  const { status, body } = await read(
    await handleCreateQuote(
      post("{}", { "content-length": String(QUOTE_BODY_MAX_BYTES + 8) }),
      { env, isConfigured: () => true, insertQuote: async () => ({ id: "x", createdAt: "t" }) },
    ),
  );
  assert.equal(status, 413);
  assert.equal((body.error as { code: string }).code, "PAYLOAD_TOO_LARGE");
});

test("rate limit aşımında 429 ve Retry-After döner", async () => {
  const response = await handleCreateQuote(post(JSON.stringify(validBody)), {
    env,
    isConfigured: () => true,
    insertQuote: async () => ({ id: "x", createdAt: "t" }),
    checkRateLimit: async () => ({
      ok: false,
      response: new Response(JSON.stringify({ ok: false, error: { code: "RATE_LIMITED", message: "çok" } }), {
        status: 429,
        headers: { "Retry-After": "42", "Content-Type": "application/json" },
      }),
    }),
  });
  const { status, body } = await read(response);
  assert.equal(status, 429);
  assert.equal((body.error as { code: string }).code, "RATE_LIMITED");
  assert.equal(response.headers.get("Retry-After"), "42");
});

test("üretimde rate-limit yapılandırması yoksa fail-closed 503", async () => {
  let inserted = false;
  const { status, body } = await read(
    await handleCreateQuote(post(JSON.stringify(validBody)), {
      env: { NODE_ENV: "production", NEXT_PUBLIC_SITE_URL: "http://localhost:3000" },
      isConfigured: () => true,
      insertQuote: async () => {
        inserted = true;
        return { id: "x", createdAt: "t" };
      },
    }),
  );
  assert.equal(status, 503);
  assert.equal((body.error as { code: string }).code, "NOT_CONFIGURED");
  assert.equal(inserted, false);
});

test("rate-limit servisi düşünce sahte 201 yok", async () => {
  let inserted = false;
  const { status, body } = await read(
    await handleCreateQuote(post(JSON.stringify(validBody)), {
      env,
      isConfigured: () => true,
      insertQuote: async () => {
        inserted = true;
        return { id: "x", createdAt: "t" };
      },
      checkRateLimit: async () => ({
        ok: false,
        response: new Response(JSON.stringify({ ok: false, error: { code: "NOT_CONFIGURED", message: "yok" } }), {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }),
      }),
    }),
  );
  assert.equal(status, 503);
  assert.notEqual(status, 201);
  assert.equal(inserted, false);
  assert.equal((body.error as { code: string }).code, "NOT_CONFIGURED");
});
