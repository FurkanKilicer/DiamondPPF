"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { AdminGalleryDelete } from "@/features/admin/admin-gallery-delete";
import { AdminGalleryForm } from "@/features/admin/admin-gallery-form";
import { AdminOverlay } from "@/features/admin/admin-overlay";
import type { CmsGalleryItem } from "@/lib/cms/types";

export function AdminGalleryEditDrawer({
  item,
  open: openProp,
  hideTrigger = false,
  onClose,
  initialOpen = false,
}: {
  item: CmsGalleryItem;
  open?: boolean;
  hideTrigger?: boolean;
  onClose?: () => void;
  initialOpen?: boolean;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const open = openProp ?? uncontrolledOpen;
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => {
    onClose?.();
    if (openProp === undefined) setUncontrolledOpen(false);
  }, [onClose, openProp]);

  useEffect(() => {
    if (!open) return;
    const field = dialogRef.current?.querySelector("input, textarea, select");
    if (field instanceof HTMLElement) field.focus({ preventScroll: true });
  }, [open]);

  return (
    <>
      {hideTrigger ? null : (
        <button
          type="button"
          onClick={() => setUncontrolledOpen(true)}
          className="inline-flex min-h-11 items-center justify-center rounded-lg px-3 text-[13px] text-text-secondary hover:bg-white/6 hover:text-text-primary"
        >
          Düzenle
        </button>
      )}
      <AdminOverlay open={open} onClose={close} labelledBy={titleId}>
        <div ref={dialogRef} className="flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/8 px-5 py-4">
            <div>
              <p className="label-caps tracking-widest text-brand-cyan">Düzenle</p>
              <h2 id={titleId} className="font-display text-xl font-semibold">
                {item.title}
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <AdminGalleryDelete item={item} />
              <button
                type="button"
                onClick={close}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-text-muted hover:bg-white/6 hover:text-text-primary"
                aria-label="Kapat"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
            <AdminGalleryForm key={item.id} mode="edit" item={item} embedded onCancel={close} />
          </div>
        </div>
      </AdminOverlay>
    </>
  );
}
