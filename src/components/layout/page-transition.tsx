"use client";

import { usePathname } from "next/navigation";
import { ViewTransition } from "react";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return children;
  return (
    <ViewTransition enter="nav-fade" exit="nav-fade">
      {children}
    </ViewTransition>
  );
}
