import { site } from "@/lib/mock-data/content";
import { siteConfig } from "@/lib/seo/site";

export function GET() {
  const origin = siteConfig.url.replace(/\/$/, "");

  const body = `# ${site.name}

> İstanbul Gayrettepe’de 195µm Diamond PPF, renkli TPU, far ve cam koruma, OEM konfor, güvenlik ve boyasız onarım. 7 yıl garanti. Yüz yüze atölye ve WhatsApp teklif.

## Sayfalar
- [Ana Sayfa](${origin}/): Diamond PPF Turkey giriş, teklif formu, test lab ve atölye özeti.
- [Hizmetler](${origin}/hizmetler): Koruma, konfor, güvenlik ve onarım kategorilerindeki tüm uygulamalar.
- [PPF Nedir?](${origin}/ppf-nedir): Boya koruma filmi anatomisi, kaplama haritası ve PPF–seramik karşılaştırması.
- [Örnek Araçlar](${origin}/ornek-araclar): Gayrettepe atölyesinden gerçek PPF uygulamaları.
- [Biz Kimiz?](${origin}/biz-kimiz): Atölye hikâyesi, ekip ve stüdyo.
- [İletişim](${origin}/iletisim): Adres, saatler, harita ve teklif formu.

## Koruma
- [PPF kaplama](${origin}/hizmetler#ppf): 195µm self-healing boya koruma filmi, 7 yıl garanti.
- [Renkli PPF](${origin}/hizmetler#renkli-ppf): Boyayı sökmeden renk ve doku değişimi (TPU).
- [Far & stop koruma](${origin}/hizmetler#far-stop): UV ve taş darbesine karşı far zırhı.
- [Jant koruma](${origin}/hizmetler#jant): Termal seramik ve fren tozu iticilik.
- [Panoramik tavan cam](${origin}/hizmetler#tavan-cam): Cam tavan taş ve dolu kalkanı.
- [İç trim & ekran](${origin}/hizmetler#ic-trim): Piano black, Hyperscreen ve konsol TPU.
- [Cam filmi](${origin}/hizmetler#cam-filmi): UV ve ısı korumalı nanoseramik cam filmi.
- [Nano seramik](${origin}/hizmetler#seramik): Lotus efektli kristal kaplama.
- [Yağışlı hava paketi](${origin}/hizmetler#yagis): Hidrofobik cam ve görüş paketi.

## Konfor & donanım
- [Elektrikli yan basamak](${origin}/hizmetler#basamak): Gizli montaj IP68 OEM soketli sistem.
- [Gece paketi / chrome delete](${origin}/hizmetler#gece-paketi): Krom detayları mat veya parlak siyah folyo.
- [Akıllı bagaj](${origin}/hizmetler#bagaj): Hands-free elektrikli bagaj kiti.
- [Soft close](${origin}/hizmetler#soft-close): Vakumlu yumuşak kapı kapanışı.

## Güvenlik
- [4K dashcam](${origin}/hizmetler#dashcam): Ön + arka park modlu kamera.
- [GPS takip](${origin}/hizmetler#gps): Konum, geofence ve voltaj uyarısı.

## Onarım
- [PDR](${origin}/hizmetler#pdr): Boyasız göçük onarımı.
- [Kaporta & boya](${origin}/hizmetler#kaporta): Fabrika mikronuna uyumlu lüks boya.
- [Mikro rötuş](${origin}/hizmetler#rotus): Noktasal taş ve çizik düzeltme.
- [Detay & cila](${origin}/hizmetler#cila): Polisaj, deri bakım ve teslim cilası.

## İletişim
- Atölye: ${site.address}
- Telefon: ${site.phoneDisplay}
- WhatsApp: ${site.whatsappDisplay}
- Saatler: ${site.hoursLine}
- Harita: ${site.mapsHref}
- YouTube: ${site.youtube}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
