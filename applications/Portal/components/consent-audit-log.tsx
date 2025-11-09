"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

interface AuditLog {
  id: number
  timestamp: string
  action: string
  contact: string
  outcome: "blocked" | "allowed" | "flagged"
  reason: string
  ipAddress: string
  userId: string
}

export function ConsentAuditLog() {
  const auditLogs: AuditLog[] = [
    {
      id: 1,
      timestamp: "2025-11-09 14:32:45",
      action: "Outreach Attempt",
      contact: "+1-555-123-4567",
      outcome: "blocked",
      reason: "Contact in DNC registry",
      ipAddress: "192.168.1.100",
      userId: "user_001",
    },
    {
      id: 2,
      timestamp: "2025-11-09 14:31:22",
      action: "Consent Check",
      contact: "jane@example.com",
      outcome: "allowed",
      reason: "Consent flag verified",
      ipAddress: "192.168.1.101",
      userId: "user_002",
    },
    {
      id: 3,
      timestamp: "2025-11-09 14:30:18",
      action: "Outreach Attempt",
      contact: "+1-555-234-5678",
      outcome: "flagged",
      reason: "TCPA compliance check required",
      ipAddress: "192.168.1.100",
      userId: "user_001",
    },
    {
      id: 4,
      timestamp: "2025-11-09 14:29:05",
      action: "DNC Addition",
      contact: "+1-555-345-6789",
      outcome: "allowed",
      reason: "Manual addition by user",
      ipAddress: "192.168.1.102",
      userId: "user_003",
    },
    {
      id: 5,
      timestamp: "2025-11-09 14:28:33",
      action: "Consent Check",
      contact: "mike@example.com",
      outcome: "blocked",
      reason: "Global opt-out set",
      ipAddress: "192.168.1.100",
      userId: "user_001",
    },
  ]

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case "blocked":
        return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200"
      case "allowed":
        return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
      case "flagged":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const blockedCount = auditLogs.filter((log) => log.outcome === "blocked").length
  const allowedCount = auditLogs.filter((log) => log.outcome === "allowed").length
  const flaggedCount = auditLogs.filter((log) => log.outcome === "flagged").length

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Blocked Today</p>
                <p className="text-2xl font-bold text-red-600 mt-2">{blockedCount}</p>
              </div>
              <Badge variant="destructive" className="text-xs">
                {((blockedCount / auditLogs.length) * 100).toFixed(0)}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Allowed Today</p>
                <p className="text-2xl font-bold text-green-600 mt-2">{allowedCount}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {((allowedCount / auditLogs.length) * 100).toFixed(0)}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Flagged Today</p>
                <p className="text-2xl font-bold text-yellow-600 mt-2">{flaggedCount}</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200 text-xs">
                {((flaggedCount / auditLogs.length) * 100).toFixed(0)}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Log Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle>Compliance Audit Log</CardTitle>
            <CardDescription>All consent and DNC enforcement events</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <p className="font-medium text-sm">{log.action}</p>
                    <Badge variant="outline" className="text-xs">
                      {log.contact}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{log.timestamp}</span>
                    <span>•</span>
                    <span>ID: {log.userId}</span>
                    <span>•</span>
                    <span>{log.ipAddress}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">{log.reason}</p>
                    <Badge className={`text-xs ${getOutcomeColor(log.outcome)}`}>{log.outcome}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export & Compliance */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Reports</CardTitle>
          <CardDescription>Generate reports for audits and compliance verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              TCPA Compliance Report
            </Button>
            <Button variant="outline" className="justify-start gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              DNC Sync Verification
            </Button>
            <Button variant="outline" className="justify-start gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Consent Audit Trail
            </Button>
            <Button variant="outline" className="justify-start gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Opt-Out Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
