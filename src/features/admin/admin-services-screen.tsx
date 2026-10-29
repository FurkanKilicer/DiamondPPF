import { AdminServiceCreateModal } from "@/features/admin/admin-service-create-modal";
import { AdminServicesBoard } from "@/features/admin/admin-services-board";
import { AdminErrorState, AdminPageHeader } from "@/features/admin/ui";
import type { CmsListError, CmsListOk, CmsServiceItem } from "@/lib/cms/types";

export function AdminServicesScreen({
  result,
  notice,
  tab,
  page,
  size,
  editId,
}: {
  result: CmsListOk<CmsServiceItem> | CmsListError;
  notice?: string;
  tab?: string;
  page?: string;
  size?: string;
  editId?: string;
}) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <AdminPageHeader
        kicker="Hizmetler"
        title="Hizmet kartları"
        description="Kayıtlar cms_services tablosundan okunur. Sekmeler katalog gruplarını, sıra tutamağı sürükle-bırakı kullanır."
        actions={<AdminServiceCreateModal />}
      />
      {!result.ok ? (
        <AdminErrorState message={result.message} code={result.code} />
      ) : (
        <AdminServicesBoard items={result.items} notice={notice} tab={tab} page={page} size={size} editId={editId} />
      )}
    </div>
  );
}
