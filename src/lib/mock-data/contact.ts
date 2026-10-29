import { site } from "@/lib/mock-data/content";

export const contactJumps = [
  { href: "#saatler", label: "Saatler", featured: true },
  { href: "#quote-section", label: "Teklif", featured: false },
  { href: "#islemler", label: "İşlemler", featured: false },
  { href: "#sss", label: "SSS", featured: false },
  { href: "#konum", label: "Konum", featured: false },
] as const;

export const contactChannels = [
  {
    kicker: "Lokasyon",
    title: "Merkez atölye",
    body: site.address,
    href: site.mapsHref,
    external: true,
    action: "Yol tarifi al",
    icon: "location_on",
    tone: "red" as const,
  },
  {
    kicker: "Hızlı çağrı",
    title: "Doğrudan santral",
    highlight: site.phoneDisplay,
    body: "Teknik danışmanlığa bağlanın; güncel kapasite ve randevu için arayın.",
    href: site.phoneHref,
    external: false,
    action: "Hemen arayın",
    icon: "call",
    tone: "red" as const,
  },
  {
    kicker: "Dijital asistan",
    title: "WhatsApp destek",
    highlight: site.whatsappDisplay,
    body: "Aracınızın fotoğraflarını gönderin; yüzey ve paket için ön analiz yapalım.",
    href: site.whatsappHref,
    external: true,
    action: "Mesaj başlat",
    icon: "chat",
    tone: "emerald" as const,
  },
  {
    kicker: "Google",
    title: "Harita & yorumlar",
    highlight: `${site.rating} ★ · ${site.reviewCount} inceleme`,
    body: "Gayrettepe atölyemizi haritada açın, müşteri yorumlarını inceleyin.",
    href: site.mapsReviewsHref,
    external: true,
    action: "Google’da aç",
    icon: "star",
    tone: "cyan" as const,
  },
] as const;

const hoursValue = site.hours[0]?.value ?? site.hoursLine;

export const contactHoursRows = [
  {
    label: "Pazartesi – Cuma",
    note: "Ana montaj & kaplama vardiyası",
    value: hoursValue,
    badge: "Tam vardiya",
    icon: "calendar_month",
  },
  {
    label: "Cumartesi",
    note: "Kaplama, teslim & muayene",
    value: hoursValue,
    badge: "Tam vardiya",
    icon: "schedule",
  },
  {
    label: "Pazar",
    note: "Klinik uygulama vardiyası",
    value: hoursValue,
    badge: "Açık",
    icon: "event_available",
  },
] as const;

export const contactHourFacts = [
  { icon: "call", label: "Santral", value: site.phoneDisplay, href: site.phoneHref },
  { icon: "chat", label: "WhatsApp", value: site.whatsappDisplay, href: site.whatsappHref },
] as const;

export const contactCapacity = {
  fillPercent: 78,
  slotsLeft: 4,
  bayLabel: `${site.workshopLabel} · kabin 1–2`,
} as const;

export const contactHourChecks = [
  "Tozsuz kabin ve klinik uygulama ortamı",
  "7 yıl resmi sertifikalı Diamond PPF garantisi",
  "Bilgisayarlı mikron hassasiyetinde kesim",
] as const;

export const contactQuoteSteps = [
  {
    n: "01",
    title: "Formu doldurun",
    body: "Ad, telefon ve aracınız yeterli; talep ettiğiniz koruma veya PPF hizmetini seçin.",
    tone: "red" as const,
  },
  {
    n: "02",
    title: "WhatsApp’ta gönderin",
    body: "Mesaj taslağı otomatik açılır; göndermeden önce serbestçe düzenleyebilirsiniz.",
    tone: "cyan" as const,
  },
  {
    n: "03",
    title: "Fiyatınız gelsin",
    body: "Çalışma saatleri içinde aplikatörlerimiz fiyat ve randevu seçeneklerini iletir.",
    tone: "red" as const,
  },
] as const;

export const contactActions = [
  {
    id: "randevu",
    title: "Online randevu al",
    body: "PPF kaplama, kontrol yıkaması ve periyodik gövde muayenesi için saat ayırtın.",
    action: "Randevuya git",
    href: "#quote-section",
    icon: "event",
    tone: "red" as const,
  },
  {
    id: "yol",
    title: "Yol tarifi",
    body: "Gayrettepe atölyemize navigasyonu başlatın; Sallar İş Merkezi No: 5 A.",
    action: "Haritada aç",
    href: site.mapsHref,
    icon: "near_me",
    tone: "cyan" as const,
  },
  {
    id: "sorgula",
    title: "Randevu sorgula",
    body: "Kayıtlı telefonunuzla randevu durumunu bu önizlemede deneyin; sunucu bağlı değildir.",
    action: "Durumu incele",
    icon: "search",
    tone: "violet" as const,
  },
  {
    id: "garanti",
    title: "Garanti sorgula",
    body: "Plaka ile 7 yıllık Diamond PPF belgesini teyit edin. Bu aşamada kayıt okunmaz.",
    action: "Sertifika doğrula",
    icon: "verified_user",
    tone: "red" as const,
  },
] as const;

export const contactFaqs = [
  {
    q: "Ödeme seçenekleri nelerdir?",
    a: "Nakit, havale/EFT ve kredi kartı kabul edilir. Taksit ve filo faturası gibi detayları randevu görüşmesinde netleştiririz; bu sitede ödeme alınmaz.",
  },
  {
    q: "Fiyat nasıl belirlenir ve neye göre değişir?",
    a: "Fiyat, aracın yüzey geometrisi, parça karmaşıklığı, boya düzeltme ihtiyacı ve seçilen Diamond PPF paketinin mikron/kalınlık seçimine göre çıkar. Net teklif WhatsApp’ta iletilir.",
  },
  {
    q: "Uygulama sonrası kontrol randevusunu nasıl alırım?",
    a: "PPF uygulamasından yaklaşık 10–14 gün sonra kenar kıvrımı ve kürleşme kontrolü için ücretsiz muayene önerilir. WhatsApp veya santral üzerinden “kontrol & muayene” yazmanız yeterlidir.",
  },
  {
    q: "Randevumu nasıl sorgular ya da iptal edebilirim?",
    a: "Canlı randevu sistemi bu aşamada bağlı değildir. Değişiklik veya iptal için santral ve WhatsApp hattını kullanın; formlar sunucuya kayıt yazmaz.",
  },
] as const;

export const contactStudioPoints = [
  { icon: "clean_hands", label: "Klinik temizlikte tozsuz uygulama kabini" },
  { icon: "verified_user", label: "7 yıl kayıtlı PPF garanti belgesi" },
  { icon: "pin_drop", label: `${site.studioLine}` },
] as const;
