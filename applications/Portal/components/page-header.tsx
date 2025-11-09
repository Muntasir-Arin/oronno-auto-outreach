import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Settings, Bell } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="border-b border-border sticky top-0 z-40 bg-background">
      {/* System Status Strip */}
      <div className="flex items-center justify-between px-6 py-2 text-sm bg-card border-b border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground">Kafka: Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground">DNC Sync: 2h ago</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground">Twilio: Connected</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold text-foreground">{title}</h1>
              {description && <p className="text-muted-foreground mt-1">{description}</p>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {actions}
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Bell className="w-4 h-4" />
            Alerts
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
