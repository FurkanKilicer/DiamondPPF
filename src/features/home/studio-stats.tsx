import Link from "next/link";
import { CountUp } from "@/components/ui/count-up";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { ReelCarousel } from "@/features/home/reel-carousel";
import { VideoTrigger } from "@/features/home/video-modal";
import { site } from "@/lib/mock-data/content";

const metrics = [
  { end: 7, decimals: 0, prefix: "", suffix: "yıl", title: "Film Garantisi*", note: "Laboratuvar onaylı" },
  { end: 0.195, decimals: 3, prefix: "", suffix: "", title: "mm Kalınlık", note: "Mikron hassas ölçüm" },
  { end: 36, decimals: 0, prefix: "~", suffix: "", title: "Saat Teslim", note: "Komple PPF kaplama" },
  { end: 5, decimals: 1, prefix: "", suffix: "★", title: "Değerlendirme", note: `${site.reviewCount} müşteri incelemesi` },
];

export function StudioStats() {
  return (
    <section id="biz-kimiz" className="light-band py-10 md:py-16 lg:py-24">
      <div className="page-pad mx-auto flex page-shell flex-col gap-8 md:gap-12">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal variant="left" className="flex flex-col gap-3 md:gap-4 lg:col-span-5">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="label-caps rounded bg-white px-2 py-0.5 tracking-wider text-slate-500 md:px-2.5 md:py-1">Biz Kimiz</span>
              <span className="text-[12px] text-slate-500 md:text-[13px]">{site.studioLine}</span>
            </div>
            <h2 className="headline-lg tracking-tight text-slate-900">
              Atölyemizden <span className="italic font-semibold text-brand-red">son işler.</span>
            </h2>
            <p className="text-[14px] leading-5 text-slate-600 md:text-[15px] md:leading-6">
              Ekibimizin <strong>20 yılı aşkın</strong> tecrübesi ve kendi markamız <strong>Diamond PPF</strong>. Herkes
              uzman olduğu işi yapar; sonucu videolarda.
            </p>
            <Link href="/biz-kimiz" className="inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-red">
              Ekibimiz ve atölyemiz
              <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:col-span-7">
            {metrics.map((item, index) => (
              <Reveal key={item.title} variant="right" delayMs={index * 90}>
              <div className="card-light flex h-full flex-col justify-between rounded p-3 sm:p-5">
                <span className="font-display text-[1.65rem] font-bold leading-none text-slate-900 sm:text-4xl md:text-5xl">
                  <CountUp end={item.end} decimals={item.decimals} prefix={item.prefix} delayMs={index * 90} />
                  {item.suffix ? (
                    <>
                      {" "}
                      <span className="text-sm font-semibold text-brand-red sm:text-xl">{item.suffix}</span>
                    </>
                  ) : null}
                </span>
                <div className="pt-2 sm:pt-4">
                  <span className="block font-display text-[13px] font-semibold leading-snug text-slate-900 sm:text-base">{item.title}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-slate-500 sm:text-[13px]">{item.note}</span>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <Reveal variant="up" className="mt-8 md:mt-12">
        <ReelCarousel />
      </Reveal>
      <div className="page-pad mx-auto mt-8 grid page-shell grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
          <Reveal variant="left">
          <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl bg-white p-5 md:gap-6 md:p-8">
            <div>
              <span className="label-caps mb-2 block tracking-wider text-slate-500">Tanıtım Filmi · 3:48</span>
              <h3 className="font-display text-lg font-semibold text-slate-900 md:text-2xl">Atölyemizi izleyin</h3>
              <p className="mt-2 text-[13px] text-slate-600 md:text-[15px]">
                Hassas lazer kesim, tozsuz iklimlendirilmiş bay odaları ve 20 yıllık usta kadromuz.
              </p>
            </div>
            <VideoTrigger className="inline-flex items-center gap-3 font-display text-sm text-slate-900">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-on-primary shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                <Icon name="play_arrow" className="text-[24px]" />
              </span>
              Filmi Oynat
            </VideoTrigger>
          </div>
          </Reveal>
          <Reveal variant="right" delayMs={100}>
          <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl bg-white p-5 md:gap-6 md:p-8">
            <div>
              <span className="label-caps mb-2 block tracking-wider text-brand-magenta">Kullandığımız Ürün</span>
              <h3 className="font-display text-lg font-semibold text-slate-900 md:text-2xl">Diamond PPF</h3>
              <p className="mt-2 text-[13px] text-slate-600 md:text-[15px]">
                Kendi markamız, kendi garantimiz. 200 mikron poliüretan optik netlik ve hidrofobik kendini onaran üst
                katman.
              </p>
            </div>
            <a href="#ultimate-ppf" className="inline-flex items-center gap-2 font-display text-sm text-brand-red">
              Ürünü Keşfedin
              <Icon name="arrow_forward" className="text-[18px]" />
            </a>
          </div>
          </Reveal>
      </div>
    </section>
  );
}
