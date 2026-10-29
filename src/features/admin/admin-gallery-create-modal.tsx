"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { AdminGalleryForm } from "@/features/admin/admin-gallery-form";
import { AdminOverlay } from "@/features/admin/admin-overlay";
import { cmsGalleryKindLabels, type CmsGalleryKind } from "@/lib/cms/gallery-kind";

export function AdminGalleryCreateModal({ defaultKind = "vehicle" }: { defaultKind?: CmsGalleryKind }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const input = dialogRef.current?.querySelector("input");
    input?.focus({ preventScroll: true });
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-magenta/90 px-4 font-display text-[12px] font-semibold tracking-wide text-white uppercase hover:bg-brand-magenta"
      >
        Yeni görsel
      </button>
      <AdminOverlay open={open} onClose={close} labelledBy={titleId}>
        <div ref={dialogRef} className="flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/8 px-5 py-4">
            <div>
              <p className="label-caps tracking-widest text-brand-cyan">Portfolyo</p>
              <h2 id={titleId} className="font-display text-xl font-semibold">
                Yeni {cmsGalleryKindLabels[defaultKind].toLowerCase()}
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-text-muted hover:bg-white/6 hover:text-text-primary"
              aria-label="Kapat"
            >
              <Icon name="close" className="text-[20px]" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
            <AdminGalleryForm mode="create" defaultKind={defaultKind} embedded onCancel={close} />
          </div>
        </div>
      </AdminOverlay>
    </>
  );
}
