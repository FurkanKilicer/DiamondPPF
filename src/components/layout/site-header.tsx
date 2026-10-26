"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Icon } from "@/components/ui/icon";
import { navItems, site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

const sectionIds = [
  "teklif-bolumu",
  "hizmetler",
  "garanti-takip",
  "ultimate-ppf",
  "test-lab",
  "ornek-araclar",
  "hikayemiz",
  "biz-kimiz",
];

function navKey(href: string) {
  return href.startsWith("/#") ? href.slice(1) : href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [activeHref, setActiveHref] = useState("/");

  useEffect(() => {
    let ticking = false;

    function apply(y: number) {
      const nextCompact = y > 36;
      setCompact((prev) => (prev === nextCompact ? prev : nextCompact));
      if (y < 160) setActiveHref((prev) => (prev === "/" ? prev : "/"));
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

  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        const next = `#${visible.target.id}`;
        setActiveHref((prev) => (prev === next ? prev : next));
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function isActive(href: string) {
    if (href === "/biz-kimiz") return pathname === "/biz-kimiz";
    if (href === "/iletisim") return pathname === "/iletisim";
    if (href === "/ppf-nedir") return pathname === "/ppf-nedir";
    if (href === "/ornek-araclar") return pathname === "/ornek-araclar";
    if (href === "/hizmetler") return pathname === "/hizmetler";
    if (pathname !== "/") return false;
    return activeHref === navKey(href);
  }

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 overflow-x-hidden"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className={cn("page-pad w-full max-w-full", compact && "md:pt-3")}>
      <div
        className={cn(
          "site-header-shell page-shell pointer-events-auto relative flex min-w-0 items-center justify-between",
          compact
            ? "h-12 gap-2 border border-white/10 bg-surface-canvas/85 px-0 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-md md:gap-3 md:rounded-full md:px-4 lg:px-5"
            : "h-16 gap-3 rounded-none border border-transparent bg-transparent px-0 md:h-20 md:gap-4",
        )}
      >
        <Link href="/" aria-label="Diamond PPF" className="header-enter group flex shrink-0 items-center">
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
            "header-enter flex min-w-0 shrink-0 items-center gap-2.5 md:gap-3",
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
                ? "h-8 w-8 rounded-full md:h-auto md:w-auto md:gap-1 md:px-3 md:py-1.5 md:text-[10px]"
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
