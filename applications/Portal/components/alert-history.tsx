"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface AlertEvent {
  id: number
  timestamp: string
  alert: string
  severity: "critical" | "high" | "medium" | "low"
  message: string
  resolved: boolean
  acknowledgedBy?: string
}

export function AlertHistory() {
  const alertEvents: AlertEvent[] = [
    {
      id: 1,
      timestamp: "2025-11-09 14:32:15",
      alert: "Critical Error Rate",
      severity: "critical",
      message: "Error rate exceeded 5% threshold - 5.2% detected",
      resolved: true,
      acknowledgedBy: "John D.",
    },
    {
      id: 2,
      timestamp: "2025-11-09 13:18:42",
      alert: "Low Consent Rate",
      severity: "medium",
      message: "Consent rate dropped to 78% - below 80% threshold",
      resolved: true,
      acknowledgedBy: "Jane S.",
    },
    {
      id: 3,
      timestamp: "2025-11-09 10:45:30",
      alert: "High Latency Alert",
      severity: "high",
      message: "P95 latency reached 623ms - above 500ms threshold",
      resolved: true,
      acknowledgedBy: "Mike T.",
    },
    {
      id: 4,
      timestamp: "2025-11-08 22:15:18",
      alert: "Critical Error Rate",
      severity: "critical",
      message: "Error rate exceeded 5% threshold - 6.1% detected",
      resolved: true,
      acknowledgedBy: "Sarah L.",
    },
    {
      id: 5,
      timestamp: "2025-11-08 18:30:05",
      alert: "High Latency Alert",
      severity: "high",
      message: "P95 latency reached 542ms - above 500ms threshold",
      resolved: true,
      acknowledgedBy: "Auto-resolved",
    },
  ]

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

  const resolvedCount = alertEvents.filter((e) => e.resolved).length
  const totalCount = alertEvents.length

  return (
    <div className="space-y-6">
      {/* Alert History Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Alerts (7d)</p>
                <p className="text-2xl font-bold text-foreground mt-2">{totalCount}</p>
              </div>
              <AlertCircle className="w-4 h-4 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  {resolvedCount}/{totalCount}
                </p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg Resolution Time</p>
                <p className="text-2xl font-bold text-foreground mt-2">24m</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 text-xs">
                Trending down
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alert Events</CardTitle>
          <CardDescription>Last 30 days of alert history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {alertEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start justify-between p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className={`w-4 h-4 ${event.resolved ? "text-green-500" : "text-orange-500"}`} />
                    <p className="font-medium text-sm">{event.alert}</p>
                    {event.resolved && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{event.message}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{event.timestamp}</span>
                    <span>•</span>
                    <span>Acknowledged by {event.acknowledgedBy}</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Badge className={`text-xs ${getSeverityColor(event.severity)}`}>{event.severity}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
