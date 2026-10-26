"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { documentTitleForPath } from "@/lib/seo/site";

function isUrlFallbackTitle(title: string): boolean {
  if (!title) return true;
  const { host, pathname, search, href } = window.location;
  return (
    title === href ||
    title === `${host}${pathname}${search}` ||
    title === `${host}${pathname}`
  );
}

export function DocumentTitleSync() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const desired = documentTitleForPath(pathname);
    document.title = desired;

    const observer = new MutationObserver(() => {
      if (!document.title || isUrlFallbackTitle(document.title)) {
        document.title = desired;
      }
    });
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
