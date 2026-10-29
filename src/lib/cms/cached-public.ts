import { cacheLife, cacheTag } from "next/cache";
import { listPublishedCmsGallery, listPublishedCmsServices } from "@/lib/cms/queries";

export const CMS_GALLERY_PUBLIC_TAG = "cms-gallery-public";
export const CMS_SERVICES_PUBLIC_TAG = "cms-services-public";

/** İstemci 1 saat sunucuya gitmeden RSC’yi kullanır; CMS yazınca updateTag düşürür. */
const PUBLIC_CMS_LIFE = { stale: 3600, revalidate: 3600, expire: 86400 } as const;

export async function getCachedPublishedGallery() {
  "use cache";
  cacheLife(PUBLIC_CMS_LIFE);
  cacheTag(CMS_GALLERY_PUBLIC_TAG);
  return listPublishedCmsGallery();
}

export async function getCachedPublishedServices() {
  "use cache";
  cacheLife(PUBLIC_CMS_LIFE);
  cacheTag(CMS_SERVICES_PUBLIC_TAG);
  return listPublishedCmsServices();
}
