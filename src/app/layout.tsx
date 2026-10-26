import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import localFont from "next/font/local";
import { DocumentTitleSync } from "@/components/layout/document-title-sync";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/lib/seo/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});

const materialSymbols = localFont({
  src: "./fonts/material-symbols-outlined.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-material-symbols",
  adjustFontFallback: false,
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Diamond PPF",
    template: "%s | Diamond PPF",
  },
  description:
    "Diamond PPF Turkey, Gayrettepe Beşiktaş: araç kaplama, PPF ve boya koruma.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Diamond PPF",
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${archivo.variable} ${materialSymbols.variable}`}>
      <body className="min-h-screen antialiased selection:bg-primary-container selection:text-on-primary">
        <DocumentTitleSync />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
