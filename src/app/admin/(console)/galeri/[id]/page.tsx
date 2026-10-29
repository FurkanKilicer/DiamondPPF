import { notFound, redirect } from "next/navigation";
import { AdminPageSuspense } from "@/features/admin/admin-page-suspense";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";
import { isCmsGalleryId } from "@/lib/cms/gallery-input";
import { getCmsGalleryById } from "@/lib/cms/queries";

export default function AdminEditGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <AdminPageSuspense>
      <AdminEditGalleryBody params={params} />
    </AdminPageSuspense>
  );
}

async function AdminEditGalleryBody({ params }: { params: Promise<{ id: string }> }) {
  const state = await requireAdminAuth();
  if (!state) return null;

  const { id } = await params;
  if (!isCmsGalleryId(id)) notFound();

  const result = await getCmsGalleryById(id);
  if (!result.ok && result.code === "not_found") notFound();
  if (!result.ok) redirect("/admin/galeri");

  const tab = result.item.kind === "vehicle" ? "" : `&tab=${result.item.kind}`;
  redirect(`/admin/galeri?edit=${id}${tab}`);
}
