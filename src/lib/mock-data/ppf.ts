import { quoteWhatsAppHref, waEmoji } from "@/lib/mock-data/content";

export const ppfJumps = [
  { href: "#anatomi", label: "Anatomi", featured: true },
  { href: "#kaplama-haritasi", label: "Paketler", featured: false },
  { href: "#karsilastirma", label: "PPF vs seramik", featured: false },
  { href: "#sss", label: "SSS", featured: false },
] as const;

export const ppfStats = [
  {
    value: "195",
    unit: "µm",
    label: "Gerçek kalınlık",
    note: "0,195 mm TPU bariyer; evde ölçülen mikron değerimiz.",
    accent: "cyan" as const,
  },
  {
    value: "7",
    unit: "Yıl",
    label: "Dijital garanti",
    note: "Sararma, çatlama ve soyulmaya karşı karekodlu resmi takip.",
    accent: "red" as const,
  },
  {
    value: "60",
    unit: "°C",
    label: "Self-healing",
    note: "Güneş veya kaput ısısıyla kılcal çizikler kendiliğinden kapanır.",
    accent: "cyan" as const,
  },
  {
    value: "%100",
    unit: "",
    label: "UV blokajı",
    note: "Alifatik yapı verniğin solmasını önler, boya yaşlanmaz.",
    accent: "cyan" as const,
  },
] as const;

export const ppfLayers = [
  {
    n: "01",
    title: "Top-coat: hidrofobik & ısıyla iyileşen elastomer",
    thick: "15 µm",
    body: "Güneş veya sıcak suyla kılcal çizikleri doldurur. Kaygan yüzey su, çamur ve reçinenin yapışmasını zorlaştırır.",
    tone: "red" as const,
  },
  {
    n: "02",
    title: "Çekirdek: yüksek esnekliğe sahip alifatik TPU",
    thick: "150 µm",
    body: "Otoyol taş darbesinin enerjisini sönümleyen elastik amortisör. Sararmayan moleküler formül.",
    tone: "cyan" as const,
  },
  {
    n: "03",
    title: "Alt bağlayıcı: optik şeffaf akrilik PSA",
    thick: "35 µm",
    body: "Vernik gözeneklerine kalıcı yapışmaz. Sökümde yapışkan lekesi veya vernik koparması bırakmaz.",
    tone: "neutral" as const,
  },
  {
    n: "04",
    title: "Laboratuvar astarı & taşıyıcı koruyucu film",
    thick: "PET",
    body: "Atölye kabinine girene kadar yüzeyi tozsuz tutan statik koruma katmanı.",
    tone: "neutral" as const,
  },
] as const;

export const ppfPillars = [
  {
    icon: "shield",
    title: "Orijinal boya & mikron değeri korunur",
    body: "Mıcır, anahtar çizikleri ve yıkama hareleri boyaya temas etmez; darbeyi film karşılar.",
    foot: "0 mikron boya bozulması",
    tone: "red" as const,
  },
  {
    icon: "trending_up",
    title: "Değer kaybı & tramer riskini düşürür",
    body: "Park sürtmelerinde boyayı koruyarak boyalı parça kaydını engeller; ikinci elde değeri destekler.",
    foot: "Satış değeri koruması",
    tone: "cyan" as const,
  },
  {
    icon: "water_drop",
    title: "Kolay bakım, asit bariyeri",
    body: "Kuş pisliği ve reçine boyayı yakamaz. Hidrofobik yüzey basınçlı suyla daha hızlı temizlenir.",
    foot: "Kir tutmayan yüzey",
    tone: "neutral" as const,
  },
  {
    icon: "visibility_off",
    title: "Kristal berraklıkta görünmezlik",
    body: "Portakal kabuğu bırakmaz; pigment ve simleri boğmaz, ıslak cam derinliği katar.",
    foot: "Optik şeffaflık",
    tone: "red" as const,
  },
] as const;

export type PpfPackageId = "front" | "track" | "full" | "custom";
export type PpfWrapPartId =
  | "frontBumper"
  | "hood"
  | "fenderLF"
  | "fenderRF"
  | "pillarAL"
  | "pillarAR"
  | "doorLF"
  | "doorRF"
  | "sillL"
  | "sillR"
  | "pillarBL"
  | "pillarBR"
  | "doorLR"
  | "doorRR"
  | "roof"
  | "trunk"
  | "fenderLR"
  | "fenderRR"
  | "rearBumper";

export const ppfWrapParts: { id: PpfWrapPartId; label: string }[] = [
  { id: "frontBumper", label: "Ön tampon" },
  { id: "hood", label: "Kaput" },
  { id: "fenderLF", label: "Sol ön çamurluk" },
  { id: "fenderRF", label: "Sağ ön çamurluk" },
  { id: "pillarAL", label: "Sol A direği" },
  { id: "pillarAR", label: "Sağ A direği" },
  { id: "doorLF", label: "Sol ön kapı" },
  { id: "doorRF", label: "Sağ ön kapı" },
  { id: "sillL", label: "Sol marşpiyel" },
  { id: "sillR", label: "Sağ marşpiyel" },
  { id: "pillarBL", label: "Sol B direği" },
  { id: "pillarBR", label: "Sağ B direği" },
  { id: "doorLR", label: "Sol arka kapı" },
  { id: "doorRR", label: "Sağ arka kapı" },
  { id: "roof", label: "Tavan" },
  { id: "trunk", label: "Bagaj kapağı" },
  { id: "fenderLR", label: "Sol arka çamurluk" },
  { id: "fenderRR", label: "Sağ arka çamurluk" },
  { id: "rearBumper", label: "Arka tampon" },
];

