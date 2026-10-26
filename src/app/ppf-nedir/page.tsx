import type { Metadata } from "next";
import { PpfAnatomy } from "@/features/ppf/ppf-anatomy";
import { PpfCta } from "@/features/ppf/ppf-cta";
import { PpfFaq } from "@/features/ppf/ppf-faq";
import { PpfHero } from "@/features/ppf/ppf-hero";
import { PpfMatrix } from "@/features/ppf/ppf-matrix";
import { PpfPackages } from "@/features/ppf/ppf-packages";
import { PpfPillars } from "@/features/ppf/ppf-pillars";

export const metadata: Metadata = {
  title: "PPF Nedir?",
  description:
    "Paint Protection Film nedir? Diamond PPF 195µm TPU katmanları, paketler, PPF–seramik farkı ve 7 yıl garanti.",
  alternates: { canonical: "/ppf-nedir" },
};

export default function PpfNedirPage() {
  return (
    <main className="min-h-screen w-full bg-surface-canvas pt-16 md:pt-20">
      <PpfHero />
      <PpfAnatomy />
      <PpfPillars />
      <PpfPackages />
      <PpfMatrix />
      <PpfFaq />
      <PpfCta />
    </main>
  );
}
