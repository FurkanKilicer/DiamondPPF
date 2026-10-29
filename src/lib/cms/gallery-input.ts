import { isCmsGalleryKind, parseCmsGalleryKind, type CmsGalleryKind } from "@/lib/cms/gallery-kind";
import { hasCmsImageFile } from "@/lib/cms/media-path";
import { isCmsServiceId, mapCmsWriteError } from "@/lib/cms/service-input";
import type { CmsGalleryItem } from "@/lib/cms/types";

export { isCmsServiceId as isCmsGalleryId, mapCmsWriteError };

export type CmsGalleryFormValues = {
  title: string;
  description: string;
  imagePath: string;
  kind: CmsGalleryKind;
  published: boolean;
  sortOrder: string;
};

export type CmsGalleryFormState = {
  error: string | null;
  fieldErrors: Partial<Record<keyof CmsGalleryFormValues, string>>;
  values: CmsGalleryFormValues;
};

export function emptyCmsGalleryValues(kind: CmsGalleryKind = "vehicle"): CmsGalleryFormValues {
  return {
    title: "",
    description: "",
    imagePath: "",
    kind,
    published: true,
    sortOrder: "0",
  };
}

export function initialCmsGalleryFormState(values?: CmsGalleryFormValues): CmsGalleryFormState {
  return {
    error: null,
    fieldErrors: {},
    values: values ?? emptyCmsGalleryValues(),
  };
}

export type CmsGalleryParsed = {
  title: string;
  description: string;
  imagePath: string;
  kind: CmsGalleryKind;
  published: boolean;
  sortOrder: number;
};

export type CmsGalleryParseResult =
  | { ok: true; data: CmsGalleryParsed; values: CmsGalleryFormValues }
  | { ok: false; error: string; fieldErrors: Partial<Record<keyof CmsGalleryFormValues, string>>; values: CmsGalleryFormValues };

export function valuesFromGallery(item: Pick<CmsGalleryItem, "title" | "description" | "imagePath" | "kind" | "published" | "sortOrder">): CmsGalleryFormValues {
  return {
    title: item.title,
    description: item.description,
    imagePath: item.imagePath,
    kind: item.kind,
    published: item.published,
    sortOrder: String(item.sortOrder),
  };
}

function readValues(formData: FormData): CmsGalleryFormValues {
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    imagePath: String(formData.get("imagePath") ?? ""),
    kind: parseCmsGalleryKind(String(formData.get("kind") ?? "")),
    published: formData.get("published") === "on" || formData.get("published") === "true",
    sortOrder: String(formData.get("sortOrder") ?? ""),
  };
}

export function parseCmsGalleryForm(formData: FormData): CmsGalleryParseResult {
  const rawKind = String(formData.get("kind") ?? "").trim();
  const values = readValues(formData);
  const fieldErrors: Partial<Record<keyof CmsGalleryFormValues, string>> = {};
  const title = values.title.trim();
  const description = values.description.trim();
  const imagePath = values.imagePath.trim();
  const sortRaw = values.sortOrder.trim();

  if (!isCmsGalleryKind(rawKind)) fieldErrors.kind = "Bölüm seçin.";

  if (title.length < 1) fieldErrors.title = "Başlık gerekli.";
  else if (title.length > 160) fieldErrors.title = "Başlık en fazla 160 karakter olabilir.";

  if (description.length < 1) fieldErrors.description = "Açıklama gerekli.";
  else if (description.length > 2000) fieldErrors.description = "Açıklama en fazla 2000 karakter olabilir.";

  if (imagePath.length < 1 && !hasCmsImageFile(formData)) fieldErrors.imagePath = "Görsel seçin.";
  else if (imagePath.length > 500) fieldErrors.imagePath = "Görsel yolu en fazla 500 karakter olabilir.";

  if (!/^\d+$/.test(sortRaw)) fieldErrors.sortOrder = "Sıra numarası 0 veya daha büyük bir tam sayı olmalı.";
  const sortOrder = Number.parseInt(sortRaw, 10);
  if (fieldErrors.sortOrder === undefined && (!Number.isFinite(sortOrder) || sortOrder < 0 || sortOrder > 2_147_483_647)) {
    fieldErrors.sortOrder = "Sıra numarası 0 veya daha büyük bir tam sayı olmalı.";
  }

  const valuesNormalized: CmsGalleryFormValues = {
    title,
    description,
    imagePath,
    kind: isCmsGalleryKind(rawKind) ? rawKind : values.kind,
    published: values.published,
    sortOrder: sortRaw,
  };

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, error: "Formu kontrol edin.", fieldErrors, values: valuesNormalized };
  }

  return {
    ok: true,
    data: {
      title,
      description,
      imagePath,
      kind: valuesNormalized.kind,
      published: values.published,
      sortOrder,
    },
    values: valuesNormalized,
  };
}
