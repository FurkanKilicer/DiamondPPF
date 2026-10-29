import { randomUUID } from "node:crypto";
import {
  CMS_MEDIA_BUCKET,
  CMS_MEDIA_MIME,
  hasCmsImageFile,
  inspectCmsImageFile,
} from "@/lib/cms/media-path";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export {
  CMS_MEDIA_BUCKET,
  CMS_MEDIA_MAX_BYTES,
  CMS_MEDIA_MIME,
  cmsMediaSrc,
  hasCmsImageFile,
  inspectCmsImageFile,
  isSafeCmsMediaPath,
  type CmsMediaMime,
} from "@/lib/cms/media-path";

export async function uploadCmsImageFile(
  file: File,
  options: { prefix: "gallery" | "services"; published: boolean },
): Promise<{ ok: true; path: string } | { ok: false; error: string }> {
  const inspected = inspectCmsImageFile(file);
  if (!inspected.ok) return inspected;

  const folder = options.published ? "published" : "draft";
  const ext = CMS_MEDIA_MIME[inspected.mime];
  const path = `${folder}/${options.prefix}/${randomUUID()}.${ext}`;
  const admin = getSupabaseAdmin();
  const { error } = await admin.storage.from(CMS_MEDIA_BUCKET).upload(path, file, {
    contentType: inspected.mime,
    upsert: false,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true, path };
}

export async function resolveFormImagePath(
  formData: FormData,
  current: string | null,
  options: { prefix: "gallery" | "services"; published: boolean; required: boolean },
): Promise<{ ok: true; path: string | null } | { ok: false; error: string }> {
  if (hasCmsImageFile(formData)) {
    const file = formData.get("imageFile");
    if (!(file instanceof File)) return { ok: false, error: "Görsel okunamadı." };
    const uploaded = await uploadCmsImageFile(file, options);
    if (!uploaded.ok) return uploaded;
    return { ok: true, path: uploaded.path };
  }
  if (current && current.length > 0) return { ok: true, path: current };
  if (options.required) return { ok: false, error: "Görsel seçin." };
  return { ok: true, path: null };
}
