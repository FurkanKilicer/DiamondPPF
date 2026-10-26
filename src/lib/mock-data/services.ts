export type ServiceCategoryId = "koruma" | "konfor" | "guvenlik" | "onarim";
export type ServiceCardLayout = "featured" | "compact" | "split" | "spec";
export type ServiceBadgeTone = "red" | "cyan" | "muted";

export const serviceFilters: { id: ServiceCategoryId; label: string }[] = [
  { id: "koruma", label: "Koruma (9)" },
  { id: "konfor", label: "Konfor & Donanım (4)" },
  { id: "guvenlik", label: "Güvenlik & Kamera (2)" },
  { id: "onarim", label: "Onarım & Yenileme (4)" },
];

export const serviceCategories: {
  id: ServiceCategoryId;
  n: string;
  title: string;
  kicker: string;
  count: string;
  body: string;
  icon: string;
  grid: string;
  tone: "canvas" | "light";
}[] = [
  {
    id: "koruma",
    n: "01",
    title: "Koruma uygulamaları",
    kicker: "Boya, cam & yüzey zırhı",
    count: "9 hizmet",
    body: "Orijinal fabrika verniğinizi, optik camlarınızı ve hassas piano black iç konsolu dış etkenlere karşı koruyan 195µm alifatik TPU zırhlar.",
    icon: "shield",
    grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    tone: "light",
  },
  {
    id: "konfor",
    n: "02",
    title: "Konfor & donanım çözümleri",
    kicker: "OEM entegrasyon",
    count: "4 hizmet",
    body: "Aracın orijinal elektrik tesisatını kesmeden, tak-çalıştır soketlerle fabrika standartlarında lüks konfor ve estetik dönüşümler.",
    icon: "airline_seat_recline_extra",
    grid: "grid-cols-1 md:grid-cols-2",
    tone: "canvas",
  },
  {
    id: "guvenlik",
    n: "03",
    title: "Güvenlik & telematik",
    kicker: "24/7 gözetim & kayıt",
    count: "2 hizmet",
    body: "Seyir halinde ve park modunda aracınızı 360 derece güvenceye alan akıllı sensörler, 4K kameralar ve canlı uydu takip teknolojileri.",
    icon: "videocam",
    grid: "grid-cols-1 md:grid-cols-2",
    tone: "light",
  },
  {
    id: "onarim",
    n: "04",
    title: "Onarım & yenileme",
    kicker: "Orijinalliği koruyan restorasyon",
    count: "4 hizmet",
    body: "Aracınızın ikinci el değerini düşürmeden, fabrika mikron kalınlığını ve orijinal sac formunu koruyarak yapılan cerrahi müdahaleler.",
    icon: "auto_fix",
    grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    tone: "canvas",
  },
];

