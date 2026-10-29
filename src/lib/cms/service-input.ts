export type CmsServiceFormValues = {
  title: string;
  description: string;
  imagePath: string;
  published: boolean;
  sortOrder: string;
};

export type CmsServiceFormState = {
  error: string | null;
  fieldErrors: Partial<Record<keyof CmsServiceFormValues, string>>;
  values: CmsServiceFormValues;
};

export function initialCmsServiceFormState(values?: CmsServiceFormValues): CmsServiceFormState {
  return {
    error: null,
    fieldErrors: {},
    values: values ?? emptyCmsServiceValues(),
  };
}

export type CmsServiceParsed = {
  title: string;
  description: string;
  imagePath: string | null;
  published: boolean;
  sortOrder: number;
};

export type CmsServiceParseResult =
  | { ok: true; data: CmsServiceParsed; values: CmsServiceFormValues }
  | { ok: false; error: string; fieldErrors: Partial<Record<keyof CmsServiceFormValues, string>>; values: CmsServiceFormValues };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isCmsServiceId(value: string) {
  return UUID_RE.test(value);
}

export function emptyCmsServiceValues(): CmsServiceFormValues {
  return {
    title: "",
    description: "",
    imagePath: "",
    published: true,
    sortOrder: "0",
  };
}

export function valuesFromService(item: {
  title: string;
  description: string;
  imagePath: string | null;
  published: boolean;
  sortOrder: number;
}): CmsServiceFormValues {
  return {
    title: item.title,
    description: item.description,
    imagePath: item.imagePath ?? "",
    published: item.published,
    sortOrder: String(item.sortOrder),
  };
}

function readValues(formData: FormData): CmsServiceFormValues {
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    imagePath: String(formData.get("imagePath") ?? ""),
    published: formData.get("published") === "on" || formData.get("published") === "true",
    sortOrder: String(formData.get("sortOrder") ?? ""),
  };
}

export function parseCmsServiceForm(formData: FormData): CmsServiceParseResult {
  const values = readValues(formData);
  const fieldErrors: Partial<Record<keyof CmsServiceFormValues, string>> = {};
  const title = values.title.trim();
  const description = values.description.trim();
  const imagePath = values.imagePath.trim();
  const sortRaw = values.sortOrder.trim();

  if (title.length < 1) fieldErrors.title = "Başlık gerekli.";
  else if (title.length > 160) fieldErrors.title = "Başlık en fazla 160 karakter olabilir.";

  if (description.length < 1) fieldErrors.description = "Açıklama gerekli.";
  else if (description.length > 4000) fieldErrors.description = "Açıklama en fazla 4000 karakter olabilir.";

  if (imagePath.length > 500) fieldErrors.imagePath = "Görsel yolu en fazla 500 karakter olabilir.";

  if (!/^\d+$/.test(sortRaw)) fieldErrors.sortOrder = "Sıra numarası 0 veya daha büyük bir tam sayı olmalı.";
  const sortOrder = Number.parseInt(sortRaw, 10);
  if (fieldErrors.sortOrder === undefined && (!Number.isFinite(sortOrder) || sortOrder < 0 || sortOrder > 2_147_483_647)) {
    fieldErrors.sortOrder = "Sıra numarası 0 veya daha büyük bir tam sayı olmalı.";
  }

  const valuesNormalized: CmsServiceFormValues = {
    title,
    description,
    imagePath,
    published: values.published,
    sortOrder: sortRaw,
  };

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error: "Formu kontrol edin.",
      fieldErrors,
      values: valuesNormalized,
    };
  }

  return {
    ok: true,
    data: {
      title,
      description,
      imagePath: imagePath.length > 0 ? imagePath : null,
      published: values.published,
      sortOrder,
    },
    values: valuesNormalized,
  };
}

export function mapCmsWriteError(error: { message: string; code?: string }) {
  if (error.code === "23514") return "Alan sınırları aşıldı veya sıra numarası geçersiz.";
  if (error.code === "23505") return "Bu kayıt zaten var.";
  if (error.code === "22P02") return "Geçersiz kayıt kimliği.";
  return error.message;
}
