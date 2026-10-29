import { mapCmsWriteError } from "@/lib/cms/service-input";

export const CMS_SERVICE_AUTH_ERROR = "Bu işlem için yönetici oturumu gerekli.";
export const CMS_SERVICE_CONFIG_ERROR = "Supabase sunucu ortamı eksik.";
export const CMS_SERVICE_ID_ERROR = "Geçersiz hizmet kimliği.";
export const CMS_SERVICE_CREATE_MISSING = "Hizmet oluşturulamadı.";
export const CMS_SERVICE_UPDATE_MISSING = "Hizmet bulunamadı veya güncellenemedi.";
export const CMS_SERVICE_DELETE_MISSING = "Hizmet bulunamadı veya silinemedi.";

export const CMS_SERVICE_NOTICES = {
  created: "Hizmet kaydı oluşturuldu.",
  updated: "Hizmet kaydı güncellendi.",
  deleted: "Hizmet kaydı silindi.",
} as const;

export type CmsServiceNotice = keyof typeof CMS_SERVICE_NOTICES;

export function cmsServiceWriteGate(input: { isAdmin: boolean; configured: boolean }): { ok: true } | { ok: false; error: string } {
  if (!input.isAdmin) return { ok: false, error: CMS_SERVICE_AUTH_ERROR };
  if (!input.configured) return { ok: false, error: CMS_SERVICE_CONFIG_ERROR };
  return { ok: true };
}

export function interpretCmsServiceMutation(
  result: { error: { message: string; code?: string } | null; rowCount: number },
  missingMessage: string,
): { ok: true } | { ok: false; error: string } {
  if (result.error) return { ok: false, error: mapCmsWriteError(result.error) };
  if (result.rowCount < 1) return { ok: false, error: missingMessage };
  return { ok: true };
}

export function cmsServiceNoticeMessage(notice: string | undefined): string | null {
  if (notice !== "created" && notice !== "updated" && notice !== "deleted") return null;
  return CMS_SERVICE_NOTICES[notice];
}

export function cmsServiceRedirectPath(notice: CmsServiceNotice) {
  return `/admin/hizmetler?notice=${notice}`;
}
