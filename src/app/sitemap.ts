import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/biz-kimiz`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/iletisim`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/ppf-nedir`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/ornek-araclar`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/hizmetler`,
      lastModified: new Date(),
    },
  ];
}
