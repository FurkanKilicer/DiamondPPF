import type { Metadata } from "next";
import { AdminPageSuspense } from "@/features/admin/admin-page-suspense";
import { AdminSettingsScreen } from "@/features/admin/admin-settings-screen";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";
import { getCmsPublicSettings } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Site Ayarları",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return (
    <AdminPageSuspense>
      <AdminSettingsBody />
    </AdminPageSuspense>
  );
}

async function AdminSettingsBody() {
  const state = await requireAdminAuth();
  if (!state) return null;
  return <AdminSettingsScreen result={await getCmsPublicSettings()} />;
}
