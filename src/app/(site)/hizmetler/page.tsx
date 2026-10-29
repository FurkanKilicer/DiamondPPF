import type { Metadata } from "next";
import { Suspense } from "react";
import { PublishedServicesSection } from "@/features/services/published-services-section";
import { ServicesView } from "@/features/services/services-view";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Diamond PPF Turkey Gayrettepe hizmetleri: 195µm PPF, renkli TPU, far koruma, yan basamak, dashcam, PDR ve detay.",
  alternates: { canonical: "/hizmetler" },
};

function ServicesCatalogFallback() {
  return (
    <div className="min-h-[24rem]" aria-busy="true">
      <p className="sr-only">Hizmetler yükleniyor</p>
    </div>
  );
}

export default function HizmetlerPage() {
  return (
    <main className="min-h-screen w-full bg-surface-canvas pt-[4.5rem] md:pt-20">
      <ServicesView>
        <Suspense fallback={<ServicesCatalogFallback />}>
          <PublishedServicesSection />
        </Suspense>
      </ServicesView>
    </main>
  );
}
