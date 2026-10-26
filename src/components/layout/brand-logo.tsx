import Image from "next/image";
import { site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  compact?: boolean;
  priority?: boolean;
};

export function BrandLogo({ compact = false, priority = false }: BrandLogoProps) {
  return (
    <span className="flex min-w-0 items-center gap-2 md:gap-3">
      <Image
        src={site.logoMark}
        alt=""
        width={235}
        height={129}
        priority={priority}
        className={cn(
          "w-auto shrink-0 object-contain object-left",
          compact ? "h-8 md:h-9" : "h-9 md:h-12",
        )}
      />
      <span
        className={cn(
          "font-display font-semibold tracking-[0.2em] text-text-primary uppercase",
          compact ? "text-[11px] leading-none md:text-[13px]" : "text-[12px] leading-tight md:text-lg",
        )}
      >
        Diamond PPF
      </span>
    </span>
  );
}
