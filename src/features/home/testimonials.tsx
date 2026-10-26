import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/mock-data/content";

export function Testimonials() {
  return (
    <section id="yorumlar" className="page-pad relative overflow-hidden bg-surface-canvas py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <Reveal variant="fade">
        <div className="inline-flex items-center gap-2 rounded-full bg-surface-card px-4 py-1.5">
          <span className="font-display text-xl font-bold">5,0</span>
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
        <Reveal variant="up" delayMs={100}>
        <blockquote className="headline-lg max-w-3xl leading-snug md:text-[56px] md:leading-16">
          “Kaliteli hizmet, harika sonuç. Diamond PPF ekibi işine gerçekten aşık. Verdikleri sözü tam zamanında yerine
          getirdiler.”
        </blockquote>
        </Reveal>
        <Reveal variant="fade" delayMs={180}>
        <div className="flex flex-col items-center gap-1">
          <span className="font-display text-base font-bold">Suat A.</span>
          <span className="text-[13px] text-text-secondary">Nissan Qashqai · Komple Diamond PPF Uygulaması</span>
        </div>
        </Reveal>
        <Reveal variant="up" delayMs={240}>
        <a href="#yorumlar" className="flex items-center gap-2 font-display text-sm text-primary-container">
          Bütün Müşteri Yorumlarını Oku
          <Icon name="arrow_forward" className="text-[18px]" />
        </a>
        </Reveal>
      </div>
    </section>
  );
}
