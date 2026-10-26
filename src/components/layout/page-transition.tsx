import { ViewTransition } from "react";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="nav-fade" exit="nav-fade">
      {children}
    </ViewTransition>
  );
}
