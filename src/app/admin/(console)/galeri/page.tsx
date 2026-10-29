import type { Metadata } from "next";
import { AdminGalleryScreen } from "@/features/admin/admin-gallery-screen";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";
import { listCmsGallery } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Araç Galerisi",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; tab?: string; edit?: string }>;
}) {
  const state = await requireAdminAuth();
  if (!state) return null;
  const { notice, tab, edit } = await searchParams;
  return <AdminGalleryScreen result={await listCmsGallery()} notice={notice} tab={tab} editId={edit} />;
}
