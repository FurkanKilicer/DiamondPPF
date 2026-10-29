import assert from "node:assert/strict";
import { test } from "node:test";
import { cmsMediaSrc, hasCmsImageFile, inspectCmsImageFile, isSafeCmsMediaPath } from "@/lib/cms/media";

test("yalnızca published/draft depolama yolları güvenli", () => {
  assert.equal(isSafeCmsMediaPath("published/gallery/a.webp"), true);
  assert.equal(isSafeCmsMediaPath("draft/services/b.jpg"), true);
  assert.equal(isSafeCmsMediaPath("../published/a.webp"), false);
  assert.equal(isSafeCmsMediaPath("/images/stitch-11.jpg"), false);
  assert.equal(isSafeCmsMediaPath("published/gallery/a.txt"), false);
});

test("yerel ve uzak yollar olduğu gibi kalır; depolama yolu API'ye çevrilir", () => {
  assert.equal(cmsMediaSrc("/images/stitch-11.jpg"), "/images/stitch-11.jpg");
  assert.equal(cmsMediaSrc("published/gallery/a.webp"), "/api/cms-media/published/gallery/a.webp");
});

test("formda dosya varlığı File ile anlaşılır", () => {
  const empty = new FormData();
  assert.equal(hasCmsImageFile(empty), false);
  const data = new FormData();
  data.set("imageFile", new File(["x"], "a.webp", { type: "image/webp" }));
  assert.equal(hasCmsImageFile(data), true);
});

test("mime ve boyut sınırları uygulanır", () => {
  assert.equal(inspectCmsImageFile(new File(["x"], "a.gif", { type: "image/gif" })).ok, false);
  assert.equal(inspectCmsImageFile(new File(["x"], "a.webp", { type: "image/webp" })).ok, true);
});
