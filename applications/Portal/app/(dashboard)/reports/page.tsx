"use client"

import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Download,
  FileText,
  Calendar,
  TrendingUp,
  Phone,
  Mail,
  Users,
  MessageSquare,
  BarChart3,
  PieChart as PieChartIcon,
  Clock,
  Target,
  Send,
} from "lucide-react"
import { useState } from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("30days")

  // Sample data for charts
  const performanceData = [
    { date: "Jan 1", calls: 45, emails: 89, feedback: 32 },
    { date: "Jan 5", calls: 67, emails: 112, feedback: 48 },
    { date: "Jan 10", calls: 89, emails: 145, feedback: 67 },
    { date: "Jan 15", calls: 112, emails: 178, feedback: 89 },
    { date: "Jan 20", calls: 134, emails: 198, feedback: 102 },
    { date: "Jan 25", calls: 156, emails: 223, feedback: 124 },
    { date: "Jan 30", calls: 178, emails: 245, feedback: 145 },
  ]

  const channelDistribution = [
    { name: "Voice Calls", value: 45, color: "#0ea5e9" },
    { name: "Email", value: 35, color: "#6366f1" },
    { name: "SMS", value: 12, color: "#8b5cf6" },
    { name: "Other", value: 8, color: "#a855f7" },
  ]

  const sentimentTrend = [
    { week: "Week 1", positive: 65, neutral: 25, negative: 10 },
    { week: "Week 2", positive: 68, neutral: 22, negative: 10 },
    { week: "Week 3", positive: 72, neutral: 20, negative: 8 },
    { week: "Week 4", positive: 75, neutral: 18, negative: 7 },
  ]

  const responseRates = [
    { segment: "VIP", rate: 85 },
    { segment: "Regular", rate: 68 },
    { segment: "New", rate: 52 },
    { segment: "Inactive", rate: 28 },
  ]

  const reports = [
    {
      id: 1,
      name: "Monthly Performance Summary",
      description: "Complete overview of all outreach activities and feedback collected",
      period: "January 2025",
      generated: "2025-01-30",
      size: "2.4 MB",
      type: "PDF",
      status: "ready",
    },
    {
      id: 2,
      name: "Voice Call Analytics",
      description: "Detailed analysis of Gemini Live API call performance and transcripts",
      period: "Last 30 Days",
      generated: "2025-01-29",
      size: "1.8 MB",
      type: "PDF",
      status: "ready",
    },
    {
      id: 3,
      name: "Email Campaign Performance",
      description: "Open rates, click rates, and conversion metrics for all campaigns",
      period: "Q4 2024",
      generated: "2025-01-28",
      size: "3.1 MB",
      type: "Excel",
      status: "ready",
    },
    {
      id: 4,
      name: "Customer Sentiment Analysis",
      description: "AI-powered sentiment tracking across all customer interactions",
      period: "Last Quarter",
      generated: "2025-01-27",
      size: "1.2 MB",
      type: "PDF",
      status: "ready",
    },
    {
      id: 5,
      name: "Weekly Executive Summary",
      description: "High-level KPIs and insights for leadership review",
      period: "Week of Jan 22",
      generated: "Scheduled for Feb 1",
      size: "-",
      type: "PDF",
      status: "scheduled",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="w-4 h-4 text-red-600" />
      case "Excel":
        return <BarChart3 className="w-4 h-4 text-green-600" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <SidebarInset>
      <PageHeader
        title="Reports & Analytics"
        description="Generate and download comprehensive reports"
        actions={
          <div className="flex gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        }
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Outreach</p>
                  <p className="text-2xl font-bold text-foreground">3,247</p>
                  <p className="text-xs text-green-600 mt-1">+18.2% vs last period</p>
                </div>
                <Send className="w-8 h-8 text-blue-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Response Rate</p>
                  <p className="text-2xl font-bold text-green-600">68.4%</p>
                  <p className="text-xs text-green-600 mt-1">+5.3% improvement</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Sentiment</p>
                  <p className="text-2xl font-bold text-purple-600">+0.73</p>
                  <p className="text-xs text-purple-600 mt-1">Positive trend</p>
                </div>
                <MessageSquare className="w-8 h-8 text-purple-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Customers</p>
                  <p className="text-2xl font-bold text-orange-600">1,247</p>
                  <p className="text-xs text-orange-600 mt-1">+234 new this month</p>
                </div>
                <Users className="w-8 h-8 text-orange-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Outreach Performance</CardTitle>
              <CardDescription>Calls, emails, and feedback collected over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
                  <Legend />
                  <Line type="monotone" dataKey="calls" stroke="#0ea5e9" strokeWidth={2} name="Voice Calls" />
                  <Line type="monotone" dataKey="emails" stroke="#6366f1" strokeWidth={2} name="Emails" />
                  <Line type="monotone" dataKey="feedback" stroke="#22c55e" strokeWidth={2} name="Feedback" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Channel Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Channel Distribution</CardTitle>
              <CardDescription>Outreach method breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-8">
                <ResponsiveContainer width="60%" height={250}>
                  <PieChart>
                    <Pie
                      data={channelDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {channelDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col justify-center space-y-3">
                  {channelDistribution.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{entry.name}</span>
                        <span className="text-xs text-muted-foreground">{entry.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Trend</CardTitle>
              <CardDescription>Weekly sentiment analysis breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={sentimentTrend}>
                  <defs>
                    <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="positive"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#colorPositive)"
                    name="Positive"
                  />
                  <Area
                    type="monotone"
                    dataKey="neutral"
                    stroke="#6366f1"
                    fillOpacity={1}
                    fill="url(#colorNeutral)"
                    name="Neutral"
                  />
                  <Area
                    type="monotone"
                    dataKey="negative"
                    stroke="#ef4444"
                    fillOpacity={1}
                    fill="url(#colorNegative)"
                    name="Negative"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Response Rates by Segment */}
          <Card>
            <CardHeader>
              <CardTitle>Response Rate by Segment</CardTitle>
              <CardDescription>Customer engagement across segments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={responseRates}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="segment" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
                    formatter={(value) => `${value}%`}
                  />
                  <Bar dataKey="rate" fill="url(#colorRate)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Generated Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Reports</CardTitle>
            <CardDescription>Download previously generated reports and schedules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {reports.map((report) => (
              <Card key={report.id} className="border">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        {getTypeIcon(report.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{report.name}</h4>
                          <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Period: {report.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Generated: {report.generated}</span>
                          </div>
                          {report.size !== "-" && (
                            <div className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              <span>Size: {report.size}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {report.status === "ready" && (
                        <>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                        </>
                      )}
                      {report.status === "scheduled" && (
                        <Button variant="outline" size="sm">
                          Edit Schedule
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
