import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";
import { CMS_MEDIA_BUCKET, isSafeCmsMediaPath } from "@/lib/cms/media";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params;
  const objectPath = segments.map((part) => decodeURIComponent(part)).join("/");
  if (!isSafeCmsMediaPath(objectPath)) {
    return NextResponse.json({ error: "Geçersiz görsel yolu." }, { status: 400 });
  }

  if (objectPath.startsWith("draft/")) {
    const admin = await requireAdminAuth();
    if (!admin) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const storage = getSupabaseAdmin().storage.from(CMS_MEDIA_BUCKET);
  const { data, error } = await storage.download(objectPath);
  if (error || !data) return NextResponse.json({ error: "Görsel bulunamadı." }, { status: 404 });

  const contentType = data.type || "application/octet-stream";
  return new NextResponse(data, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": objectPath.startsWith("published/")
        ? "public, max-age=86400, s-maxage=86400, immutable"
        : "private, max-age=120",
    },
  });
}
