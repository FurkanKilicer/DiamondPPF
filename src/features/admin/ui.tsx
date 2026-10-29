import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils/cn";

export function AdminPageHeader({
  kicker,
  title,
  description,
  actions,
}: {
  kicker: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-white/8 pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0 space-y-2">
        <p className="label-caps tracking-widest text-brand-cyan">{kicker}</p>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        <p className="max-w-2xl text-[14px] leading-6 text-text-secondary sm:text-[15px]">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}

export function AdminPublishedField({
  defaultChecked,
  disabled,
  hint,
}: {
  defaultChecked: boolean;
  disabled: boolean;
  hint: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-white/10 bg-surface-elevated/50 px-4 py-4">
      <input
        type="checkbox"
        name="published"
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-brand-cyan)]"
      />
      <span className="min-w-0 space-y-1">
        <span className="block text-[14px] font-medium leading-5">Yayında</span>
        <span className="block text-[13px] leading-5 text-text-muted">{hint}</span>
      </span>
    </label>
  );
}

export function AdminStatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase",
        published ? "bg-brand-cyan/12 text-brand-cyan" : "bg-white/6 text-text-muted",
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", published ? "bg-brand-cyan" : "bg-text-muted")} />
      {published ? "Yayında" : "Taslak"}
    </span>
  );
}

export function AdminEmptyState({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/12 bg-surface-card/60 px-6 py-16 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-high text-brand-magenta">
        <Icon name={icon} className="text-[24px]" />
      </span>
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-[14px] leading-6 text-text-secondary">{description}</p>
    </div>
  );
}

export function AdminErrorState({ message, code }: { message: string; code?: string }) {
  return (
    <div role="alert" className="rounded-2xl border border-brand-magenta/30 bg-brand-magenta/8 px-5 py-4">
      <p className="font-display text-sm font-semibold text-secondary">İçerik okunamadı</p>
      <p className="mt-1 text-[14px] text-text-secondary">{message}</p>
      {code ? <p className="mt-1 font-mono text-[12px] text-text-muted">{code}</p> : null}
    </div>
  );
}

export function AdminNotice({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="status"
      className="rounded-2xl border border-brand-cyan/25 bg-brand-cyan/8 px-5 py-3 text-[14px] text-brand-cyan"
    >
      {children}
    </p>
  );
}

export function AdminGhostButton({ children }: { children: React.ReactNode }) {
  return (
    <span
      role="note"
      className="inline-flex min-h-11 items-center text-[12px] leading-5 text-text-muted"
    >
      Yakında: {children} (yazılmaz)
    </span>
  );
}
