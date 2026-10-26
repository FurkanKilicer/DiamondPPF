import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils/cn";

export function PageSection({
  id,
  bordered = true,
  tone = "canvas",
  hidden = false,
  className,
  children,
}: {
  id?: string;
  bordered?: boolean;
  tone?: "canvas" | "light";
  hidden?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const light = tone === "light";

  return (
    <section
      id={id}
      hidden={hidden}
      className={cn(
        "relative w-full",
        hidden && "hidden",
        id && "scroll-mt-20 md:scroll-mt-24",
        light ? "light-band" : "bg-surface-canvas",
        !light && bordered && "border-t border-border-subtle/80",
      )}
    >
      <div
        className={cn(
          "page-pad page-shell relative",
          bordered ? "py-16 md:py-20" : "pt-8 pb-14",
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function SectionKicker({
  icon,
  children,
}: {
  icon?: string;
  children: ReactNode;
}) {
  return (
    <span className="label-caps mb-3 inline-flex items-center gap-2 tracking-widest text-brand-red">
      {icon ? <Icon name={icon} className="text-[16px]" /> : null}
      {children}
    </span>
  );
}
