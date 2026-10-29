import { Suspense } from "react";
import { PageTransition } from "@/components/layout/page-transition";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={children}>
      <PageTransition>{children}</PageTransition>
    </Suspense>
  );
}
