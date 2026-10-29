const mapsPlaceQuery = "Diamond PPF Turkey, Gayrettepe, Ayazmaderesi Cd Sallar iş merkezi no: 5 A, Beşiktaş/İstanbul";
const waMessage =
  "Merhaba, web sitenizden yazıyorum. Aracım için bilgi almak istiyorum.";
const whatsappDigits = "905326014577";

function whatsappSendHref(message: string) {
  return `https://api.whatsapp.com/send?phone=${whatsappDigits}&text=${encodeURIComponent(message)}`;
}

export const site = {
  name: "Diamond PPF Turkey",
  phoneDisplay: "0532 601 45 77",
  phoneHref: "tel:+905326014577",
  phoneDigits: "905326014577",
  whatsappDisplay: "0532 601 45 77",
  whatsappDigits,
  whatsappHref: whatsappSendHref(waMessage),
  address: "Gayrettepe, Ayazmaderesi Cd. Sallar İş Merkezi No: 5 A, 34349 Beşiktaş / İstanbul",
  addressShort: "Ayazmaderesi Cd. Sallar İş Merkezi No: 5 A, Gayrettepe / Beşiktaş",
  areaLabel: "Gayrettepe / İstanbul",
  studioLine: "Gayrettepe, Beşiktaş · İstanbul",
  workshopLabel: "Gayrettepe Atölyesi",
  mapsHref: "https://share.google/SNKlxZpWBwBQa6bcW",
  mapsReviewsHref:
    "https://www.google.com/maps/place/Diamond+PPF+Turkey/@41.0589473,29.0046893,17z/data=!4m8!3m7!1s0x14cab73a3d21f589:0x7cfb654057f4bfc!8m2!3d41.0589473!4d29.0046893!9m1!1b1!16s%2Fg%2F11w7_qjsdt?entry=ttu",
  mapsEmbedSrc: `https://maps.google.com/maps?q=${encodeURIComponent(mapsPlaceQuery)}&z=17&hl=tr&output=embed`,
  hoursLine: "Her gün 10:00 – 22:00",
  hoursNote: "Resmi tatillerde saatler değişebilir.",
  hours: [
    { label: "Pazartesi – Pazar:", value: "10:00 – 22:00" },
  ],
  rating: "5,0",
  reviewCount: 287,
  youtube: "https://www.youtube.com/@ULTIMATEGARAGE.TURKEY",
  guaranteeUrl: "https://ultimateppf.com.tr/garanti.php",
  logo: "/images/logo-diamond-ppf.png",
  logoMark: "/images/logo-diamond-ppf-mark.png",
} as const;

/**
 * WhatsApp Web, wa.me metninde 4 baytlık emojileri ◆ yapar.
 * BMP + emoji variation selector (FE0F) Web’de renkli görünür.
 */
export const waEmoji = {
  person: "\u263A\uFE0F",
  phone: "\u260E\uFE0F",
  car: "\u26FD",
  service: "\u2699\uFE0F",
  note: "\u270F\uFE0F",
  pin: "\u27A1\uFE0F",
} as const;

export function buildQuoteWhatsAppMessage({
  greeting = "Merhaba Diamond PPF ekibi, web siteniz üzerinden teklif almak istiyorum.",
  name,
  phone,
  vehicle,
  service,
  notes,
  closing = "Fiyat ve müsaitlik hakkında bilgi rica ederim.",
}: {
  greeting?: string;
  name?: string;
  phone?: string;
  vehicle: string;
  service: string;
  notes?: string;
  closing?: string;
}) {
  const lines = [greeting, ""];
  if (name) lines.push(`${waEmoji.person} Müşteri: ${name}`);
  if (phone) lines.push(`${waEmoji.phone} Telefon: ${phone}`);
  lines.push(`${waEmoji.car} Araç: ${vehicle}`);
  lines.push(`${waEmoji.service} İstenen hizmet: ${service}`);
  if (notes) lines.push(`${waEmoji.note} Notlar: ${notes}`);
  lines.push("", closing);
  return lines.join("\n");
}

export function quoteWhatsAppHref(message: string) {
  return whatsappSendHref(message);
}

export const navItems = [
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "PPF Nedir?", href: "/ppf-nedir" },
  { label: "Örnek Araçlar", href: "/ornek-araclar" },
  { label: "Biz Kimiz?", href: "/biz-kimiz" },
] as const;

export const moreNavItems = [
  { label: "İletişim", href: "/iletisim" },
] as const;

export const mobileMenuPrimary = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "PPF Nedir?", href: "/ppf-nedir" },
  { label: "Örnek Araçlar", href: "/ornek-araclar" },
  { label: "Biz Kimiz?", href: "/biz-kimiz" },
] as const;

export const mobileMenuDiscover: readonly {
  label: string;
  href: string;
  indent?: boolean;
}[] = [
  { label: "Aracınıza ne yapıyoruz?", href: "/#hizmetler" },
  { label: "İşçilik", href: "/#hikayemiz" },
  { label: "Garanti & Takip", href: "/#garanti-takip" },
  { label: "İletişim", href: "/iletisim" },
  { label: "Müşteri yorumları", href: "/#yorumlar" },
];

export const carBrands = [
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Porsche",
  "Togg",
  "Tesla",
  "Land Rover",
  "Volkswagen",
  "Volvo",
  "Chery",
  "Peugeot",
  "Diğer",
];

export const quoteServices = [
  "Komple Şeffaf Diamond PPF (195µ - 7 Yıl Garanti)",
  "Ön Koruma Paketi (Kaput, Çamurluklar, Tampon, Farlar)",
  "Renkli PPF Dönüşüm (Mat / Parlak Renk Değişimi)",
  "Far & Cam Koruma Kalkanı",
  "Elektrikli Yan Basamak Montajı",
  "Boyasız Göçük Onarımı (PDR)",
  "Klinik Nano Seramik Kaplama",
];
