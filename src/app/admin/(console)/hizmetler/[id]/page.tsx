import { notFound, redirect } from "next/navigation";
import { AdminPageSuspense } from "@/features/admin/admin-page-suspense";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";
import { getCmsServiceById } from "@/lib/cms/queries";
import { isCmsServiceId } from "@/lib/cms/service-input";

export default function AdminEditServicePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <AdminPageSuspense>
      <AdminEditServiceBody params={params} />
    </AdminPageSuspense>
  );
}

async function AdminEditServiceBody({ params }: { params: Promise<{ id: string }> }) {
  const state = await requireAdminAuth();
  if (!state) return null;

  const { id } = await params;
  if (!isCmsServiceId(id)) notFound();

  const result = await getCmsServiceById(id);
  if (!result.ok && result.code === "not_found") notFound();
  redirect(`/admin/hizmetler?edit=${id}`);
}
