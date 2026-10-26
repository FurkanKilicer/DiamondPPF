import { Icon } from "@/components/ui/icon";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { ppfMatrix, type PpfMatrixMark } from "@/lib/mock-data/ppf";
import { site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

function Mark({
  mark,
  emphasis,
  children,
}: {
  mark: PpfMatrixMark;
  emphasis?: "win" | "mute";
  children: string;
}) {
  const win = emphasis === "win";
  const mute = emphasis === "mute";

  return (
    <div className="flex items-center gap-3">
      {mark === "check" ? (
        <Icon name="check_circle" filled className="text-[22px] text-brand-red" />
      ) : null}
      {mark === "cross" ? (
        <Icon name="cancel" filled className="text-[22px] text-text-muted" />
      ) : null}
      {mark === "partial" ? (
        <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white/10 font-display text-[13px] text-text-secondary">
          ~
        </span>
      ) : null}
      {mark === "layers" ? (
        <Icon
          name="layers"
          className={cn("text-[22px]", win ? "text-primary-container" : "text-text-muted")}
        />
      ) : null}
      {mark === "timer" ? (
        <Icon name="timer" className={cn("text-[22px]", win ? "text-brand-red" : "text-text-muted")} />
      ) : null}
      <span
        className={cn(
          "font-display text-[14px] leading-snug font-semibold",
          win && (mark === "timer" ? "text-brand-red" : "text-text-primary"),
          mute && "font-normal text-text-muted",
          !win && !mute && "text-text-primary",
        )}
      >
        {children}
      </span>
    </div>
  );
}

export function PpfMatrix() {
  return (
    <PageSection id="karsilastirma">
      <Reveal variant="fade" className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
        <SectionKicker>Karşılaştırma ve doğru bilinen yanlışlar</SectionKicker>
        <h2 className="headline-lg font-bold tracking-tight">PPF mi, yoksa seramik kaplama mı?</h2>
        <p className="text-[15px] text-text-secondary">
          Seramik ve PPF birbirinin alternatifi değil; birbirini tamamlar. En büyük fark fiziksel darbe direncindedir.
        </p>
      </Reveal>
      <div className="overflow-x-auto rounded-2xl border border-border-subtle bg-surface-card shadow-[0_24px_80px_rgb(0_0_0_/_0.35)]">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <caption className="sr-only">Diamond PPF ile nano seramik kaplama karşılaştırması</caption>
          <thead>
            <tr className="bg-surface-elevated">
              <th scope="col" className="w-[38%] px-6 py-5 font-display text-[11px] font-medium tracking-[0.16em] text-text-secondary uppercase">
                Koruma özelliği / kriter
              </th>
              <th scope="col" className="w-[34%] px-4 py-5">
                <span className="flex items-center gap-2 font-display text-[13px] font-bold tracking-[0.12em] text-brand-red uppercase">
                  <Icon name="shield" filled className="text-[18px]" />
                  Diamond 195µm PPF
                </span>
              </th>
              <th scope="col" className="w-[28%] px-4 py-5">
                <span className="flex items-center gap-2 font-display text-[13px] font-medium tracking-[0.12em] text-text-secondary uppercase">
                  <Icon name="grid_view" className="text-[18px]" />
                  Nano seramik kaplama
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ppfMatrix.map((row) => (
              <tr key={row.title} className="border-t border-white/[0.06]">
                <th scope="row" className="px-6 py-5 align-middle font-normal">
                  <p className="font-display text-[16px] font-semibold text-text-primary">{row.title}</p>
                  <p className="mt-1 text-[12px] text-text-muted">{row.note}</p>
                </th>
                <td className="px-4 py-5 align-middle">
                  <Mark mark={row.ppfMark} emphasis="win">
                    {row.ppf}
                  </Mark>
                </td>
                <td className="px-4 py-5 align-middle">
                  <Mark mark={row.ceramicMark} emphasis="mute">
                    {row.ceramic}
                  </Mark>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-surface-card p-6 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-container/10 text-primary-container">
            <Icon name="lightbulb" className="text-[28px]" />
          </span>
          <div>
            <h3 className="font-display font-bold">Tavsiye: hibrit koruma</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
              195µm PPF üzerine seramik, hem darbe zırhı hem ekstrem su iticilik verir. Paketi Gayrettepe atölyesinde
              birlikte planlarız.
            </p>
          </div>
        </div>
        <a
          href={site.phoneHref}
          className="label-caps inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg border border-white/10 bg-surface-elevated px-6 tracking-wider"
        >
          <Icon name="call" className="text-[18px] text-brand-red" />
          {site.phoneDisplay}
        </a>
      </div>
    </PageSection>
  );
}
