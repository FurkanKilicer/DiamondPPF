import type { Metadata } from "next";
import { AdminFaqsScreen } from "@/features/admin/admin-faqs-screen";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";
import { listCmsFaqs } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "SSS",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function AdminFaqsPage() {
  const state = await requireAdminAuth();
  if (!state) return null;
  return <AdminFaqsScreen result={await listCmsFaqs()} />;
}
