"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { AdminOverlay } from "@/features/admin/admin-overlay";
import { AdminServiceForm } from "@/features/admin/admin-service-form";

export function AdminServiceCreateModal() {
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
        Yeni hizmet
      </button>
      <AdminOverlay open={open} onClose={close} labelledBy={titleId}>
        <div ref={dialogRef} className="flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/8 px-5 py-4">
            <div>
              <p className="label-caps tracking-widest text-brand-cyan">Hizmetler</p>
              <h2 id={titleId} className="font-display text-xl font-semibold">
                Yeni hizmet
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
            <AdminServiceForm mode="create" embedded onCancel={close} />
          </div>
        </div>
      </AdminOverlay>
    </>
  );
}
