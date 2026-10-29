import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { VideoTrigger } from "@/features/home/video-modal";
import type { PublicGalleryVideo } from "@/lib/cms/public-gallery";

export function GalleryVideos({ items }: { items: PublicGalleryVideo[] }) {
  if (items.length === 0) return null;

  return (
    <PageSection id="videolar">
      <Reveal variant="fade" className="mb-10 max-w-3xl space-y-3">
        <SectionKicker icon="play_circle">Kanıtlı dayanıklılık</SectionKicker>
        <h2 className="headline-lg font-bold tracking-tight">Söylemiyoruz. Gösteriyoruz: atölyeden videolar</h2>
        <p className="text-[15px] text-text-secondary">
          Kontrollü uygulamalar ve kaza sonrası filmin sökülüp altındaki fabrika boyasının incelendiği kayıtlar.
        </p>
      </Reveal>
      <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={item.id}>
            <Reveal variant="up" delayMs={index * 80}>
              <article className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-card">
                <VideoTrigger className="group relative block aspect-video w-full overflow-hidden">
                  <Image src={item.src} alt={item.title} fill className="object-cover" sizes="(min-width: 1024px) 30vw, 100vw" />
                  <span className="absolute inset-0 flex items-center justify-center bg-surface-canvas/35">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white">
                      <Icon name="play_arrow" className="text-[28px]" />
                    </span>
                  </span>
                  <span className="sr-only">{item.title} videosunu aç</span>
                </VideoTrigger>
                <div className="space-y-2 p-5">
                  <p className="inline-flex items-center gap-1.5 text-[12px] text-text-muted">
                    <Icon name="schedule" className="text-[16px]" />
                    {item.meta}
                  </p>
                  <h3 className="font-display text-lg font-bold">{item.title}</h3>
                  <p className="text-[14px] leading-relaxed text-text-secondary">{item.body}</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
