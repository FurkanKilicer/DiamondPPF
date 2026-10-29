import type { Metadata } from "next";
import { AdminOverview } from "@/features/admin/admin-overview";
import { AdminPageSuspense } from "@/features/admin/admin-page-suspense";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";
import { getCmsSummary } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Genel bakış",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin" },
};

export default function AdminOverviewPage() {
  return (
    <AdminPageSuspense>
      <AdminOverviewBody />
    </AdminPageSuspense>
  );
}

async function AdminOverviewBody() {
  const state = await requireAdminAuth();
  if (!state) return null;
  const summary = await getCmsSummary();
  return <AdminOverview email={state.user.email} summary={summary} />;
}
