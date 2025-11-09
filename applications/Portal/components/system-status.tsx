"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Zap, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

interface SystemComponent {
  name: string
  status: "healthy" | "degraded" | "down"
  uptime: number
  latency: number
  lastCheck: string
}

export function SystemStatus() {
  const components: SystemComponent[] = [
    {
      name: "Kafka Message Bus",
      status: "healthy",
      uptime: 99.98,
      latency: 12,
      lastCheck: "2 seconds ago",
    },
    {
      name: "PostgreSQL Database",
      status: "healthy",
      uptime: 99.99,
      latency: 8,
      lastCheck: "1 second ago",
    },
    {
      name: "DNC Registry Sync",
      status: "healthy",
      uptime: 99.95,
      latency: 245,
      lastCheck: "5 minutes ago",
    },
    {
      name: "Twilio Integration",
      status: "healthy",
      uptime: 99.92,
      latency: 125,
      lastCheck: "3 seconds ago",
    },
    {
      name: "Email Service (SendGrid)",
      status: "degraded",
      uptime: 99.5,
      latency: 1200,
      lastCheck: "10 seconds ago",
    },
    {
      name: "Analytics Pipeline",
      status: "healthy",
      uptime: 99.96,
      latency: 450,
      lastCheck: "15 seconds ago",
    },
  ]

  const getStatusIcon = (status: string) => {
    if (status === "healthy") return <CheckCircle2 className="w-4 h-4 text-green-500" />
    if (status === "degraded") return <AlertCircle className="w-4 h-4 text-yellow-500" />
    return <AlertCircle className="w-4 h-4 text-red-500" />
  }

  const getStatusBadge = (status: string) => {
    if (status === "healthy")
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">Healthy</Badge>
    if (status === "degraded")
      return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">Degraded</Badge>
    return <Badge variant="destructive">Down</Badge>
  }

  const overallHealth = components.filter((c) => c.status === "healthy").length
  const avgUptime = (components.reduce((sum, c) => sum + c.uptime, 0) / components.length).toFixed(2)

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Overall Status</p>
                <p className="text-2xl font-bold text-green-600 mt-2">Operational</p>
              </div>
              <Activity className="w-4 h-4 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Components Healthy</p>
                <p className="text-2xl font-bold text-foreground mt-2">
                  {overallHealth}/{components.length}
                </p>
              </div>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Average Uptime</p>
                <p className="text-2xl font-bold text-foreground mt-2">{avgUptime}%</p>
              </div>
              <Zap className="w-4 h-4 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Component List */}
      <Card>
        <CardHeader>
          <CardTitle>System Components</CardTitle>
          <CardDescription>Real-time status of all integrated services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {components.map((component, idx) => (
            <div
              key={idx}
              className={`p-4 border rounded-lg transition-all ${
                component.status === "healthy"
                  ? "border-border bg-card"
                  : component.status === "degraded"
                    ? "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/20"
                    : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-0.5">{getStatusIcon(component.status)}</div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{component.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">Checked {component.lastCheck}</p>
                  </div>
                </div>
                {getStatusBadge(component.status)}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-2 bg-secondary rounded">
                  <p className="text-xs text-muted-foreground">Uptime</p>
                  <p className="text-sm font-bold text-foreground mt-1">{component.uptime}%</p>
                </div>
                <div className="p-2 bg-secondary rounded">
                  <p className="text-xs text-muted-foreground">Latency</p>
                  <p className="text-sm font-bold text-foreground mt-1">{component.latency}ms</p>
                </div>
                <div className="p-2 bg-secondary rounded">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        component.status === "healthy"
                          ? "bg-green-500"
                          : component.status === "degraded"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <p className="text-xs font-bold text-foreground capitalize">{component.status}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
