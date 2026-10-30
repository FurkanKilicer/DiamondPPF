"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { site } from "@/lib/mock-data/content";

export function NotFoundScreen() {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-surface-canvas px-5 pt-[5.75rem] pb-16 text-text-primary md:pt-24 md:pb-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-cyan/12 blur-[110px]" />
        <div className="absolute right-[-4rem] bottom-[-3rem] h-80 w-80 rounded-full bg-brand-red/14 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#222733_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.16]" />
      </div>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <div className="not-found-stage mb-10 w-full rounded-[1.75rem] border border-white/8 bg-surface-card/70 px-4 pt-8 pb-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <div className="not-found-streaks" aria-hidden />
          <div className="not-found-logo-track">
            <span className="not-found-logo-rig">
              <LogoVehicle priority />
            </span>
            <div className="not-found-dashes" />
          </div>
          <p className="relative mt-4 font-display text-[11px] font-semibold tracking-[0.28em] text-text-muted uppercase">
            Diamond PPF
          </p>
        </div>

        <p className="label-caps tracking-[0.28em] text-brand-cyan">
          404 • YANLIŞ KESİM
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Bu panel şablonda yok
        </h1>
        <p className="mt-3 max-w-md text-[15px] leading-6 text-text-secondary">
          Aradığın parça plotter kesimden geçmemiş ya da yanlış hatta girmiş
          gibi görünüyor. Boyayı korumak için güvenli bölgeye (anasayfaya)
          dönelim.
        </p>

        <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="cta-red inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 font-display text-[12px] font-semibold tracking-wider uppercase"
          >
            <Icon name="home" className="text-[18px]" />
            Anasayfaya git
          </Link>
          <button
            type="button"
            onClick={goBack}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/4 px-6 font-display text-[12px] font-semibold tracking-wider text-text-primary uppercase transition-colors hover:border-white/22 hover:bg-white/8"
          >
            <Icon name="arrow_back" className="text-[18px]" />
            Geri dön
          </button>
        </div>
      </div>
    </main>
  );
}

function LogoVehicle({ priority = false }: { priority?: boolean }) {
  return (
    <span className="not-found-vehicle">
      <Image
        src={site.logoMark}
        alt=""
        width={160}
        height={88}
        priority={priority}
        className="not-found-mark h-16 w-auto object-contain drop-shadow-[0_12px_28px_rgba(0,229,255,0.28)] sm:h-[4.5rem]"
      />
      <span className="not-found-axle" aria-hidden>
        <span className="not-found-wheel" />
        <span className="not-found-wheel" />
      </span>
    </span>
  );
}
