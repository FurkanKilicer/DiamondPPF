"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cmsMediaSrc, inspectCmsImageFile } from "@/lib/cms/media-path";
import { cn } from "@/lib/utils/cn";

function fileLabel(path: string) {
  const clean = path.split("?")[0] ?? path;
  const name = clean.split("/").pop();
  return name && name.length > 0 ? name : "Kapak görseli";
}

export function AdminImageField({
  defaultPath,
  error,
  disabled,
  required = false,
}: {
  defaultPath: string;
  error?: string;
  disabled: boolean;
  required?: boolean;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(defaultPath ? cmsMediaSrc(defaultPath) : "");
  const [name, setName] = useState(defaultPath ? fileLabel(defaultPath) : "");
  const [localError, setLocalError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function applyFile(file: File) {
    const inspected = inspectCmsImageFile(file);
    if (!inspected.ok) {
      setLocalError(inspected.error);
      return;
    }
    setLocalError(null);
    setName(file.name);
    setPreview((current) => {
      if (current.startsWith("blob:")) URL.revokeObjectURL(current);
      return URL.createObjectURL(file);
    });
    const transfer = new DataTransfer();
    transfer.items.add(file);
    if (inputRef.current) inputRef.current.files = transfer.files;
  }

  const shownError = localError ?? error;
  const empty = !preview;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="label-caps text-text-muted" id={`${inputId}-label`}>
          Görsel
        </p>
        <p className="text-[11px] text-text-muted">JPEG · PNG · WebP · 5 MB</p>
      </div>
      <input type="hidden" name="imagePath" defaultValue={defaultPath} />
      <input
        ref={inputRef}
        id={inputId}
        name="imageFile"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        disabled={disabled}
        required={required && !defaultPath}
        aria-labelledby={`${inputId}-label`}
        aria-invalid={shownError ? true : undefined}
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) applyFile(file);
        }}
      />
      <label
        htmlFor={inputId}
        onDragEnter={(event) => {
          event.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          if (disabled) return;
          const file = event.dataTransfer.files[0];
          if (file) applyFile(file);
        }}
        className={cn(
          "group relative block cursor-pointer overflow-hidden rounded-2xl border transition",
          empty ? "border-dashed" : "border-solid",
          dragging
            ? "border-brand-cyan bg-brand-cyan/10 shadow-[0_0_0_1px_rgba(0,229,255,0.35)]"
            : shownError
              ? "border-brand-magenta/50"
              : "border-white/10 hover:border-white/18",
          disabled && "pointer-events-none opacity-70",
        )}
      >
        {empty ? (
          <div className="flex min-h-52 flex-col items-center justify-center gap-4 px-6 py-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-cyan/12 text-brand-cyan ring-1 ring-brand-cyan/25">
              <Icon name="add_photo_alternate" className="text-[28px]" />
            </span>
            <div className="space-y-1">
              <p className="font-display text-base font-semibold text-text-primary">Görseli buraya bırakın</p>
              <p className="text-[13px] text-text-secondary">veya tıklayarak dosya seçin</p>
            </div>
            <span className="inline-flex min-h-10 items-center rounded-full border border-white/10 bg-white/4 px-4 text-[12px] font-medium tracking-wide text-text-secondary uppercase">
              Dosya seç
            </span>
          </div>
        ) : (
          <div className="relative aspect-[16/9] w-full bg-surface-container-lowest">
            {/* blob ve depolama önizlemesi next/image dışında */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 backdrop-blur-[2px] transition-opacity",
                "group-hover:opacity-100 group-focus-within:opacity-100",
                dragging && "opacity-100",
              )}
            >
              <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/12 px-5 font-display text-[12px] font-semibold tracking-wider text-white uppercase ring-1 ring-white/20">
                <Icon name="photo_camera" className="text-[18px]" />
                Değiştir
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-white">{name}</p>
                <p className="text-[11px] text-white/65">Kapak · tıklayın veya sürükleyin</p>
              </div>
              <span className="hidden rounded-full bg-brand-cyan/20 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-brand-cyan uppercase sm:inline">
                Hazır
              </span>
            </div>
          </div>
        )}
      </label>
      {shownError ? (
        <p className="mt-2 text-[12px] text-secondary" role="alert">
          {shownError}
        </p>
      ) : null}
    </div>
  );
}
