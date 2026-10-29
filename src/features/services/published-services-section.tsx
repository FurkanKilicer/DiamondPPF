import { publicServiceNavItems, toPublicServiceCard } from "@/lib/cms/public-catalog";
import { getCachedPublishedServices } from "@/lib/cms/cached-public";
import { ServicesCatalog } from "@/features/services/services-catalog";
import { ServicesNav } from "@/features/services/services-nav";

export async function PublishedServicesSection() {
  const result = await getCachedPublishedServices();
  const cards = result.ok ? result.items.map(toPublicServiceCard) : [];
  return (
    <>
      <ServicesNav items={publicServiceNavItems(cards)} />
      <ServicesCatalog cards={cards} />
    </>
  );
}
