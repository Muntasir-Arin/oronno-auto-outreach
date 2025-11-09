import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { AlertManagement } from "@/components/alert-management"
import { AlertHistory } from "@/components/alert-history"
import { SystemStatus } from "@/components/system-status"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AlertsPage() {
  return (
    <SidebarInset>
      <PageHeader
        title="Alerts & Monitoring"
        description="Configure alerts, view system status, and monitor incident history"
      />
      <div className="flex-1 p-6">
        <Tabs defaultValue="management" className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="management">Alert Rules</TabsTrigger>
            <TabsTrigger value="status">System Status</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="management" className="space-y-6">
            <AlertManagement />
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <SystemStatus />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <AlertHistory />
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  )
}
