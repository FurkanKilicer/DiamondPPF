"use server";

import { revalidatePath, updateTag } from "next/cache";
import { CMS_GALLERY_PUBLIC_TAG } from "@/lib/cms/cached-public";
import { redirect } from "next/navigation";
import { requireAdminAuth } from "@/lib/auth/get-admin-auth";
import {
  isCmsGalleryId,
  parseCmsGalleryForm,
  type CmsGalleryFormState,
  type CmsGalleryFormValues,
} from "@/lib/cms/gallery-input";
import { parseCmsGalleryKind } from "@/lib/cms/gallery-kind";
import {
  CMS_GALLERY_CREATE_MISSING,
  CMS_GALLERY_DELETE_MISSING,
  CMS_GALLERY_ID_ERROR,
  CMS_GALLERY_UPDATE_MISSING,
  cmsGalleryRedirectPath,
  cmsGalleryWriteGate,
  interpretCmsGalleryMutation,
  type CmsGalleryNotice,
} from "@/lib/cms/gallery-write";
import { resolveFormImagePath } from "@/lib/cms/media";
import type { CmsGalleryKind } from "@/lib/cms/types";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export type { CmsGalleryFormState };

async function requireWritableAdmin() {
  const state = await requireAdminAuth();
  return cmsGalleryWriteGate({ isAdmin: state !== null, configured: isSupabaseConfigured() });
}

function fail(
  values: CmsGalleryFormValues,
  error: string,
  fieldErrors: CmsGalleryFormState["fieldErrors"] = {},
): CmsGalleryFormState {
  return { error, fieldErrors, values };
}

function revalidateGalleryViews(id?: string) {
  updateTag(CMS_GALLERY_PUBLIC_TAG);
  revalidatePath("/admin");
  revalidatePath("/admin/galeri");
  revalidatePath("/ornek-araclar");
  if (id) revalidatePath(`/admin/galeri/${id}`);
}

function finish(notice: CmsGalleryNotice, options?: { id?: string; kind?: CmsGalleryKind }): never {
  revalidateGalleryViews(options?.id);
  redirect(cmsGalleryRedirectPath(notice, options?.kind));
}

export async function createCmsGallery(
  _prev: CmsGalleryFormState,
  formData: FormData,
): Promise<CmsGalleryFormState> {
  const gate = await requireWritableAdmin();
  const parsed = parseCmsGalleryForm(formData);
  if (!gate.ok) return fail(parsed.values, gate.error);
  if (!parsed.ok) return fail(parsed.values, parsed.error, parsed.fieldErrors);

  const image = await resolveFormImagePath(formData, parsed.data.imagePath, {
    prefix: "gallery",
    published: parsed.data.published,
    required: true,
  });
  if (!image.ok) return fail(parsed.values, image.error, { imagePath: image.error });
  if (!image.path) return fail(parsed.values, "Görsel seçin.", { imagePath: "Görsel seçin." });

  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("cms_gallery")
    .insert({
      title: parsed.data.title,
      description: parsed.data.description,
      image_path: image.path,
      kind: parsed.data.kind,
      published: parsed.data.published,
      sort_order: parsed.data.sortOrder,
    })
    .select("id");
  const outcome = interpretCmsGalleryMutation({ error, rowCount: data?.length ?? 0 }, CMS_GALLERY_CREATE_MISSING);
  if (!outcome.ok) return fail(parsed.values, outcome.error);
  finish("created", { kind: parsed.data.kind });
}

export async function updateCmsGallery(
  _prev: CmsGalleryFormState,
  formData: FormData,
): Promise<CmsGalleryFormState> {
  const gate = await requireWritableAdmin();
  const id = String(formData.get("id") ?? "");
  const parsed = parseCmsGalleryForm(formData);
  if (!gate.ok) return fail(parsed.values, gate.error);
  if (!isCmsGalleryId(id)) return fail(parsed.values, CMS_GALLERY_ID_ERROR);
  if (!parsed.ok) return fail(parsed.values, parsed.error, parsed.fieldErrors);

  const image = await resolveFormImagePath(formData, parsed.data.imagePath, {
    prefix: "gallery",
    published: parsed.data.published,
    required: true,
  });
  if (!image.ok) return fail(parsed.values, image.error, { imagePath: image.error });
  if (!image.path) return fail(parsed.values, "Görsel seçin.", { imagePath: "Görsel seçin." });

  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("cms_gallery")
    .update({
      title: parsed.data.title,
      description: parsed.data.description,
      image_path: image.path,
      kind: parsed.data.kind,
      published: parsed.data.published,
      sort_order: parsed.data.sortOrder,
    })
    .eq("id", id)
    .select("id");
  const outcome = interpretCmsGalleryMutation({ error, rowCount: data?.length ?? 0 }, CMS_GALLERY_UPDATE_MISSING);
  if (!outcome.ok) return fail(parsed.values, outcome.error);
  finish("updated", { id, kind: parsed.data.kind });
}

export type CmsGalleryDeleteState = { error: string | null };

export async function deleteCmsGallery(
  _prev: CmsGalleryDeleteState,
  formData: FormData,
): Promise<CmsGalleryDeleteState> {
  const gate = await requireWritableAdmin();
  if (!gate.ok) return { error: gate.error };

  const id = String(formData.get("id") ?? "");
  const kind = parseCmsGalleryKind(String(formData.get("kind") ?? ""));
  if (!isCmsGalleryId(id)) return { error: CMS_GALLERY_ID_ERROR };

  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from("cms_gallery").delete().eq("id", id).select("id");
  const outcome = interpretCmsGalleryMutation({ error, rowCount: data?.length ?? 0 }, CMS_GALLERY_DELETE_MISSING);
  if (!outcome.ok) return { error: outcome.error };
  finish("deleted", { kind });
}
