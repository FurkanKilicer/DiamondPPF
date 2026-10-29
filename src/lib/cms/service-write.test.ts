import assert from "node:assert/strict";
import { test } from "node:test";
import { isCmsServiceId, mapCmsWriteError, parseCmsServiceForm } from "@/lib/cms/service-input";
import {
  CMS_SERVICE_AUTH_ERROR,
  CMS_SERVICE_CONFIG_ERROR,
  CMS_SERVICE_CREATE_MISSING,
  CMS_SERVICE_DELETE_MISSING,
  CMS_SERVICE_UPDATE_MISSING,
  cmsServiceNoticeMessage,
  cmsServiceRedirectPath,
  cmsServiceWriteGate,
  interpretCmsServiceMutation,
} from "@/lib/cms/service-write";

function form(entries: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(entries)) data.set(key, value);
  return data;
}

const valid = { title: "PPF", description: "Kaplama", sortOrder: "1" };

test("yetkisiz yazma kapısı admin olmadan DB'ye geçmez", () => {
  assert.deepEqual(cmsServiceWriteGate({ isAdmin: false, configured: true }), {
    ok: false,
    error: CMS_SERVICE_AUTH_ERROR,
  });
});

test("yapılandırılmamış ortam yazmayı durdurur", () => {
  assert.deepEqual(cmsServiceWriteGate({ isAdmin: true, configured: false }), {
    ok: false,
    error: CMS_SERVICE_CONFIG_ERROR,
  });
});

test("yalnızca admin ve yapılandırılmış ortam yazmaya izin verir", () => {
  assert.deepEqual(cmsServiceWriteGate({ isAdmin: true, configured: true }), { ok: true });
});

test("formdaki userId veya email yetki sayılmaz ve yok sayılır", () => {
  const result = parseCmsServiceForm(
    form({ ...valid, userId: "attacker", email: "a@b.com", isAdmin: "true" }),
  );
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal("userId" in result.data, false);
});

test("geçersiz uuid güncelleme/silme için reddedilir", () => {
  assert.equal(isCmsServiceId(""), false);
  assert.equal(isCmsServiceId("2c7f1b6a-4d3e-4a91-9c0b-1f2a3b4c5d6e "), false);
  assert.equal(isCmsServiceId("00000000-0000-0000-0000-000000000000"), false);
});

test("geçersiz form verisi sunucuda reddedilir", () => {
  const result = parseCmsServiceForm(form({ title: "", description: "x", sortOrder: "abc" }));
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.error, "Formu kontrol edin.");
  assert.ok(result.fieldErrors.title);
  assert.ok(result.fieldErrors.sortOrder);
});

test("published=false yayına alınmaz", () => {
  const result = parseCmsServiceForm(form({ ...valid, published: "false" }));
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.data.published, false);
});

test("postgres integer üst sınırı aşan sıra reddedilir", () => {
  const result = parseCmsServiceForm(form({ ...valid, sortOrder: "2147483648" }));
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.ok(result.fieldErrors.sortOrder);
});

test("Supabase check ihlali anlamlı mesaja çevrilir", () => {
  assert.equal(mapCmsWriteError({ message: "raw", code: "23514" }), "Alan sınırları aşıldı veya sıra numarası geçersiz.");
  assert.equal(mapCmsWriteError({ message: "raw", code: "23505" }), "Bu kayıt zaten var.");
  assert.equal(mapCmsWriteError({ message: "bağlantı koptu" }), "bağlantı koptu");
});

test("boş güncelleme/silme sonucu sahte başarı sayılmaz", () => {
  assert.deepEqual(interpretCmsServiceMutation({ error: null, rowCount: 0 }, CMS_SERVICE_UPDATE_MISSING), {
    ok: false,
    error: CMS_SERVICE_UPDATE_MISSING,
  });
  assert.deepEqual(interpretCmsServiceMutation({ error: null, rowCount: 0 }, CMS_SERVICE_DELETE_MISSING), {
    ok: false,
    error: CMS_SERVICE_DELETE_MISSING,
  });
  assert.deepEqual(interpretCmsServiceMutation({ error: null, rowCount: 0 }, CMS_SERVICE_CREATE_MISSING), {
    ok: false,
    error: CMS_SERVICE_CREATE_MISSING,
  });
});

test("Supabase error sonrası yönlendirme olmaz", () => {
  const outcome = interpretCmsServiceMutation(
    { error: { message: "permission denied", code: "42501" }, rowCount: 0 },
    CMS_SERVICE_UPDATE_MISSING,
  );
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.error, "permission denied");
});

test("etkilenen satır varsa işlem başarılıdır", () => {
  assert.deepEqual(interpretCmsServiceMutation({ error: null, rowCount: 1 }, CMS_SERVICE_CREATE_MISSING), { ok: true });
});

test("yalnızca bilinen notice metinleri gösterilir", () => {
  assert.equal(cmsServiceNoticeMessage("created"), "Hizmet kaydı oluşturuldu.");
  assert.equal(cmsServiceNoticeMessage("updated"), "Hizmet kaydı güncellendi.");
  assert.equal(cmsServiceNoticeMessage("deleted"), "Hizmet kaydı silindi.");
  assert.equal(cmsServiceNoticeMessage("ok"), null);
  assert.equal(cmsServiceNoticeMessage("created'; drop"), null);
  assert.equal(cmsServiceNoticeMessage(undefined), null);
});

test("başarı yolu yalnızca notice query ile listeye döner", () => {
  assert.equal(cmsServiceRedirectPath("created"), "/admin/hizmetler?notice=created");
});
