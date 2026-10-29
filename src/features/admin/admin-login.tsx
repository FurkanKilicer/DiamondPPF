"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useId, useState } from "react";
import { signInAdmin, type AdminSignInState } from "@/lib/auth/admin-actions";
import { Icon } from "@/components/ui/icon";
import { site } from "@/lib/mock-data/content";
import { cn } from "@/lib/utils/cn";

const initialState: AdminSignInState = { error: null };

export function AdminLogin() {
  const emailId = useId();
  const passwordId = useId();
  const errorId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState(signInAdmin, initialState);

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip bg-surface-canvas text-text-primary">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-cyan/10 blur-[100px] md:-top-40 md:-left-40 md:h-[600px] md:w-[600px] md:blur-[140px]" />
        <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-brand-magenta/10 blur-[100px] md:-right-40 md:-bottom-40 md:h-[600px] md:w-[600px] md:blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#222733_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
      </div>

      <header className="relative z-10 flex items-center justify-between gap-3 px-4 pt-5 sm:px-6 md:px-12 md:pt-8">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-brand-cyan shadow-[0_0_8px_#00E5FF]" />
          <span className="label-caps truncate tracking-wider text-text-secondary">
            <span className="md:hidden">Güvenli oturum</span>
            <span className="hidden md:inline">Precision Atelier Auth Protocol</span>
          </span>
        </div>
        <p className="label-caps hidden shrink-0 items-center gap-1 text-text-muted sm:flex">
          <Icon name="lock" className="text-[16px] text-brand-cyan" />
          <span>Güvenli oturum</span>
        </p>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-6 sm:px-6 md:px-12 md:py-10">
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="pointer-events-none absolute -top-24 left-1/2 hidden h-[340px] w-[min(720px,100%)] -translate-x-1/2 rounded-full bg-brand-magenta/10 blur-[130px] lg:block" />

          <section className="hidden flex-col gap-6 lg:order-1 lg:col-span-5 lg:flex">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-surface-container-high/80 px-2 py-1 text-brand-magenta">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-magenta opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-magenta" />
              </span>
              <span className="label-caps tracking-wider text-text-primary">Admin · Tek yetki</span>
            </div>
            <div className="space-y-2">
              <span className="label-caps tracking-widest text-text-muted">Diamond PPF · İçerik paneli</span>
              <h2 className="headline-lg tracking-tight text-text-primary">
                Kusursuz detay.
                <br />
                <span className="text-brand-magenta">Mutlak kontrol.</span>
              </h2>
              <p className="text-[15px] leading-6 text-text-secondary">
                Yönetim paneline yalnızca doğrulanmış yönetici hesabı ile girilir. Kayıt bu ekrandan açılmaz.
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-surface-container-lowest/60 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-brand-magenta">
                <Icon name="security" className="text-[22px]" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold">Erişim denetimi</p>
                <p className="text-[13px] text-text-muted">Oturum sunucuda doğrulanır; yönetici kaydı ayrıca kontrol edilir.</p>
              </div>
            </div>
          </section>

          <section className="lg:order-2 lg:col-span-7">
            <div className="rounded-2xl bg-gradient-to-b from-white/20 via-border-subtle to-transparent p-px shadow-2xl">
              <div className="flex flex-col gap-5 rounded-2xl bg-surface-card/95 p-4 backdrop-blur-2xl sm:gap-6 sm:p-6 md:p-10">
                <div className="flex items-center gap-3 rounded-xl bg-surface-container-lowest/50 p-3 sm:gap-4 sm:p-4">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-canvas p-1 sm:h-12 sm:w-12">
                    <Image src={site.logoMark} alt="" width={44} height={44} className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
                  </div>
                  <div className="min-w-0">
                    <p className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
                      <span className="label-caps font-bold tracking-wider text-text-primary">{site.name}</span>
                      <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-brand-magenta" />
                      <span className="label-caps font-semibold tracking-widest text-brand-magenta">Admin</span>
                    </p>
                    <h1 className="font-display text-lg font-bold sm:text-xl">Yetkili Girişi</h1>
                  </div>
                </div>
                <p className="text-[13px] leading-5 text-text-secondary sm:text-[14px] sm:leading-6">
                  Yönetim paneline erişmek için e-posta ve parolanızı girin.
                </p>

                <form className="flex flex-col gap-4" action={action} noValidate={false}>
                  <div className="flex flex-col gap-1.5">
                    <label className="label-caps tracking-wider text-text-secondary" htmlFor={emailId}>
                      E-posta
                    </label>
                    <div className="relative flex items-center rounded-lg bg-surface-elevated transition-colors focus-within:bg-surface-container-high">
                      <Icon name="mail" className="pointer-events-none absolute left-3 text-[20px] text-text-muted sm:left-4" />
                      <input
                        id={emailId}
                        name="email"
                        type="email"
                        autoComplete="username"
                        required
                        disabled={pending}
                        aria-invalid={state.error ? true : undefined}
                        aria-describedby={state.error ? errorId : undefined}
                        placeholder="E-posta"
                        className="w-full bg-transparent py-3 pr-4 pl-11 text-base text-text-primary placeholder:text-text-muted focus:outline-none disabled:opacity-60 sm:pl-12"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="label-caps tracking-wider text-text-secondary" htmlFor={passwordId}>
                      Parola
                    </label>
                    <div className="relative flex items-center rounded-lg bg-surface-elevated transition-colors focus-within:bg-surface-container-high">
                      <Icon name="key" className="pointer-events-none absolute left-3 text-[20px] text-text-muted sm:left-4" />
                      <input
                        id={passwordId}
                        name="password"
                        autoComplete="current-password"
                        required
                        disabled={pending}
                        type={showPassword ? "text" : "password"}
                        placeholder="Parola"
                        aria-invalid={state.error ? true : undefined}
                        aria-describedby={state.error ? errorId : undefined}
                        className="w-full bg-transparent py-3 pr-12 pl-11 text-base text-text-primary placeholder:text-text-muted focus:outline-none disabled:opacity-60 sm:pl-12"
                      />
                      <button
                        type="button"
                        disabled={pending}
                        className="absolute right-3 min-h-11 min-w-11 p-1 text-text-muted hover:text-text-primary disabled:opacity-50 sm:right-4 sm:min-h-0 sm:min-w-0"
                        aria-label={showPassword ? "Parolayı gizle" : "Parolayı göster"}
                        onClick={() => setShowPassword((value) => !value)}
                      >
                        <Icon name={showPassword ? "visibility_off" : "visibility"} className="text-[20px]" />
                      </button>
                    </div>
                  </div>

                  {state.error ? (
                    <p id={errorId} role="alert" className="rounded-lg bg-brand-magenta/10 px-3 py-2 text-[13px] text-secondary">
                      {state.error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={pending}
                    aria-busy={pending}
                    className="cta-red mt-1 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-center font-display text-[12px] font-semibold tracking-wide uppercase sm:mt-2 sm:px-6 sm:py-3.5 sm:text-sm sm:tracking-wider disabled:opacity-70"
                  >
                    <Icon name={pending ? "sync" : "login"} className={cn("shrink-0 text-[20px]", pending && "animate-spin")} />
                    <span className="min-w-0">{pending ? "Doğrulanıyor..." : "Sisteme giriş yap"}</span>
                  </button>
                </form>

                <div className="flex flex-col gap-2 rounded-xl bg-surface-container/40 p-3 text-[12px] text-text-muted sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:p-4">
                  <p className="flex items-center gap-1.5">
                    <Icon name="vpn_key" className="shrink-0 text-[16px] text-primary-container" />
                    Public kayıt kapalı
                  </p>
                  <p className="flex min-w-0 items-center gap-1.5">
                    <Icon name="domain" className="shrink-0 text-[16px] text-brand-magenta" />
                    <span className="min-w-0">{site.workshopLabel}</span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="relative z-10 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 md:px-12 md:pb-8">
        <div className="flex flex-col items-center gap-3 border-t border-white/15 pt-5 text-center font-display text-[11px] tracking-wider text-text-muted uppercase sm:flex-row sm:justify-between sm:pt-6 sm:text-left">
          <p className="flex items-center justify-center gap-2">
            <Icon name="verified_user" className="shrink-0 text-[16px] text-brand-magenta" />
            <span>Diamond PPF Secure Workspace</span>
          </p>
          <Link href="/" className="hover:text-text-secondary">
            Ana site
          </Link>
        </div>
      </footer>
    </div>
  );
}
