"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils/cn";

const tests = [
  { title: "Çizik ve Kendini Toparlama", note: "Tel fırça ve ısı simülasyonu", heading: "01 · Çizik ve Kendini Toparlama Testi", body: "Filmli yüzeye çelik tel fırçayla kontrollü mikro çizikler atılır, ardından ısı uygulanır. Termoplastik poliüretan (TPU) hafıza tabakası 30 saniye içinde ilk pürüzsüz formuna geri döner." },
  { title: "Darbe Testi", note: "Yüksek hızlı çakıl fırlatma kalkanı", heading: "02 · Darbe Testi", body: "Yüksek hızlı çakıl simülasyonu ile filmin darbe emme kapasitesi kamera önünde ölçülür." },
  { title: "Kalınlık Ölçümü", note: "Dijital mikrometre ile 0,195 mm tescili", heading: "03 · Kalınlık Ölçümü", body: "Dijital mikrometre ile 0,195 mm (195µ) kalınlık tescil edilir." },
  { title: "Yapışma ve Esneklik", note: "%300 uzama ve basınçlı söküm dayanımı", heading: "04 · Yapışma ve Esneklik", body: "%300 uzama ve basınçlı söküm dayanımı laboratuvar ortamında doğrulanır." },
  { title: "Su İticilik (Hidrofobi)", note: "115° su temas açısı lotus etkisi", heading: "05 · Su İticilik", body: "115° su temas açısı ile lotus etkisi gözlemlenir." },
  { title: "Boya Koruma & UV Bariyeri", note: "Sararma ve matlaşmaya karşı 7 yıl blokaj", heading: "06 · UV Bariyeri", body: "Sararma ve matlaşmaya karşı 7 yıl UV blokajı." },
  { title: "Mukavemet & Kesilmezlik", note: "Sert cisim sürtünme testleri", heading: "07 · Mukavemet", body: "Sert cisim sürtünme testleriyle kesilmezlik kontrol edilir." },
  { title: "Esneklik & Kenar Tutuşu", note: "Kavisli tampon kıvrım testleri", heading: "08 · Kenar Tutuşu", body: "Kavisli tampon kıvrımlarında kenar tutuşu test edilir." },
  { title: "Alev Gösterimi", note: "Kendiliğinden sönen TPU yangın testi", heading: "09 · Alev Gösterimi", body: "Kendiliğinden sönen TPU yangın testi uygulanır." },
];

export function TestLab() {
  const [active, setActive] = useState(0);
  const current = tests[active];

  return (
    <section id="test-lab" className="page-pad relative overflow-hidden bg-surface-canvas py-20">
      <div className="pointer-events-none absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-primary-container/10 blur-[140px]" />
      <div className="page-shell relative flex flex-col gap-12">
        <div>
          <Reveal variant="fade">
            <div className="label-caps mb-3 inline-flex items-center gap-2 rounded bg-surface-elevated px-3 py-1 tracking-widest text-primary-container">
              <Icon name="science" className="text-[16px]" />
              Diamond PPF Test Lab
            </div>
          </Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal variant="left">
              <h2 className="display-title tracking-tight">
                Söylemiyoruz. <br />
                <span className="gradient-word">Gösteriyoruz.</span>
              </h2>
            </Reveal>
            <Reveal variant="right" delayMs={100}>
              <p className="max-w-md text-[15px] leading-6 text-text-secondary">
                Diamond PPF’yi kamera önünde, kontrollü testlerle kanıtlıyoruz. Sesi açın; testi bizzat uygulayan ustamız
                mikron mikron anlatsın.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <Reveal variant="left" className="flex flex-col overflow-hidden rounded-2xl bg-surface-card lg:col-span-7">
            <div className="relative aspect-[16/10] w-full">
              <Image src="/images/stitch-15.jpg" alt="Çizik sonrası kendini toparlayan PPF testi" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent" />
              <div className="absolute top-4 left-4 rounded bg-surface-canvas/80 px-3 py-1 font-mono text-[12px] backdrop-blur">
                <span className="font-bold text-primary-container">TEST {String(active + 1).padStart(2, "0")} / 09</span> · Aktif Test
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2 rounded bg-surface-canvas/80 px-3 py-1 text-[12px] backdrop-blur">
                <Icon name="volume_up" className="text-[16px]" />
                Sesi Aç
              </div>
              <div className="absolute bottom-4 left-4 flex max-w-xs flex-col gap-1 rounded bg-surface-canvas/90 p-4 backdrop-blur">
                <span className="label-caps text-primary-container">Ölçülen Kalınlık</span>
                <span className="font-display text-xl font-semibold font-mono">0,195 mm (195µ)</span>
                <span className="text-[13px] text-text-muted">60°C sıcak su ve fönle anında moleküler kendi kendini onarma.</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl font-bold">{current.heading}</h3>
                <span className="label-caps rounded bg-primary-container/20 px-2.5 py-0.5 text-primary-container">Tam Başarı</span>
              </div>
              <p className="text-[15px] leading-6 text-text-secondary">{current.body}</p>
            </div>
          </Reveal>
          <div className="flex flex-col gap-2 lg:col-span-5">
            {tests.map((test, index) => (
              <Reveal key={test.title} variant="right" delayMs={Math.min(index, 5) * 55}>
              <button
                type="button"
                className={cn(
                  "flex w-full items-center justify-between rounded-lg p-4 text-left",
                  index === active ? "bg-brand-red/10" : "bg-surface-card hover:bg-surface-elevated",
                )}
                style={index === active ? { borderLeft: "4px solid #E31E24" } : undefined}
                onClick={() => setActive(index)}
              >
                <div className="flex items-center gap-3">
                  <span className={cn("font-mono font-bold", index === active ? "text-brand-red" : "text-text-muted")}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="block font-display text-base font-semibold">{test.title}</span>
                    <span className="text-[13px] text-text-muted">{test.note}</span>
                  </div>
                </div>
                <Icon name={index === active ? "play_circle" : "play_arrow"} className={index === active ? "text-brand-red" : "text-text-muted"} />
              </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
