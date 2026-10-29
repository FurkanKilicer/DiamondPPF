import { PageSection } from "@/components/layout/page-section";
import { cn } from "@/lib/utils/cn";

function Bone({
  tone = "canvas",
  className,
}: {
  tone?: "canvas" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg motion-safe:animate-pulse",
        tone === "light" ? "bg-slate-300/70" : "bg-white/8",
        className,
      )}
    />
  );
}

function CardGrid({
  count,
  tone,
  aspect,
  cols,
}: {
  count: number;
  tone: "canvas" | "light";
  aspect: string;
  cols: string;
}) {
  return (
    <ul className={cn("grid gap-4 sm:gap-6", cols)}>
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className={cn("overflow-hidden rounded-2xl", tone === "light" ? "bg-white" : "bg-surface-card")}>
          <Bone tone={tone} className={cn("w-full rounded-none", aspect)} />
          <div className="space-y-2 p-4">
            <Bone tone={tone} className="h-3 w-1/3" />
            <Bone tone={tone} className="h-5 w-2/3" />
            <Bone tone={tone} className="h-3 w-full" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function GalleryPageSkeleton({ includeQuote = false }: { includeQuote?: boolean }) {
  return (
    <div aria-busy="true" aria-live="polite">
      <p className="sr-only">Örnek araçlar yükleniyor</p>

      <PageSection bordered={false}>
        <Bone className="mb-8 h-4 w-40" />
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <Bone className="h-3 w-56" />
            <Bone className="h-12 w-full max-w-xl sm:h-16" />
            <Bone className="h-4 w-full max-w-lg" />
            <Bone className="h-4 w-2/3 max-w-md" />
            <div className="flex gap-3 pt-2">
              <Bone className="h-12 w-32" />
              <Bone className="h-12 w-40" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-4">
            {Array.from({ length: 4 }, (_, index) => (
              <Bone key={index} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection>
        <Bone className="mb-8 h-8 w-56" />
        <div className="mb-8 flex gap-2 overflow-hidden">
          {Array.from({ length: 6 }, (_, index) => (
            <Bone key={index} className="h-10 w-24 shrink-0 rounded-full" />
          ))}
        </div>
        <CardGrid count={3} tone="canvas" aspect="aspect-[16/10]" cols="grid-cols-1 md:grid-cols-2 xl:grid-cols-3" />
      </PageSection>

      <PageSection tone="light">
        <div className="mx-auto mb-10 max-w-xl space-y-3">
          <Bone tone="light" className="mx-auto h-3 w-48" />
          <Bone tone="light" className="mx-auto h-8 w-72" />
        </div>
        <CardGrid count={4} tone="light" aspect="aspect-square" cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" />
      </PageSection>

      <PageSection>
        <Bone className="mb-8 h-8 w-72" />
        <CardGrid count={3} tone="canvas" aspect="aspect-video" cols="grid-cols-1 lg:grid-cols-3" />
      </PageSection>

      <PageSection tone="light">
        <Bone tone="light" className="mb-8 h-8 w-56" />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <li key={index}>
              <Bone tone="light" className="aspect-square w-full rounded-xl" />
            </li>
          ))}
        </ul>
      </PageSection>

      {includeQuote ? (
        <PageSection>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <Bone className="h-8 w-64" />
              <Bone className="h-4 w-full" />
              <Bone className="h-16 w-full rounded-xl" />
              <Bone className="h-16 w-full rounded-xl" />
            </div>
            <Bone className="h-72 rounded-2xl lg:col-span-7" />
          </div>
        </PageSection>
      ) : null}
    </div>
  );
}
