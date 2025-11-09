"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Settings, Bell, Phone, TrendingUp, MessageSquare, Zap } from "lucide-react"
import { FeedbackInboxEnhanced } from "@/components/feedback-inbox-enhanced"
import { FeedbackAnalytics } from "@/components/feedback-analytics"
import { OrchestratorRouting } from "@/components/orchestrator-routing"
import { OrchestratorMonitor } from "@/components/orchestrator-monitor"
import { ScriptGeneratorBuilder } from "@/components/script-generator-builder"
import { ScriptABTesting } from "@/components/script-ab-testing"
import { ConsentRules } from "@/components/consent-rules"
import { ConsentDNCManagement } from "@/components/consent-dnc-management"
import { ConsentAuditLog } from "@/components/consent-audit-log"
import { SystemStatus } from "@/components/system-status"
import { AlertManagement } from "@/components/alert-management"
import { AlertHistory } from "@/components/alert-history"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [consentTab, setConsentTab] = useState("rules")
  const [alertsTab, setAlertsTab] = useState("status")

  return (
    <div className="min-h-screen bg-background">
      {/* System Status Strip */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-2 text-sm">
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
          <Button variant="ghost" size="sm">
            Details
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Oronno</h1>
              <p className="text-muted-foreground mt-1">AI-Powered Cold Calling & Feedback Intelligence</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Bell className="w-4 h-4" />
                Alerts (2)
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 gap-2 bg-secondary p-1 rounded-lg">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="inbox">Feedback Inbox</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="orchestrator">Orchestrator</TabsTrigger>
              <TabsTrigger value="scripts">Scripts</TabsTrigger>
              <TabsTrigger value="console">Console</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 mt-6">
              <KPIDashboard />
              <AnalyticsSection />
            </TabsContent>

            <TabsContent value="inbox" className="space-y-6 mt-6">
              <FeedbackInboxEnhanced />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6 mt-6">
              <FeedbackAnalytics />
            </TabsContent>

            {/* Orchestrator Tab */}
            <TabsContent value="orchestrator" className="space-y-6 mt-6">
              <OrchestratorRouting />
              <OrchestratorMonitor />
            </TabsContent>

            {/* Scripts Tab */}
            <TabsContent value="scripts" className="space-y-6 mt-6">
              <ScriptGenerator />
            </TabsContent>

            {/* Console Tab with sub-tabs for Consent & Alerts */}
            <TabsContent value="console" className="space-y-6 mt-6">
              <Tabs defaultValue="consent" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-secondary">
                  <TabsTrigger value="consent">Consent</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  <TabsTrigger value="status">System Status</TabsTrigger>
                  <TabsTrigger value="history">Alert History</TabsTrigger>
                </TabsList>

                <TabsContent value="consent" className="space-y-6 mt-6">
                  <Tabs value={consentTab} onValueChange={setConsentTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-secondary">
                      <TabsTrigger value="rules">Consent Rules</TabsTrigger>
                      <TabsTrigger value="dnc">DNC Management</TabsTrigger>
                      <TabsTrigger value="audit">Audit Log</TabsTrigger>
                    </TabsList>

                    <TabsContent value="rules" className="space-y-6 mt-6">
                      <ConsentRules />
                    </TabsContent>

                    <TabsContent value="dnc" className="space-y-6 mt-6">
                      <ConsentDNCManagement />
                    </TabsContent>

                    <TabsContent value="audit" className="space-y-6 mt-6">
                      <ConsentAuditLog />
                    </TabsContent>
                  </Tabs>
                </TabsContent>

                <TabsContent value="alerts" className="space-y-6 mt-6">
                  <AlertManagement />
                </TabsContent>

                <TabsContent value="status" className="space-y-6 mt-6">
                  <SystemStatus />
                </TabsContent>

                <TabsContent value="history" className="space-y-6 mt-6">
                  <AlertHistory />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function KPIDashboard() {
  const kpis = [
    {
      label: "Response Rate",
      value: "67.3%",
      change: "+2.4%",
      icon: Phone,
      color: "text-primary",
    },
    {
      label: "Sentiment Score",
      value: "+0.68",
      change: "+0.12",
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      label: "Time to Resolve",
      value: "4.2h",
      change: "-18%",
      icon: MessageSquare,
      color: "text-blue-500",
    },
    {
      label: "Calls Today",
      value: "1,247",
      change: "+346",
      icon: Zap,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        return (
          <Card key={kpi.label}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <p className="text-xs text-accent mt-1">{kpi.change} from yesterday</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function AnalyticsSection() {
  const sentimentData = [
    { date: "Mon", score: 0.62 },
    { date: "Tue", score: 0.65 },
    { date: "Wed", score: 0.68 },
    { date: "Thu", score: 0.66 },
    { date: "Fri", score: 0.72 },
    { date: "Sat", score: 0.7 },
    { date: "Sun", score: 0.68 },
  ]

  const funnelData = [
    { stage: "Calls Made", value: 1200 },
    { stage: "Connected", value: 945 },
    { stage: "Engaged", value: 756 },
    { stage: "Converted", value: 321 },
  ]

  const tagData = [
    { name: "Positive", value: 62, fill: "#22c55e" },
    { name: "Neutral", value: 24, fill: "#6366f1" },
    { name: "Negative", value: 14, fill: "#ef4444" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Over Time</CardTitle>
          <CardDescription>7-day moving average</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sentimentData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 1]} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
              <Area type="monotone" dataKey="score" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorScore)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Response Funnel</CardTitle>
            <CardDescription>Call conversion pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="stage" type="category" stroke="#6b7280" width={100} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
                <Bar dataKey="value" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feedback Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={tagData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {tagData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ScriptGenerator() {
  return (
    <div className="space-y-6">
      <ScriptGeneratorBuilder />
      <ScriptABTesting />
    </div>
  )
}
