"use client"

import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Phone,
  PhoneOff,
  Clock,
  Download,
  Play,
  FileText,
  User,
  Calendar,
  TrendingUp,
  TrendingDown,
  Filter,
} from "lucide-react"
import { useState } from "react"

export default function CallHistoryPage() {
  const [callHistory] = useState([
    {
      id: 1,
      customer: "Fatima Rahman",
      phone: "+88 01712-345678",
      product: "Premium Headphones",
      date: "2025-01-10 14:32",
      duration: "3:24",
      status: "completed",
      sentiment: 0.92,
      outcome: "Positive feedback collected",
      recording: true,
      transcript: "Full transcript available",
      tags: ["satisfied", "product-quality", "delivery"],
    },
    {
      id: 2,
      customer: "Ayesha Khan",
      phone: "+88 01823-456789",
      product: "Laptop Stand",
      date: "2025-01-10 13:18",
      duration: "2:15",
      status: "completed",
      sentiment: 0.65,
      outcome: "Mixed feedback - Assembly issues",
      recording: true,
      transcript: "Full transcript available",
      tags: ["assembly", "instructions", "neutral"],
    },
    {
      id: 3,
      customer: "Nusrat Jahan",
      phone: "+88 01934-567890",
      product: "Wireless Mouse",
      date: "2025-01-10 11:45",
      duration: "1:48",
      status: "completed",
      sentiment: 0.88,
      outcome: "Positive feedback - Recommended to friends",
      recording: true,
      transcript: "Full transcript available",
      tags: ["satisfied", "recommend", "responsive"],
    },
    {
      id: 4,
      customer: "Sadia Ahmed",
      phone: "+88 01645-678901",
      product: "USB-C Hub",
      date: "2025-01-10 10:22",
      duration: "0:00",
      status: "no-answer",
      sentiment: 0,
      outcome: "No answer - Scheduled retry",
      recording: false,
      transcript: "N/A",
      tags: ["retry", "no-answer"],
    },
    {
      id: 5,
      customer: "Tasnim Hossain",
      phone: "+88 01756-789012",
      product: "Desk Lamp",
      date: "2025-01-09 16:55",
      duration: "4:12",
      status: "completed",
      sentiment: 0.95,
      outcome: "Excellent feedback - Product exceeded expectations",
      recording: true,
      transcript: "Full transcript available",
      tags: ["vip", "satisfied", "exceeded-expectations"],
    },
    {
      id: 6,
      customer: "Zara Akter",
      phone: "+88 01867-890123",
      product: "Monitor",
      date: "2025-01-09 15:30",
      duration: "0:45",
      status: "failed",
      sentiment: 0,
      outcome: "Call dropped - Technical issue",
      recording: false,
      transcript: "Partial transcript",
      tags: ["technical-issue", "retry"],
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "no-answer":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.7) return "text-green-600"
    if (sentiment > 0.4) return "text-yellow-600"
    if (sentiment > 0) return "text-orange-600"
    return "text-gray-400"
  }

  const completedCalls = callHistory.filter((c) => c.status === "completed").length
  const avgDuration =
    callHistory
      .filter((c) => c.status === "completed")
      .reduce((acc, call) => {
        const [min, sec] = call.duration.split(":").map(Number)
        return acc + min * 60 + sec
      }, 0) / completedCalls
  const avgSentiment =
    callHistory.filter((c) => c.status === "completed").reduce((acc, call) => acc + call.sentiment, 0) / completedCalls

  return (
    <SidebarInset>
      <PageHeader title="Call History" description="Review past voice conversations and outcomes" />

      <div className="flex-1 space-y-6 p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Calls</p>
                  <p className="text-2xl font-bold text-foreground">{callHistory.length}</p>
                </div>
                <Phone className="w-8 h-8 text-blue-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedCalls}</p>
                  <p className="text-xs text-green-600 mt-1">
                    {((completedCalls / callHistory.length) * 100).toFixed(0)}% success rate
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.floor(avgDuration / 60)}:{(avgDuration % 60).toFixed(0).padStart(2, "0")}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-purple-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Sentiment</p>
                  <p className="text-2xl font-bold text-green-600">+{avgSentiment.toFixed(2)}</p>
                  <p className="text-xs text-green-600 mt-1">{(avgSentiment * 100).toFixed(0)}% positive</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by customer name or phone..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="no-answer">No Answer</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="7days">
                <SelectTrigger className="w-full md:w-48">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Call History List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Calls</CardTitle>
                <CardDescription>Complete call history with recordings and transcripts</CardDescription>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {callHistory.map((call) => (
              <Card key={call.id} className="border">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Call Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground">{call.customer}</h4>
                          <p className="text-sm text-muted-foreground">{call.phone}</p>
                          <p className="text-xs text-muted-foreground mt-1">Product: {call.product}</p>
                          <p className="text-xs text-muted-foreground">{call.date}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getStatusColor(call.status)}>{call.status}</Badge>
                        {call.duration !== "0:00" && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {call.duration}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sentiment & Outcome */}
                    {call.status === "completed" && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Sentiment:</span>
                          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                call.sentiment > 0.7
                                  ? "bg-green-500"
                                  : call.sentiment > 0.4
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${call.sentiment * 100}%` }}
                            />
                          </div>
                          <span className={`text-sm font-semibold ${getSentimentColor(call.sentiment)}`}>
                            {(call.sentiment * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="bg-secondary p-3 rounded-lg">
                          <p className="text-sm text-foreground">
                            <span className="font-semibold">Outcome:</span> {call.outcome}
                          </p>
                        </div>
                      </div>
                    )}

                    {call.status !== "completed" && (
                      <div className="bg-secondary p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">{call.outcome}</p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {call.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t">
                      {call.recording && (
                        <Button variant="outline" size="sm" className="text-xs">
                          <Play className="w-3 h-3 mr-2" />
                          Play Recording
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="text-xs">
                        <FileText className="w-3 h-3 mr-2" />
                        View Transcript
                      </Button>
                      {(call.status === "no-answer" || call.status === "failed") && (
                        <Button variant="outline" size="sm" className="text-xs">
                          <Phone className="w-3 h-3 mr-2" />
                          Retry Call
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
