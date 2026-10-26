import type { Metadata } from "next";
import { GalleryAtelier } from "@/features/gallery/gallery-atelier";
import { GalleryDetails } from "@/features/gallery/gallery-details";
import { GalleryGrid } from "@/features/gallery/gallery-grid";
import { GalleryHero } from "@/features/gallery/gallery-hero";
import { GalleryQuote } from "@/features/gallery/gallery-quote";
import { GalleryVideos } from "@/features/gallery/gallery-videos";
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
      <main className="min-h-screen w-full bg-surface-canvas pt-16 md:pt-20">
        <GalleryHero />
        <GalleryGrid />
        <GalleryDetails />
        <GalleryVideos />
        <GalleryAtelier />
        <GalleryQuote />
      </main>
    </VideoModalProvider>
  );
}
