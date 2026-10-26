import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { PageSection } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { contactChannels, contactJumps } from "@/lib/mock-data/contact";
import { site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

const toneHover = {
  red: "hover:border-brand-red/50",
  emerald: "hover:border-emerald-500/50",
  cyan: "hover:border-primary-container/50",
} as const;

const toneIcon = {
  red: "text-brand-red group-hover:bg-brand-red group-hover:text-white",
  emerald: "text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white",
  cyan: "text-primary-container group-hover:bg-primary-container group-hover:text-on-primary",
} as const;

const toneAction = {
  red: "text-brand-red",
  emerald: "text-emerald-400",
  cyan: "text-primary-container",
} as const;

export function ContactHero() {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 bg-gradient-to-b from-brand-red/10 via-transparent to-transparent blur-3xl"
        aria-hidden
      />
      <PageSection bordered={false}>
        <nav aria-label="Sayfa konumu" className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-text-muted">
          <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-text-primary">
            <Icon name="home" className="text-[15px]" />
            Ana Sayfa
          </Link>
          <span className="text-text-muted/60" aria-hidden>
            /
          </span>
          <span className="font-medium text-text-primary">İletişim</span>
        </nav>
        <Reveal variant="left" className="mb-8 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card px-3 py-1.5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="label-caps tracking-widest text-text-primary">Canlı klinik</span>
            <span className="font-mono text-[11px] text-text-muted">·</span>
            <span className="label-caps tracking-wider text-text-secondary">{site.workshopLabel}</span>
          </div>
          <p className="label-caps tracking-[0.2em] text-brand-red">Kesintisiz danışmanlık & rezervasyon</p>
          <h1 className="max-w-3xl font-display text-[clamp(2.1rem,5.4vw,4rem)] font-bold leading-none tracking-tight">
            Size nasıl{" "}
            <span className="bg-gradient-to-r from-text-primary via-brand-red to-[#FF3338] bg-clip-text text-transparent">
              yardımcı olalım?
            </span>
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-text-secondary md:text-lg">
            Teklif, randevu ya da teknik sorularınız için bize ulaşın. {site.areaLabel} atölyemizde steril kabin
            koşullarında yürütülen PPF süreçlerini yerinde incelemek üzere her zaman bekleriz.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {contactJumps.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="label-caps inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-card px-4 py-2 tracking-wider text-text-secondary transition-all hover:border-brand-red/50 hover:bg-surface-elevated hover:text-text-primary"
              >
                {item.featured ? <span className="h-1.5 w-1.5 rounded-full bg-brand-red" /> : null}
                {item.label}
              </a>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {contactChannels.map((card, index) => (
            <Reveal key={card.title} variant="up" delayMs={index * 60}>
              <article
                className={cn(
                  "group flex h-full flex-col justify-between rounded-xl border border-border-subtle bg-surface-card p-6 transition-all",
                  toneHover[card.tone],
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors",
                        toneIcon[card.tone],
                      )}
                    >
                      <Icon name={card.icon} filled={card.icon === "star"} className="text-[22px]" />
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-text-muted uppercase">{card.kicker}</span>
                  </div>
                  <h2 className="font-display text-lg font-bold">{card.title}</h2>
                  {"highlight" in card && card.highlight ? (
                    <p className="font-display text-xl font-bold tracking-tight">{card.highlight}</p>
                  ) : null}
                  <p className="text-[13px] leading-relaxed text-text-secondary">{card.body}</p>
                </div>
                <a
                  href={card.href}
                  {...(card.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className={cn(
                    "label-caps mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 tracking-wider",
                    toneAction[card.tone],
                  )}
                >
                  {card.action}
                  <Icon name="arrow_forward" className="text-[16px] transition-transform group-hover:translate-x-0.5" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
