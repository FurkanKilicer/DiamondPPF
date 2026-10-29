import { notFound, redirect } from "next/navigation";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";
import { getCmsServiceById } from "@/lib/cms/queries";
import { isCmsServiceId } from "@/lib/cms/service-input";

export const instant = false;

export default async function AdminEditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const state = await requireAdminAuth();
  if (!state) return null;

  const { id } = await params;
  if (!isCmsServiceId(id)) notFound();

  const result = await getCmsServiceById(id);
  if (!result.ok && result.code === "not_found") notFound();
  redirect(`/admin/hizmetler?edit=${id}`);
}
