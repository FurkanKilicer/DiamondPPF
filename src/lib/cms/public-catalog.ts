import { cmsMediaSrc } from "@/lib/cms/media-path";
import { serviceCategoryTab, SERVICE_LIST_TABS } from "@/lib/cms/service-list";
import type { CmsServiceItem } from "@/lib/cms/types";
import {
  serviceCategories,
  serviceItems,
  type ServiceBadgeTone,
  type ServiceCardLayout,
  type ServiceCategoryId,
} from "@/lib/mock-data/services";

export type PublicServiceCategoryId = ServiceCategoryId | "diger";

export type PublicServiceCard = {
  id: string;
  htmlId: string;
  category: PublicServiceCategoryId;
  title: string;
  body: string;
  imagePath: string | null;
  layout: ServiceCardLayout;
  badge: string;
  badgeTone: ServiceBadgeTone;
  icon: string;
  meta: string;
  cta: string;
  stats?: readonly { value: string; label: string }[];
  specLeft?: string;
  specRight?: string;
};

export type PublicServiceNavItem = {
  id: PublicServiceCategoryId;
  label: string;
};

export type PublicCategoryMeta = {
  id: PublicServiceCategoryId;
  n: string;
  title: string;
  kicker: string;
  count: string;
  body: string;
  grid: string;
  tone: "canvas" | "light";
};

const mockByTitle = new Map(serviceItems.map((item) => [item.title, item]));

const NAV_LABEL: Record<PublicServiceCategoryId, string> = {
  koruma: "Koruma",
  konfor: "Konfor & Donanım",
  guvenlik: "Güvenlik & Kamera",
  onarim: "Onarım & Yenileme",
  diger: "Diğer",
};

const CATEGORY_ORDER: PublicServiceCategoryId[] = ["koruma", "konfor", "guvenlik", "onarim", "diger"];

export function toPublicServiceCard(item: CmsServiceItem): PublicServiceCard {
  const mock = mockByTitle.get(item.title);
  return {
    id: item.id,
    htmlId: mock?.id ?? item.id,
    category: serviceCategoryTab(item.title),
    title: item.title,
    body: item.description,
    imagePath: item.imagePath ? cmsMediaSrc(item.imagePath) : mock?.src ?? null,
    layout: mock?.layout ?? "compact",
    badge: mock?.badge ?? "Hizmet",
    badgeTone: mock?.badgeTone ?? "muted",
    icon: mock?.icon ?? "layers",
    meta: mock?.meta ?? "",
    cta: mock?.cta ?? "Detay & teklif al",
    stats: mock?.stats,
    specLeft: mock?.specLeft,
    specRight: mock?.specRight,
  };
}

export function publicServiceNavItems(cards: PublicServiceCard[]): PublicServiceNavItem[] {
  const counts = new Map<PublicServiceCategoryId, number>();
  for (const card of cards) {
    counts.set(card.category, (counts.get(card.category) ?? 0) + 1);
  }
  return CATEGORY_ORDER.filter((id) => (counts.get(id) ?? 0) > 0).map((id) => ({
    id,
    label: `${NAV_LABEL[id]} (${counts.get(id) ?? 0})`,
  }));
}

export function cardsInCategory(cards: PublicServiceCard[], id: PublicServiceCategoryId): PublicServiceCard[] {
  return cards.filter((card) => card.category === id);
}

export function publicCategoryMeta(id: PublicServiceCategoryId, count: number): PublicCategoryMeta | null {
  if (count < 1) return null;
  if (id === "diger") {
    return {
      id,
      n: "05",
      title: "Diğer hizmetler",
      kicker: "Ek uygulamalar",
      count: `${count} hizmet`,
      body: "Katalog gruplarına henüz bağlanmamış yayınlanan hizmetler.",
      grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      tone: "canvas",
    };
  }
  const category = serviceCategories.find((entry) => entry.id === id);
  if (!category) return null;
  return {
    id: category.id,
    n: category.n,
    title: category.title,
    kicker: category.kicker,
    count: `${count} hizmet`,
    body: category.body,
    grid: category.grid,
    tone: category.tone,
  };
}

export function publicCategoryOrder(): PublicServiceCategoryId[] {
  return CATEGORY_ORDER.filter((id) => SERVICE_LIST_TABS.some((tab) => tab.id === id));
}
