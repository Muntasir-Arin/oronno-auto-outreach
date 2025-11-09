"use client"

import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Send, Eye, MousePointerClick, Users, Calendar, Plus, Edit, Copy, Trash2 } from "lucide-react"
import { useState } from "react"

export default function CampaignsPage() {
  const [campaigns] = useState([
    {
      id: 1,
      name: "Post-Purchase Follow-up - Electronics",
      status: "active",
      sent: 1247,
      opened: 834,
      clicked: 412,
      responses: 245,
      created: "2025-01-05",
      lastSent: "2 hours ago",
      template: "Thank you for your purchase! We'd love to hear your thoughts...",
    },
    {
      id: 2,
      name: "Delayed Feedback - Furniture",
      status: "scheduled",
      sent: 0,
      opened: 0,
      clicked: 0,
      responses: 0,
      created: "2025-01-08",
      scheduledFor: "Tomorrow at 10:00 AM",
      template: "It's been 7 days since your delivery. How is everything working out?",
    },
    {
      id: 3,
      name: "VIP Customer Check-in",
      status: "active",
      sent: 423,
      opened: 398,
      clicked: 267,
      responses: 198,
      created: "2024-12-28",
      lastSent: "1 day ago",
      template: "As a valued customer, your feedback helps us serve you better...",
    },
    {
      id: 4,
      name: "Abandoned Call Follow-up",
      status: "paused",
      sent: 89,
      opened: 45,
      clicked: 12,
      responses: 8,
      created: "2025-01-03",
      lastSent: "5 days ago",
      template: "We couldn't reach you. Would you prefer to share feedback via email?",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateRate = (value: number, total: number) => {
    if (total === 0) return 0
    return ((value / total) * 100).toFixed(1)
  }

  return (
    <SidebarInset>
      <PageHeader
        title="Email Campaigns"
        description="Manage personalized email outreach campaigns"
        actions={
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        }
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">1,759</div>
              <p className="text-xs text-green-600 mt-1">+342 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Open Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">72.5%</div>
              <p className="text-xs text-green-600 mt-1">+5.2% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Click Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">39.3%</div>
              <p className="text-xs text-green-600 mt-1">+3.1% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">25.7%</div>
              <p className="text-xs text-green-600 mt-1">+2.8% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Campaign List */}
        <Card>
          <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
            <CardDescription>Manage your email outreach campaigns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="border">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Campaign Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-foreground">{campaign.name}</h4>
                          <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{campaign.template}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Created: {campaign.created}
                          {campaign.lastSent && ` • Last sent: ${campaign.lastSent}`}
                          {campaign.scheduledFor && ` • Scheduled: ${campaign.scheduledFor}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Campaign Stats */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Send className="w-4 h-4 text-blue-600" />
                          <span className="text-xs text-muted-foreground">Sent</span>
                        </div>
                        <span className="text-2xl font-bold text-foreground">{campaign.sent}</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Eye className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-muted-foreground">Opened</span>
                        </div>
                        <span className="text-2xl font-bold text-foreground">{campaign.opened}</span>
                        <span className="text-xs text-green-600 mt-1">
                          {calculateRate(campaign.opened, campaign.sent)}%
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <MousePointerClick className="w-4 h-4 text-purple-600" />
                          <span className="text-xs text-muted-foreground">Clicked</span>
                        </div>
                        <span className="text-2xl font-bold text-foreground">{campaign.clicked}</span>
                        <span className="text-xs text-purple-600 mt-1">
                          {calculateRate(campaign.clicked, campaign.sent)}%
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Mail className="w-4 h-4 text-orange-600" />
                          <span className="text-xs text-muted-foreground">Responses</span>
                        </div>
                        <span className="text-2xl font-bold text-foreground">{campaign.responses}</span>
                        <span className="text-xs text-orange-600 mt-1">
                          {calculateRate(campaign.responses, campaign.sent)}%
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t">
                      {campaign.status === "scheduled" && (
                        <Button size="sm" variant="outline">
                          <Calendar className="w-3 h-3 mr-2" />
                          Reschedule
                        </Button>
                      )}
                      {campaign.status === "active" && (
                        <>
                          <Button size="sm" variant="outline">
                            Pause Campaign
                          </Button>
                          <Button size="sm">
                            <Eye className="w-3 h-3 mr-2" />
                            View Report
                          </Button>
                        </>
                      )}
                      {campaign.status === "paused" && (
                        <Button size="sm">
                          <Send className="w-3 h-3 mr-2" />
                          Resume Campaign
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
