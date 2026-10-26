import { quoteWhatsAppHref, site, waEmoji } from "@/lib/mock-data/content";

export type GalleryBrand =
  | "Porsche"
  | "Mercedes-AMG"
  | "BMW"
  | "Audi"
  | "Togg"
  | "Tesla"
  | "Land Rover"
  | "Mercedes";

export const galleryVehicles: {
  id: string;
  title: string;
  brand: GalleryBrand;
  filter: Exclude<GalleryBrand, "Mercedes"> | "Mercedes-AMG";
  kicker: string;
  package: string;
  tags: readonly string[];
  body: string;
  cure: string;
  src: string;
}[] = [
  {
    id: "bmw-i8",
    title: "BMW i8 Coupé",
    brand: "BMW",
    filter: "BMW",
    kicker: "BMW M Serie",
    package: "Şeffaf parlak PPF",
    tags: ["7 yıl garanti", "Komple gövde", "195 mikron"],
    body: "Çizik onarıcı hidrofobik zırh, kelebek kapı iç oluklarına sıfır paylı kıvrım ve UV koruyucu optik şeffaflık.",
    cure: "36 saat",
    src: "/images/stitch-11.jpg",
  },
  {
    id: "cla-45",
    title: "Mercedes-AMG CLA 45",
    brand: "Mercedes-AMG",
    filter: "Mercedes-AMG",
    kicker: "AMG Performance",
    package: "Mat PPF & karartma",
    tags: ["Mat dönüşüm", "Gece paketi", "Saten doku"],
    body: "Orijinal parlak siyah boyadan saten mat zırha dönüşüm. Piano black ve karbon difüzörlerde optik koruma.",
    cure: "48 saat",
    src: "/images/stitch-12.jpg",
  },
  {
    id: "gt3-rs",
    title: "Porsche 911 GT3 RS",
    brand: "Porsche",
    filter: "Porsche",
    kicker: "Weissach Spec",
    package: "Komple PPF + karbon",
    tags: ["Pist koruması", "Yüksek darbe", "195 mikron"],
    body: "Açık karbon kaput, çamurluk havalandırma yarıkları ve arka kanada plotter kesimli kalkan.",
    cure: "40 saat",
    src: "/images/stitch-16.jpg",
  },
  {
    id: "model-y",
    title: "Tesla Model Y Long Range",
    brand: "Tesla",
    filter: "Tesla",
    kicker: "EV Performance",
    package: "Renkli TPU PPF",
    tags: ["Renk değişimi", "Mat kırmızı", "Cam tavan"],
    body: "Orijinal boyayı sökmeden mat kırmızı pigment koruması, panoramik cam tavan ve seramik cam filmi.",
    cure: "36 saat",
    src: "/images/stitch-13.jpg",
  },
  {
    id: "m5",
    title: "BMW M5 Competition",
    brand: "BMW",
    filter: "BMW",
    kicker: "BMW Motorsport",
    package: "Şeffaf PPF + seramik",
    tags: ["Hibrit koruma", "195 mikron", "Seramik"],
    body: "Taş çarpmasına karşı ön yol, kaput ve yan basamaklar; üst yüzeye hidrofobik seramik.",
    cure: "32 saat",
    src: "/images/stitch-15.jpg",
  },
  {
    id: "togg",
    title: "Togg T10F & T10X",
    brand: "Togg",
    filter: "Togg",
    kicker: "Togg Akıllı Cihaz",
    package: "Mat PPF & ön ızgara",
    tags: ["Yerli uyum", "Mat saten", "195 mikron"],
    body: "Radar ve otonom kameraları engellemeyen optik TPU, komple matlaşma ve far koruma.",
    cure: "24 saat",
    src: "/images/stitch-14.jpg",
  },
  {
    id: "rr-sport",
    title: "Range Rover Sport",
    brand: "Land Rover",
    filter: "Land Rover",
    kicker: "Land Rover Special",
    package: "Şeffaf PPF entegrasyonu",
    tags: ["Komple gövde", "Basamak", "195 mikron"],
    body: "Panellerin arkasına kıvrılan kenarlar, gizli kapı kolları ve elektrikli basamak koruması.",
    cure: "48 saat",
    src: "/images/stitch-08.jpg",
  },
  {
    id: "rs7",
    title: "Audi RS7 Sportback",
    brand: "Audi",
    filter: "Audi",
    kicker: "Audi Sport",
    package: "Komple parlak PPF",
    tags: ["RS Dynamic", "Far karartma", "195 mikron"],
    body: "Nardo gri gövdeye ayna parlaklığı, lazer far kalkanı ve arka rüzgarlıkta dikişsiz kaplama.",
    cure: "36 saat",
    src: "/images/stitch-18.jpg",
  },
  {
    id: "eqs",
    title: "Mercedes-Benz EQS",
    brand: "Mercedes",
    filter: "Mercedes-AMG",
    kicker: "EQ Intelligent",
    package: "Dış + iç trim PPF",
    tags: ["İç ekran", "Trim", "Parlak şeffaf"],
    body: "Aerodinamik gövde koruması yanında Hyperscreen ve piano black konsola parmak izi bırakmayan film.",
    cure: "30 saat",
    src: "/images/stitch-09.jpg",
  },
];

