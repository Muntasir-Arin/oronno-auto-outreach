import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { FeedbackAnalytics } from "@/components/feedback-analytics"

export default function FeedbackAnalyticsPage() {
  return (
    <SidebarInset>
      <PageHeader title="Feedback Analytics" description="Deep dive into feedback patterns, sentiment, and trends" />
      <div className="flex-1 space-y-6 p-6">
        <FeedbackAnalytics />
      </div>
    </SidebarInset>
  )
}
