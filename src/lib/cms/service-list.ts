import { serviceItems, type ServiceCategoryId } from "@/lib/mock-data/services";
import type { CmsServiceItem } from "@/lib/cms/types";

export const SERVICE_PAGE_SIZES = [10, 20, 50] as const;
export type ServicePageSize = (typeof SERVICE_PAGE_SIZES)[number];

export type ServiceListTab = "all" | ServiceCategoryId | "diger";

export const SERVICE_LIST_TABS: { id: ServiceListTab; label: string }[] = [
  { id: "all", label: "Tümü" },
  { id: "koruma", label: "Koruma" },
  { id: "konfor", label: "Konfor & Donanım" },
  { id: "guvenlik", label: "Güvenlik" },
  { id: "onarim", label: "Onarım & Yenileme" },
  { id: "diger", label: "Diğer" },
];

const titleCategory = new Map(serviceItems.map((item) => [item.title, item.category]));

export function serviceCategoryTab(title: string): Exclude<ServiceListTab, "all"> {
  return titleCategory.get(title) ?? "diger";
}

export function parseServiceListTab(value: string | undefined): ServiceListTab {
  return SERVICE_LIST_TABS.some((tab) => tab.id === value) ? (value as ServiceListTab) : "all";
}

export function parseServicePageSize(value: string | undefined): ServicePageSize {
  const size = Number.parseInt(value ?? "", 10);
  return SERVICE_PAGE_SIZES.includes(size as ServicePageSize) ? (size as ServicePageSize) : 10;
}

export function parseServicePage(value: string | undefined, pageCount: number): number {
  const page = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(page) || page < 1) return 1;
  return Math.min(page, Math.max(1, pageCount));
}

export function filterServicesByTab(items: CmsServiceItem[], tab: ServiceListTab): CmsServiceItem[] {
  if (tab === "all") return items;
  return items.filter((item) => serviceCategoryTab(item.title) === tab);
}

export function paginateItems<T>(items: T[], page: number, pageSize: number): { slice: T[]; pageCount: number; from: number; to: number } {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const start = (safePage - 1) * pageSize;
  const slice = items.slice(start, start + pageSize);
  return {
    slice,
    pageCount,
    from: items.length === 0 ? 0 : start + 1,
    to: start + slice.length,
  };
}

export function moveItem<T>(items: T[], fromIndex: number, toIndex: number): T[] {
  if (fromIndex === toIndex) return items;
  if (fromIndex < 0 || toIndex < 0 || fromIndex >= items.length || toIndex >= items.length) return items;
  const next = [...items];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next;
}

export function applyFilteredOrder<T extends { id: string }>(all: T[], filteredOrdered: T[]): T[] {
  const queue = [...filteredOrdered];
  const inFilter = new Set(filteredOrdered.map((item) => item.id));
  return all.map((item) => {
    if (!inFilter.has(item.id)) return item;
    return queue.shift() ?? item;
  });
}

export function parseReorderIds(ids: unknown): { ok: true; ids: string[] } | { ok: false; error: string } {
  if (!Array.isArray(ids) || ids.length === 0 || ids.length > 200) {
    return { ok: false, error: "Sıra listesi geçersiz." };
  }
  const list = ids.map((id) => String(id));
  if (new Set(list).size !== list.length) {
    return { ok: false, error: "Sıra listesinde tekrarlayan kayıt var." };
  }
  return { ok: true, ids: list };
}
