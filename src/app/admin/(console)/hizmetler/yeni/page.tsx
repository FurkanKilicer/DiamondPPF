import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";

export const metadata: Metadata = {
  title: "Yeni hizmet",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function AdminNewServicePage() {
  const state = await requireAdminAuth();
  if (!state) return null;
  redirect("/admin/hizmetler");
}
