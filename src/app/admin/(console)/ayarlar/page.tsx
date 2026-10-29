import type { Metadata } from "next";
import { AdminSettingsScreen } from "@/features/admin/admin-settings-screen";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";
import { getCmsPublicSettings } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Site Ayarları",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function AdminSettingsPage() {
  const state = await requireAdminAuth();
  if (!state) return null;
  return <AdminSettingsScreen result={await getCmsPublicSettings()} />;
}