export const serviceItems: {
  id: string;
  category: ServiceCategoryId;
  layout: ServiceCardLayout;
  title: string;
  body: string;
  badge: string;
  badgeTone: ServiceBadgeTone;
  icon: string;
  meta: string;
  cta: string;
  src?: string;
  stats?: readonly { value: string; label: string }[];
  specLeft?: string;
  specRight?: string;
}[] = [
  {
    id: "ppf",
    category: "koruma",
    layout: "featured",
    title: "PPF kaplama (boya koruma filmi)",
    body: "Otoyol taş sekmesi, anahtar çiziği, kuş pisliği ve asit yağmuruna karşı kendi kendini 60°C sıcaklıkta onaran (self-healing) görünmez optik zırh.",
    badge: "195µm TPU · 7 yıl garanti",
    badgeTone: "red",
    icon: "shield",
    meta: "Plotter CAD kesim",
    cta: "Detay & teklif al",
    src: "/images/stitch-23.jpg",
    stats: [
      { value: "195µm", label: "Kalınlık" },
      { value: "60°C", label: "Isı onarımı" },
      { value: "7 yıl", label: "Garanti" },
    ],
  },
  {
    id: "renkli-ppf",
    category: "koruma",
    layout: "featured",
    title: "Renkli PPF (color change TPU)",
    body: "Rengi ve dokuyu (saten mat, parlak metalik, Nardo gri, dövme karbon) baştan yaratırken gövdeyi 195µm düzeyinde darbelere karşı zırhlar.",
    badge: "Orijinal boyayı bozmayan renk",
    badgeTone: "muted",
    icon: "palette",
    meta: "Alifatik polimer",
    cta: "Detay & teklif al",
    src: "/images/stitch-13.jpg",
    stats: [
      { value: "30+ renk", label: "Skalası" },
      { value: "%100", label: "İzsiz söküm" },
      { value: "7 yıl", label: "Garanti" },
    ],
  },
  {
    id: "far-stop",
    category: "koruma",
    layout: "featured",
    title: "Far & stop koruma zırhı",
    body: "Matrix ve laser far ünitelerini yüksek hızlı otoyol mıcır darbelerine, kılcal kumlama çiziklerine, UV sararmasına ve mikro çatlaklara karşı korur.",
    badge: "Yüksek hızlı taş bariyeri",
    badgeTone: "muted",
    icon: "highlight",
    meta: "Cerrahi montaj",
    cta: "Detay & teklif al",
    src: "/images/stitch-18.jpg",
    stats: [
      { value: "%99.4", label: "Net ışık" },
      { value: "UV blok", label: "Sararma yok" },
      { value: "Şeffaf/füme", label: "Opsiyon" },
    ],
  },
  {
    id: "jant",
    category: "koruma",
    layout: "compact",
    title: "Jant koruma & termal seramik",
    body: "Aşındırıcı balata demir tozunun alaşıma işlemesini engeller; asitli yıkama ihtiyacını azaltarak basınçlı suyla temizlik sağlar.",
    badge: "1200°C ısı direnci",
    badgeTone: "cyan",
    icon: "tire_repair",
    meta: "Fren tozu itici",
    cta: "Teklif al ↗",
  },
  {
    id: "tavan-cam",
    category: "koruma",
    layout: "compact",
    title: "Panoramik tavan cam koruma",
    body: "Geniş cam tavanlı elektrikli araçlarda (Tesla, Togg, Porsche) yüksek darbe emilimli şeffaf dış cam filmiyle pahalı cam değişimlerinin önüne geçer.",
    badge: "Dolu ve taş kalkanı",
    badgeTone: "red",
    icon: "roofing",
    meta: "Optik şeffaf zırh",
    cta: "Teklif al ↗",
  },
  {
    id: "ic-trim",
    category: "koruma",
    layout: "compact",
    title: "İç trim & ekran koruma",
    body: "Piano black orta konsol, dokunmatik ekranlar (Hyperscreen, MBUX) ve hassas kaplamaları tırnak ve anahtar çiziklerine karşı kalkanlar.",
    badge: "Bıçaksız 3D plotter kesim",
    badgeTone: "cyan",
    icon: "dashboard_customize",
    meta: "Mat / parlak seçenek",
    cta: "Teklif al ↗",
  },
  {
    id: "cam-filmi",
    category: "koruma",
    layout: "compact",
    title: "UV & ısı korumalı cam filmi",
    body: "Kabin içi sıcaklığını düşüren, klimaya binen yükü azaltan, iç deri döşemelerin çatlamasını engelleyen nanoseramik cam filmleri.",
    badge: "Sertifikalı nanoseramik",
    badgeTone: "cyan",
    icon: "solar_power",
    meta: "Sertifikalı nanoseramik",
    cta: "Teklif al ↗",
  },
  {
    id: "seramik",
    category: "koruma",
    layout: "compact",
    title: "Nano seramik kristal kaplama",
    body: "PPF üzerine veya doğrudan verniğe uygulanan, aşırı su iticilik (lotus efekti) ve derin ıslak görünüm kazandıran hibrit kristal kalkan.",
    badge: "9H sertlik & ayna parlaklığı",
    badgeTone: "muted",
    icon: "diamond",
    meta: "Lotus efekti",
    cta: "Teklif al ↗",
  },
  {
    id: "yagis",
    category: "koruma",
    layout: "compact",
    title: "Yağışlı hava güvenli sürüş paketi",
    body: "60 km/s hızın üzerinde silecek ihtiyacını azaltan, yoğun fırtınada ve gece yolculuklarında net görüş alanı yaratan cam kaplaması.",
    badge: "Cam hidrofobik kalkan",
    badgeTone: "cyan",
    icon: "water_drop",
    meta: "Net görüş güvenliği",
    cta: "Teklif al ↗",
  },
  {
    id: "basamak",
    category: "konfor",
    layout: "split",
    title: "Akıllı elektrikli yan basamak",
    body: "Kapı açıldığında milisaniyeler içinde dışarı uzanan, kapandığında şasi altına gizlenen, su geçirmez IP68 motorlu OEM soketli sistem.",
    badge: "Gizli montaj · 300 kg taşıma",
    badgeTone: "cyan",
    icon: "airline_seat_recline_extra",
    meta: "Defender, Range Rover, G-Serisi, SUV",
    cta: "İncele ↗",
    src: "/images/stitch-26.jpg",
  },
  {
    id: "gece-paketi",
    category: "konfor",
    layout: "split",
    title: "Opsidyen & gece paketi (chrome delete)",
    body: "Ön panjur, cam çerçeveleri, ayna kapakları ve bagaj çıtalarındaki parlak krom detayları ultra-parlak veya mat siyah folyo ile karartma.",
    badge: "Sportif lüks shadowline",
    badgeTone: "muted",
    icon: "palette",
    meta: "Garantili folyo uygulaması",
    cta: "İncele ↗",
    src: "/images/stitch-24.jpg",
  },
  {
    id: "bagaj",
    category: "konfor",
    layout: "compact",
    title: "Elektrikli akıllı bagaj sistemi",
    body: "Bagaj kapağını orijinal anahtar, kokpit butonu veya tampon altına yapılan temassız ayak hareketiyle yumuşakça açıp kapatan çift amortisörlü motor kiti.",
    badge: "Hands-free ayak sensörü",
    badgeTone: "muted",
    icon: "sensor_occupied",
    meta: "Sıkışma önleyici emniyet sensörü",
    cta: "Teklif al ↗",
  },
  {
    id: "soft-close",
    category: "konfor",
    layout: "compact",
    title: "Vakumlu yumuşak kapı (soft close)",
    body: "Kapıyı sert vurma ihtiyacını ortadan kaldırır. Hafifçe çekildiğinde mekanik kilit dili devreye girerek kapıyı sessiz ve vakumlu kilitler.",
    badge: "Sessiz akustik kapanış",
    badgeTone: "muted",
    icon: "lock",
    meta: "OEM kilit değişimi · kesmesiz",
    cta: "Teklif al ↗",
  },
  {
    id: "dashcam",
    category: "guvenlik",
    layout: "spec",
    title: "4K ön + arka park modlu kamera (dashcam)",
    body: "Aracınız park halindeyken darbe, çizilme veya şüpheli yaklaşmaları G-sensörü ile tespit edip dahili hafızaya kaydeden akıllı kamera sistemi.",
    badge: "Ön + arka · 4K HDR Sony sensör",
    badgeTone: "cyan",
    icon: "videocam",
    meta: "Kablo görünmez gizli hat",
    cta: "Detay & fiyat ↗",
    specLeft: "Aküyü bitirmeyen akıllı voltaj koruma",
    specRight: "Wi-Fi & mobil uygulama",
  },
  {
    id: "gps",
    category: "guvenlik",
    layout: "spec",
    title: "GPS araç takip & akıllı güvenlik",
    body: "Aracın anlık konumunu, batarya voltajını, hız ihlallerini ve izinsiz hareketleri akıllı telefon üzerinden bildiren telematik altyapısı.",
    badge: "Canlı konum & çekici alarmı",
    badgeTone: "red",
    icon: "satellite_alt",
    meta: "Yurt dışı / yurt içi dolaşım",
    cta: "Detay & fiyat ↗",
    specLeft: "Geofence güvenli bölge çiti",
    specRight: "Uzaktan kontak engelleme",
  },
  {
    id: "pdr",
    category: "onarim",
    layout: "compact",
    title: "Boyasız göçük onarımı (PDR)",
    body: "Dolu hasarları ve otopark kapı vuruklarını özel LED ışık çizgisi tünelinde, boyayı yakmadan orijinal formuna kavuşturma.",
    badge: "Orijinal boyaya sıfır zarar",
    badgeTone: "red",
    icon: "auto_fix",
    meta: "Değer kaybı: %0",
    cta: "İncele ↗",
  },
  {
    id: "kaporta",
    category: "onarim",
    layout: "compact",
    title: "Lüks kaporta & boya",
    body: "Hasarlı panellerin steril fırın kabininde, fabrika mikron kalınlığına uyumlu boyanması ve portakal kabuğu dokusunun eşlenmesi.",
    badge: "Dijital spektrometre",
    badgeTone: "cyan",
    icon: "format_paint",
    meta: "Boya kodu analizi",
    cta: "İncele ↗",
  },
  {
    id: "rotus",
    category: "onarim",
    layout: "compact",
    title: "Mikro lokal rötuş",
    body: "Taş sıçraması ve derin çiziklerde bütün paneli boyatmadan, mikron düzeyinde nokta dolgu ve zımpara tesviyesiyle lekesiz düzeltme.",
    badge: "Noktasal çözüm",
    badgeTone: "muted",
    icon: "brush",
    meta: "Panel boyatılmaz",
    cta: "İncele ↗",
  },
  {
    id: "cila",
    category: "onarim",
    layout: "compact",
    title: "Detaylı temizlik & cila",
    body: "Boya üzerindeki dairesel hare ve hologramları gideren polisaj, deri bakım ve teslim öncesi klinik temizlik.",
    badge: "3 aşamalı düzeltme",
    badgeTone: "muted",
    icon: "auto_awesome",
    meta: "Teslim cilası",
    cta: "İncele ↗",
  },
];

