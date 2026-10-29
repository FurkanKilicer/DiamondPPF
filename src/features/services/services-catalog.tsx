import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { PageSection } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import {
  cardsInCategory,
  publicCategoryMeta,
  publicCategoryOrder,
  type PublicServiceCard,
} from "@/lib/cms/public-catalog";
import type { ServiceBadgeTone } from "@/lib/mock-data/services";
import { cn } from "@/lib/utils/cn";

function badgeClass(tone: ServiceBadgeTone, featured = false, light = false) {
  if (tone === "red") {
    return featured
      ? "border border-brand-red/30 bg-brand-red/10 text-brand-red"
      : "bg-brand-red/10 text-brand-red";
  }
  if (light) {
    return tone === "cyan" ? "bg-slate-100 text-slate-700" : "bg-slate-100 text-slate-800";
  }
  if (tone === "cyan") return "bg-surface-elevated text-primary";
  return featured
    ? "border border-white/10 bg-surface-elevated text-text-primary"
    : "bg-surface-elevated text-text-primary";
}

function ServiceCard({ service, light }: { service: PublicServiceCard; light: boolean }) {
  const surface = light ? "card-light" : "border border-white/10 bg-surface-card";
  const title = light ? "text-slate-900" : "text-text-primary";
  const body = light ? "text-slate-600" : "text-text-secondary";
  const muted = light ? "text-slate-500" : "text-text-muted";
  const line = light ? "border-slate-200" : "border-white/5";
  const cta = (
    <a
      href="#quick-quote-panel"
      className={cn(
        "inline-flex items-center gap-1 text-[13px] font-semibold",
        light ? "text-brand-red hover:text-slate-900" : "text-primary hover:text-white",
      )}
    >
      {service.cta}
      {service.cta.includes("↗") ? null : <Icon name="north_east" className="text-[16px]" />}
    </a>
  );

  if (service.layout === "featured") {
    return (
      <article
        id={service.htmlId}
        className={cn(
          "group relative flex h-full flex-col justify-between overflow-hidden rounded-xl p-6 shadow-lg transition-all hover:border-brand-red/40",
          surface,
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <span className={cn("label-caps rounded-md px-3 py-1 tracking-wider", badgeClass(service.badgeTone, true, light))}>
              {service.badge}
            </span>
            <Icon name={service.icon} className="text-[24px] text-primary-container" />
          </div>
          {service.imagePath ? (
            <div className="relative h-44 overflow-hidden rounded-lg">
              <Image
                src={service.imagePath}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 30vw, 100vw"
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t via-transparent to-transparent",
                  light ? "from-white" : "from-surface-card",
                )}
              />
            </div>
          ) : null}
          <h3 className={cn("font-display text-lg font-bold transition-colors", title)}>{service.title}</h3>
          <p className={cn("text-[14px] leading-relaxed", body)}>{service.body}</p>
          {service.stats ? (
            <div className={cn("grid grid-cols-3 gap-2 border-y py-3 text-[12px]", line, muted)}>
              {service.stats.map((stat) => (
                <div key={stat.label}>
                  <span className={cn("block font-semibold", title)}>{stat.value}</span>
                  {stat.label}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          {cta}
          <span className={cn("label-caps", muted)}>{service.meta}</span>
        </div>
      </article>
    );
  }

  if (service.layout === "split") {
    return (
      <article
        id={service.htmlId}
        className={cn("flex h-full flex-col gap-6 rounded-xl p-6 transition-all hover:border-brand-red/40 lg:flex-row", surface)}
      >
        {service.imagePath ? (
          <div className="relative h-40 shrink-0 overflow-hidden rounded-lg lg:w-48">
            <Image src={service.imagePath} alt={service.title} fill className="object-cover" sizes="192px" />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col justify-between gap-3">
          <div>
            <span className={cn("label-caps rounded-md px-2.5 py-0.5 tracking-wider", badgeClass(service.badgeTone, false, light))}>
              {service.badge}
            </span>
            <h3 className={cn("mt-2 font-display text-lg font-bold", title)}>{service.title}</h3>
            <p className={cn("mt-1 text-[14px] leading-relaxed", body)}>{service.body}</p>
          </div>
          <div className={cn("mt-auto flex items-center justify-between border-t pt-3", line)}>
            <span className={cn("text-[12px]", muted)}>{service.meta}</span>
            {cta}
          </div>
        </div>
      </article>
    );
  }

  if (service.layout === "spec") {
    return (
      <article
        id={service.htmlId}
        className={cn("flex h-full flex-col justify-between rounded-xl p-6 transition-all hover:border-brand-red/40", surface)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <span className={cn("label-caps rounded-md px-2.5 py-0.5 tracking-wider", badgeClass(service.badgeTone, false, light))}>
              {service.badge}
            </span>
            <Icon
              name={service.icon}
              className={cn("text-[24px]", service.badgeTone === "red" ? "text-brand-red" : light ? "text-slate-400" : "text-primary-container")}
            />
          </div>
          <h3 className={cn("font-display text-lg font-bold", title)}>{service.title}</h3>
          <p className={cn("text-[14px] leading-relaxed", body)}>{service.body}</p>
          {service.specLeft && service.specRight ? (
            <div
              className={cn(
                "flex items-center justify-between rounded-lg p-3 text-[12px]",
                light ? "bg-slate-50 text-slate-600" : "bg-surface-elevated/70 text-text-secondary",
              )}
            >
              <span>{service.specLeft}</span>
              <span className={cn("font-medium", title)}>{service.specRight}</span>
            </div>
          ) : null}
        </div>
        <div className={cn("mt-auto flex items-center justify-between border-t pt-4", line)}>
          <span className={cn("text-[12px]", muted)}>{service.meta}</span>
          {cta}
        </div>
      </article>
    );
  }

  return (
    <article
      id={service.htmlId}
      className={cn("flex h-full flex-col justify-between rounded-xl p-6 transition-all hover:border-brand-red/40", surface)}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <span className={cn("label-caps rounded-md px-2.5 py-0.5 tracking-wider", badgeClass(service.badgeTone, false, light))}>
            {service.badge}
          </span>
          <Icon name={service.icon} className={cn("text-[22px]", muted)} />
        </div>
        <h3 className={cn("font-display text-lg font-bold", title)}>{service.title}</h3>
        <p className={cn("text-[14px] leading-relaxed", body)}>{service.body}</p>
      </div>
      <div className={cn("mt-auto flex items-center justify-between border-t pt-4 text-[12px]", line, muted)}>
        <span>{service.meta}</span>
        {cta}
      </div>
    </article>
  );
}

function CategoryBlock({ cards, id }: { cards: PublicServiceCard[]; id: PublicServiceCard["category"] }) {
  const category = publicCategoryMeta(id, cards.length);
  if (!category) return null;
  const light = category.tone === "light";

  return (
    <div id={id} className="service-band-shell is-open scroll-mt-[7.25rem] md:scroll-mt-[8.5rem]">
      <div className="service-band-clip">
        <PageSection tone={category.tone}>
          <div
            className={cn(
              "mb-10 flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-end",
              light ? "border-slate-200" : "border-white/10",
            )}
          >
            <Reveal variant="left" className="flex max-w-2xl flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-[20px] font-bold tracking-tight text-brand-red">{category.n}</span>
                <span
                  className={cn(
                    "label-caps rounded-md border px-2.5 py-0.5 tracking-wider",
                    light
                      ? "border-slate-200 bg-white text-slate-600"
                      : "border-white/10 bg-surface-container-high text-primary",
                  )}
                >
                  {category.kicker}
                </span>
                <span className={cn("label-caps", light ? "text-slate-500" : "text-text-muted")}>{category.count}</span>
              </div>
              <h2 className={cn("headline-lg font-bold tracking-tight", light && "text-slate-900")}>{category.title}</h2>
            </Reveal>
            <p className={cn("max-w-lg text-[15px] leading-relaxed", light ? "text-slate-600" : "text-text-secondary")}>
              {category.body}
            </p>
          </div>
          <ul className={cn("grid items-stretch gap-6", category.grid)}>
            {cards.map((service, index) => (
              <li key={service.id} className="h-full" style={{ animationDelay: `${index * 45}ms` }}>
                <ServiceCard service={service} light={light} />
              </li>
            ))}
          </ul>
        </PageSection>
      </div>
    </div>
  );
}

export function ServicesCatalog({ cards }: { cards: PublicServiceCard[] }) {
  return (
    <>
      {publicCategoryOrder().map((id) => (
        <CategoryBlock key={id} id={id} cards={cardsInCategory(cards, id)} />
      ))}
    </>
  );
}
