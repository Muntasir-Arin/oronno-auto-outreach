import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { ScriptGeneratorBuilder } from "@/components/script-generator-builder"
import { ScriptABTesting } from "@/components/script-ab-testing"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ScriptsPage() {
  return (
    <SidebarInset>
      <PageHeader
        title="Scripts"
        description="Create, manage, and test call scripts"
        actions={
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Script
          </Button>
        }
      />
      <div className="flex-1 space-y-6 p-6">
        <ScriptGeneratorBuilder />
        <ScriptABTesting />
      </div>
    </SidebarInset>
  )
}
