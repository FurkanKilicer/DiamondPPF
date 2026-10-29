import type { Metadata } from "next";
import { AdminPageSuspense } from "@/features/admin/admin-page-suspense";
import { AdminServicesScreen } from "@/features/admin/admin-services-screen";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";
import { listCmsServices } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Hizmetler",
  robots: { index: false, follow: false },
};

export default function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; tab?: string; page?: string; size?: string; edit?: string }>;
}) {
  return (
    <AdminPageSuspense>
      <AdminServicesBody searchParams={searchParams} />
    </AdminPageSuspense>
  );
}

async function AdminServicesBody({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; tab?: string; page?: string; size?: string; edit?: string }>;
}) {
  const state = await requireAdminAuth();
  if (!state) return null;
  const { notice, tab, page, size, edit } = await searchParams;
  return (
    <AdminServicesScreen result={await listCmsServices()} notice={notice} tab={tab} page={page} size={size} editId={edit} />
  );
}
