"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { AdminOverlay } from "@/features/admin/admin-overlay";
import { AdminServiceDelete } from "@/features/admin/admin-service-delete";
import { AdminServiceForm } from "@/features/admin/admin-service-form";
import type { CmsServiceItem } from "@/lib/cms/types";

export function AdminServiceEditDrawer({
  service,
  open: openProp,
  hideTrigger = false,
  onClose,
  initialOpen = false,
}: {
  service: CmsServiceItem;
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
          title="Düzenle"
          aria-label={`${service.title} kaydını düzenle`}
          onClick={() => setUncontrolledOpen(true)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-surface-container text-brand-cyan hover:bg-white/8"
        >
          <Icon name="edit" className="text-[18px]" />
        </button>
      )}
      <AdminOverlay open={open} onClose={close} labelledBy={titleId}>
        <div ref={dialogRef} className="flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/8 px-5 py-4">
            <div>
              <p className="label-caps tracking-widest text-brand-cyan">Düzenle</p>
              <h2 id={titleId} className="font-display text-xl font-semibold">
                {service.title}
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <AdminServiceDelete service={service} />
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
            <AdminServiceForm key={service.id} mode="edit" service={service} embedded onCancel={close} />
          </div>
        </div>
      </AdminOverlay>
    </>
  );
}
