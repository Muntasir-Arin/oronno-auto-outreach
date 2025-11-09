import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { FeedbackInboxEnhanced } from "@/components/feedback-inbox-enhanced"

export default function FeedbackInboxPage() {
  return (
    <SidebarInset>
      <PageHeader title="Feedback Inbox" description="Manage and respond to customer feedback in real-time" />
      <div className="flex-1 space-y-6 p-6">
        <FeedbackInboxEnhanced />
      </div>
    </SidebarInset>
  )
}
