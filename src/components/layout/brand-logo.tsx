import Image from "next/image";
import { site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  compact?: boolean;
  priority?: boolean;
};

export function BrandLogo({ compact = false, priority = false }: BrandLogoProps) {
  return (
    <span className="flex min-w-0 items-center gap-2.5 md:gap-3">
      <Image
        src={site.logoMark}
        alt=""
        width={80}
        height={44}
        priority={priority}
        className={cn(
          "h-9 w-auto max-w-[4.75rem] shrink-0 object-contain object-left sm:max-w-[6rem] md:max-w-[7.5rem]",
          compact ? "sm:h-8 md:h-9" : "md:h-12",
        )}
      />
      <span
        className={cn(
          "hidden min-w-0 font-display font-semibold text-text-primary uppercase sm:inline",
          compact
            ? "text-[11px] leading-none tracking-[0.14em] md:text-[13px] md:tracking-[0.2em]"
            : "text-sm leading-tight tracking-[0.14em] md:text-lg md:tracking-[0.2em]",
        )}
      >
        Diamond PPF
      </span>
    </span>
  );
}
