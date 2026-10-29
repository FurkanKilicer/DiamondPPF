"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { AdminGalleryDelete } from "@/features/admin/admin-gallery-delete";
import { AdminGalleryEditDrawer } from "@/features/admin/admin-gallery-edit-drawer";
import { AdminStatusBadge } from "@/features/admin/ui";
import { formatCmsDate } from "@/lib/cms/format";
import { cmsMediaSrc } from "@/lib/cms/media-path";
import type { CmsGalleryItem } from "@/lib/cms/types";

export function AdminGalleryList({ items, editId }: { items: CmsGalleryItem[]; editId?: string }) {
  const [editing, setEditing] = useState<CmsGalleryItem | null>(
    () => items.find((item) => item.id === editId) ?? null,
  );

  useEffect(() => {
    if (!editId) return;
    const match = items.find((item) => item.id === editId);
    if (match) setEditing(match);
  }, [editId, items]);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => {
          const src = item.previewSrc ?? cmsMediaSrc(item.imagePath);
          return (
            <li key={item.id} className="overflow-hidden rounded-2xl border border-white/8 bg-surface-card">
              <div className="relative aspect-[16/10] bg-surface-container-lowest">
                {item.imagePath ? (
                  <Image src={src} alt="" fill unoptimized className="object-cover" sizes="(min-width: 1280px) 28vw, (min-width: 640px) 45vw, 100vw" />
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
                  <button
                    type="button"
                    onClick={() => setEditing(item)}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg px-3 text-[13px] text-text-secondary hover:bg-white/6 hover:text-text-primary"
                  >
                    Düzenle
                  </button>
                  <AdminGalleryDelete item={item} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {editing ? (
        <AdminGalleryEditDrawer
          key={editing.id}
          item={editing}
          open
          hideTrigger
          onClose={() => setEditing(null)}
        />
      ) : null}
    </>
  );
}
