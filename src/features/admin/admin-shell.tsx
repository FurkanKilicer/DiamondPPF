"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { signOutAdmin } from "@/lib/auth/admin-actions";
import { adminBreadcrumbs } from "@/lib/admin/breadcrumb";
import { adminNav, isAdminNavActive } from "@/lib/admin/nav";
import { Icon } from "@/components/ui/icon";
import { site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

export function AdminAccountPreview({ email }: { email: string | null }) {
  const initial = email?.trim().charAt(0).toUpperCase() ?? "A";
  return (
    <div className="flex items-center gap-3 rounded-xl bg-surface-card/80 p-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-magenta/20 font-display text-sm font-semibold text-brand-magenta">
        {initial}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] text-text-primary">{email ?? "Yönetici"}</p>
        <p className="label-caps text-text-muted">İçerik yöneticisi</p>
      </div>
    </div>
  );
}

export function AdminShell({
  account,
  children,
}: {
  account: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const moduleRowRef = useRef<HTMLDivElement>(null);
  const [modulePill, setModulePill] = useState({ left: 0, width: 0, ready: false });
  const crumbs = adminBreadcrumbs(pathname);

  useLayoutEffect(() => {
    const row = moduleRowRef.current;
    if (!row) return;
    const selected = row.querySelector<HTMLElement>('[aria-current="page"]');
    if (!selected) return;
    const left = selected.offsetLeft;
    const width = selected.offsetWidth;
    setModulePill((prev) =>
      prev.ready && prev.left === left && prev.width === width ? prev : { left, width, ready: true },
    );
  }, [pathname]);

  return (
    <div className="relative h-dvh overflow-hidden bg-surface-canvas text-text-primary">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-brand-cyan/10 blur-[100px] md:-top-40 md:-left-40 md:h-[520px] md:w-[520px] md:blur-[140px]" />
        <div className="absolute -right-24 -bottom-32 h-72 w-72 rounded-full bg-brand-magenta/10 blur-[100px] md:-right-40 md:-bottom-40 md:h-[520px] md:w-[520px] md:blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#222733_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.18]" />
      </div>
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface-elevated focus:px-3 focus:py-2"
      >
        İçeriğe geç
      </a>

      <div className="relative flex h-full">
        <aside
          id="admin-sidebar"
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex w-[17.5rem] flex-col border-r border-white/8 bg-surface-container-lowest/95 backdrop-blur-xl transition-transform lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          )}
        >
          <div className="flex shrink-0 items-center gap-3 border-b border-white/8 px-5 py-5">
            <Image src={site.logoMark} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
            <div className="min-w-0">
              <p className="label-caps truncate text-text-muted">İçerik paneli</p>
              <p className="truncate font-display text-sm font-semibold tracking-wide">Diamond PPF CMS</p>
            </div>
          </div>
          <nav aria-label="Yönetim" className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-3">
            {adminNav.map((item) => {
              const active = isAdminNavActive(pathname, item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-lg px-3 text-[14px] transition-colors",
                    active
                      ? "bg-white/6 text-text-primary shadow-[inset_3px_0_0_0_var(--color-brand-magenta)]"
                      : "text-text-secondary hover:bg-white/4 hover:text-text-primary",
                  )}
                >
                  <Icon name={item.icon} className={cn("text-[20px]", active ? "text-brand-cyan" : "text-text-muted")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="shrink-0 border-t border-white/8 p-4">{account}</div>
        </aside>

        {open ? (
          <button
            type="button"
            className="fixed top-16 right-0 bottom-0 left-0 z-30 bg-black/55 lg:hidden"
            aria-label="Menüyü kapat"
            onClick={() => setOpen(false)}
          />
        ) : null}

        <div className="flex h-full min-w-0 flex-1 flex-col lg:pl-[17.5rem]">
          <header className="relative z-20 shrink-0 border-b border-white/8 bg-surface-canvas/85 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-text-secondary hover:bg-white/6 lg:hidden"
                  aria-expanded={open}
                  aria-controls="admin-sidebar"
                  onClick={() => setOpen((value) => !value)}
                >
                  <Icon name={open ? "close" : "menu"} className="text-[22px]" />
                  <span className="sr-only">Menü</span>
                </button>
                <nav aria-label="Konum" className="min-w-0">
                  <ol className="flex min-w-0 items-center gap-1.5 text-[12px] text-text-muted sm:text-[13px]">
                    {crumbs.map((crumb, index) => {
                      const last = index === crumbs.length - 1;
                      return (
                        <li key={`${crumb.href}-${crumb.label}`} className="flex min-w-0 items-center gap-1.5">
                          {index > 0 ? <span className="text-white/20">/</span> : null}
                          {last ? (
                            <span className="truncate font-display text-sm font-semibold text-text-primary sm:text-base">
                              {crumb.label}
                            </span>
                          ) : (
                            <Link href={crumb.href} className="truncate hover:text-text-secondary">
                              {crumb.label}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              </div>
              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <span className="hidden items-center gap-2 rounded-full bg-brand-cyan/10 px-3 py-1 text-[11px] tracking-wide text-brand-cyan sm:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                  Oturum doğrulandı
                </span>
                <Link
                  href="/"
                  className="hidden min-h-11 items-center gap-1.5 rounded-lg px-3 text-[13px] text-text-secondary hover:text-text-primary md:inline-flex"
                >
                  <Icon name="open_in_new" className="text-[16px]" />
                  Siteyi görüntüle
                </Link>
                <form action={signOutAdmin}>
                  <button
                    type="submit"
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 px-3 text-[13px] text-text-secondary hover:border-white/20 hover:text-text-primary"
                  >
                    <Icon name="logout" className="text-[18px]" />
                    Çıkış
                  </button>
                </form>
              </div>
            </div>
            <nav
              aria-label="Modüller"
              className="overflow-x-auto border-t border-white/6 px-4 py-2 sm:px-6 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div ref={moduleRowRef} className="relative flex w-max min-w-full gap-1">
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute top-0 left-0 z-0 h-11 rounded-lg bg-white/8",
                    modulePill.ready
                      ? "transition-[transform,width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                      : "opacity-0",
                  )}
                  style={{ width: modulePill.width, transform: `translateX(${modulePill.left}px)` }}
                />
                {adminNav.map((item) => {
                  const active = isAdminNavActive(pathname, item.href, item.exact);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative z-10 inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 text-[13px] whitespace-nowrap transition-colors duration-300",
                        active ? "text-brand-cyan" : "text-text-secondary hover:text-text-primary",
                      )}
                    >
                      <Icon name={item.icon} className="text-[18px]" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </header>
          <main id="admin-main" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
