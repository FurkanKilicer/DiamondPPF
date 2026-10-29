import { Suspense, type ReactNode } from "react";
import { AdminPageSkeleton } from "@/features/admin/admin-page-skeleton";

export function AdminPageSuspense({ children }: { children: ReactNode }) {
  return <Suspense fallback={<AdminPageSkeleton />}>{children}</Suspense>;
}
