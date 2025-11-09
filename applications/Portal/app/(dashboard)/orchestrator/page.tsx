import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { OrchestratorRouting } from "@/components/orchestrator-routing"
import { OrchestratorMonitor } from "@/components/orchestrator-monitor"

export default function OrchestratorPage() {
  return (
    <SidebarInset>
      <PageHeader title="Orchestrator" description="Manage routing rules and monitor real-time call orchestration" />
      <div className="flex-1 space-y-6 p-6">
        <OrchestratorRouting />
        <OrchestratorMonitor />
      </div>
    </SidebarInset>
  )
}
