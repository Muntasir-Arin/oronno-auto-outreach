import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { ConsentAuditLog } from "@/components/consent-audit-log"

export default function AuditLogPage() {
  return (
    <SidebarInset>
      <PageHeader
        title="Audit Log"
        description="Compliance audit trail with 5-year retention for regulatory requirements"
      />
      <div className="flex-1 space-y-6 p-6">
        <ConsentAuditLog />
      </div>
    </SidebarInset>
  )
}
