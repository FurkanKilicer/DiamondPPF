import type { Metadata } from "next";
import { ContactActions } from "@/features/contact/contact-actions";
import { ContactCta } from "@/features/contact/contact-cta";
import { ContactFaq } from "@/features/contact/contact-faq";
import { ContactHero } from "@/features/contact/contact-hero";
import { ContactHours } from "@/features/contact/contact-hours";
import { ContactLocation } from "@/features/contact/contact-location";
import { ContactQuote } from "@/features/contact/contact-quote";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Diamond PPF Turkey Gayrettepe iletişim: telefon, WhatsApp, çalışma saatleri, yol tarifi ve teklif formu.",
  alternates: { canonical: "/iletisim" },
};

export default function IletisimPage() {
  return (
    <main className="min-h-screen w-full bg-surface-canvas pt-[4.5rem] md:pt-20">
      <ContactHero />
      <ContactHours />
      <ContactQuote />
      <ContactActions />
      <ContactFaq />
      <ContactLocation />
      <ContactCta />
    </main>
  );
}
