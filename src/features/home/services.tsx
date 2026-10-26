import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";

const categories = [
  { title: "Koruma", count: "9 Hizmet", icon: "shield", active: true, href: "/hizmetler#koruma" },
  { title: "Konfor & Donanım", count: "4 Hizmet", icon: "airline_seat_recline_extra", active: false, href: "/hizmetler#konfor" },
  { title: "Güvenlik", count: "2 Hizmet", icon: "videocam", active: false, href: "/hizmetler#guvenlik" },
  { title: "Onarım & Yenileme", count: "4 Hizmet", icon: "auto_fix", active: false, href: "/hizmetler#onarim" },
];

const services = [
  { src: "/images/stitch-23.jpg", tag: "Koruma", title: "PPF Kaplama", body: "Boyanızı taş izi, sürtme ve çiziklere karşı koruyan 195µm ultra optik şeffaf film.", meta: "7 Yıl Garanti", metaClass: "text-brand-red font-bold" },
  { src: "/images/stitch-24.jpg", tag: "Koruma", title: "Renkli PPF", body: "Aracınızın rengini ve dokusunu değiştirirken boyayı zırh gibi koruyan TPU renkli film.", meta: "60+ Renk Seçeneği", metaClass: "text-brand-magenta" },
  { src: "/images/stitch-25.jpg", tag: "Koruma", title: "Far & Cam Koruma", body: "Far camlarını otoyol taş darbelerine, sararmaya ve çatlamaya karşı tam korur.", meta: "UV Filtreli", metaClass: "text-brand-red" },
  { src: "/images/stitch-26.jpg", tag: "Konfor & Donanım", title: "Elektrikli Yan Basamak", body: "Kapı açılınca otomatik açılan, kapı kapanınca gövde altına kusursuz gizlenen basamak.", meta: "Sessiz Motor", metaClass: "text-brand-red" },
];

export function Services() {
  return (
    <section id="hizmetler" className="light-band page-pad py-20">
      <div className="page-shell flex flex-col gap-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal variant="left">
            <span className="label-caps mb-2 block tracking-widest text-brand-red">Hizmetlerimiz</span>
            <h2 className="headline-lg tracking-tight text-slate-900">Benim aracıma ne yapılabilir?</h2>
            <p className="mt-1 text-[15px] text-slate-600">İhtiyacınıza göre tasarlanmış koruma, konfor ve kişiselleştirme paketleri.</p>
          </Reveal>
          <Reveal variant="right" delayMs={80}>
          <Link href="/hizmetler" className="inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-red">
            Tüm Hizmetler Listesi
            <Icon name="arrow_forward" className="text-[18px]" />
          </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((item, index) => (
            <Reveal key={item.title} variant="up" delayMs={index * 70}>
            <Link
              href={item.href}
              className={`group flex h-full items-center justify-between rounded-xl bg-white p-4 ${item.active ? "border-2 border-brand-red shadow-[0_2px_6px_rgba(227,30,36,0.12)]" : "border border-slate-200"}`}
            >
              <div>
                <span className="block font-display text-base font-semibold text-slate-900">{item.title}</span>
                <span className="text-[13px] text-slate-500">{item.count}</span>
              </div>
              <Icon name={item.icon} className="text-slate-400" />
            </Link>
            </Reveal>
          ))}
        </div>
        <ul className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((item, index) => (
            <li key={item.title} className="h-full">
            <Reveal variant="up" delayMs={index * 90} className="h-full">
            <Link href="/hizmetler" className="card-light group flex h-full flex-col overflow-hidden rounded-xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={item.src} alt={item.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                <span className="label-caps absolute top-3 left-3 rounded bg-surface-canvas/80 px-2 py-0.5 text-primary-container backdrop-blur">
                  {item.tag}
                </span>
              </div>
              <div className="flex flex-grow flex-col justify-between gap-4 p-5">
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-[13px] text-slate-600">{item.body}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className={`label-caps font-mono ${item.metaClass}`}>{item.meta}</span>
                  <Icon name="arrow_forward" className="text-slate-400" />
                </div>
              </div>
            </Link>
            </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
