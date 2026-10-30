import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NotFoundScreen } from "@/features/not-found/not-found-screen";

export const metadata: Metadata = {
  title: "Bu panel şablonda yok",
  description: "Aradığınız sayfa kesilmemiş. Diamond PPF atölyesine dönün veya bir önceki işleme gidin.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Suspense fallback={null}>
        <SiteHeader />
      </Suspense>
      <NotFoundScreen />
      <SiteFooter />
    </>
  );
}
