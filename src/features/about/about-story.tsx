import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { aboutStats } from "@/lib/mock-data/about";
import { site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

export function AboutStory() {
  return (
    <PageSection id="hikayemiz" tone="light">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <Reveal variant="left" className="space-y-6 lg:col-span-6">
          <div className="space-y-2">
            <SectionKicker icon="history_edu">Hikâyemiz ve felsefemiz</SectionKicker>
            <h2 className="headline-lg font-bold tracking-tight text-slate-900">Ustalıkla kurulmuş bir işletme.</h2>
          </div>
          <p className="text-[15px] leading-relaxed text-slate-600 md:text-lg">
            Diamond PPF Turkey’i 2023’te, otomotiv sektöründe yılların ustalığıyla kurduk. Önceliğimiz her zaman müşteri
            memnuniyeti oldu. Çok kâr etmeyi değil; kaliteli ürünü herkes için ulaşılabilir kılmayı, şeffaf süreçlerle
            güven inşa etmeyi ve güçlü bir usta ekibi yetiştirerek istihdam sağlamayı ilke edindik.
          </p>
          <p className="leading-relaxed text-slate-500">
            Gayrettepe’de kurduğumuz steril laboratuvar ortamında her otomobili kendi özel mühendislik projemiz gibi ele
            alıyor, sökümden teslimata dek fabrikasyon toleransları titizlikle koruyoruz.
          </p>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <div className="card-light flex items-center gap-3 rounded-lg p-3">
              <Image src={site.logoMark} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
              <div>
                <p className="font-display text-sm font-bold leading-tight text-slate-900">Diamond PPF</p>
                <p className="text-[12px] text-slate-500">Resmi yetkili uygulama merkezi</p>
              </div>
            </div>
            <div className="hidden h-10 w-px bg-slate-200 sm:block" />
            <p className="flex items-center gap-2 text-[12px] tracking-wider text-slate-600 uppercase">
              <Icon name="verified" className="text-[18px] text-brand-red" />
              Klinik temizlikte tozsuz uygulama kabini
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 lg:col-span-6">
          {aboutStats.map((item, index) => (
            <Reveal key={item.label} variant="right" delayMs={index * 70}>
              <article
                className={cn(
                  "card-light group relative overflow-hidden rounded-xl p-6 transition-all",
                  item.accent === "red" ? "hover:border-brand-red/50" : "hover:border-cyan-400/70",
                )}
              >
                <span
                  className={cn(
                    "absolute -right-4 -bottom-4 h-20 w-20 rounded-full blur-xl transition-all",
                    item.accent === "red"
                      ? "bg-brand-red/5 group-hover:bg-brand-red/15"
                      : "bg-cyan-400/10 group-hover:bg-cyan-400/20",
                  )}
                />
                <span className={cn("mb-3 block", item.accent === "red" ? "text-brand-red" : "text-cyan-600")}>
                  <Icon name={item.icon} filled={item.icon === "star"} className="text-[32px]" />
                </span>
                <p className="mb-1 font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-none font-bold tracking-tight text-slate-900">
                  {item.value}
                  {item.suffix ? <span className="text-brand-red">{item.suffix}</span> : null}
                  {item.unit ? (
                    <span className={cn("ml-1", item.unit === "★" ? "text-[24px] text-brand-red" : "text-[0.55em]")}>
                      {item.unit}
                    </span>
                  ) : null}
                </p>
                <h3 className="mb-1 font-display font-semibold text-slate-900">{item.label}</h3>
                <p className="text-[13px] text-slate-500">{item.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <p className="mt-4 text-right text-[11px] text-slate-500">
        *Garanti yalnızca uygulanan PPF film için geçerlidir. Kapsam ve koşullar dijital garanti belgesinde saklıdır.
      </p>
    </PageSection>
  );
}
