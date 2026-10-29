import { cache } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicSupabaseClient } from "@/lib/supabase/public-server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { isCmsGalleryKind } from "@/lib/cms/gallery-kind";
import type {
  CmsCountPair,
  CmsFaqItem,
  CmsGalleryItem,
  CmsListError,
  CmsListOk,
  CmsPageItem,
  CmsPublicSettings,
  CmsServiceItem,
  CmsServiceRow,
  CmsSummary,
} from "@/lib/cms/types";

function notConfigured(): CmsListError {
  return { ok: false, message: "Supabase sunucu ortamı eksik." };
}

function fromError(error: { message: string; code?: string }): CmsListError {
  return { ok: false, message: error.message, code: error.code };
}

function isCountError(value: CmsCountPair | CmsListError): value is CmsListError {
  return "ok" in value && value.ok === false;
}

async function countPair(table: string): Promise<CmsCountPair | CmsListError> {
  if (!isSupabaseConfigured()) return notConfigured();
  const admin = getSupabaseAdmin();
  const totalRes = await admin.from(table).select("*", { count: "exact", head: true });
  if (totalRes.error) return fromError(totalRes.error);
  const publishedRes = await admin.from(table).select("*", { count: "exact", head: true }).eq("published", true);
  if (publishedRes.error) return fromError(publishedRes.error);
  return { total: totalRes.count ?? 0, published: publishedRes.count ?? 0 };
}

export async function getCmsSummary(): Promise<CmsSummary> {
  if (!isSupabaseConfigured()) return notConfigured();
  try {
    const [services, gallery, faqs, pages] = await Promise.all([
      countPair("cms_services"),
      countPair("cms_gallery"),
      countPair("cms_faqs"),
      countPair("cms_pages"),
    ]);
    if (isCountError(services)) return services;
    if (isCountError(gallery)) return gallery;
    if (isCountError(faqs)) return faqs;
    if (isCountError(pages)) return pages;
    return { ok: true, services, gallery, faqs, pages };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Özet okunamadı." };
  }
}

export const CMS_SERVICE_COLUMNS = "id, title, description, image_path, published, sort_order, updated_at";
export const CMS_SERVICES_LIST_LIMIT = 200;

function mapServiceRow(row: CmsServiceRow): CmsServiceItem {
  const imagePath = typeof row.image_path === "string" && row.image_path.length > 0 ? row.image_path : null;
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    imagePath,
    published: row.published,
    sortOrder: row.sort_order,
    updatedAt: row.updated_at,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asServiceRow(row: unknown): CmsServiceRow | null {
  if (!isRecord(row)) return null;
  if (typeof row.id !== "string" || typeof row.title !== "string" || typeof row.description !== "string") {
    return null;
  }
  const imagePath = typeof row.image_path === "string" && row.image_path.length > 0 ? row.image_path : null;
  const sortOrder = Number(row.sort_order);
  if (!Number.isFinite(sortOrder)) return null;
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    image_path: imagePath,
    published: row.published === true,
    sort_order: sortOrder,
    updated_at: String(row.updated_at ?? ""),
  };
}

export async function queryCmsServices(
  client: SupabaseClient,
  options: { publishedOnly: boolean },
): Promise<CmsListOk<CmsServiceItem> | CmsListError> {
  const base = client.from("cms_services").select(CMS_SERVICE_COLUMNS);
  const filtered = options.publishedOnly ? base.eq("published", true) : base;
  const { data, error } = await filtered
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true })
    .limit(CMS_SERVICES_LIST_LIMIT);
  if (error) return fromError(error);
  const items: CmsServiceItem[] = [];
  for (const row of data ?? []) {
    const mapped = asServiceRow(row);
    if (mapped) items.push(mapServiceRow(mapped));
  }
  return { ok: true, items };
}

export async function listCmsServices(): Promise<CmsListOk<CmsServiceItem> | CmsListError> {
  if (!isSupabaseConfigured()) return notConfigured();
  return queryCmsServices(getSupabaseAdmin(), { publishedOnly: false });
}

export const listPublishedCmsServices = cache(async (): Promise<CmsListOk<CmsServiceItem> | CmsListError> => {
  const client = createPublicSupabaseClient();
  if (!client) return { ok: false, message: "Supabase genel ortamı eksik.", code: "not_configured" };
  return queryCmsServices(client, { publishedOnly: true });
});

export async function getCmsServiceById(id: string): Promise<{ ok: true; item: CmsServiceItem } | CmsListError> {
  if (!isSupabaseConfigured()) return notConfigured();
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from("cms_services").select(CMS_SERVICE_COLUMNS).eq("id", id).maybeSingle();
  if (error) return fromError(error);
  const mapped = asServiceRow(data);
  if (!mapped) return { ok: false, message: "Hizmet bulunamadı.", code: "not_found" };
  return { ok: true, item: mapServiceRow(mapped) };
}

export const CMS_GALLERY_COLUMNS = "id, title, description, image_path, kind, published, sort_order, updated_at";
export const CMS_GALLERY_LIST_LIMIT = 80;

