"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState, type TransitionEvent } from "react";
import { createPortal } from "react-dom";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Icon } from "@/components/ui/icon";
import { mobileMenuDiscover, mobileMenuPrimary, site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

function itemActive(href: string, pathname: string, hash: string) {
  if (href === "/") return pathname === "/" && hash === "";
  if (href.startsWith("/#")) return pathname === "/" && hash === href.slice(1);
  return pathname === href;
}

function MenuLink({
  href,
  label,
  active,
  indent = false,
  primary = false,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  indent?: boolean;
  primary?: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "flex min-h-12 items-center gap-3.5 rounded-lg",
        indent ? "py-3 pl-9 pr-2" : "py-3.5 pr-2",
        primary ? "font-display text-[1.55rem] font-semibold leading-none tracking-tight" : "text-[16px] leading-snug",
        active ? "text-text-primary" : "text-text-secondary hover:text-text-primary",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full",
          active ? "bg-brand-red" : "bg-transparent",
        )}
        aria-hidden
      />
      <span className="min-w-0 flex-1 text-left">{label}</span>
      <Icon name="chevron_right" className="text-[22px] text-text-muted" />
    </Link>
  );
}

const enterEase = "duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";

export function MobileNav() {
  const pathname = usePathname();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [hash, setHash] = useState("");
  const openingRef = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useLayoutEffect(() => {
    if (!rendered || !openingRef.current) return;
    openingRef.current = false;
    const frame = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(frame);
  }, [rendered]);

  useEffect(() => {
    if (!rendered) return;
    const trigger = triggerRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);

    const media = window.matchMedia("(min-width: 1280px)");
    const onViewport = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onViewport);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onViewport);
      trigger?.focus();
    };
  }, [rendered]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open || !rendered) return;
    const timeout = window.setTimeout(() => setRendered(false), 360);
    return () => window.clearTimeout(timeout);
  }, [open, rendered]);

  function close() {
    setOpen(false);
  }

  function toggle() {
    if (open) {
      setOpen(false);
      return;
    }
    openingRef.current = true;
    setRendered(true);
  }

  function onPanelTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "opacity") return;
    if (!open) setRendered(false);
  }

  const rowMotion = cn(
    "transform-gpu transition-[opacity,transform]",
    enterEase,
    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
  );

  const panel =
    rendered && typeof document !== "undefined"
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onTransitionEnd={onPanelTransitionEnd}
            className={cn(
              "fixed inset-0 z-[80] flex flex-col bg-surface-card xl:hidden",
              "origin-top transform-gpu transition-[opacity,transform]",
              enterEase,
              open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
            )}
          >
            <div
              className={cn(
                "flex items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4",
                rowMotion,
              )}
              style={{ transitionDelay: open ? "40ms" : "0ms" }}
            >
              <span className="w-10" aria-hidden />
              <Link href="/" onClick={close} className="flex justify-center" aria-label="Diamond PPF">
                <BrandLogo compact />
              </Link>
              <button
                ref={closeRef}
                type="button"
                aria-label="Menüyü kapat"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-text-primary"
                onClick={close}
              >
                <Icon name="close" className="text-[22px]" />
              </button>
            </div>

            <h2 id={titleId} className="sr-only">
              Site menüsü
            </h2>

            <nav aria-label="Mobil" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6">
              <ul className="flex flex-col gap-0.5">
                {mobileMenuPrimary.map((item, index) => (
                  <li
                    key={item.href + item.label}
                    className={rowMotion}
                    style={{ transitionDelay: open ? `${60 + index * 28}ms` : "0ms" }}
                  >
                    <MenuLink
                      href={item.href}
                      label={item.label}
                      primary
                      active={itemActive(item.href, pathname, hash)}
                      onNavigate={close}
                    />
                  </li>
                ))}
              </ul>

              <div
                className={cn("mx-2 mt-5 mb-3 border-t border-white/10", rowMotion)}
                style={{ transitionDelay: open ? "180ms" : "0ms" }}
              />
              <p
                className={cn(
                  "px-3 pb-2 pt-1 text-[11px] tracking-[0.2em] text-text-muted uppercase",
                  rowMotion,
                )}
                style={{ transitionDelay: open ? "200ms" : "0ms" }}
              >
                Keşfedin
              </p>
              <ul className="flex flex-col gap-0.5">
                {mobileMenuDiscover.map((item, index) => (
                  <li
                    key={item.href + item.label}
                    className={rowMotion}
                    style={{ transitionDelay: open ? `${220 + index * 24}ms` : "0ms" }}
                  >
                    <MenuLink
                      href={item.href}
                      label={item.label}
                      indent={"indent" in item && item.indent}
                      active={itemActive(item.href, pathname, hash)}
                      onNavigate={close}
                    />
                  </li>
                ))}
              </ul>
            </nav>

            <div
              className={cn(
                "border-t border-white/10 px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
                rowMotion,
              )}
              style={{ transitionDelay: open ? "360ms" : "0ms" }}
            >
              <p className="mb-4 text-center font-mono text-[13px] leading-relaxed text-text-muted">
                <a href={site.phoneHref} className="text-text-secondary">
                  {site.phoneDisplay}
                </a>
                {" · WhatsApp "}
                <a href={site.whatsappHref} className="text-text-secondary">
                  {site.whatsappDisplay}
                </a>
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/iletisim#quote-section"
                  onClick={close}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/20 font-display text-sm font-semibold text-text-primary"
                >
                  <Icon name="calendar_month" className="text-[18px]" />
                  Randevu al
                </Link>
                <a
                  href={site.whatsappHref}
                  onClick={close}
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-white font-display text-sm font-semibold text-slate-900"
                >
                  Teklif al
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={open}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface-card text-text-primary xl:hidden"
        onClick={toggle}
      >
        <Icon name={open || rendered ? "close" : "menu"} className="text-[22px]" />
      </button>
      {panel}
    </>
  );
}
