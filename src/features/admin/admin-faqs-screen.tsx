import { formatCmsDate } from "@/lib/cms/format";
import { cmsFaqCollectionLabels, type CmsFaqItem, type CmsListError, type CmsListOk } from "@/lib/cms/types";
import { AdminEmptyState, AdminErrorState, AdminGhostButton, AdminPageHeader, AdminStatusBadge } from "@/features/admin/ui";

export function AdminFaqsScreen({ result }: { result: CmsListOk<CmsFaqItem> | CmsListError }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <AdminPageHeader
        kicker="Portal"
        title="Sıkça sorulan sorular"
        description="İletişim ve PPF sayfalarındaki soru-cevaplar. Sürükle-bırak ve yayınlama sonraki fazda."
        actions={<AdminGhostButton>Yeni soru</AdminGhostButton>}
      />
      {!result.ok ? <AdminErrorState message={result.message} code={result.code} /> : null}
      {result.ok && result.items.length === 0 ? (
        <AdminEmptyState
          icon="help_outline"
          title="SSS kaydı yok"
          description="cms_faqs boş. Kayıtlar eklendiğinde koleksiyon, yayın durumu ve yanıt özeti burada listelenir."
        />
      ) : null}
      {result.ok && result.items.length > 0 ? (
        <ol className="flex flex-col gap-3">
          {result.items.map((item, index) => (
            <li key={item.id} className="rounded-2xl border border-white/8 bg-surface-card p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="tabular-nums text-[12px] text-text-muted">{String(index + 1).padStart(2, "0")}</span>
                <span className="rounded-full bg-white/6 px-2 py-0.5 text-[11px] text-text-secondary">
                  {cmsFaqCollectionLabels[item.collection] ?? item.collection}
                </span>
                <AdminStatusBadge published={item.published} />
              </div>
              <h2 className="mt-3 font-display text-base font-semibold">{item.question}</h2>
              <p className="mt-2 line-clamp-3 text-[14px] leading-6 text-text-secondary">{item.answer}</p>
              <p className="mt-3 text-[12px] text-text-muted">{formatCmsDate(item.updatedAt)}</p>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
