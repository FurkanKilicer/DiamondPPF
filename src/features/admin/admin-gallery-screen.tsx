import Link from "next/link";
import { AdminGalleryCreateModal } from "@/features/admin/admin-gallery-create-modal";
import { AdminGalleryList } from "@/features/admin/admin-gallery-list";
import { AdminEmptyState, AdminErrorState, AdminNotice, AdminPageHeader } from "@/features/admin/ui";
import { CMS_GALLERY_KINDS, cmsGalleryKindLabels, parseCmsGalleryKind } from "@/lib/cms/gallery-kind";
import { cmsGalleryNoticeMessage } from "@/lib/cms/gallery-write";
import type { CmsGalleryItem, CmsGalleryKind, CmsListError, CmsListOk } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

export function AdminGalleryScreen({
  result,
  counts,
  notice,
  tab,
  editId,
}: {
  result: CmsListOk<CmsGalleryItem> | CmsListError;
  counts: Record<CmsGalleryKind, number>;
  notice?: string;
  tab?: string;
  editId?: string;
}) {
  const flash = cmsGalleryNoticeMessage(notice);
  const kind = parseCmsGalleryKind(tab);
  const items = result.ok ? result.items : [];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <AdminPageHeader
        kicker="Portfolyo"
        title="Örnek Araçlar CMS"
        description="Referans ızgara, mikron detay, videolar ve atölye kareleri cms_gallery üzerinde. Yayında olmayanlar sitede görünmez."
        actions={<AdminGalleryCreateModal defaultKind={kind} />}
      />
      <nav aria-label="Galeri bölümleri" className="flex flex-wrap gap-2">
        {CMS_GALLERY_KINDS.map((item) => {
          const href = item === "vehicle" ? "/admin/galeri" : `/admin/galeri?tab=${item}`;
          const count = counts[item];
          const active = kind === item;
          return (
            <Link
              key={item}
              href={href}
              className={cn(
                "inline-flex min-h-10 items-center rounded-full px-4 text-[13px]",
                active ? "bg-brand-cyan/15 text-brand-cyan" : "bg-white/6 text-text-secondary hover:text-text-primary",
              )}
              aria-current={active ? "page" : undefined}
            >
              {cmsGalleryKindLabels[item]} ({count})
            </Link>
          );
        })}
      </nav>
      {flash ? <AdminNotice>{flash}</AdminNotice> : null}
      {!result.ok ? <AdminErrorState message={result.message} code={result.code} /> : null}
      {result.ok && items.length === 0 ? (
        <AdminEmptyState
          icon="grid_view"
          title={`${cmsGalleryKindLabels[kind]} boş`}
          description="Bu bölüme yeni kayıt ekleyin. Yayınlananlar ilgili Örnek Araçlar bileşeninde görünür."
        />
      ) : null}
      {result.ok && items.length > 0 ? <AdminGalleryList items={items} editId={editId} /> : null}
    </div>
  );
}
