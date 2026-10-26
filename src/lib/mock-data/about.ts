import { site } from "@/lib/mock-data/content";

export const aboutJumps = [
  { href: "#hikayemiz", label: "Hikâyemiz", featured: true },
  { href: "#degerlerimiz", label: "Değerlerimiz", featured: false },
  { href: "#ekip", label: "Ekip", featured: false },
  { href: "#atolyemiz", label: "Atölyemiz", featured: false },
] as const;

export const aboutStats = [
  {
    icon: "workspace_premium",
    accent: "red" as const,
    value: "20",
    suffix: "+",
    unit: "Yıl",
    label: "Sektör tecrübesi",
    note: "Ekibimizin boya koruma ve araç dönüşümündeki zanaat birikimi.",
  },
  {
    icon: "storefront",
    accent: "cyan" as const,
    value: "2023",
    suffix: "",
    unit: "",
    label: "Kuruluş yılı",
    note: "Gayrettepe atölyemizin faaliyete başladığı milat.",
  },
  {
    icon: "star",
    accent: "red" as const,
    value: site.rating,
    suffix: "",
    unit: "★",
    label: "Google puanı",
    note: `Teslim sonrası ${site.reviewCount} müşteri incelemesinin ortalaması.`,
  },
  {
    icon: "verified_user",
    accent: "cyan" as const,
    value: "7",
    suffix: "",
    unit: "Yıl",
    label: "Resmi PPF garantisi",
    note: "Sararma, çatlama ve soyulmaya karşı kayıtlı garanti belgesi.*",
  },
] as const;

export const aboutValues = [
  {
    n: "01",
    icon: "person_check",
    iconTone: "red" as const,
    title: "Önce müşteri",
    body: "Her kararı müşterimizin mutlak memnuniyetine göre veririz. Beklentinizi aşmayan hiçbir sonucu tamamlanmış saymayız.",
    foot: "Koşulsuz memnuniyet prensibi",
  },
  {
    n: "02",
    icon: "precision_manufacturing",
    iconTone: "cyan" as const,
    title: "Uzmanlık",
    body: "Herkes uzman olduğu işi yapar. Boya koruma, cam filmi ve söküm montaj ayrı ustaların sorumluluğundadır; mükemmellik iş bölümünden doğar.",
    foot: "Departman odaklı zanaat",
  },
  {
    n: "03",
    icon: "visibility",
    iconTone: "red" as const,
    title: "Şeffaflık",
    body: "Kabul anında fotoğraflı mikron raporu, canlı ilerleme takibi ve sistemde kayıtlı resmi garanti belgesiyle sürprizlere yer yok.",
    foot: "Canlı takip & raporlama",
  },
  {
    n: "04",
    icon: "auto_awesome",
    iconTone: "red" as const,
    title: "Ulaşılabilir kalite",
    body: "Dünya standardındaki TPU hammadde ve optik berraklıktaki boya koruma teknolojisini mantıklı bütçelerle her araç sahibine ulaştırıyoruz.",
    foot: "Adil fiyat & üst segment kalite",
  },
] as const;

export const aboutLeaders = [
  {
    initials: "AÖ",
    name: "Abdullah Örnak",
    role: "Kurucu · Usta öğretici",
    bio: "20 yılı aşkın otomotiv tecrübesiyle teknik işçilik standartlarını denetler, genç ustaları yetiştirir.",
    accent: "red" as const,
  },
  {
    initials: "MÖ",
    name: "Muhammet İsmet Örnak",
    role: "İşletme müdürü",
    bio: "Randevu, dijital kabul, müşteri deneyimi ve atölye iş akışının koordinasyonundan sorumlu.",
    accent: "cyan" as const,
  },
] as const;

export const aboutDepartments = [
  {
    icon: "layers",
    tone: "red" as const,
    title: "PPF ekibi",
    body: "Film serme, kenar kıvırma ve zor kavisli gövde hatlarında mikron seviyesinde hassasiyetle çalışan film teknisyenleri.",
    focus: "Odak: gövde paneli",
    tag: "Hassas",
  },
  {
    icon: "wb_sunny",
    tone: "cyan" as const,
    title: "Cam filmi ekibi",
    body: "Yüksek ısı kontrollü seramik cam filmi, panoramik tavan cam koruma ve UV kalkanı uygulamalarında uzmanlaşmış ekip.",
    focus: "Odak: termal konfor",
    tag: "Koruma",
  },
  {
    icon: "build_circle",
    tone: "red" as const,
    title: "Söküm-montaj",
    body: "Üretici tork değerlerinde, klips kırmadan orijinal fabrika düzeninde demonte ve monte eden kaporta ustaları.",
    focus: "Odak: OEM standardı",
    tag: "Sıfır hata",
  },
  {
    icon: "fact_check",
    tone: "cyan" as const,
    title: "Kabul & kontrol",
    body: "Fotoğraflı kabul formu, mikron boya kalınlık ölçümü, süreç bilgilendirmesi ve klinik ışık altı son teslim kontrolü.",
    focus: "Odak: 360° rapor",
    tag: "Dijital",
  },
] as const;

export const aboutStudioTiles = [
  {
    src: "/images/stitch-09.jpg",
    alt: "Hexagon tavan aydınlatmalı tozsuz PPF uygulama kabini",
    kicker: "Klinik uygulama istasyonu",
    title: "Tozsuz ortam & hexagon tavan aydınlatması",
    body: "Her gövde eğrisini kusursuz gösteren 6500K profesyonel ışık kalkanı.",
    badge: "Bay 01 – 04",
    span: "h-full md:col-span-8 md:row-span-2",
    minH: "min-h-[240px] md:h-full md:min-h-0",
  },
  {
    src: "/images/stitch-10.jpg",
    alt: "CAD plotter ile PPF kesimi",
    kicker: "Dijital kesim",
    title: "Graphtec CAD plotter",
    body: "Bıçağa gerek kalmadan milimetrik kesim.",
    badge: null,
    span: "h-full md:col-span-4",
    minH: "min-h-[200px] md:h-full md:min-h-0",
  },
  {
    src: "/images/stitch-08.jpg",
    alt: "Klinik ön yıkama ve dekontaminasyon alanı",
    kicker: "Arındırma",
    title: "Klinik ön yıkama & dekontaminasyon",
    body: "Demir tozu ve kil arındırma odası.",
    badge: null,
    span: "h-full md:col-span-4",
    minH: "min-h-[200px] md:h-full md:min-h-0",
  },
  {
    src: "/images/stitch-11.jpg",
    alt: "Cam filmi ve tavan koruma uygulama alanı",
    kicker: "Özel alan",
    title: "Cam filmi & tavan koruma bay",
    body: null,
    badge: null,
    span: "h-full md:col-span-6",
    minH: "min-h-[220px]",
  },
  {
    src: "/images/stitch-12.jpg",
    alt: "Teslimat ve müşteri karşılama alanı",
    kicker: "Müşteri alanı",
    title: "Teslimat & kahve alanı",
    body: null,
    badge: null,
    span: "h-full md:col-span-6",
    minH: "min-h-[220px]",
  },
] as const;
