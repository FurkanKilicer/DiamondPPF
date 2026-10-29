import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { AdminGalleryCreateModal } from "@/features/admin/admin-gallery-create-modal";
import { AdminGalleryDelete } from "@/features/admin/admin-gallery-delete";
import { AdminGalleryEditDrawer } from "@/features/admin/admin-gallery-edit-drawer";
import { AdminEmptyState, AdminErrorState, AdminNotice, AdminPageHeader, AdminStatusBadge } from "@/features/admin/ui";
import { formatCmsDate } from "@/lib/cms/format";
import { cmsMediaSrc } from "@/lib/cms/media-path";
import { CMS_GALLERY_KINDS, cmsGalleryKindLabels, parseCmsGalleryKind } from "@/lib/cms/gallery-kind";
import { cmsGalleryNoticeMessage } from "@/lib/cms/gallery-write";
import type { CmsGalleryItem, CmsListError, CmsListOk } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

export function AdminGalleryScreen({
  result,
  notice,
  tab,
  editId,
}: {
  result: CmsListOk<CmsGalleryItem> | CmsListError;
  notice?: string;
  tab?: string;
  editId?: string;
}) {
  const flash = cmsGalleryNoticeMessage(notice);
  const kind = parseCmsGalleryKind(tab);
  const items = result.ok ? result.items.filter((item) => item.kind === kind) : [];

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
          const count = result.ok ? result.items.filter((row) => row.kind === item).length : 0;
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
      {result.ok && items.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <li key={item.id} className="overflow-hidden rounded-2xl border border-white/8 bg-surface-card">
              <div className="relative aspect-[16/10] bg-surface-container-lowest">
                {item.imagePath ? (
                  <Image src={cmsMediaSrc(item.imagePath)} alt="" fill className="object-cover" sizes="(min-width: 1280px) 28vw, (min-width: 640px) 45vw, 100vw" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Icon name="photo_library" className="text-[40px] text-text-muted" />
                  </div>
                )}
                <span className="absolute top-3 left-3 rounded-full bg-black/55 px-2 py-1 text-[11px] tabular-nums text-text-secondary">
                  #{index + 1}
                </span>
                <span className="absolute top-3 right-3">
                  <AdminStatusBadge published={item.published} />
                </span>
              </div>
              <div className="space-y-2 p-4">
                <h2 className="font-display font-semibold">{item.title}</h2>
                <p className="line-clamp-2 text-[13px] leading-5 text-text-secondary">{item.description}</p>
                <p className="truncate font-mono text-[11px] text-text-muted">{item.imagePath}</p>
                <p className="text-[12px] text-text-muted">{formatCmsDate(item.updatedAt)}</p>
                <div className="flex items-center justify-end gap-1 pt-1">
                  <AdminGalleryEditDrawer item={item} initialOpen={editId === item.id} />
                  <AdminGalleryDelete item={item} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
