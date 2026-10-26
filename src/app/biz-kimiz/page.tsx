import type { Metadata } from "next";
import { AboutHero } from "@/features/about/about-hero";
import { AboutQuote } from "@/features/about/about-quote";
import { AboutStory } from "@/features/about/about-story";
import { AboutStudio } from "@/features/about/about-studio";
import { AboutTeam } from "@/features/about/about-team";
import { AboutValues } from "@/features/about/about-values";
import { VideoModalProvider } from "@/features/home/video-modal";

export const metadata: Metadata = {
  title: "Biz Kimiz?",
  description:
    "Diamond PPF Turkey Gayrettepe: ekip, değerler, atölye ve Endura yetkili PPF uygulaması.",
  alternates: { canonical: "/biz-kimiz" },
};

export default function BizKimizPage() {
  return (
    <VideoModalProvider>
      <main className="min-h-screen w-full bg-surface-canvas pt-[4.5rem] md:pt-20">
        <AboutHero />
        <AboutStory />
        <AboutValues />
        <AboutTeam />
        <AboutStudio />
        <AboutQuote />
      </main>
    </VideoModalProvider>
  );
}
