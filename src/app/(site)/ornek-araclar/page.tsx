import type { Metadata } from "next";
import { Suspense } from "react";
import { GalleryPageSkeleton } from "@/features/gallery/gallery-page-skeleton";
import { GalleryQuote } from "@/features/gallery/gallery-quote";
import { PublishedGallerySection } from "@/features/gallery/published-gallery-section";
import { VideoModalProvider } from "@/features/home/video-modal";

export const metadata: Metadata = {
  title: "Örnek Araçlar",
  description:
    "Diamond PPF Turkey Gayrettepe gerçek uygulamalar: BMW, Mercedes, Porsche, Tesla, Togg ve diğer referanslar.",
  alternates: { canonical: "/ornek-araclar" },
};

export default function OrnekAraclarPage() {
  return (
    <VideoModalProvider>
      <main className="min-h-screen w-full bg-surface-canvas pt-[4.5rem] md:pt-20">
        <Suspense fallback={<GalleryPageSkeleton />}>
          <PublishedGallerySection />
        </Suspense>
        <GalleryQuote />
      </main>
    </VideoModalProvider>
  );
}
