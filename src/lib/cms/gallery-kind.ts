import type { CmsGalleryKind } from "@/lib/cms/types";

export type { CmsGalleryKind };

export const CMS_GALLERY_KINDS = ["vehicle", "detail", "video", "atelier"] as const satisfies readonly CmsGalleryKind[];

export const cmsGalleryKindLabels: Record<CmsGalleryKind, string> = {
  vehicle: "Referans araç",
  detail: "Mikron detay",
  video: "Video",
  atelier: "Atölye karesi",
};

export function isCmsGalleryKind(value: string): value is CmsGalleryKind {
  return (CMS_GALLERY_KINDS as readonly string[]).includes(value);
}

export function parseCmsGalleryKind(value: string | undefined): CmsGalleryKind {
  return value && isCmsGalleryKind(value) ? value : "vehicle";
}
