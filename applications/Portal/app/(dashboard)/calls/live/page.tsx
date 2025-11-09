"use client"

import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Mic, MicOff, Volume2, PhoneOff, User, Clock, Activity } from "lucide-react"
import { useState } from "react"

export default function LiveCallsPage() {
  const [activeCalls] = useState([
    {
      id: 1,
      customer: "Fatima Rahman",
      phone: "+88 01712-345678",
      product: "Premium Headphones",
      duration: "2:34",
      status: "speaking",
      sentiment: 0.82,
      transcription: "The sound quality is absolutely amazing! I'm really happy with this purchase.",
      aiResponse: "That's wonderful to hear! Could you tell me more about what specifically impressed you?",
    },
    {
      id: 2,
      customer: "Ayesha Khan",
      phone: "+88 01823-456789",
      product: "Laptop Stand",
      duration: "1:12",
      status: "listening",
      sentiment: 0.45,
      transcription: "It's okay, but the assembly instructions were confusing...",
      aiResponse: "",
    },
    {
      id: 3,
      customer: "Nusrat Jahan",
      phone: "+88 01934-567890",
      product: "Wireless Mouse",
      duration: "0:45",
      status: "processing",
      sentiment: 0.91,
      transcription: "Love it! Super responsive and comfortable.",
      aiResponse: "Processing...",
    },
  ])

  const queuedCalls = [
    { customer: "Sadia Ahmed", phone: "+88 01645-678901", product: "USB-C Hub", scheduled: "2 mins" },
    { customer: "Tasnim Hossain", phone: "+88 01756-789012", product: "Desk Lamp", scheduled: "5 mins" },
    { customer: "Zara Akter", phone: "+88 01867-890123", product: "Monitor", scheduled: "8 mins" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "speaking":
        return "bg-green-100 text-green-800"
      case "listening":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.7) return "text-green-600"
    if (sentiment > 0.4) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <SidebarInset>
      <PageHeader
        title="Live Calls Monitor"
        description="Real-time monitoring of active Gemini Live API conversations"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{activeCalls.length}</div>
              <p className="text-xs text-green-600 mt-1">In progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{queuedCalls.length}</div>
              <p className="text-xs text-blue-600 mt-1">Scheduled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">1:47</div>
              <p className="text-xs text-muted-foreground mt-1">Minutes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">+0.73</div>
              <p className="text-xs text-green-600 mt-1">Positive</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Calls */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Calls</CardTitle>
                <CardDescription>Live conversations powered by Gemini Live API</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-600 animate-pulse" />
                <span className="text-sm text-green-600 font-medium">Live</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeCalls.map((call) => (
              <Card key={call.id} className="border-2 border-primary/20">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Call Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{call.customer}</h4>
                          <p className="text-sm text-muted-foreground">{call.phone}</p>
                          <p className="text-xs text-muted-foreground mt-1">Product: {call.product}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(call.status)}>
                          {call.status === "speaking" && <Volume2 className="w-3 h-3 mr-1" />}
                          {call.status === "listening" && <Mic className="w-3 h-3 mr-1" />}
                          {call.status}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {call.duration}
                        </Badge>
                      </div>
                    </div>

                    {/* Sentiment Score */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Sentiment:</span>
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            call.sentiment > 0.7 ? "bg-green-500" : call.sentiment > 0.4 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${call.sentiment * 100}%` }}
                        />
                      </div>
                      <span className={`text-sm font-semibold ${getSentimentColor(call.sentiment)}`}>
                        {(call.sentiment * 100).toFixed(0)}%
                      </span>
                    </div>

                    {/* Live Transcription */}
                    <div className="space-y-2">
                      <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-semibold text-blue-600">Customer</span>
                        </div>
                        <p className="text-sm text-foreground">{call.transcription}</p>
                      </div>
                      {call.aiResponse && (
                        <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
                          <div className="flex items-center gap-2 mb-1">
                            <Activity className="w-3 h-3 text-purple-600" />
                            <span className="text-xs font-semibold text-purple-600">AI (Gemini)</span>
                          </div>
                          <p className="text-sm text-foreground">{call.aiResponse}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Mic className="w-3 h-3 mr-1" />
                        Mute
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs text-red-600">
                        <PhoneOff className="w-3 h-3 mr-1" />
                        End Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Call Queue */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Calls</CardTitle>
            <CardDescription>Scheduled feedback collection calls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {queuedCalls.map((call, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{call.customer}</p>
                      <p className="text-xs text-muted-foreground">{call.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{call.product}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      In {call.scheduled}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
