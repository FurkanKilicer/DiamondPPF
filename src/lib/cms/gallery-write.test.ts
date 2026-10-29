import assert from "node:assert/strict";
import { test } from "node:test";
import { cmsGalleryNoticeMessage, cmsGalleryRedirectPath, interpretCmsGalleryMutation } from "@/lib/cms/gallery-write";
import { CMS_SERVICE_AUTH_ERROR, cmsServiceWriteGate } from "@/lib/cms/service-write";

test("galeri yazma kapısı hizmet kapısıyla aynıdır", () => {
  assert.deepEqual(cmsServiceWriteGate({ isAdmin: false, configured: true }), {
    ok: false,
    error: CMS_SERVICE_AUTH_ERROR,
  });
});

test("galeri bildirim ve yönlendirme", () => {
  assert.equal(cmsGalleryNoticeMessage("created"), "Galeri kaydı oluşturuldu.");
  assert.equal(cmsGalleryRedirectPath("updated"), "/admin/galeri?notice=updated");
  assert.equal(cmsGalleryRedirectPath("created", "atelier"), "/admin/galeri?notice=created&tab=atelier");
  assert.equal(cmsGalleryNoticeMessage("nope"), null);
});

test("satır dönmeyen silme eksik kayıttır", () => {
  const outcome = interpretCmsGalleryMutation({ error: null, rowCount: 0 }, "Galeri kaydı bulunamadı veya silinemedi.");
  assert.equal(outcome.ok, false);
});
