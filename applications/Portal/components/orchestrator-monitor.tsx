"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { CheckCircle2, AlertCircle, Clock, Zap } from "lucide-react"

interface JobEvent {
  id: number
  timestamp: string
  event: string
  buyer: string
  status: string
  channel: string
  duration: string
}

export function OrchestratorMonitor() {
  const jobStream: JobEvent[] = [
    {
      id: 1,
      timestamp: "14:32:45",
      event: "Purchase Event",
      buyer: "John D.",
      status: "Consent Check ✓",
      channel: "Voice",
      duration: "0.2s",
    },
    {
      id: 2,
      timestamp: "14:31:22",
      event: "DNC Validation",
      buyer: "Jane S.",
      status: "Not in DNC ✓",
      channel: "Email",
      duration: "0.15s",
    },
    {
      id: 3,
      timestamp: "14:30:18",
      event: "Channel Selection",
      buyer: "Mike T.",
      status: "Voice Call Selected",
      channel: "Phone",
      duration: "0.1s",
    },
    {
      id: 4,
      timestamp: "14:29:05",
      event: "Rule Evaluation",
      buyer: "Sarah L.",
      status: "Premium Route ✓",
      channel: "Voice",
      duration: "0.25s",
    },
    {
      id: 5,
      timestamp: "14:28:33",
      event: "API Call",
      buyer: "Alex K.",
      status: "CRM Updated ✓",
      channel: "System",
      duration: "0.18s",
    },
  ]

  const throughputData = [
    { time: "13:00", events: 1240, errors: 8 },
    { time: "13:15", events: 1350, errors: 6 },
    { time: "13:30", events: 1420, errors: 4 },
    { time: "13:45", events: 1380, errors: 7 },
    { time: "14:00", events: 1510, errors: 5 },
    { time: "14:15", events: 1620, errors: 3 },
    { time: "14:30", events: 1755, errors: 2 },
  ]

  const latencyData = [
    { time: "13:00", p50: 45, p95: 120, p99: 250 },
    { time: "13:15", p50: 42, p95: 115, p99: 240 },
    { time: "13:30", p50: 48, p95: 130, p99: 260 },
    { time: "13:45", p50: 44, p95: 125, p99: 245 },
    { time: "14:00", p50: 46, p95: 128, p99: 255 },
    { time: "14:15", p50: 41, p95: 118, p99: 238 },
    { time: "14:30", p50: 43, p95: 122, p99: 242 },
  ]

  const getStatusIcon = (status: string) => {
    if (status.includes("✓")) return <CheckCircle2 className="w-4 h-4 text-green-500" />
    if (status.includes("Error")) return <AlertCircle className="w-4 h-4 text-red-500" />
    return <Clock className="w-4 h-4 text-yellow-500" />
  }

  return (
    <div className="space-y-6">
      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Events/min</p>
                <p className="text-2xl font-bold text-foreground mt-2">1,755</p>
              </div>
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xs text-green-600 mt-2">+3.2% from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Error Rate</p>
                <p className="text-2xl font-bold text-foreground mt-2">0.11%</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-xs text-green-600 mt-2">2 errors in last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">P95 Latency</p>
                <p className="text-2xl font-bold text-foreground mt-2">122ms</p>
              </div>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-xs text-blue-600 mt-2">Target: &lt;200ms</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Uptime</p>
                <p className="text-2xl font-bold text-foreground mt-2">99.98%</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-xs text-green-600 mt-2">Last 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Throughput */}
        <Card>
          <CardHeader>
            <CardTitle>Event Throughput</CardTitle>
            <CardDescription>Events processed per 15-min interval</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={throughputData}>
                <defs>
                  <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
                <Area type="monotone" dataKey="events" stroke="#0ea5e9" fill="url(#colorThroughput)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Latency Percentiles */}
        <Card>
          <CardHeader>
            <CardTitle>Latency Percentiles</CardTitle>
            <CardDescription>P50, P95, P99 response times (ms)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={latencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" label={{ value: "ms", angle: -90, position: "insideLeft" }} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
                <Line type="monotone" dataKey="p50" stroke="#22c55e" strokeWidth={2} dot={false} name="P50" />
                <Line type="monotone" dataKey="p95" stroke="#f59e0b" strokeWidth={2} dot={false} name="P95" />
                <Line type="monotone" dataKey="p99" stroke="#ef4444" strokeWidth={2} dot={false} name="P99" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Real-Time Job Stream */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Time Job Stream</CardTitle>
          <CardDescription>Live orchestration events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {jobStream.map((job) => (
              <div
                key={job.id}
                className="flex items-start justify-between p-3 border-l-4 border-primary pl-4 bg-secondary/20 rounded"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(job.status)}
                    <p className="font-medium text-sm">{job.event}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {job.buyer} • {job.channel} • {job.duration}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant="outline" className="text-xs">
                    {job.timestamp}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {job.status.includes("✓") ? "OK" : "Pending"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
