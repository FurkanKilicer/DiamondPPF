"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, useTransition } from "react";
import { Icon } from "@/components/ui/icon";
import { AdminServiceDelete } from "@/features/admin/admin-service-delete";
import { AdminServiceEditDrawer } from "@/features/admin/admin-service-edit-drawer";
import { AdminEmptyState, AdminNotice, AdminStatusBadge } from "@/features/admin/ui";
import { formatCmsDate } from "@/lib/cms/format";
import {
  applyFilteredOrder,
  filterServicesByTab,
  moveItem,
  paginateItems,
  parseServiceListTab,
  parseServicePage,
  parseServicePageSize,
  SERVICE_LIST_TABS,
  SERVICE_PAGE_SIZES,
  serviceCategoryTab,
  type ServiceListTab,
} from "@/lib/cms/service-list";
import { reorderCmsServices } from "@/lib/cms/service-actions";
import { cmsServiceNoticeMessage } from "@/lib/cms/service-write";
import type { CmsServiceItem } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

export function AdminServicesBoard({
  items,
  notice,
  tab: tabParam,
  page: pageParam,
  size: sizeParam,
  editId,
}: {
  items: CmsServiceItem[];
  notice?: string;
  tab?: string;
  page?: string;
  size?: string;
  editId?: string;
}) {
  const router = useRouter();
  const [ordered, setOrdered] = useState(items);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const snapshot = useRef(items);
  const tabRowRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(() => parseServiceListTab(tabParam));
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });
  const flash = cmsServiceNoticeMessage(notice);

  useEffect(() => {
    setOrdered(items);
  }, [items]);

  useEffect(() => {
    setTab(parseServiceListTab(tabParam));
  }, [tabParam]);
  const pageSize = parseServicePageSize(sizeParam);
  const filtered = useMemo(() => filterServicesByTab(ordered, tab), [ordered, tab]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = parseServicePage(pageParam, pageCount);
  const paged = paginateItems(filtered, page, pageSize);
  const editItem = editId ? items.find((item) => item.id === editId) : undefined;
  const editOnPage = Boolean(editItem && paged.slice.some((item) => item.id === editItem.id));

  const tabCounts = useMemo(() => {
    const counts = new Map<ServiceListTab, number>();
    counts.set("all", ordered.length);
    for (const item of ordered) {
      const key = serviceCategoryTab(item.title);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return counts;
  }, [ordered]);

  const visibleTabs = SERVICE_LIST_TABS.filter((entry) => entry.id === "all" || (tabCounts.get(entry.id) ?? 0) > 0);

  useLayoutEffect(() => {
    const row = tabRowRef.current;
    if (!row) return;
    const selected = row.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!selected) return;
    const left = selected.offsetLeft;
    const width = selected.offsetWidth;
    setPill((prev) =>
      prev.ready && prev.left === left && prev.width === width ? prev : { left, width, ready: true },
    );
  }, [tab, ordered.length]);

  function hrefFor(next: { tab?: ServiceListTab; page?: number; size?: number }) {
    const params = new URLSearchParams();
    const nextTab = next.tab ?? tab;
    const nextSize = next.size ?? pageSize;
    const nextPage = next.page ?? 1;
    if (nextTab !== "all") params.set("tab", nextTab);
    if (nextPage > 1) params.set("page", String(nextPage));
    if (nextSize !== 10) params.set("size", String(nextSize));
    const query = params.toString();
    return query ? `/admin/hizmetler?${query}` : "/admin/hizmetler";
  }

  function selectTab(next: ServiceListTab) {
    setTab(next);
    router.replace(hrefFor({ tab: next, page: 1 }), { scroll: false });
  }

  function persistOrder(nextAll: CmsServiceItem[]) {
    snapshot.current = ordered;
    setOrdered(nextAll);
    setError(null);
    startTransition(async () => {
      const result = await reorderCmsServices(nextAll.map((item) => item.id));
      if (result.error) {
        setOrdered(snapshot.current);
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  function onDropRow(targetIndex: number) {
    if (dragIndex === null || dragIndex === targetIndex) {
      setDragIndex(null);
      return;
    }
    const from = paged.from - 1 + dragIndex;
    const to = paged.from - 1 + targetIndex;
    const nextFiltered = moveItem(filtered, from, to);
    persistOrder(applyFilteredOrder(ordered, nextFiltered));
    setDragIndex(null);
  }

  return (
    <div className="space-y-4">
      {flash ? <AdminNotice>{flash}</AdminNotice> : null}
      {error ? (
        <p role="alert" className="rounded-2xl border border-brand-magenta/30 bg-brand-magenta/8 px-5 py-3 text-[14px] text-secondary">
          {error}
        </p>
      ) : null}

      <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div ref={tabRowRef} role="tablist" aria-label="Hizmet kategorileri" className="relative flex w-max min-w-full gap-1">
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute top-0 left-0 z-0 h-11 rounded-lg bg-surface-elevated shadow-sm",
              pill.ready
                ? "transition-[transform,width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                : "opacity-0",
            )}
            style={{ width: pill.width, transform: `translateX(${pill.left}px)` }}
          />
          {visibleTabs.map((entry) => {
            const active = tab === entry.id;
            const count = tabCounts.get(entry.id) ?? 0;
            return (
              <button
                key={entry.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => selectTab(entry.id)}
                className={cn(
                  "relative z-10 inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 text-[13px] whitespace-nowrap transition-colors duration-300",
                  active ? "text-brand-cyan" : "text-text-secondary hover:text-text-primary",
                )}
              >
                {entry.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[11px] font-semibold transition-colors duration-300",
                    active ? "bg-white/8 text-text-primary" : "bg-white/6 text-text-muted",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div key={tab} className="cms-tab-panel">
      {ordered.length === 0 ? (
        <AdminEmptyState
          icon="layers"
          title="Henüz hizmet yok"
          description="İlk kartı eklediğinizde burada sıra, yayın durumu ve özet görünür."
        />
      ) : filtered.length === 0 ? (
        <AdminEmptyState
          icon="layers"
          title="Bu sekmede hizmet yok"
          description="Başka bir sekmeye geçin veya yeni hizmet ekleyin."
        />
      ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/8 bg-surface-card">
            <table className="min-w-full text-left text-[14px]">
              <thead className="label-caps border-b border-white/8 text-text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Sıra</th>
                  <th className="px-4 py-3 font-medium">Başlık</th>
                  <th className="hidden px-4 py-3 font-medium md:table-cell">Özet</th>
                  <th className="px-4 py-3 font-medium">Durum</th>
                  <th className="hidden px-4 py-3 font-medium lg:table-cell">Güncelleme</th>
                  <th className="px-4 py-3 font-medium">
                    <span className="sr-only">İşlemler</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paged.slice.map((item, index) => (
                  <tr
                    key={item.id}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => onDropRow(index)}
                    className={cn(
                      "border-b border-white/6 last:border-0",
                      dragIndex === index && "bg-white/4",
                      pending && "opacity-70",
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          draggable
                          aria-label={`${item.title} sırasını taşı`}
                          onDragStart={() => setDragIndex(index)}
                          onDragEnd={() => setDragIndex(null)}
                          className="inline-flex min-h-11 min-w-11 cursor-grab items-center justify-center rounded-lg text-text-muted active:cursor-grabbing hover:text-brand-cyan"
                        >
                          <Icon name="drag_indicator" className="text-[18px]" />
                        </button>
                        <span className="tabular-nums text-text-muted">{item.sortOrder}</span>
                      </div>
                    </td>
                    <td className="max-w-[12rem] px-4 py-3 font-display font-semibold break-words sm:max-w-none">{item.title}</td>
                    <td className="hidden max-w-md px-4 py-3 text-text-secondary md:table-cell">
                      <span className="line-clamp-2">{item.description}</span>
                    </td>
                    <td className="px-4 py-3">
                      <AdminStatusBadge published={item.published} />
                    </td>
                    <td className="hidden px-4 py-3 text-text-muted lg:table-cell">{formatCmsDate(item.updatedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center justify-end gap-1">
                        <AdminServiceEditDrawer service={item} initialOpen={editId === item.id} />
                        <AdminServiceDelete service={item} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      )}
      </div>

      {ordered.length > 0 && filtered.length > 0 ? (
        <>
          <div className="h-32 sm:h-[4.75rem]" aria-hidden />
          <div className="sticky bottom-0 z-20 -mt-32 -mb-6 sm:-mt-[4.75rem]">
            <div
              className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-surface-canvas to-transparent"
              aria-hidden
            />
            <div className="cms-pager relative flex flex-col items-center justify-between gap-3 rounded-2xl border border-white/8 bg-surface-container/90 px-4 py-3 shadow-[0_-18px_40px_rgba(11,13,17,0.88)] backdrop-blur-xl sm:flex-row">
            <div className="flex flex-wrap items-center gap-2 text-[13px] text-text-muted">
              <label htmlFor="service-page-size">Sayfa başına</label>
              <select
                id="service-page-size"
                className="rounded-lg border border-white/10 bg-surface-card px-2 py-1 text-text-primary"
                value={pageSize}
                onChange={(event) => {
                  router.push(hrefFor({ size: Number(event.target.value) as (typeof SERVICE_PAGE_SIZES)[number], page: 1 }));
                }}
              >
                {SERVICE_PAGE_SIZES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <span>
                Toplam {filtered.length} kayıttan {paged.from}–{paged.to} arası
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href={hrefFor({ page: Math.max(1, page - 1) })}
                aria-disabled={page <= 1}
                className={cn(
                  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-surface-card text-text-secondary",
                  page <= 1 && "pointer-events-none opacity-40",
                )}
              >
                <Icon name="chevron_left" className="text-[18px]" />
                <span className="sr-only">Önceki sayfa</span>
              </Link>
              {Array.from({ length: paged.pageCount }, (_, index) => index + 1).map((entry) => (
                <Link
                  key={entry}
                  href={hrefFor({ page: entry })}
                  aria-current={entry === page ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[13px]",
                    entry === page ? "bg-surface-elevated font-semibold text-brand-cyan" : "text-text-secondary hover:bg-white/6",
                  )}
                >
                  {entry}
                </Link>
              ))}
              <Link
                href={hrefFor({ page: Math.min(paged.pageCount, page + 1) })}
                aria-disabled={page >= paged.pageCount}
                className={cn(
                  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-surface-card text-text-secondary",
                  page >= paged.pageCount && "pointer-events-none opacity-40",
                )}
              >
                <Icon name="chevron_right" className="text-[18px]" />
                <span className="sr-only">Sonraki sayfa</span>
              </Link>
            </div>
          </div>
          </div>
        </>
      ) : null}
      {editItem && !editOnPage ? <AdminServiceEditDrawer service={editItem} initialOpen hideTrigger /> : null}
    </div>
  );
}
