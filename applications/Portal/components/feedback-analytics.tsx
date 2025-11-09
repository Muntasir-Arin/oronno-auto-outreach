"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

export function FeedbackAnalytics() {
  const sentimentTrendData = [
    { date: "Mon", positive: 65, neutral: 25, negative: 10 },
    { date: "Tue", positive: 68, neutral: 22, negative: 10 },
    { date: "Wed", positive: 70, neutral: 20, negative: 10 },
    { date: "Thu", positive: 67, neutral: 25, negative: 8 },
    { date: "Fri", positive: 75, neutral: 18, negative: 7 },
    { date: "Sat", positive: 72, neutral: 20, negative: 8 },
    { date: "Sun", positive: 70, neutral: 22, negative: 8 },
  ]

  const responseTimeData = [
    { date: "Mon", avgTime: 45 },
    { date: "Tue", avgTime: 42 },
    { date: "Wed", avgTime: 38 },
    { date: "Thu", avgTime: 41 },
    { date: "Fri", avgTime: 39 },
    { date: "Sat", avgTime: 50 },
    { date: "Sun", avgTime: 55 },
  ]

  const channelDistribution = [
    { name: "Phone", value: 45, fill: "#0ea5e9" },
    { name: "Email", value: 35, fill: "#6366f1" },
    { name: "SMS", value: 20, fill: "#8b5cf6" },
  ]

  const topTags = [
    { tag: "Feature Request", count: 42 },
    { tag: "Bug Report", count: 28 },
    { tag: "Positive", count: 67 },
    { tag: "Urgent", count: 18 },
    { tag: "General Feedback", count: 35 },
  ]

  const summaryMetrics = [
    {
      label: "Total Feedback",
      value: "247",
      change: "+12%",
      positive: true,
    },
    {
      label: "Avg Rating",
      value: "4.2/5",
      change: "+0.3",
      positive: true,
    },
    {
      label: "Positive Rate",
      value: "70%",
      change: "+5%",
      positive: true,
    },
    {
      label: "Avg Response Time",
      value: "43m",
      change: "-8%",
      positive: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{metric.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{metric.value}</p>
                </div>
                {metric.positive ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
              </div>
              <p className={`text-xs mt-2 ${metric.positive ? "text-green-600" : "text-red-600"}`}>
                {metric.change} from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Distribution Trend</CardTitle>
            <CardDescription>Weekly sentiment breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={sentimentTrendData}>
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
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
                <Area
                  type="monotone"
                  dataKey="positive"
                  stackId="1"
                  stroke="#22c55e"
                  fill="url(#colorPositive)"
                  name="Positive"
                />
                <Area
                  type="monotone"
                  dataKey="neutral"
                  stackId="1"
                  stroke="#6366f1"
                  fill="url(#colorNeutral)"
                  name="Neutral"
                />
                <Area
                  type="monotone"
                  dataKey="negative"
                  stackId="1"
                  stroke="#ef4444"
                  fill="url(#colorNegative)"
                  name="Negative"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time Trend</CardTitle>
            <CardDescription>Average response time in minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" label={{ value: "Minutes", angle: -90, position: "insideLeft" }} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
                <Line
                  type="monotone"
                  dataKey="avgTime"
                  stroke="#0ea5e9"
                  dot={{ fill: "#0ea5e9" }}
                  strokeWidth={2}
                  name="Avg Response Time"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Channel Distribution & Top Tags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback by Channel</CardTitle>
            <CardDescription>Distribution across communication channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={channelDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {channelDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {channelDistribution.map((channel) => (
                <div key={channel.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.fill }}></div>
                    <span>{channel.name}</span>
                  </div>
                  <span className="font-medium">{channel.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Top Feedback Tags</CardTitle>
            <CardDescription>Most common feedback categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topTags.map((item, idx) => {
              const maxCount = Math.max(...topTags.map((t) => t.count))
              const percentage = (item.count / maxCount) * 100

              return (
                <div key={item.tag}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.tag}</span>
                    <Badge variant="secondary" className="text-xs">
                      {item.count}
                    </Badge>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
