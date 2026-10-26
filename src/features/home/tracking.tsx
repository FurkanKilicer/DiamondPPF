import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/mock-data/content";

export function Tracking() {
  return (
    <section id="garanti-takip" className="page-pad relative overflow-hidden bg-surface-canvas py-20">
      <div className="page-shell grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <Reveal variant="left">
            <span className="label-caps mb-2 block tracking-widest text-primary-container">Garanti ve Dijital Takip</span>
            <h2 className="headline-lg tracking-tight">
              Aracınız bizdeyken, <br />
              <span className="gradient-word">kontrol sizde.</span>
            </h2>
            <p className="mt-4 text-lg leading-7 text-text-secondary">
              200 mikron kalınlığındaki Diamond PPF ürünümüz <strong>7 yıl garantilidir*</strong>. Aracınızı bıraktıktan
              sonra hangi işlemin tamamlandığını, hangisinin sürdüğünü telefonunuzdan anlık izlersiniz.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Reveal variant="up" delayMs={40}>
            <div className="flex h-full flex-col gap-2 rounded-xl bg-surface-card p-5">
              <Icon name="assignment_turned_in" className="text-[28px] text-brand-red" />
              <h3 className="font-display text-base font-semibold">Dijital Kabul</h3>
              <p className="text-[13px] text-text-secondary">Fotoğraf, kilometre ve mikron boya ölçümü kayda geçer; onayınız SMS ile alınır.</p>
            </div>
            </Reveal>
            <Reveal variant="up" delayMs={120}>
            <div className="flex h-full flex-col gap-2 rounded-xl bg-surface-card p-5">
              <Icon name="phonelink_ring" className="text-[28px] text-brand-red" />
              <h3 className="font-display text-base font-semibold">Takip Linki</h3>
              <p className="text-[13px] text-text-secondary">Aracınızın hangi bay odasında ve hangi usta tarafından yapıldığını canlı izleyin.</p>
            </div>
            </Reveal>
            <Reveal variant="up" delayMs={200}>
            <div className="flex h-full flex-col gap-2 rounded-xl bg-surface-card p-5">
              <Icon name="verified_user" className="text-[28px] text-brand-red" />
              <h3 className="font-display text-base font-semibold">Dijital Garanti</h3>
              <p className="text-[13px] text-text-secondary">Teslimatta QR kodlu uluslararası geçerli garanti belgeniz kayıtlı olarak açılır.</p>
            </div>
            </Reveal>
          </div>
          <Reveal variant="fade" delayMs={80} className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#teklif-bolumu" className="cta-red inline-flex items-center gap-2 rounded px-6 py-3 font-display text-sm font-bold tracking-wider uppercase">
              Garanti Sistemimiz
              <Icon name="arrow_forward" className="text-[18px]" />
            </a>
            <a
              href={site.guaranteeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded bg-surface-elevated px-6 py-3 font-display text-sm tracking-wider uppercase"
            >
              <Icon name="qr_code_scanner" className="text-[18px] text-primary-container" />
              Garantimi Sorgula
            </a>
          </Reveal>
        </div>
        <Reveal variant="right" delayMs={140} className="flex justify-center lg:col-span-5">
          <div className="w-full max-w-sm rounded-[2.5rem] bg-surface-container-high p-3 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="flex flex-col gap-5 rounded-[2.2rem] bg-surface-canvas p-6">
              <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                <div>
                  <span className="font-mono text-[11px] text-text-muted">ATÖLYE CANLI AKIŞI</span>
                  <h3 className="font-display text-base font-bold">Mercedes-Benz CLA</h3>
                  <p className="text-[12px] text-primary-container">Full PPF · Tahmini Teslim: Yarın 17:00</p>
                </div>
                <span className="h-3 w-3 animate-ping rounded-full bg-primary-container" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-mono text-[12px]">
                  <span className="text-text-secondary">8 adımdan 5’i tamamlandı</span>
                  <span className="font-bold text-primary-container">%62</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-elevated">
                  <div className="h-full w-[62%] bg-gradient-to-r from-primary-container to-brand-red" />
                </div>
              </div>
              <div className="space-y-3 text-[13px]">
                {[
                  ["Kabul & Ekspertiz (24 nokta)", "09:12"],
                  ["Klinik Yıkama & Dekontaminasyon", "10:40"],
                  ["Yüzey Hazırlığı & Pasta Cila", "13:05"],
                  ["Hassas Plotter Bıçaksız Kesim", "13:30"],
                ].map(([label, time]) => (
                  <div key={label} className="flex items-center justify-between text-text-secondary">
                    <div className="flex items-center gap-2.5">
                      <Icon name="check_circle" className="text-[16px] text-primary-container" />
                      <span>{label}</span>
                    </div>
                    <span className="font-mono text-[11px]">{time}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between rounded bg-surface-elevated p-2 font-bold text-primary-container">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary-container" />
                    <span className="text-text-primary">Kaplama (Bay 02 - Usta Hasan)</span>
                  </div>
                  <span className="rounded bg-primary-container/20 px-2 py-0.5 font-mono text-[11px] uppercase">Şimdi</span>
                </div>
                {[
                  "Isıtma & Son Kontrol",
                  "Montaj, Sertifika & Teslim",
                ].map((label) => (
                  <div key={label} className="flex items-center justify-between text-text-muted">
                    <div className="flex items-center gap-2.5">
                      <Icon name="radio_button_unchecked" className="text-[16px]" />
                      <span>{label}</span>
                    </div>
                    <span className="font-mono text-[11px]">—</span>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <span className="mb-2 block text-[11px] tracking-wider text-text-muted uppercase">Canlı Bay Fotoğrafları</span>
                <div className="grid grid-cols-3 gap-2">
                  {["/images/stitch-20.jpg", "/images/stitch-21.jpg", "/images/stitch-22.jpg"].map((src) => (
                    <div key={src} className="relative aspect-square overflow-hidden rounded bg-surface-card">
                      <Image src={src} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
