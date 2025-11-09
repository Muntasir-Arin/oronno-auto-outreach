import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { ConsentDNCManagement } from "@/components/consent-dnc-management"

export default function DNCManagementPage() {
  return (
    <SidebarInset>
      <PageHeader title="DNC Management" description="Manage Do-Not-Call registry and local exclusion lists" />
      <div className="flex-1 space-y-6 p-6">
        <ConsentDNCManagement />
      </div>
    </SidebarInset>
  )
}
