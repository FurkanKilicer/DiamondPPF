import type { CmsGalleryKind } from "@/lib/cms/gallery-kind";
import { cmsServiceWriteGate, interpretCmsServiceMutation } from "@/lib/cms/service-write";

export const cmsGalleryWriteGate = cmsServiceWriteGate;
export const interpretCmsGalleryMutation = interpretCmsServiceMutation;

export const CMS_GALLERY_ID_ERROR = "Geçersiz galeri kimliği.";
export const CMS_GALLERY_CREATE_MISSING = "Galeri kaydı oluşturulamadı.";
export const CMS_GALLERY_UPDATE_MISSING = "Galeri kaydı bulunamadı veya güncellenemedi.";
export const CMS_GALLERY_DELETE_MISSING = "Galeri kaydı bulunamadı veya silinemedi.";

export const CMS_GALLERY_NOTICES = {
  created: "Galeri kaydı oluşturuldu.",
  updated: "Galeri kaydı güncellendi.",
  deleted: "Galeri kaydı silindi.",
} as const;

export type CmsGalleryNotice = keyof typeof CMS_GALLERY_NOTICES;

export function cmsGalleryNoticeMessage(notice: string | undefined): string | null {
  if (notice !== "created" && notice !== "updated" && notice !== "deleted") return null;
  return CMS_GALLERY_NOTICES[notice];
}

export function cmsGalleryRedirectPath(notice: CmsGalleryNotice, kind?: CmsGalleryKind) {
  const tab = kind && kind !== "vehicle" ? `&tab=${kind}` : "";
  return `/admin/galeri?notice=${notice}${tab}`;
}