function asGalleryRow(row: unknown): CmsGalleryItem | null {
  if (!isRecord(row)) return null;
  if (typeof row.id !== "string" || typeof row.title !== "string" || typeof row.description !== "string") {
    return null;
  }
  if (typeof row.image_path !== "string" || row.image_path.length < 1) return null;
  const kind = typeof row.kind === "string" ? row.kind : "vehicle";
  if (!isCmsGalleryKind(kind)) return null;
  const sortOrder = Number(row.sort_order);
  if (!Number.isFinite(sortOrder)) return null;
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    imagePath: row.image_path,
    kind,
    published: row.published === true,
    sortOrder,
    updatedAt: String(row.updated_at ?? ""),
  };
}

export async function queryCmsGallery(
  client: SupabaseClient,
  options: { publishedOnly: boolean },
): Promise<CmsListOk<CmsGalleryItem> | CmsListError> {
  const base = client.from("cms_gallery").select(CMS_GALLERY_COLUMNS);
  const filtered = options.publishedOnly ? base.eq("published", true) : base;
  const { data, error } = await filtered
    .order("kind", { ascending: true })
    .order("sort_order", { ascending: true })
    .limit(CMS_GALLERY_LIST_LIMIT);
  if (error) return fromError(error);
  const items: CmsGalleryItem[] = [];
  for (const row of data ?? []) {
    const mapped = asGalleryRow(row);
    if (mapped) items.push(mapped);
  }
  return { ok: true, items };
}

export async function listCmsGallery(): Promise<CmsListOk<CmsGalleryItem> | CmsListError> {
  if (!isSupabaseConfigured()) return notConfigured();
  return queryCmsGallery(getSupabaseAdmin(), { publishedOnly: false });
}

export const listPublishedCmsGallery = cache(async (): Promise<CmsListOk<CmsGalleryItem> | CmsListError> => {
  const client = createPublicSupabaseClient();
  if (!client) return { ok: false, message: "Supabase genel ortamı eksik.", code: "not_configured" };
  return queryCmsGallery(client, { publishedOnly: true });
});

export async function getCmsGalleryById(id: string): Promise<{ ok: true; item: CmsGalleryItem } | CmsListError> {
  if (!isSupabaseConfigured()) return notConfigured();
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from("cms_gallery").select(CMS_GALLERY_COLUMNS).eq("id", id).maybeSingle();
  if (error) return fromError(error);
  const mapped = asGalleryRow(data);
  if (!mapped) return { ok: false, message: "Galeri kaydı bulunamadı.", code: "not_found" };
  return { ok: true, item: mapped };
}

export async function listCmsFaqs(): Promise<CmsListOk<CmsFaqItem> | CmsListError> {
  if (!isSupabaseConfigured()) return notConfigured();
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("cms_faqs")
    .select("id, collection, question, answer, published, sort_order, updated_at")
    .order("sort_order", { ascending: true })
    .limit(80);
  if (error) return fromError(error);
  return {
    ok: true,
    items: (data ?? []).map((row) => ({
      id: String(row.id),
      collection: String(row.collection),
      question: String(row.question),
      answer: String(row.answer),
      published: Boolean(row.published),
      sortOrder: Number(row.sort_order),
      updatedAt: String(row.updated_at),
    })),
  };
}

export async function listCmsPages(): Promise<CmsListOk<CmsPageItem> | CmsListError> {
  if (!isSupabaseConfigured()) return notConfigured();
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from("cms_pages").select("slug, title, published, updated_at").order("slug");
  if (error) return fromError(error);
  return {
    ok: true,
    items: (data ?? []).map((row) => ({
      slug: String(row.slug),
      title: String(row.title),
      published: Boolean(row.published),
      updatedAt: String(row.updated_at),
    })),
  };
}

export async function getCmsPublicSettings(): Promise<{ ok: true; data: CmsPublicSettings | null } | CmsListError> {
  if (!isSupabaseConfigured()) return notConfigured();
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("cms_site_settings_public")
    .select(
      "whatsapp_digits, phone_display, phone_e164, address, address_short, hours_line, hours_note, maps_href, youtube_url, instagram_url, updated_at",
    )
    .eq("id", 1)
    .maybeSingle();
  if (error) return fromError(error);
  if (!data) return { ok: true, data: null };
  return {
    ok: true,
    data: {
      whatsappDigits: String(data.whatsapp_digits ?? ""),
      phoneDisplay: String(data.phone_display ?? ""),
      phoneE164: String(data.phone_e164 ?? ""),
      address: String(data.address ?? ""),
      addressShort: String(data.address_short ?? ""),
      hoursLine: String(data.hours_line ?? ""),
      hoursNote: String(data.hours_note ?? ""),
      mapsHref: String(data.maps_href ?? ""),
      youtubeUrl: String(data.youtube_url ?? ""),
      instagramUrl: String(data.instagram_url ?? ""),
      updatedAt: String(data.updated_at ?? ""),
    },
  };
}
