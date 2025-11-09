"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X, MessageSquare, Phone, Mail, Flag } from "lucide-react"

interface FeedbackItem {
  id: number
  date: string
  buyer: string
  product: string
  rating: number
  sentiment: number
  tags: string[]
  status: "Resolved" | "Escalated" | "Pending"
  channel: "Phone" | "Email" | "SMS"
  message?: string
  priority?: "high" | "medium" | "low"
}

export function FeedbackInboxEnhanced() {
  const [feedbackItems] = useState<FeedbackItem[]>([
    {
      id: 1,
      date: "2025-11-09 14:32",
      buyer: "+88 01712-***678",
      product: "Premium Package",
      rating: 5,
      sentiment: 0.95,
      tags: ["Satisfied", "Feature Request"],
      status: "Resolved",
      channel: "Phone",
      message: "Love the new features, especially the dashboard improvements!",
      priority: "low",
    },
    {
      id: 2,
      date: "2025-11-09 13:18",
      buyer: "+88 01823-***789",
      product: "Basic Plan",
      rating: 2,
      sentiment: -0.72,
      tags: ["Damaged", "Urgent"],
      status: "Escalated",
      channel: "Email",
      message: "Product arrived damaged, need replacement urgently",
      priority: "high",
    },
    {
      id: 3,
      date: "2025-11-09 11:45",
      buyer: "+88 01934-***890",
      product: "Standard Package",
      rating: 4,
      sentiment: 0.58,
      tags: ["Feedback", "Positive"],
      status: "Resolved",
      channel: "SMS",
      message: "Good product overall, but shipping took longer than expected",
      priority: "medium",
    },
    {
      id: 4,
      date: "2025-11-09 10:15",
      buyer: "+88 01645-***901",
      product: "Premium Package",
      rating: 4,
      sentiment: 0.72,
      tags: ["Satisfied", "Question"],
      status: "Pending",
      channel: "Phone",
      message: "Great product! Do you have any upcoming discounts?",
      priority: "low",
    },
    {
      id: 5,
      date: "2025-11-09 09:20",
      buyer: "+88 01756-***012",
      product: "Basic Plan",
      rating: 1,
      sentiment: -0.88,
      tags: ["Defect", "Urgent"],
      status: "Escalated",
      channel: "Email",
      message: "Product stopped working after 2 days, very disappointed",
      priority: "high",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sentimentFilter, setSentimentFilter] = useState<string>("all")
  const [selectedItem, setSelectedItem] = useState<FeedbackItem | null>(null)

  const filteredFeedback = feedbackItems.filter((item) => {
    const matchesSearch =
      item.buyer.includes(searchTerm) ||
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesSentiment =
      sentimentFilter === "all" ||
      (sentimentFilter === "positive" && item.sentiment > 0.5) ||
      (sentimentFilter === "neutral" && item.sentiment > -0.5 && item.sentiment <= 0.5) ||
      (sentimentFilter === "negative" && item.sentiment <= -0.5)

    return matchesSearch && matchesStatus && matchesSentiment
  })

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Phone":
        return <Phone className="w-4 h-4" />
      case "Email":
        return <Mail className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.5) return "bg-green-100 text-green-800"
    if (sentiment > -0.5) return "bg-blue-100 text-blue-800"
    return "bg-red-100 text-red-800"
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Feedback List */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardContent className="space-y-4 pt-6">
            {/* Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by contact, product, or message..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by sentiment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sentiment</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Feedback Items */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredFeedback.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No feedback items match your filters</div>
              ) : (
                filteredFeedback.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedItem?.id === item.id ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-shrink-0">{getChannelIcon(item.channel)}</div>
                          <span className="text-sm font-medium truncate">{item.buyer}</span>
                          <Badge variant="outline" className="text-xs flex-shrink-0">
                            {item.product}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">{item.date}</div>
                        <p className="text-sm text-foreground/80 line-clamp-2">{item.message}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <div className="flex gap-1">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <span key={i} className="text-amber-400 text-sm">
                              ★
                            </span>
                          ))}
                        </div>
                        <Badge className={`${getSentimentColor(item.sentiment)} text-xs`}>
                          {(item.sentiment * 100).toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detail Panel */}
      <div>
        {selectedItem ? (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base">{selectedItem.buyer}</CardTitle>
                  <CardDescription className="text-xs mt-1">{selectedItem.date}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status & Priority */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Status</span>
                  <Badge variant={selectedItem.status === "Resolved" ? "default" : "destructive"}>
                    {selectedItem.status}
                  </Badge>
                </div>
                {selectedItem.priority && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Priority</span>
                    <div className="flex items-center gap-1">
                      <Flag className="w-3 h-3" />
                      <Badge className={`${getPriorityColor(selectedItem.priority)} text-xs`}>
                        {selectedItem.priority}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-secondary rounded text-center">
                  <p className="text-xs text-muted-foreground">Rating</p>
                  <p className="text-lg font-bold text-foreground">{selectedItem.rating}/5</p>
                </div>
                <div className="p-2 bg-secondary rounded text-center">
                  <p className="text-xs text-muted-foreground">Sentiment</p>
                  <p className="text-lg font-bold text-foreground">{(selectedItem.sentiment * 100).toFixed(0)}%</p>
                </div>
                <div className="p-2 bg-secondary rounded text-center">
                  <p className="text-xs text-muted-foreground">Channel</p>
                  <p className="text-lg font-bold text-foreground flex items-center justify-center gap-1">
                    {getChannelIcon(selectedItem.channel)}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {selectedItem.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Message</p>
                <p className="text-sm text-foreground bg-secondary p-3 rounded-lg">{selectedItem.message}</p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  Reply
                </Button>
                <Button size="sm" className="text-xs">
                  Resolve
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">Select a feedback item to view details</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