export const serviceBrands = [
  {
    id: "togg",
    name: "Togg",
    line: "T10X / T10F",
    models: "T10X & T10F",
    pack: "Komple 195µm TPU PPF + panoramik tavan cam + ön cam zırhı",
  },
  {
    id: "porsche",
    name: "Porsche",
    line: "Exotic GT",
    models: "911, Taycan, Macan",
    pack: "Komple stealth/parlak PPF + PDR + ısı korumalı cam",
  },
  {
    id: "tesla",
    name: "Tesla",
    line: "Model Y / 3",
    models: "Model Y & Model 3",
    pack: "195µm komple PPF + tavan camı + vakumlu kapı",
  },
  {
    id: "mercedes",
    name: "Mercedes",
    line: "EQ / AMG",
    models: "G-Serisi, S-Serisi, EQ",
    pack: "Elektrikli basamak + Hyperscreen PPF + komple zırh",
  },
  {
    id: "bmw",
    name: "BMW",
    line: "M / i Series",
    models: "i4, iX, M3, M5, X5",
    pack: "Opsidyen shadowline + komple PPF + seramik",
  },
  {
    id: "audi",
    name: "Audi",
    line: "RS / e-tron",
    models: "RS, e-tron, Q8",
    pack: "Full TPU PPF + dashcam 4K + far koruma filmi",
  },
  {
    id: "land-rover",
    name: "Land Rover",
    line: "Defender / RR",
    models: "Defender & Range Rover",
    pack: "Mat saten PPF + gizli elektrikli yan basamak",
  },
  {
    id: "diger",
    name: "Diğer",
    line: "Premium",
    models: "Tüm premium segmentler",
    pack: "Özel konfigürasyon & milimetrik panel analizi",
  },
] as const;