export const galleryFilters = [
  "Tümü",
  "Porsche",
  "Mercedes-AMG",
  "BMW",
  "Audi",
  "Togg",
  "Tesla",
  "Land Rover",
] as const;

export const galleryDetails = [
  {
    title: "0 mm pay",
    note: "Izgara & rozet",
    body: "Lazer hassasiyetinde sıfır açıklık kenar kesimi; fabrika boyasının tonuyla birebir berraklık.",
    src: "/images/stitch-17.jpg",
  },
  {
    title: "Sökümsüz oturma",
    note: "Rozet yuvaları",
    body: "Parçalar sökülmeden 3D dijital şablonla harflerin arasına milimetrik gömülen kıvrımlar.",
    src: "/images/stitch-19.jpg",
  },
  {
    title: "Gerilme izsiz",
    note: "Yıldız birleşimleri",
    body: "Hava kabarcığı, portakal kabuğu ve gerilme izi bırakmayan termal sabitlenmiş oturuş.",
    src: "/images/stitch-20.jpg",
  },
  {
    title: "Panel boşluğu",
    note: "Far & çamurluk",
    body: "Far birleşiminde görünmez kenar; film varlığı gözle ayırt edilemez.",
    src: "/images/stitch-21.jpg",
  },
] as const;

export const galleryVideos = [
  {
    title: "Peugeot 3008 — Kapıda derin darbe",
    meta: "1:30 · Anlatımlı",
    body: "Yan kapıya gelen sürtme sonrası film söküldü; boyada sıfır çizik, orijinal yüzey korundu.",
    src: "/images/stitch-22.jpg",
  },
  {
    title: "BMW XM — Şeffaf PPF 195 mikron",
    meta: "0:13 · Hızlı kesit",
    body: "Büyük gövde panellerine tek parça serme ve ızgara çevresi mikron kesimi.",
    src: "/images/stitch-23.jpg",
  },
  {
    title: "Audi A3 — Mat saten dönüşüm",
    meta: "Kısa kesit",
    body: "Parlak mavi gövdeden saten mat zırha geçiş ve karartılmış ışık barı.",
    src: "/images/stitch-24.jpg",
  },
] as const;

export const galleryAtelier = [
  "/images/stitch-01.jpg",
  "/images/stitch-04.jpg",
  "/images/stitch-05.jpg",
  "/images/stitch-06.jpg",
  "/images/stitch-07.jpg",
  "/images/stitch-25.jpg",
  "/images/stitch-26.jpg",
  "/images/stitch-27.jpg",
] as const;

export const galleryStats = [
  { icon: "directions_car", value: `${galleryVehicles.length}+`, label: "Arşivlenen referans" },
  { icon: "verified_user", value: "7 yıl", label: "Resmi dijital garanti" },
  { icon: "check_circle", value: "%100", label: "Dikişsiz kenar" },
  { icon: "star", value: site.rating, label: "Google memnuniyet" },
] as const;

export function galleryWhatsAppHref(vehicleTitle: string) {
  const message = `Merhaba Diamond PPF ekibi, ${waEmoji.car} ${vehicleTitle} uygulaması için fiyat ve randevu bilgisi almak istiyorum.`;
  return quoteWhatsAppHref(message);
}
