import { cn } from "@/lib/utils/cn";

function Bone({ className }: { className?: string }) {
  return <div className={cn("rounded-lg bg-white/8 motion-safe:animate-pulse", className)} />;
}

export function AdminPageSkeleton() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6" aria-busy="true" aria-live="polite">
      <p className="sr-only">İçerik yükleniyor</p>
      <header className="flex flex-col gap-4 border-b border-white/8 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 space-y-3">
          <Bone className="h-3 w-24" />
          <Bone className="h-8 w-56 sm:h-9 sm:w-72" />
          <Bone className="h-4 w-full max-w-xl" />
          <Bone className="h-4 w-2/3 max-w-md" />
        </div>
        <Bone className="h-11 w-36" />
      </header>
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 5 }, (_, index) => (
          <Bone key={index} className="h-11 w-28 shrink-0" />
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/8 bg-surface-card">
        <div className="border-b border-white/8 px-4 py-3">
          <div className="flex gap-6">
            <Bone className="h-3 w-12" />
            <Bone className="h-3 w-24" />
            <Bone className="hidden h-3 w-40 md:block" />
            <Bone className="h-3 w-16" />
          </div>
        </div>
        <ul>
          {Array.from({ length: 8 }, (_, index) => (
            <li key={index} className="flex items-center gap-4 border-b border-white/6 px-4 py-4 last:border-0">
              <Bone className="h-8 w-8 shrink-0" />
              <Bone className="h-4 w-1/4 min-w-28" />
              <Bone className="hidden h-4 flex-1 md:block" />
              <Bone className="h-6 w-16 rounded-full" />
              <Bone className="ml-auto h-9 w-9 shrink-0" />
              <Bone className="h-9 w-9 shrink-0" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
