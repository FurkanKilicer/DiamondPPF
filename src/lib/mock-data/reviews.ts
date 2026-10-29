export type GoogleReview = {
  id: string;
  author: string;
  context: string;
  quote: string;
};

/** Google Haritalar’daki Diamond PPF Turkey yorumlarından seçilmiş alıntılar. */
export const googleReviews = [
  {
    id: "ed-kamiq",
    author: "E. D.",
    context: "Škoda Kamiq · komple PPF",
    quote:
      "Sıfır aldığımız 2026 model SKODA KAMIQ aracımızı bayiden çıkar çıkmaz Diamond PPF Turkey’e emanet ettik. Haftalarca araştırma yaparak teslim ettiğimiz aracımızın kaplaması, son derece profesyonel bir şekilde yapıldı ve aracımız güvenle teslim alındı. İşçilik ve hizmetten son derece memnun kaldık.",
  },
  {
    id: "tb-evoque",
    author: "T. B.",
    context: "Range Rover Evoque",
    quote:
      "Range Rover EVOQUE aracımız için Diamond PPF ile çalıştık. Çıkartmış oldukları temiz ve itinalı iş için kendilerine ve tüm ekip arkadaşlarına teşekkür ederiz. Özellikle bizi ikna çabalarından dolayı Selin ve Sude Hanım’a çok teşekkür ederiz.",
  },
  {
    id: "h-teslim",
    author: "H.",
    context: "PPF uygulaması",
    quote:
      "Selin Hanım çok ilgili ve güler yüzlüydü. Aracımı ertesi gün çok güzel hazırlanmış bir şekilde teslim ettiler. Çok teşekkürler, gayet memnun kaldım.",
  },
  {
    id: "mk-ppf",
    author: "M. K.",
    context: "PPF kaplama",
    quote:
      "Aracıma PPF kaplama işlemi için Diamond PPF Turkey’i tercih ettim ve aldığım hizmetten gerçekten çok memnun kaldım. Başta Selin Hanım olmak üzere tüm ekip süreç boyunca son derece ilgili, güler yüzlü ve profesyoneldi.",
  },
  {
    id: "ay-suv",
    author: "A. Y.",
    context: "SUV · PPF kaplama",
    quote:
      "SUV model aracımı PPF kaplama için getirdim. Hizmet ve işçilik konusunda çok memnun kaldım.",
  },
  {
    id: "dg-230e",
    author: "D. G.",
    context: "BMW 230e · Endura 230µ",
    quote:
      "İşletme yöneticisi Selin Hanım’dan, yapılacak işlemler ile ilgili detaylı olarak tüm konuları görüşüp mutabık kaldıktan sonra BMW 230e aracımıza Endura marka 230 mikron PPF kaplama yaptırdık.",
  },
] as const satisfies readonly GoogleReview[];
