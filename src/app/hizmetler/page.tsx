import type { Metadata } from "next";
import { ServicesView } from "@/features/services/services-view";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Diamond PPF Turkey Gayrettepe hizmetleri: 195µm PPF, renkli TPU, far koruma, yan basamak, dashcam, PDR ve detay.",
  alternates: { canonical: "/hizmetler" },
};

export default function HizmetlerPage() {
  return (
    <main className="min-h-screen w-full bg-surface-canvas pt-16 md:pt-20">
      <ServicesView />
    </main>
  );
}
