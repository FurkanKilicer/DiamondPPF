"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { Icon } from "@/components/ui/icon";
import { AdminImageField } from "@/features/admin/admin-image-field";
import { AdminPublishedField } from "@/features/admin/ui";
import { createCmsService, updateCmsService } from "@/lib/cms/service-actions";
import {
  emptyCmsServiceValues,
  initialCmsServiceFormState,
  valuesFromService,
  type CmsServiceFormValues,
} from "@/lib/cms/service-input";
import type { CmsServiceItem } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

export function AdminServiceForm({
  mode,
  service,
  onCancel,
  embedded = false,
}: {
  mode: "create" | "edit";
  service?: CmsServiceItem;
  onCancel?: () => void;
  embedded?: boolean;
}) {
  const initial = initialCmsServiceFormState(service ? valuesFromService(service) : emptyCmsServiceValues());
  const action = mode === "create" ? createCmsService : updateCmsService;
  const [state, formAction, pending] = useActionState(action, initial);
  const values = state.values ?? initial.values;
  const fieldErrors = state.fieldErrors ?? {};
  const submitLock = useRef(false);

  useEffect(() => {
    if (!pending) submitLock.current = false;
  }, [pending]);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (pending || submitLock.current) {
          event.preventDefault();
          return;
        }
        submitLock.current = true;
      }}
      className={cn("space-y-5", !embedded && "rounded-2xl border border-white/8 bg-surface-card p-5 sm:p-6")}
    >
      {mode === "edit" && service ? <input type="hidden" name="id" value={service.id} /> : null}

      {state.error ? (
        <p role="alert" className="rounded-lg border border-brand-magenta/30 bg-brand-magenta/8 px-3 py-2 text-[13px] text-secondary">
          {state.error}
        </p>
      ) : null}

      <Field
        id="service-title"
        name="title"
        label="Başlık"
        error={fieldErrors.title}
        disabled={pending}
        defaultValue={values.title}
        maxLength={160}
        required
      />

      <div>
        <label className="label-caps text-text-muted" htmlFor="service-description">
          Açıklama
        </label>
        <textarea
          id="service-description"
          name="description"
          required
          maxLength={4000}
          disabled={pending}
          defaultValue={values.description}
          rows={6}
          className={cn("form-field mt-1 h-auto min-h-32 py-3", fieldErrors.description && "border-brand-magenta/50")}
          aria-invalid={fieldErrors.description ? true : undefined}
        />
        {fieldErrors.description ? (
          <p className="mt-1 text-[12px] text-secondary">{fieldErrors.description}</p>
        ) : null}
      </div>

      <AdminImageField defaultPath={values.imagePath} error={fieldErrors.imagePath} disabled={pending} />

      <Field
        id="service-sort"
        name="sortOrder"
        label="Sıra"
        inputMode="numeric"
        error={fieldErrors.sortOrder}
        disabled={pending}
        defaultValue={values.sortOrder}
        required
      />
      <AdminPublishedField
        defaultChecked={values.published}
        disabled={pending}
        hint="İşaretli değilse taslak kalır."
      />

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-white/10 px-4 text-[13px] text-text-secondary hover:text-text-primary disabled:opacity-70 sm:w-auto"
          >
            Vazgeç
          </button>
        ) : (
          <Link
            href="/admin/hizmetler"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-white/10 px-4 text-[13px] text-text-secondary hover:text-text-primary sm:w-auto"
          >
            Vazgeç
          </Link>
        )}
        <button
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-magenta/90 px-5 font-display text-[12px] font-semibold tracking-wide text-white uppercase hover:bg-brand-magenta disabled:opacity-70 sm:w-auto"
        >
          <Icon name={pending ? "sync" : "save"} className={cn("text-[18px]", pending && "animate-spin")} />
          {pending ? "Kaydediliyor..." : mode === "create" ? "Hizmeti oluştur" : "Değişiklikleri kaydet"}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  hint,
  error,
  disabled,
  defaultValue,
  maxLength,
  required,
  inputMode,
}: {
  id: string;
  name: keyof CmsServiceFormValues;
  label: string;
  hint?: string;
  error?: string;
  disabled: boolean;
  defaultValue: string;
  maxLength?: number;
  required?: boolean;
  inputMode?: "numeric";
}) {
  return (
    <div>
      <label className="label-caps text-text-muted" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        maxLength={maxLength}
        required={required}
        inputMode={inputMode}
        className={cn("form-field mt-1", error && "border-brand-magenta/50")}
        aria-invalid={error ? true : undefined}
      />
      {hint ? <p className="mt-1 text-[12px] text-text-muted">{hint}</p> : null}
      {error ? <p className="mt-1 text-[12px] text-secondary">{error}</p> : null}
    </div>
  );
}
