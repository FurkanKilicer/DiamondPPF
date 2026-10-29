import Link from "next/link";
import { signOutAdmin } from "@/lib/auth/admin-actions";
import { Icon } from "@/components/ui/icon";

export function AdminForbidden({ email }: { email: string | null }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-surface-canvas px-4 text-center text-text-primary">
      <p className="label-caps tracking-widest text-brand-magenta">403</p>
      <h1 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">Erişim reddedildi</h1>
      <p className="mt-3 max-w-md text-[15px] leading-6 text-text-secondary">
        Oturumunuz doğrulandı ancak bu hesap yönetim paneline yetkili değil.
        {email ? (
          <>
            {" "}
            Giriş yapılan hesap: <span className="text-text-primary">{email}</span>.
          </>
        ) : null}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <form action={signOutAdmin}>
          <button type="submit" className="cta-red inline-flex min-h-11 items-center gap-2 rounded-lg px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wide">
            <Icon name="logout" className="text-[18px]" />
            Çıkış yap
          </button>
        </form>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-lg border border-border-subtle px-5 py-2.5 text-sm text-text-secondary hover:text-text-primary"
        >
          Ana siteye dön
        </Link>
      </div>
    </div>
  );
}
