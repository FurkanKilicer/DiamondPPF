"use server";

import { revalidatePath, updateTag } from "next/cache";
import { CMS_SERVICES_PUBLIC_TAG } from "@/lib/cms/cached-public";
import { redirect } from "next/navigation";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";
import {
  isCmsServiceId,
  mapCmsWriteError,
  parseCmsServiceForm,
  type CmsServiceFormState,
  type CmsServiceFormValues,
} from "@/lib/cms/service-input";
import { resolveFormImagePath } from "@/lib/cms/media";
import { parseReorderIds } from "@/lib/cms/service-list";
import {
  CMS_SERVICE_CREATE_MISSING,
  CMS_SERVICE_DELETE_MISSING,
  CMS_SERVICE_ID_ERROR,
  CMS_SERVICE_UPDATE_MISSING,
  cmsServiceRedirectPath,
  cmsServiceWriteGate,
  interpretCmsServiceMutation,
  type CmsServiceNotice,
} from "@/lib/cms/service-write";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export type { CmsServiceFormState };

async function requireWritableAdmin() {
  const state = await requireAdminAuth();
  return cmsServiceWriteGate({ isAdmin: state !== null, configured: isSupabaseConfigured() });
}

function fail(
  values: CmsServiceFormValues,
  error: string,
  fieldErrors: CmsServiceFormState["fieldErrors"] = {},
): CmsServiceFormState {
  return { error, fieldErrors, values };
}

function revalidateServiceViews(id?: string) {
  updateTag(CMS_SERVICES_PUBLIC_TAG);
  revalidatePath("/admin");
  revalidatePath("/admin/hizmetler");
  revalidatePath("/hizmetler");
  if (id) revalidatePath(`/admin/hizmetler/${id}`);
}

function finish(notice: CmsServiceNotice, id?: string): never {
  revalidateServiceViews(id);
  redirect(cmsServiceRedirectPath(notice));
}

export async function createCmsService(
  _prev: CmsServiceFormState,
  formData: FormData,
): Promise<CmsServiceFormState> {
  const gate = await requireWritableAdmin();
  const parsed = parseCmsServiceForm(formData);
  if (!gate.ok) return fail(parsed.values, gate.error);
  if (!parsed.ok) return fail(parsed.values, parsed.error, parsed.fieldErrors);

  const image = await resolveFormImagePath(formData, parsed.data.imagePath, {
    prefix: "services",
    published: parsed.data.published,
    required: false,
  });
  if (!image.ok) return fail(parsed.values, image.error, { imagePath: image.error });

  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("cms_services")
    .insert({
      title: parsed.data.title,
      description: parsed.data.description,
      image_path: image.path,
      published: parsed.data.published,
      sort_order: parsed.data.sortOrder,
    })
    .select("id");
  const outcome = interpretCmsServiceMutation({ error, rowCount: data?.length ?? 0 }, CMS_SERVICE_CREATE_MISSING);
  if (!outcome.ok) return fail(parsed.values, outcome.error);

  finish("created");
}

export async function updateCmsService(
  _prev: CmsServiceFormState,
  formData: FormData,
): Promise<CmsServiceFormState> {
  const gate = await requireWritableAdmin();
  const id = String(formData.get("id") ?? "");
  const parsed = parseCmsServiceForm(formData);
  if (!gate.ok) return fail(parsed.values, gate.error);
  if (!isCmsServiceId(id)) return fail(parsed.values, CMS_SERVICE_ID_ERROR);
  if (!parsed.ok) return fail(parsed.values, parsed.error, parsed.fieldErrors);

  const image = await resolveFormImagePath(formData, parsed.data.imagePath, {
    prefix: "services",
    published: parsed.data.published,
    required: false,
  });
  if (!image.ok) return fail(parsed.values, image.error, { imagePath: image.error });

  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("cms_services")
    .update({
      title: parsed.data.title,
      description: parsed.data.description,
      image_path: image.path,
      published: parsed.data.published,
      sort_order: parsed.data.sortOrder,
    })
    .eq("id", id)
    .select("id");
  const outcome = interpretCmsServiceMutation({ error, rowCount: data?.length ?? 0 }, CMS_SERVICE_UPDATE_MISSING);
  if (!outcome.ok) return fail(parsed.values, outcome.error);

  finish("updated", id);
}

export type CmsServiceDeleteState = { error: string | null };

export async function deleteCmsService(
  _prev: CmsServiceDeleteState,
  formData: FormData,
): Promise<CmsServiceDeleteState> {
  const gate = await requireWritableAdmin();
  if (!gate.ok) return { error: gate.error };

  const id = String(formData.get("id") ?? "");
  if (!isCmsServiceId(id)) return { error: CMS_SERVICE_ID_ERROR };

  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from("cms_services").delete().eq("id", id).select("id");
  const outcome = interpretCmsServiceMutation({ error, rowCount: data?.length ?? 0 }, CMS_SERVICE_DELETE_MISSING);
  if (!outcome.ok) return { error: outcome.error };

  finish("deleted");
}

export async function reorderCmsServices(orderedIds: string[]): Promise<{ error: string | null }> {
  const gate = await requireWritableAdmin();
  if (!gate.ok) return { error: gate.error };

  const parsed = parseReorderIds(orderedIds);
  if (!parsed.ok) return { error: parsed.error };
  if (!parsed.ids.every(isCmsServiceId)) return { error: CMS_SERVICE_ID_ERROR };

  const admin = getSupabaseAdmin();
  const existing = await admin.from("cms_services").select("id");
  if (existing.error) return { error: mapCmsWriteError(existing.error) };
  const existingIds = new Set((existing.data ?? []).map((row) => String(row.id)));
  if (existingIds.size !== parsed.ids.length || parsed.ids.some((id) => !existingIds.has(id))) {
    return { error: "Liste güncel değil. Sayfayı yenileyin." };
  }

  for (const [index, id] of parsed.ids.entries()) {
    const { error } = await admin.from("cms_services").update({ sort_order: index }).eq("id", id);
    if (error) return { error: mapCmsWriteError(error) };
  }

  revalidateServiceViews();
  return { error: null };
}
