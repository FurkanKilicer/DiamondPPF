"use server";

import { redirect } from "next/navigation";
import { createUserSupabaseClient } from "@/lib/supabase/user-server";

export type AdminSignInState = {
  error: string | null;
};

const GENERIC_INVALID = "E-posta veya parola hatalı.";

export async function signInAdmin(
  _prev: AdminSignInState,
  formData: FormData,
): Promise<AdminSignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "E-posta ve parola gerekli." };
  }
  if (email.length > 320 || password.length > 256 || !email.includes("@")) {
    return { error: GENERIC_INVALID };
  }

  const supabase = await createUserSupabaseClient();
  if (!supabase) {
    return {
      error:
        "Supabase public istemcisi yapılandırılmadı. NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (veya NEXT_PUBLIC_SUPABASE_ANON_KEY) tanımlı olmalı.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: GENERIC_INVALID };
  }

  const { data, error: userError } = await supabase.auth.getUser();
  if (userError || !data.user) {
    return { error: "Oturum doğrulanamadı. Tekrar deneyin." };
  }

  redirect("/admin");
}

export async function signOutAdmin() {
  const supabase = await createUserSupabaseClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}
