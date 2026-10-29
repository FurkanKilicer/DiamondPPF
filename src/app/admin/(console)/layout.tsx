import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AdminCheckFailed } from "@/features/admin/admin-check-failed";
import { AdminForbidden } from "@/features/admin/admin-forbidden";
import { AdminPageSkeleton } from "@/features/admin/admin-page-skeleton";
import { AdminAccountPreview, AdminShell } from "@/features/admin/admin-shell";
import { getAdminAuthState } from "@/lib/auth/get-admin-auth";

async function AdminAccountFromAuth() {
  const state = await getAdminAuthState();
  const email = state.status === "unauthenticated" ? null : state.user.email;
  return <AdminAccountPreview email={email} />;
}

async function AdminConsoleGate({ children }: { children: React.ReactNode }) {
  const state = await getAdminAuthState();
  if (state.status === "unauthenticated") {
    redirect("/admin/login");
  }
  if (state.status === "forbidden") {
    return <AdminForbidden email={state.user.email} />;
  }
  if (state.status === "check_failed") {
    return <AdminCheckFailed email={state.user.email} />;
  }
  return children;
}

export default function AdminConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell
      account={
        <Suspense fallback={<AdminAccountPreview email={null} />}>
          <AdminAccountFromAuth />
        </Suspense>
      }
    >
      <Suspense fallback={<AdminPageSkeleton />}>
        <AdminConsoleGate>
          <Suspense fallback={<AdminPageSkeleton />}>{children}</Suspense>
        </AdminConsoleGate>
      </Suspense>
    </AdminShell>
  );
}
