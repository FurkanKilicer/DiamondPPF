export type CmsListError = {
  ok: false;
  message: string;
  code?: string;
};

export type CmsListOk<T> = {
  ok: true;
  items: T[];
};

export type CmsCountPair = {
  total: number;
  published: number;
};

export type CmsSummary =
  | {
      ok: true;
      services: CmsCountPair;
      gallery: CmsCountPair;
      faqs: CmsCountPair;
      pages: CmsCountPair;
    }
  | CmsListError;

export type CmsServiceRow = {
  id: string;
  title: string;
  description: string;
  image_path: string | null;
  published: boolean;
  sort_order: number;
  updated_at: string;
};

export type CmsServiceItem = {
  id: string;
  title: string;
  description: string;
  imagePath: string | null;
  published: boolean;
  sortOrder: number;
  updatedAt: string;
};

export type CmsGalleryKind = "vehicle" | "detail" | "video" | "atelier";

export type CmsGalleryItem = {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  kind: CmsGalleryKind;
  published: boolean;
  sortOrder: number;
  updatedAt: string;
};

export type CmsFaqItem = {
  id: string;
  collection: string;
  question: string;
  answer: string;
  published: boolean;
  sortOrder: number;
  updatedAt: string;
};

export type CmsPageItem = {
  slug: string;
  title: string;
  published: boolean;
  updatedAt: string;
};

export type CmsPublicSettings = {
  whatsappDigits: string;
  phoneDisplay: string;
  phoneE164: string;
  address: string;
  addressShort: string;
  hoursLine: string;
  hoursNote: string;
  mapsHref: string;
  youtubeUrl: string;
  instagramUrl: string;
  updatedAt: string;
};

export const cmsPageLabels: Record<string, string> = {
  home: "Ana sayfa",
  about: "Biz kimiz",
  ppf: "PPF nedir",
  services: "Hizmetler",
  contact: "İletişim",
};

export const cmsFaqCollectionLabels: Record<string, string> = {
  contact: "İletişim",
  ppf: "PPF nedir",
};
