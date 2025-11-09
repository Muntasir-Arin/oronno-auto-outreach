import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { ConsentRules } from "@/components/consent-rules"

export default function ConsentRulesPage() {
  return (
    <SidebarInset>
      <PageHeader title="Consent Rules" description="Manage TCPA and GDPR compliance rules for outreach" />
      <div className="flex-1 space-y-6 p-6">
        <ConsentRules />
      </div>
    </SidebarInset>
  )
}
