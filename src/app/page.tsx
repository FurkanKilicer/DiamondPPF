import { Contact } from "@/features/home/contact";
import { Craftsmanship } from "@/features/home/craftsmanship";
import { CrashCases } from "@/features/home/crash-cases";
import { Gallery } from "@/features/home/gallery";
import { Hero } from "@/features/home/hero";
import { Services } from "@/features/home/services";
import { StudioStats } from "@/features/home/studio-stats";
import { Testimonials } from "@/features/home/testimonials";
import { TestLab } from "@/features/home/test-lab";
import { Tracking } from "@/features/home/tracking";
import { VideoModalProvider } from "@/features/home/video-modal";

export default function Home() {
  return (
    <VideoModalProvider>
      <main className="w-full bg-surface-canvas pt-16 md:pt-20">
        <Hero />
        <StudioStats />
        <Craftsmanship />
        <Gallery />
        <TestLab />
        <CrashCases />
        <Tracking />
        <Services />
        <Testimonials />
        <Contact />
      </main>
    </VideoModalProvider>
  );
}
