import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminPageSuspense } from "@/features/admin/admin-page-suspense";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";

export const metadata: Metadata = {
  title: "Yeni hizmet",
  robots: { index: false, follow: false },
};

export default function AdminNewServicePage() {
  return (
    <AdminPageSuspense>
      <AdminNewServiceBody />
    </AdminPageSuspense>
  );
}

async function AdminNewServiceBody() {
  const state = await requireAdminAuth();
  if (!state) return null;
  redirect("/admin/hizmetler");
}
