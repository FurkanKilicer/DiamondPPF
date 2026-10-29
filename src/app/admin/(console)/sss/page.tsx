import type { Metadata } from "next";
import { AdminFaqsScreen } from "@/features/admin/admin-faqs-screen";
import { AdminPageSuspense } from "@/features/admin/admin-page-suspense";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";
import { listCmsFaqs } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "SSS",
  robots: { index: false, follow: false },
};

export default function AdminFaqsPage() {
  return (
    <AdminPageSuspense>
      <AdminFaqsBody />
    </AdminPageSuspense>
  );
}

async function AdminFaqsBody() {
  const state = await requireAdminAuth();
  if (!state) return null;
  return <AdminFaqsScreen result={await listCmsFaqs()} />;
}
