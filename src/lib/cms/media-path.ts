export const CMS_MEDIA_BUCKET = "cms-media";
export const CMS_MEDIA_MAX_BYTES = 5 * 1024 * 1024;
export const CMS_MEDIA_MIME = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

export type CmsMediaMime = keyof typeof CMS_MEDIA_MIME;

function isCmsMediaMime(value: string): value is CmsMediaMime {
  return value in CMS_MEDIA_MIME;
}

export function hasCmsImageFile(formData: FormData): boolean {
  const file = formData.get("imageFile");
  return file instanceof File && file.size > 0;
}

export function isSafeCmsMediaPath(path: string): boolean {
  if (path.length < 1 || path.length > 500) return false;
  if (path.includes("..") || path.startsWith("/") || path.includes("\\")) return false;
  if (!/^(published|draft)\/[a-z0-9][a-z0-9./_-]*\.(jpg|jpeg|png|webp)$/i.test(path)) return false;
  return true;
}

export function cmsMediaSrc(path: string): string {
  const trimmed = path.trim();
  if (trimmed.startsWith("/") || trimmed.startsWith("https://") || trimmed.startsWith("http://")) return trimmed;
  if (!isSafeCmsMediaPath(trimmed)) return trimmed;
  return `/api/cms-media/${trimmed.split("/").map(encodeURIComponent).join("/")}`;
}

export function inspectCmsImageFile(file: File): { ok: true; mime: CmsMediaMime } | { ok: false; error: string } {
  if (file.size < 1) return { ok: false, error: "Görsel dosyası boş." };
  if (file.size > CMS_MEDIA_MAX_BYTES) return { ok: false, error: "Görsel en fazla 5 MB olabilir." };
  if (!isCmsMediaMime(file.type)) return { ok: false, error: "Yalnızca JPEG, PNG veya WebP yükleyin." };
  return { ok: true, mime: file.type };
}