export const defaultServiceBrand = serviceBrands[2];

export const servicePromise = [
  { icon: "verified", tone: "cyan" as const, title: "7 yıl resmi garanti", body: "Sararma, çatlama ve kalkmaya karşı karekodlu dijital sertifika." },
  { icon: "videocam", tone: "red" as const, title: "Atölye kamera takibi", body: "Uygulama sürecini talep üzerine kayıt ve fotoğrafla paylaşırız." },
  { icon: "precision_manufacturing", tone: "cyan" as const, title: "Bıçaksız CAD plotter", body: "Aracınızın üzerinde falçata veya jilet kullanılmaz." },
] as const;

export const serviceQuoteOptions = [
  { value: "Komple PPF Kaplama", label: "Komple PPF", checked: true },
  { value: "Ön 3 Parça PPF", label: "Ön Koruma PPF", checked: false },
  { value: "Renkli TPU PPF", label: "Renkli PPF", checked: false },
  { value: "Isı Yalıtımlı Cam Filmi", label: "Cam Filmi", checked: false },
  { value: "Elektrikli Yan Basamak", label: "Elektrikli Basamak", checked: false },
  { value: "Nano Seramik Kristal", label: "Nano Seramik", checked: false },
  { value: "4K Park Modlu Dashcam", label: "4K Araç Kamerası", checked: false },
  { value: "Vakumlu Kapı & Bagaj", label: "Vakumlu Kapı", checked: false },
  { value: "Boyasız Göçük (PDR)", label: "Boyasız Göçük (PDR)", checked: false },
] as const;

export function brandVehicleValue(brand: (typeof serviceBrands)[number]) {
  return `${brand.name} ${brand.models.split(",")[0]}`;
}

export function brandRecommendation(brand: (typeof serviceBrands)[number]) {
  return `${brand.name} (${brand.models}) · ${brand.pack}`;
}

