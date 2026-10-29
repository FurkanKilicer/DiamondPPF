import { formatCmsDate } from "@/lib/cms/format";
import type { CmsListError, CmsPublicSettings } from "@/lib/cms/types";
import { AdminEmptyState, AdminErrorState, AdminGhostButton, AdminPageHeader } from "@/features/admin/ui";

export function AdminSettingsScreen({
  result,
}: {
  result: { ok: true; data: CmsPublicSettings | null } | CmsListError;
}) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <AdminPageHeader
        kicker="Parametreler"
        title="Site ayarları"
        description="WhatsApp, telefon, adres ve sosyal bağlantılar. Kayıt henüz yazılmaz; değerler canlı tablodan okunur."
        actions={<AdminGhostButton>kayıt</AdminGhostButton>}
      />
      {!result.ok ? <AdminErrorState message={result.message} code={result.code} /> : null}
      {result.ok && !result.data ? (
        <AdminEmptyState
          icon="tune"
          title="Ayar satırı yok"
          description="cms_site_settings_public içinde id=1 kaydı bulunamadı."
        />
      ) : null}
      {result.ok && result.data ? <SettingsForm data={result.data} /> : null}
    </div>
  );
}

function SettingsForm({ data }: { data: CmsPublicSettings }) {
  return (
    <div className="space-y-6">
      <fieldset className="space-y-4 rounded-2xl border border-white/8 bg-surface-card p-5">
        <legend className="font-display text-base font-semibold">Hızlı iletişim</legend>
        <Field id="whatsapp" label="WhatsApp (rakamlar)" value={data.whatsappDigits} />
        <Field id="phone-display" label="Görünen telefon" value={data.phoneDisplay} />
        <Field id="phone-e164" label="Telefon E.164" value={data.phoneE164} />
      </fieldset>
      <fieldset className="space-y-4 rounded-2xl border border-white/8 bg-surface-card p-5">
        <legend className="font-display text-base font-semibold">Atölye</legend>
        <Field id="address" label="Adres" value={data.address} multiline />
        <Field id="address-short" label="Kısa adres" value={data.addressShort} />
        <Field id="hours" label="Çalışma saatleri" value={data.hoursLine} />
        <Field id="hours-note" label="Saat notu" value={data.hoursNote} />
        <Field id="maps" label="Harita bağlantısı" value={data.mapsHref} />
      </fieldset>
      <fieldset className="space-y-4 rounded-2xl border border-white/8 bg-surface-card p-5">
        <legend className="font-display text-base font-semibold">Sosyal</legend>
        <Field id="youtube" label="YouTube" value={data.youtubeUrl} />
        <Field id="instagram" label="Instagram" value={data.instagramUrl} />
      </fieldset>
      <p className="text-[12px] text-text-muted">Son güncelleme {formatCmsDate(data.updatedAt)}</p>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  multiline = false,
}: {
  id: string;
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="label-caps text-text-muted" htmlFor={id}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          className="form-field mt-1 h-auto min-h-24 py-3"
          rows={3}
          value={value}
          readOnly
          disabled
          aria-readonly="true"
        />
      ) : (
        <input id={id} className="form-field mt-1" value={value} readOnly disabled aria-readonly="true" />
      )}
    </div>
  );
}
