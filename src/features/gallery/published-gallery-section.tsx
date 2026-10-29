import { GalleryAtelier } from "@/features/gallery/gallery-atelier";
import { GalleryDetails } from "@/features/gallery/gallery-details";
import { GalleryGrid } from "@/features/gallery/gallery-grid";
import { GalleryHero } from "@/features/gallery/gallery-hero";
import { GalleryVideos } from "@/features/gallery/gallery-videos";
import { getCachedPublishedGallery } from "@/lib/cms/cached-public";
import { splitPublishedGallery } from "@/lib/cms/public-gallery";

export async function PublishedGallerySection() {
  const result = await getCachedPublishedGallery();
  const split = splitPublishedGallery(result.ok ? result.items : []);
  return (
    <>
      <GalleryHero archiveCount={split.vehicles.length} />
      <GalleryGrid cards={split.vehicles} />
      <GalleryDetails items={split.details} />
      <GalleryVideos items={split.videos} />
      <GalleryAtelier items={split.atelier} />
    </>
  );
}
