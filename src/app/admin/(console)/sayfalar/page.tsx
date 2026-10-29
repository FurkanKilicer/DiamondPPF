import type { Metadata } from "next";
import { AdminPageSuspense } from "@/features/admin/admin-page-suspense";
import { AdminPagesScreen } from "@/features/admin/admin-pages-screen";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";
import { listCmsPages } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Sayfa İçerikleri",
  robots: { index: false, follow: false },
};

export default function AdminPagesPage() {
  return (
    <AdminPageSuspense>
      <AdminPagesBody />
    </AdminPageSuspense>
  );
}

async function AdminPagesBody() {
  const state = await requireAdminAuth();
  if (!state) return null;
  return <AdminPagesScreen result={await listCmsPages()} />;
}
