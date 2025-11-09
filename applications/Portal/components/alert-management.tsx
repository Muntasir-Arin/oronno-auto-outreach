"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, Bell, Mail, MessageSquare, Plus, Edit2, Trash2 } from "lucide-react"

interface Alert {
  id: number
  name: string
  trigger: string
  condition: string
  channel: "Slack" | "Email" | "PagerDuty" | "SMS"
  enabled: boolean
  severity: "critical" | "high" | "medium" | "low"
  lastTriggered: string | null
  count: number
}

export function AlertManagement() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      name: "Critical Error Rate",
      trigger: "error_rate > 5%",
      condition: "Any environment",
      channel: "Slack",
      enabled: true,
      severity: "critical",
      lastTriggered: "2025-11-09 10:32",
      count: 2,
    },
    {
      id: 2,
      name: "High Latency Alert",
      trigger: "p95_latency > 500ms",
      condition: "Prod environment",
      channel: "PagerDuty",
      enabled: true,
      severity: "high",
      lastTriggered: "2025-11-08 14:15",
      count: 5,
    },
    {
      id: 3,
      name: "DNC Sync Failed",
      trigger: "dnc_sync_failed",
      condition: "Any sync failure",
      channel: "Email",
      enabled: true,
      severity: "critical",
      lastTriggered: null,
      count: 0,
    },
    {
      id: 4,
      name: "Low Consent Rate",
      trigger: "consent_rate < 80%",
      condition: "Daily check",
      channel: "Slack",
      enabled: true,
      severity: "medium",
      lastTriggered: "2025-11-09 08:00",
      count: 3,
    },
    {
      id: 5,
      name: "Script Performance Drop",
      trigger: "conversion_rate dropped > 10%",
      condition: "Daily comparison",
      channel: "Email",
      enabled: false,
      severity: "medium",
      lastTriggered: null,
      count: 0,
    },
  ])

  const toggleAlert = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, enabled: !alert.enabled } : alert)))
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Slack":
        return <MessageSquare className="w-4 h-4" />
      case "Email":
        return <Mail className="w-4 h-4" />
      case "PagerDuty":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200"
    }
  }

  const activeAlerts = alerts.filter((a) => a.enabled).length
  const triggeredToday = alerts.filter((a) => a.lastTriggered && a.lastTriggered.includes("2025-11-09")).length

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-foreground mt-2">
                  {activeAlerts}/{alerts.length}
                </p>
              </div>
              <Bell className="w-4 h-4 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Triggered Today</p>
                <p className="text-2xl font-bold text-orange-600 mt-2">{triggeredToday}</p>
              </div>
              <AlertCircle className="w-4 h-4 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-xs text-muted-foreground">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {alerts.filter((a) => a.severity === "critical" && a.enabled).length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Rules */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle>Alert Rules</CardTitle>
            <CardDescription>Configure triggers and notification channels</CardDescription>
          </div>
          <Button size="sm" className="gap-1">
            <Plus className="w-3 h-3" />
            New Alert
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 border rounded-lg transition-all ${
                alert.enabled ? "border-border bg-card" : "border-border/50 bg-muted/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getChannelIcon(alert.channel)}
                    <p className="font-medium text-sm">{alert.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Trigger: <span className="font-mono">{alert.trigger}</span>
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {alert.channel}
                    </Badge>
                    <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>{alert.severity}</Badge>
                    {alert.lastTriggered && (
                      <Badge variant="secondary" className="text-xs">
                        Last: {alert.lastTriggered.split(" ")[1]} ({alert.count}x today)
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Switch checked={alert.enabled} onCheckedChange={() => toggleAlert(alert.id)} />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>Configure where alerts are sent</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Slack", connected: true, description: "#alerts channel" },
            { name: "Email", connected: true, description: "team@oronno.com" },
            { name: "PagerDuty", connected: true, description: "Production service" },
            { name: "SMS", connected: false, description: "Configure via settings" },
          ].map((channel) => (
            <div key={channel.name} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-sm">{channel.name}</p>
                {channel.connected ? (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200 text-xs">
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Disabled
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-3">{channel.description}</p>
              <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                {channel.connected ? "Manage" : "Connect"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
