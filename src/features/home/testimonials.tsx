import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { TestimonialSlider } from "@/features/home/testimonial-slider";
import { site } from "@/lib/mock-data/content";
import { googleReviews } from "@/lib/mock-data/reviews";

export function Testimonials() {
  return (
    <section id="yorumlar" className="page-pad relative overflow-hidden bg-surface-canvas py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <Reveal variant="fade">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-card px-4 py-1.5">
            <span className="font-display text-xl font-bold">{site.rating}</span>
            <div className="flex text-brand-magenta">
              {Array.from({ length: 5 }).map((_, index) => (
                <Icon key={index} name="star" filled className="text-[20px]" />
              ))}
            </div>
            <span className="ml-2 text-[13px] text-text-muted">
              {site.reviewCount} Google yorumu · {site.rating} ortalama
            </span>
          </div>
        </Reveal>
        <Reveal variant="up" delayMs={100} className="flex w-full justify-center">
          <TestimonialSlider items={googleReviews} />
        </Reveal>
        <Reveal variant="up" delayMs={180}>
          <a
            href={site.mapsReviewsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-display text-sm text-primary-container"
          >
            Tüm yorumlarımızı inceleyin
            <Icon name="arrow_forward" className="text-[18px]" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
