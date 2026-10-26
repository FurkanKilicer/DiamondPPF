import { Icon } from "@/components/ui/icon";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { contactStudioPoints } from "@/lib/mock-data/contact";
import { site } from "@/lib/mock-data/content";

export function ContactLocation() {
  return (
    <PageSection id="konum" tone="light">
      <Reveal variant="left" className="mb-10 max-w-2xl space-y-3">
        <SectionKicker icon="map">{site.workshopLabel}</SectionKicker>
        <h2 className="headline-lg font-bold tracking-tight text-slate-900">Merkez lokasyon.</h2>
        <p className="text-[15px] text-slate-600">
          Beşiktaş Gayrettepe’de, Ayazmaderesi Caddesi Sallar İş Merkezi’nde iklim kontrollü uygulama stüdyosu.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <Reveal variant="left" className="lg:col-span-5">
          <div className="card-light flex h-full flex-col justify-between rounded-xl p-6 sm:p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-red/20 bg-brand-red/10 text-brand-red">
                  <Icon name="apartment" className="text-[20px]" />
                </span>
                <div>
                  <p className="label-caps tracking-widest text-brand-red">Flagship studio</p>
                  <h3 className="font-display font-bold text-slate-900">{site.name}</h3>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-900">{site.addressShort}</p>
                <p className="mt-1 text-[13px] text-slate-600">{site.address}</p>
              </div>
              <ul className="space-y-3">
                {contactStudioPoints.map((item) => (
                  <li key={item.label} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                      <Icon name={item.icon} className="text-[16px]" />
                    </span>
                    <span className="text-[13px] text-slate-700">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={site.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="label-caps mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-900 py-3.5 tracking-wider text-white transition hover:bg-brand-red"
            >
              Google Haritalar’da yol tarifi al
              <Icon name="open_in_new" className="text-[16px]" />
            </a>
          </div>
        </Reveal>
        <Reveal variant="right" className="lg:col-span-7">
          <div className="relative min-h-[420px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <iframe
              title={`${site.workshopLabel} haritası`}
              src={site.mapsEmbedSrc}
              className="absolute inset-0 h-full w-full border-0 grayscale-[20%] contrast-[105%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute right-5 bottom-5 left-5 flex items-center gap-4 rounded-xl border border-white/15 bg-surface-canvas/95 p-4 text-text-primary shadow-2xl backdrop-blur-xl sm:right-auto">
              <span className="relative flex h-4 w-4 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-brand-red" />
              </span>
              <div>
                <p className="font-mono text-xs font-bold tracking-wider uppercase">{site.workshopLabel}</p>
                <p className="font-mono text-[11px] text-text-muted">{site.studioLine}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </PageSection>
  );
}
