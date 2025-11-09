"use client"

import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Clock,
  User,
  Mail,
  MessageSquare,
  ShoppingBag,
  Calendar,
  MapPin,
  Send,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AgentInterfacePage() {
  const [callActive, setCallActive] = useState(true)
  const [micMuted, setMicMuted] = useState(false)
  const [speakerMuted, setSpeakerMuted] = useState(false)
  const [aiAssistEnabled, setAiAssistEnabled] = useState(true)
  const [callDuration, setCallDuration] = useState("3:24")
  const [notes, setNotes] = useState("")

  // Current customer data
  const customer = {
    name: "Fatima Rahman",
    phone: "+88 01712-345678",
    email: "fatima.r@email.com",
    segment: "VIP",
    address: "Dhaka, Bangladesh",
    totalPurchases: 5,
    totalSpent: "৳12,475",
    lastPurchase: {
      product: "Premium Wireless Headphones",
      orderId: "ORD-2025-0423",
      amount: "৳2,999",
      status: "Delivered",
    },
  }

  // AI Suggestions
  const aiSuggestions = [
    "Customer mentioned sound quality - ask about specific features",
    "VIP customer - offer early access to new products",
  ]

  // Live transcription
  const [transcription] = useState([
    { speaker: "Agent", text: "Hi Fatima, this is calling from Oronno. How are you today?", time: "3:20" },
    {
      speaker: "Customer",
      text: "Hi! I'm doing well. Is this about my recent headphone purchase?",
      time: "3:18",
    },
    {
      speaker: "Agent",
      text: "Yes! We wanted to get your feedback on the Premium Wireless Headphones.",
      time: "3:12",
    },
    {
      speaker: "Customer",
      text: "The sound quality is absolutely amazing. I'm really happy with this purchase.",
      time: "3:05",
    },
  ])

  const handleEndCall = () => {
    setCallActive(false)
  }

  const handleSendEmail = () => {
    alert("Quick email sent to customer!")
  }

  const handleSendSMS = () => {
    alert("SMS sent to customer!")
  }

  return (
    <SidebarInset>
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-background border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Agent Call Interface</h1>
            <p className="text-sm text-muted-foreground">Live customer interaction dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={callActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {callActive ? "Call Active" : "Call Ended"}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {callDuration}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content - Fixed Height */}
      <div className="h-[calc(100vh-140px)] p-6">
        <div className="grid grid-cols-12 gap-4 h-full">
          {/* Left Column - Customer Info (3 cols) */}
          <div className="col-span-3 space-y-4 overflow-y-auto">
            {/* Customer Profile */}
            <Card>
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base text-foreground truncate">{customer.name}</h3>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">{customer.segment}</Badge>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground truncate">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">{customer.address}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                  <div className="text-center p-2 bg-secondary rounded">
                    <p className="text-xs text-muted-foreground">Purchases</p>
                    <p className="text-sm font-bold text-foreground">{customer.totalPurchases}</p>
                  </div>
                  <div className="text-center p-2 bg-secondary rounded">
                    <p className="text-xs text-muted-foreground">Spent</p>
                    <p className="text-sm font-bold text-green-600">{customer.totalSpent}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call Controls */}
            <Card>
              <CardContent className="pt-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={micMuted ? "destructive" : "outline"}
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setMicMuted(!micMuted)}
                  >
                    {micMuted ? <MicOff className="w-3 h-3 mr-1" /> : <Mic className="w-3 h-3 mr-1" />}
                    {micMuted ? "Unmute" : "Mute"}
                  </Button>
                  <Button
                    variant={speakerMuted ? "destructive" : "outline"}
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setSpeakerMuted(!speakerMuted)}
                  >
                    {speakerMuted ? <VolumeX className="w-3 h-3 mr-1" /> : <Volume2 className="w-3 h-3 mr-1" />}
                    Speaker
                  </Button>
                </div>

                <div className="flex items-center justify-between p-2 bg-secondary rounded">
                  <span className="text-xs font-medium">AI Assist</span>
                  <Switch checked={aiAssistEnabled} onCheckedChange={setAiAssistEnabled} />
                </div>

                <Button variant="destructive" className="w-full" size="sm" onClick={handleEndCall}>
                  <PhoneOff className="w-4 h-4 mr-2" />
                  End Call
                </Button>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" className="text-xs" onClick={handleSendEmail}>
                    <Mail className="w-3 h-3 mr-1" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs" onClick={handleSendSMS}>
                    <MessageSquare className="w-3 h-3 mr-1" />
                    SMS
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Last Purchase */}
            <Card>
              <CardContent className="pt-4 space-y-2">
                <div className="flex items-start gap-2">
                  <ShoppingBag className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{customer.lastPurchase.product}</p>
                    <p className="text-xs text-muted-foreground">#{customer.lastPurchase.orderId}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-semibold">{customer.lastPurchase.amount}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="bg-green-100 text-green-800 text-xs">{customer.lastPurchase.status}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Live Transcription (6 cols) */}
          <div className="col-span-6">
            <Card className="h-full flex flex-col">
              <CardContent className="pt-4 flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Live Transcription
                  </h3>
                  {callActive && (
                    <Badge className="bg-red-100 text-red-800 text-xs animate-pulse">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-1" />
                      Recording
                    </Badge>
                  )}
                </div>

                <div className="flex-1 space-y-2 overflow-y-auto pr-2">
                  {transcription.map((item, index) => (
                    <div
                      key={index}
                      className={`p-2.5 rounded-lg ${
                        item.speaker === "Agent"
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : "bg-green-50 border-l-4 border-green-500"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-semibold ${item.speaker === "Agent" ? "text-blue-600" : "text-green-600"}`}
                        >
                          {item.speaker}
                        </span>
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                      </div>
                      <p className="text-sm text-foreground">{item.text}</p>
                    </div>
                  ))}

                  {callActive && (
                    <div className="p-2.5 bg-purple-50 border-l-4 border-purple-500 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-purple-600">AI Processing...</span>
                      </div>
                      <p className="text-xs text-muted-foreground italic">Analyzing sentiment...</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI & Notes (3 cols) */}
          <div className="col-span-3 space-y-4 overflow-y-auto">
            {/* AI Suggestions */}
            <Card>
              <CardContent className="pt-4 space-y-2">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-purple-600" />
                  AI Suggestions
                </h3>
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-2 bg-purple-50 border border-purple-200 rounded text-xs">
                    {suggestion}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="pt-4 space-y-3">
                <h3 className="font-semibold text-sm">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    Positive
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <ThumbsDown className="w-3 h-3 mr-1" />
                    Negative
                  </Button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Outcome</label>
                  <Select defaultValue="pending">
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="feedback-collected">Feedback Collected</SelectItem>
                      <SelectItem value="issue-reported">Issue Reported</SelectItem>
                      <SelectItem value="follow-up-needed">Follow-up Needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Call Notes */}
            <Card>
              <CardContent className="pt-4 space-y-2">
                <h3 className="font-semibold text-sm">Call Notes</h3>
                <Textarea
                  placeholder="Add notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="resize-none text-xs"
                />
                <Button size="sm" className="w-full text-xs">
                  <Send className="w-3 h-3 mr-1" />
                  Save Notes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
