import type { Metadata } from "next";
import { AdminGalleryScreen } from "@/features/admin/admin-gallery-screen";
import { AdminPageSuspense } from "@/features/admin/admin-page-suspense";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";
import { parseCmsGalleryKind } from "@/lib/cms/gallery-kind";
import { countCmsGalleryKinds, listCmsGallery } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Araç Galerisi",
  robots: { index: false, follow: false },
};

export default function AdminGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; tab?: string; edit?: string }>;
}) {
  return (
    <AdminPageSuspense>
      <AdminGalleryBody searchParams={searchParams} />
    </AdminPageSuspense>
  );
}

async function AdminGalleryBody({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; tab?: string; edit?: string }>;
}) {
  const state = await requireAdminAuth();
  if (!state) return null;
  const { notice, tab, edit } = await searchParams;
  const kind = parseCmsGalleryKind(tab);
  const [result, counts] = await Promise.all([listCmsGallery({ kind }), countCmsGalleryKinds()]);
  return <AdminGalleryScreen result={result} counts={counts} notice={notice} tab={tab} editId={edit} />;
}
