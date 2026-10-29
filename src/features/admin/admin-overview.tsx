import Link from "next/link";
import { adminNav } from "@/lib/admin/nav";
import { Icon } from "@/components/ui/icon";
import { AdminErrorState, AdminPageHeader } from "@/features/admin/ui";
import type { CmsSummary } from "@/lib/cms/types";

export function AdminOverview({
  email,
  summary,
}: {
  email: string | null;
  summary: CmsSummary;
}) {
  const sections = adminNav.filter((item) => item.href !== "/admin");

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        kicker="Genel bakış"
        title="İçerik stüdyosu"
        description={
          email
            ? `${email} olarak giriş yaptınız. Sayılar canlı CMS tablolarından okunur; sahte teklif veya görüntülenme üretilmez.`
            : "Sayılar canlı CMS tablolarından okunur."
        }
      />

      {summary.ok ? (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard href="/admin/hizmetler" icon="layers" label="Hizmetler" pair={summary.services} />
          <SummaryCard href="/admin/galeri" icon="grid_view" label="Galeri" pair={summary.gallery} />
          <SummaryCard href="/admin/sss" icon="help_outline" label="SSS" pair={summary.faqs} />
          <SummaryCard href="/admin/sayfalar" icon="article" label="Sayfalar" pair={summary.pages} />
        </ul>
      ) : (
        <AdminErrorState message={summary.message} code={summary.code} />
      )}

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold">Modüller</h2>
        <ul className="grid gap-3 lg:grid-cols-2">
          {sections.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex min-h-[5.5rem] items-start gap-4 rounded-2xl border border-white/8 bg-surface-card/90 p-5 transition-colors hover:border-white/16"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-container-high text-brand-cyan">
                  <Icon name={item.icon} className="text-[22px]" />
                </span>
                <span className="min-w-0">
                  <span className="font-display font-semibold group-hover:text-brand-cyan">{item.label}</span>
                  <span className="mt-1 block text-[13px] leading-5 text-text-secondary">{moduleCopy(item.href)}</span>
                </span>
                <Icon name="chevron_right" className="ml-auto text-[20px] text-text-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function SummaryCard({
  href,
  icon,
  label,
  pair,
}: {
  href: string;
  icon: string;
  label: string;
  pair: { total: number; published: number };
}) {
  return (
    <li>
      <Link href={href} className="block rounded-2xl border border-white/8 bg-surface-card p-5 hover:border-white/16">
        <p className="flex items-center gap-2 text-[13px] text-text-secondary">
          <Icon name={icon} className="text-[18px] text-brand-magenta" />
          {label}
        </p>
        <p className="mt-3 font-display text-3xl font-semibold tracking-tight">{pair.total}</p>
        <p className="mt-1 text-[12px] text-text-muted">{pair.published} yayında</p>
      </Link>
    </li>
  );
}

function moduleCopy(href: string) {
  switch (href) {
    case "/admin/hizmetler":
      return "Hizmet kartlarını listeleyin; yayın durumu ve sıra görünür.";
    case "/admin/galeri":
      return "Örnek araç görsellerini kart ızgarasında yönetin.";
    case "/admin/sss":
      return "PPF ve iletişim soru-cevaplarını koleksiyona göre görün.";
    case "/admin/sayfalar":
      return "Public rota içerik kayıtlarını sayfa bazında açın.";
    case "/admin/ayarlar":
      return "WhatsApp, telefon, adres ve sosyal bağlantıları görün.";
    default:
      return "";
  }
}
