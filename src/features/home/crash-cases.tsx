import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";

const cases = [
  { src: "/images/stitch-16.jpg", brand: "Peugeot 3008", title: "Kapıda Derin Darbe", time: "1:30 · Anlatımlı", hot: true, body: "Film söküldü · Boyasız göçük onarımı yapıldı, fabrika boyası sıfır hasarla kurtarıldı." },
  { src: "/images/stitch-17.jpg", brand: "Chery Omoda 7", title: "Önden Darbe", time: "0:56 · Anlatımlı", hot: false, body: "Film söküldü · Çizik sadece filmde kaldı, kaporta ve astar zarar görmedi." },
  { src: "/images/stitch-18.jpg", brand: "Chery Tiggo 8", title: "Kamyona Çarptı", time: "1:14 · Anlatımlı", hot: true, body: "Boyasız göçük onarımı yapıldı, Mat PPF tek parça yenilendi." },
  { src: "/images/stitch-19.jpg", brand: "Togg T10F", title: "Arka Çamurluk Kazası", time: "1:29 · Anlatımlı", hot: false, body: "Film hasarı emdi; film söküldü, aynı gün içinde parça yenilendi." },
];

export function CrashCases() {
  return (
    <section id="ultimate-ppf" className="light-band page-pad py-16 lg:py-24">
      <div className="page-shell flex flex-col gap-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal variant="left">
            <span className="label-caps mb-2 block tracking-widest text-brand-magenta">Gerçek Kazalar · Kanıt Odası</span>
            <h2 className="headline-lg tracking-tight text-slate-900">
              Kaza sonrası, <span className="italic font-semibold text-brand-red">Diamond PPF’nin gerçek sınavı.</span>
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] text-slate-600">
              Diamond PPF korumalı araçlarımız kazaya karıştığında filmi kamera önünde söküyor, altındaki boyayı olduğu
              gibi gösteriyoruz. Göçükleri <strong>boyasız onarıyor</strong>, filmi yeniliyoruz.
            </p>
          </Reveal>
          <Reveal variant="right" delayMs={80}>
          <a href="#teklif-bolumu" className="inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-5 py-3 font-display text-sm text-slate-900 shadow-sm whitespace-nowrap">
            Boyasız Göçük Onarımı
            <Icon name="build" className="text-[18px] text-brand-red" />
          </a>
          </Reveal>
        </div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((item, index) => (
            <li key={item.title}>
            <Reveal variant="up" delayMs={index * 100}>
            <div className="relative aspect-[9/15] overflow-hidden rounded-xl bg-surface-card">
              <Image src={item.src} alt={item.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-canvas via-surface-canvas/40 to-transparent" />
              <div className={`absolute top-3 left-3 rounded px-2 py-1 font-mono text-[11px] ${item.hot ? "bg-brand-magenta/90 font-bold" : "bg-surface-canvas/80"}`}>
                {item.time}
              </div>
              <div className="absolute right-4 bottom-4 left-4">
                <span className="label-caps text-primary-container">{item.brand}</span>
                <h3 className="font-display text-base font-bold">{item.title}</h3>
                <p className="mt-1 text-[13px] text-text-secondary">{item.body}</p>
              </div>
            </div>
            </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
