"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";

let overlayLockCount = 0;

const DRAWER_OPEN_MS = 420;
const DRAWER_CLOSE_MS = 340;
const SCRIM_MS = 280;
const OPEN_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const CLOSE_EASE = "cubic-bezier(0.4, 0, 1, 1)";

function motionDuration(ms: number) {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : ms;
}

function play(
  element: HTMLElement,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions,
) {
  element.getAnimations().forEach((animation) => animation.cancel());
  return element.animate(keyframes, { ...options, fill: "forwards" });
}

export function AdminOverlay({
  open,
  onClose,
  labelledBy,
  describedBy,
  panelClassName,
  closeDisabled,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  panelClassName?: string;
  closeDisabled?: boolean;
  children: ReactNode;
}) {
  const [portalReady, setPortalReady] = useState(false);
  const [shown, setShown] = useState(open);
  const [exiting, setExiting] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLButtonElement>(null);
  const motionGen = useRef(0);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (open) {
      setShown(true);
      setExiting(false);
      return;
    }
    if (shown) setExiting(true);
  }, [open, shown]);

  useLayoutEffect(() => {
    if (!shown) return;
    const panel = panelRef.current;
    const scrim = scrimRef.current;
    if (!panel || !scrim) return;

    const gen = ++motionGen.current;
    if (open) {
      play(panel, [{ transform: "translate3d(100%, 0, 0)" }, { transform: "translate3d(0, 0, 0)" }], {
        duration: motionDuration(DRAWER_OPEN_MS),
        easing: OPEN_EASE,
      });
      play(scrim, [{ opacity: 0 }, { opacity: 1 }], {
        duration: motionDuration(SCRIM_MS),
        easing: "ease",
      });
      return;
    }

    const closeMs = motionDuration(DRAWER_CLOSE_MS);
    play(scrim, [{ opacity: 1 }, { opacity: 0 }], {
      duration: motionDuration(SCRIM_MS),
      easing: "ease",
    });
    const animation = play(
      panel,
      [{ transform: "translate3d(0, 0, 0)" }, { transform: "translate3d(100%, 0, 0)" }],
      { duration: closeMs, easing: CLOSE_EASE },
    );
    const finish = () => {
      if (motionGen.current !== gen) return;
      setShown(false);
      setExiting(false);
    };
    animation.addEventListener("finish", finish);
    if (closeMs === 0) finish();
    return () => {
      animation.removeEventListener("finish", finish);
    };
  }, [open, shown]);

  useEffect(() => {
    if (!shown) return;
    const main = document.getElementById("admin-main");
    const scrollTop = main?.scrollTop ?? window.scrollY;
    overlayLockCount += 1;
    if (main) main.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || closeDisabled || exiting) return;
      const dialogs = document.querySelectorAll('[role="dialog"]');
      if (dialogs.item(dialogs.length - 1) !== panelRef.current) return;
      onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      overlayLockCount -= 1;
      if (overlayLockCount === 0 && main) {
        main.style.overflow = "";
        main.scrollTop = scrollTop;
      }
    };
  }, [shown, onClose, closeDisabled, exiting]);

  if (!portalReady || !shown) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        ref={scrimRef}
        type="button"
        className="absolute inset-0 bg-black/65"
        aria-label="Pencereyi kapat"
        disabled={closeDisabled || exiting}
        onClick={() => {
          if (!closeDisabled && !exiting) onClose();
        }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        className={cn(
          "relative z-10 flex h-dvh w-full max-w-lg flex-col overflow-hidden rounded-none border-l border-white/10 bg-surface-card shadow-2xl sm:max-w-xl sm:rounded-l-2xl",
          panelClassName,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
