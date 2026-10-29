import { formatCmsDate } from "@/lib/cms/format";
import { cmsPageLabels, type CmsListError, type CmsListOk, type CmsPageItem } from "@/lib/cms/types";
import { AdminEmptyState, AdminErrorState, AdminPageHeader, AdminStatusBadge } from "@/features/admin/ui";

export function AdminPagesScreen({ result }: { result: CmsListOk<CmsPageItem> | CmsListError }) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <AdminPageHeader
        kicker="Sayfalar"
        title="Sayfa içerikleri"
        description="Public rotalara karşılık gelen CMS kayıtları. Bölüm JSON düzenleyicisi sonraki fazda bağlanır."
      />
      {!result.ok ? <AdminErrorState message={result.message} code={result.code} /> : null}
      {result.ok && result.items.length === 0 ? (
        <AdminEmptyState
          icon="article"
          title="Sayfa kaydı yok"
          description="cms_pages boş. Slug’lar eklendiğinde her public rota için başlık ve yayın durumu görünür."
        />
      ) : null}
      {result.ok && result.items.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {result.items.map((item) => (
            <li key={item.slug} className="rounded-2xl border border-white/8 bg-surface-card p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="label-caps text-text-muted">{item.slug}</p>
                  <h2 className="mt-1 font-display text-lg font-semibold">{item.title}</h2>
                  <p className="mt-1 text-[13px] text-text-secondary">{cmsPageLabels[item.slug] ?? "Kayıtlı içerik"}</p>
                </div>
                <AdminStatusBadge published={item.published} />
              </div>
              <label className="mt-4 block text-[12px] text-text-muted" htmlFor={`page-title-${item.slug}`}>
                Başlık
              </label>
              <input
                id={`page-title-${item.slug}`}
                className="form-field mt-1"
                value={item.title}
                readOnly
                disabled
                aria-readonly="true"
              />
              <p className="mt-2 text-[12px] text-text-muted">Son güncelleme {formatCmsDate(item.updatedAt)}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
