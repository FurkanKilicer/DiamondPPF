"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Icon } from "@/components/ui/icon";
import { navItems, site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    let ticking = false;

    function apply(y: number) {
      const nextCompact = y > 36;
      setCompact((prev) => (prev === nextCompact ? prev : nextCompact));
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        apply(window.scrollY);
        ticking = false;
      });
    }

    apply(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string) {
    return pathname === href;
  }

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className={cn("w-full min-w-0", compact && "md:px-4 md:pt-3")}>
      <div
        className={cn(
          "site-header-shell page-shell pointer-events-auto relative flex min-w-0 items-center justify-between gap-3 px-4 sm:px-5 lg:px-8",
          compact
            ? "h-14 border border-transparent bg-surface-canvas/90 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-md sm:h-12 md:rounded-full md:border-white/10 md:px-5"
            : "h-16 border border-transparent bg-surface-canvas/80 backdrop-blur-md md:h-20 md:bg-transparent md:backdrop-blur-none",
        )}
      >
        <Link href="/" aria-label="Diamond PPF" className="header-enter group flex min-w-0 shrink items-center">
          <BrandLogo compact={compact} priority />
        </Link>
        <nav
          aria-label="Ana"
          className={cn("hidden min-w-0 items-center xl:flex", compact ? "gap-5" : "gap-8")}
        >
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              data-active={isActive(item.href)}
              className={cn(
                "header-enter nav-link label-caps shrink-0 whitespace-nowrap tracking-wider transition-colors",
                compact ? "py-1 text-[11px]" : "py-1 text-[13px]",
                isActive(item.href)
                  ? "font-semibold text-text-primary"
                  : "font-medium text-text-secondary hover:text-text-primary",
              )}
              style={{ animationDelay: `${120 + index * 50}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div
          className={cn(
            "header-enter flex shrink-0 items-center gap-2 sm:gap-3",
          )}
          style={{ animationDelay: "380ms" }}
        >
          <a
            href={site.phoneHref}
            aria-label={site.phoneDisplay}
            className={cn(
              "hidden items-center rounded-full border border-border-subtle/80 bg-surface-card/80 font-display tracking-wider transition hover:border-primary-container/40 hover:bg-surface-elevated lg:flex",
              compact ? "h-8 w-8 justify-center" : "gap-2 px-3 py-2 text-[13px]",
            )}
          >
            <Icon name="call" className="text-[16px] text-brand-red" />
            <span className={cn("font-mono font-medium", compact && "sr-only")}>{site.phoneDisplay}</span>
          </a>
          <Link
            href="/iletisim#quote-section"
            className={cn(
              "cta-red inline-flex shrink-0 items-center justify-center font-display font-bold tracking-wider uppercase",
              compact
                ? "h-9 w-9 rounded-full sm:h-8 sm:w-8 md:h-auto md:w-auto md:gap-1 md:px-3 md:py-1.5 md:text-[10px]"
                : "cta-red-pulse h-10 w-10 rounded-full md:h-auto md:w-auto md:gap-2 md:rounded md:px-5 md:py-2.5 md:text-[11px]",
            )}
          >
            <Icon name="calendar_month" className="text-[18px] md:text-[16px]" />
            <span className="hidden md:inline">Randevu Al</span>
          </Link>
          <MobileNav />
        </div>
      </div>
      </div>
      {compact ? null : <div className="header-scan" aria-hidden />}
    </header>
  );
}
