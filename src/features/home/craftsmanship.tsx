import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  { src: "/images/stitch-08.jpg", label: "01 · Mikron Kesim" },
  { src: "/images/stitch-09.jpg", label: "02 · Tozsuz Uygulama" },
  { src: "/images/stitch-10.jpg", label: "03 · Isıl Kilitlenme" },
];

export function Craftsmanship() {
  return (
    <section id="hikayemiz" className="page-pad relative overflow-hidden bg-surface-canvas py-20">
      <div className="page-shell flex flex-col items-center gap-8 text-center">
        <Reveal variant="fade">
          <div className="label-caps inline-flex items-center gap-2 rounded bg-surface-elevated px-3 py-1 tracking-widest text-primary-container">
            İşçiliğimiz · Hassas Standart
          </div>
        </Reveal>
        <Reveal variant="up" delayMs={80} className="max-w-3xl space-y-4">
          <h2 className="display-title tracking-tight">
            Herkes, uzman olduğu <br />
            <span className="gradient-word">işi yapar</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-7 text-text-secondary">
            Bizim farkımız; tek kişinin her işi yapması değil, sökümden kesime, gerdirmeden kenar kıvırmaya kadar
            herkesin yalnızca uzman olduğu işi yapmasıdır.
          </p>
        </Reveal>
        <Reveal variant="fade" delayMs={160} className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#test-lab"
            className="inline-flex items-center gap-2 rounded bg-surface-elevated px-6 py-3.5 font-display text-sm tracking-wider uppercase"
          >
            İşçiliği Keşfedin
            <Icon name="arrow_forward" className="text-[18px] text-primary-container" />
          </a>
          <a
            href="#garanti-takip"
            className="inline-flex items-center gap-2 rounded bg-surface-card px-6 py-3.5 font-display text-sm tracking-wider text-text-secondary uppercase"
          >
            Süreci Adım Adım Görün
            <Icon name="timeline" className="text-[18px]" />
          </a>
        </Reveal>
        <div className="grid w-full grid-cols-1 gap-6 pt-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.label} variant="up" delayMs={index * 110}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-card">
              <Image src={step.src} alt={step.label} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-canvas via-transparent to-transparent" />
              <span className="label-caps absolute bottom-4 left-4 rounded bg-surface-canvas/80 px-3 py-1 backdrop-blur">
                {step.label}
              </span>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
