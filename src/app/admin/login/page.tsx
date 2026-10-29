import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AdminAuthFallback } from "@/features/admin/admin-auth-fallback";
import { AdminCheckFailed } from "@/features/admin/admin-check-failed";
import { AdminForbidden } from "@/features/admin/admin-forbidden";
import { AdminLogin } from "@/features/admin/admin-login";
import { getAdminAuthState } from "@/lib/auth/get-admin-auth";

export const metadata: Metadata = {
  title: "Admin Giriş",
  description: "Diamond PPF yetkili paneli giriş ekranı.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin/login" },
};


async function AdminLoginGate() {
  const state = await getAdminAuthState();
  if (state.status === "ok") {
    redirect("/admin");
  }
  if (state.status === "forbidden") {
    return <AdminForbidden email={state.user.email} />;
  }
  if (state.status === "check_failed") {
    return <AdminCheckFailed email={state.user.email} />;
  }
  return <AdminLogin />;
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<AdminAuthFallback />}>
      <AdminLoginGate />
    </Suspense>
  );
}
