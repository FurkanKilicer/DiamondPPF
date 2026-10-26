import { Icon } from "@/components/ui/icon";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { contactCapacity, contactHourChecks, contactHourFacts, contactHoursRows } from "@/lib/mock-data/contact";
import { site } from "@/lib/mock-data/content";

export function ContactHours() {
  return (
    <PageSection id="saatler" tone="light">
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <Reveal variant="left" className="lg:col-span-7">
          <div className="card-light flex h-full flex-col gap-6 rounded-xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionKicker icon="schedule">Canlı stüdyo işleyişi</SectionKicker>
              <span className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                Tozsuz kabin
              </span>
            </div>
            <div>
              <h2 className="headline-lg font-bold tracking-tight text-slate-900">Atölye çalışma saatleri</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                Kontrollü araç teslimi, optik teftiş ve montaj için uygulanan haftalık takvim. {site.hoursNote}
              </p>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-3">
              {contactHoursRows.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-red/20 bg-white text-brand-red">
                      <Icon name={row.icon} className="text-[18px]" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{row.label}</p>
                      <p className="font-mono text-[11px] text-slate-500">{row.note}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-sm">
                    <span className="font-bold text-slate-900">{row.value}</span>
                    <span className="rounded-full border border-cyan-200 bg-white px-2 py-0.5 text-[10px] font-bold tracking-wider text-cyan-700 uppercase">
                      {row.badge}
                    </span>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {contactHourFacts.map((fact) => (
                  <a
                    key={fact.label}
                    href={fact.href}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-brand-red/40"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-brand-red">
                      <Icon name={fact.icon} className="text-[18px]" />
                    </span>
                    <span>
                      <span className="block font-mono text-[11px] text-slate-500">{fact.label}</span>
                      <span className="font-display text-sm font-bold text-slate-900">{fact.value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <p className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-[13px] leading-relaxed text-slate-600">
              <Icon name="info" className="mt-0.5 shrink-0 text-[18px] text-brand-red" />
              Uygulama sonrası periyodik kontrol ve garanti denetimi için stüdyo trafiğini düzenlemek adına önceden
              randevu saati oluşturmanızı rica ederiz.
            </p>
          </div>
        </Reveal>
        <Reveal variant="right" className="lg:col-span-5">
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-surface-card p-8 text-text-primary shadow-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-48 w-48 rounded-full bg-brand-red/10 blur-3xl" aria-hidden />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between gap-3">
                <span className="label-caps tracking-widest text-brand-red">Dijital sıra sistemi</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/80 px-3 py-1 font-mono text-[11px] font-bold text-cyan-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                  Aktif slotlar
                </span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold">Online randevu alın</h3>
                <p className="mt-1 text-[13px] text-text-secondary">
                  Aracınızı bekletmeden, rezerve edilmiş steril kabinde ağırlayalım. Aşağıdaki doluluk örnek veridir.
                </p>
              </div>
              <div className="space-y-3 rounded-xl border border-white/10 bg-surface-canvas/80 p-5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold tracking-wider text-text-secondary uppercase">Haftalık kapasite</span>
                  <span className="font-black tracking-wider text-brand-red">%{contactCapacity.fillPercent} dolu</span>
                </div>
                <div
                  className="h-3 overflow-hidden rounded-full border border-white/10 bg-neutral-900 p-0.5"
                  role="meter"
                  aria-label="Haftalık kapasite doluluğu"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={contactCapacity.fillPercent}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-600 to-brand-red"
                    style={{ width: `${contactCapacity.fillPercent}%` }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[11px] text-text-muted">
                  <span className="font-semibold text-emerald-400">Bu hafta kalan: {contactCapacity.slotsLeft} araç</span>
                  <span>{contactCapacity.bayLabel}</span>
                </div>
              </div>
              <ul className="space-y-2.5 font-mono text-xs text-text-secondary">
                {contactHourChecks.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <Icon name="check_circle" filled className="text-[16px] text-brand-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative mt-8 space-y-2">
              <a
                href="#quote-section"
                className="cta-red label-caps flex w-full items-center justify-center gap-2 rounded-lg py-4 tracking-wider"
              >
                Online randevu al
                <Icon name="arrow_forward" className="text-[16px]" />
              </a>
              <p className="text-center font-mono text-[10px] tracking-wider text-text-muted">
                Kayıt esnasında ön ödeme alınmaz.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </PageSection>
  );
}
