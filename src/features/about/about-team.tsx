import { Icon } from "@/components/ui/icon";
import { PageSection, SectionKicker } from "@/components/layout/page-section";
import { Reveal } from "@/components/ui/reveal";
import { aboutDepartments, aboutLeaders } from "@/lib/mock-data/about";
import { cn } from "@/lib/utils/cn";

export function AboutTeam() {
  return (
    <PageSection id="ekip" tone="light">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal variant="left" className="space-y-3">
          <SectionKicker icon="groups">Profesyonel kadro</SectionKicker>
          <h2 className="headline-lg font-bold tracking-tight text-slate-900">Atölyenin arkasındakiler.</h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 md:text-lg">
            Herkes uzman olduğu işte: PPF, cam filmi, söküm-montaj ve kabul ekipleri aynı çatı altında, entegre ve
            koordineli olarak çalışır.
          </p>
        </Reveal>
        <span className="card-light inline-flex items-center gap-2 self-start rounded-lg px-4 py-2 font-mono text-[13px] text-slate-500 md:self-auto">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Aktif 4 departman · tek standart
        </span>
      </div>
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {aboutLeaders.map((person, index) => (
          <Reveal key={person.initials} variant={index === 0 ? "left" : "right"}>
            <article
              className={cn(
                "card-light group flex flex-col items-start gap-6 overflow-hidden rounded-xl p-6 sm:flex-row sm:items-center md:p-8",
                person.accent === "red" ? "hover:border-brand-red/50" : "hover:border-cyan-400/70",
              )}
            >
              <span
                className={cn(
                  "flex h-20 w-20 shrink-0 items-center justify-center rounded-full p-0.5",
                  person.accent === "red"
                    ? "bg-gradient-to-br from-brand-red to-[#8f0041] shadow-[0_0_20px_rgba(227,30,36,0.25)]"
                    : "bg-gradient-to-br from-cyan-400 to-[#00626e] shadow-[0_0_20px_rgba(0,229,255,0.2)]",
                )}
              >
                <span className="flex h-full w-full items-center justify-center rounded-full bg-white font-display text-[26px] font-bold text-slate-900">
                  {person.initials}
                </span>
              </span>
              <div className="flex-1 space-y-1.5">
                <span
                  className={cn(
                    "label-caps inline-flex items-center gap-1.5 rounded px-2.5 py-0.5 tracking-wider",
                    person.accent === "red"
                      ? "border border-brand-red/30 bg-brand-red/10 text-brand-red"
                      : "border border-cyan-500/30 bg-cyan-50 text-cyan-700",
                  )}
                >
                  {person.role}
                </span>
                <h3 className="font-display text-xl font-bold text-slate-900">{person.name}</h3>
                <p className="text-[14px] leading-6 text-slate-600">{person.bio}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aboutDepartments.map((item, index) => (
          <Reveal key={item.title} variant="up" delayMs={index * 60}>
            <article className="card-light flex h-full flex-col rounded-lg p-5 transition-all hover:border-slate-300">
              <div className="mb-3 flex items-center gap-2">
                <Icon
                  name={item.icon}
                  className={cn("text-[20px]", item.tone === "red" ? "text-brand-red" : "text-cyan-600")}
                />
                <h3 className="font-display font-bold text-slate-900">{item.title}</h3>
              </div>
              <p className="flex-1 text-[13px] leading-5 text-slate-600">{item.body}</p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 font-mono text-[11px] text-slate-500">
                <span>{item.focus}</span>
                <span className={item.tone === "red" ? "text-brand-red" : "text-cyan-600"}>{item.tag}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </PageSection>
  );
}
