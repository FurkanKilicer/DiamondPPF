import { cmsMediaSrc } from "@/lib/cms/media-path";
import type { CmsGalleryItem } from "@/lib/cms/types";
import {
  galleryDetails,
  galleryFilters,
  galleryStats,
  galleryVehicles,
  galleryVideos,
  type GalleryBrand,
} from "@/lib/mock-data/gallery";

export type PublicGalleryFilter = (typeof galleryFilters)[number] | "Diğer";

export type PublicGalleryCard = {
  id: string;
  title: string;
  brand: GalleryBrand | "Diğer";
  filter: (typeof galleryFilters)[number] | "Diğer";
  kicker: string;
  package: string;
  tags: readonly string[];
  body: string;
  cure: string;
  src: string;
};

export type PublicGalleryDetail = {
  id: string;
  title: string;
  note: string;
  body: string;
  src: string;
};

export type PublicGalleryVideo = {
  id: string;
  title: string;
  meta: string;
  body: string;
  src: string;
};

export type PublicGalleryAtelier = {
  id: string;
  title: string;
  description: string;
  src: string;
};

const mockByTitle = new Map<string, (typeof galleryVehicles)[number]>(galleryVehicles.map((item) => [item.title, item]));
const detailByTitle = new Map<string, (typeof galleryDetails)[number]>(galleryDetails.map((item) => [item.title, item]));
const videoByTitle = new Map<string, (typeof galleryVideos)[number]>(galleryVideos.map((item) => [item.title, item]));

export function toPublicGalleryCard(item: CmsGalleryItem): PublicGalleryCard {
  const mock = mockByTitle.get(item.title);
  return {
    id: item.id,
    title: item.title,
    brand: mock?.brand ?? "Diğer",
    filter: mock?.filter ?? "Diğer",
    kicker: mock?.kicker ?? "Referans",
    package: mock?.package ?? "Diamond PPF",
    tags: mock?.tags ?? ["Arşiv"],
    body: item.description,
    cure: mock?.cure ?? "—",
    src: cmsMediaSrc(item.imagePath),
  };
}

export function publicGalleryFilters(cards: PublicGalleryCard[]): PublicGalleryFilter[] {
  const present = new Set(cards.map((card) => card.filter));
  const known: PublicGalleryFilter[] = galleryFilters.filter((item) => item === "Tümü" || present.has(item));
  if (present.has("Diğer")) known.push("Diğer");
  return known;
}

export function galleryHeroStats(archiveCount: number) {
  return galleryStats.map((stat) =>
    stat.label === "Arşivlenen referans" ? { ...stat, value: `${archiveCount}+` } : stat,
  );
}

export function matchGalleryFilter(
  filter: string,
  card: PublicGalleryCard,
): boolean {
  if (filter === "Tümü") return true;
  if (filter === "Mercedes-AMG") return card.filter === "Mercedes-AMG" || card.brand === "Mercedes";
  return card.filter === filter || card.brand === filter;
}

export function toPublicGalleryDetail(item: CmsGalleryItem): PublicGalleryDetail {
  const mock = detailByTitle.get(item.title);
  return {
    id: item.id,
    title: item.title,
    note: mock?.note ?? "Detay",
    body: item.description,
    src: cmsMediaSrc(item.imagePath),
  };
}

export function toPublicGalleryVideo(item: CmsGalleryItem): PublicGalleryVideo {
  const mock = videoByTitle.get(item.title);
  return {
    id: item.id,
    title: item.title,
    meta: mock?.meta ?? "Kısa kesit",
    body: item.description,
    src: cmsMediaSrc(item.imagePath),
  };
}

export function toPublicGalleryAtelier(item: CmsGalleryItem): PublicGalleryAtelier {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    src: cmsMediaSrc(item.imagePath),
  };
}

export function splitPublishedGallery(items: CmsGalleryItem[]) {
  const vehicles: PublicGalleryCard[] = [];
  const details: PublicGalleryDetail[] = [];
  const videos: PublicGalleryVideo[] = [];
  const atelier: PublicGalleryAtelier[] = [];
  for (const item of items) {
    if (item.kind === "detail") details.push(toPublicGalleryDetail(item));
    else if (item.kind === "video") videos.push(toPublicGalleryVideo(item));
    else if (item.kind === "atelier") atelier.push(toPublicGalleryAtelier(item));
    else vehicles.push(toPublicGalleryCard(item));
  }
  return { vehicles, details, videos, atelier };
}