export const ppfPackages: {
  id: PpfPackageId;
  title: string;
  body: string;
  parts: readonly PpfWrapPartId[];
}[] = [
  {
    id: "front",
    title: "Ön paket",
    body: "Taş darbesinin en çok geldiği ön bölge: kaput, ön tampon ve ön çamurluklar; aynalar ve farlarla birlikte.",
    parts: ["hood", "frontBumper", "fenderLF", "fenderRF", "pillarAL", "pillarAR"],
  },
  {
    id: "track",
    title: "Yarı paket",
    body: "Ön pakete tavan, ön kapılar ve marşpiyel hattı eklenir; otoyol ve pist kullanımına uygun ara zırh.",
    parts: [
      "hood",
      "frontBumper",
      "fenderLF",
      "fenderRF",
      "pillarAL",
      "pillarAR",
      "doorLF",
      "doorRF",
      "sillL",
      "sillR",
      "roof",
    ],
  },
  {
    id: "full",
    title: "Komple",
    body: "Tüm dış boyalı yüzeyler. Kenar kıvırma, tavan, bagaj ve arka çamurluklar dahil tavizsiz kapsama.",
    parts: ppfWrapParts.map((part) => part.id),
  },
  {
    id: "custom",
    title: "Parça bazlı",
    body: "Krokide dokunduğunuz paneller seçilir. Far, ayna ve kapı kolu çukurları teklifte pakete eklenir.",
    parts: [],
  },
];

export type PpfMatrixMark = "check" | "cross" | "partial" | "layers" | "timer";

export const ppfMatrix = [
  {
    title: "Taş darbelerine & mıcıra karşı direnç",
    note: "Otoyol hızlarında öndeki araçtan fırlayan çakıllar",
    ppf: "%100 fiziksel koruma (darbe sönümleme)",
    ppfMark: "check" as const,
    ceramic: "0 koruma (taş boyayı deler geçer)",
    ceramicMark: "cross" as const,
  },
  {
    title: "Kendi kendini onarma (self-healing)",
    note: "Yıkama fırçası, sünger hareleri ve dal çizikleri",
    ppf: "Güneş veya sıcak suyla kendi kapanır",
    ppfMark: "check" as const,
    ceramic: "Onarım yok (pasta cila gerekir)",
    ceramicMark: "cross" as const,
  },
  {
    title: "Koruyucu tabaka kalınlığı",
    note: "Boya üzerine binen fiziksel kalkan mikronu",
    ppf: "195 mikron (0,195 mm)",
    ppfMark: "layers" as const,
    ceramic: "1 – 2 mikron (0,002 mm)",
    ceramicMark: "layers" as const,
  },
  {
    title: "Kuş pisliği & asit yağmuru koruması",
    note: "Verniği yakan ve leke bırakan kimyasal reaksiyonlar",
    ppf: "Bariyer (film yanar, boyaya asla geçmez)",
    ppfMark: "check" as const,
    ceramic: "Kısmi dayanım (hızlı temizlik şarttır)",
    ceramicMark: "partial" as const,
  },
  {
    title: "Kullanım ömrü & sertifikalı garanti",
    note: "Resmi garanti belgesi süresi",
    ppf: "7 yıl resmi dijital garanti",
    ppfMark: "timer" as const,
    ceramic: "1 – 3 yıl (yıllık bakım gerektirir)",
    ceramicMark: "timer" as const,
  },
] as const;

export const ppfFaqs = [
  {
    q: "PPF uygulaması ne kadar sürer?",
    a: "Ön paket, temizlik ve kılcal çizik giderme dahil yaklaşık 24 saat sürer. Komple gövde kıvrım ve trim detaylarının kuruması için ideal teslim 36–48 saattir.",
  },
  {
    q: "PPF söküldüğünde orijinal boyaya zarar verir mi?",
    a: "Optik şeffaf akrilik PSA yapıştırıcı kullanılır. Uzman sökümde yapışkan kalıntısı bırakmaz; fabrika verniği korunur.",
  },
  {
    q: "Mat PPF ile şeffaf (gloss) PPF farkı nedir?",
    a: "Şeffaf PPF parlaklığı ve derinliği artırır, görünmez koruma sunar. Mat PPF rengi değiştirmeden saten görünüm verir veya orijinal mat boyayı dokuyu bozmadan korur.",
  },
  {
    q: "PPF kaplı araç nasıl yıkanır?",
    a: "İlk 7 gün film kürleşirken araç yıkanmamalıdır. Sonrasında pH nötr şampuan ve kenarlara dik, çok yakın yüksek basınçtan kaçınılması önerilir.",
  },
] as const;

export function ppfWhatsAppHref(packageTitle: string, partLabels: readonly string[] = []) {
  const regions = partLabels.length > 0 ? `\n${waEmoji.pin} Seçilen bölgeler: ${partLabels.join(", ")}` : "";
  const message = `Merhaba Diamond PPF ekibi, ${waEmoji.service} ${packageTitle} PPF için fiyat ve randevu bilgisi almak istiyorum.${regions}`;
  return quoteWhatsAppHref(message);
}
