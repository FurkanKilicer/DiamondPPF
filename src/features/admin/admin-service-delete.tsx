"use client";

import { useActionState, useCallback, useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { AdminOverlay } from "@/features/admin/admin-overlay";
import { AdminStatusBadge } from "@/features/admin/ui";
import { formatCmsDate } from "@/lib/cms/format";
import { deleteCmsService, type CmsServiceDeleteState } from "@/lib/cms/service-actions";
import type { CmsServiceItem } from "@/lib/cms/types";

const initial: CmsServiceDeleteState = { error: null };

export function AdminServiceDelete({ service }: { service: CmsServiceItem }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(deleteCmsService, initial);
  const titleId = useId();
  const descId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    if (pending) return;
    setOpen(false);
  }, [pending]);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <>
      <button
        type="button"
        title="Sil"
        aria-label={`${service.title} kaydını sil`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-secondary hover:bg-brand-magenta/10"
      >
        <Icon name="delete" className="text-[18px]" />
      </button>
      <AdminOverlay
        open={open}
        onClose={close}
        labelledBy={titleId}
        describedBy={descId}
        closeDisabled={pending}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/8 px-5 py-4">
          <div>
            <p className="label-caps tracking-widest text-brand-magenta">Silme onayı</p>
            <h2 id={titleId} className="font-display text-xl font-semibold">
              Bu hizmet silinsin mi?
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            disabled={pending}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-text-muted hover:bg-white/6 hover:text-text-primary disabled:opacity-50"
            aria-label="Kapat"
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <p id={descId} className="text-[14px] leading-6 text-text-secondary">
            Aşağıdaki kayıt kalıcı olarak silinecek. Bu işlem geri alınamaz.
          </p>
          <div className="rounded-xl border border-white/10 bg-surface-container/80 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="font-display text-base font-semibold text-text-primary">{service.title}</p>
              <AdminStatusBadge published={service.published} />
            </div>
            {service.description ? (
              <p className="mt-2 line-clamp-4 text-[13px] leading-5 text-text-secondary">{service.description}</p>
            ) : (
              <p className="mt-2 text-[13px] text-text-muted">Açıklama yok</p>
            )}
            <dl className="mt-3 grid gap-2 text-[12px] text-text-muted sm:grid-cols-2">
              <div>
                <dt className="label-caps">Sıra</dt>
                <dd className="mt-0.5 tabular-nums text-text-secondary">{service.sortOrder}</dd>
              </div>
              <div>
                <dt className="label-caps">Son güncelleme</dt>
                <dd className="mt-0.5 text-text-secondary">{formatCmsDate(service.updatedAt)}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="label-caps">Kapak</dt>
                <dd className="mt-0.5 break-all text-text-secondary">{service.imagePath ?? "Görsel atanmamış"}</dd>
              </div>
            </dl>
          </div>
          {state?.error ? (
            <p role="alert" className="rounded-lg border border-brand-magenta/30 bg-brand-magenta/8 px-3 py-2 text-[13px] text-secondary">
              {state.error}
            </p>
          ) : null}
        </div>
        <form action={action} className="flex shrink-0 flex-col-reverse gap-2 border-t border-white/8 px-5 py-4 sm:flex-row sm:justify-end">
          <input type="hidden" name="id" value={service.id} />
          <button
            ref={cancelRef}
            type="button"
            onClick={close}
            disabled={pending}
            className="inline-flex min-h-11 items-center justify-center rounded-lg px-4 text-[13px] text-text-secondary hover:bg-white/6 hover:text-text-primary disabled:opacity-50"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-magenta/90 px-4 font-display text-[12px] font-semibold tracking-wide text-white uppercase hover:bg-brand-magenta disabled:opacity-70"
          >
            <Icon name={pending ? "sync" : "delete"} className={pending ? "animate-spin text-[18px]" : "text-[18px]"} />
            {pending ? "Siliniyor" : "Evet, sil"}
          </button>
        </form>
      </AdminOverlay>
    </>
  );
}
