"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Shield, AlertCircle, CheckCircle2, Lock } from "lucide-react"

interface ConsentRule {
  id: number
  name: string
  condition: string
  action: string
  enabled: boolean
  priority: "high" | "medium" | "low"
  lastUpdated: string
}

export function ConsentRules() {
  const [rules, setRules] = useState<ConsentRule[]>([
    {
      id: 1,
      name: "Primary Consent Flag",
      condition: "buyer.consent_flag === TRUE",
      action: "ALLOW outreach",
      enabled: true,
      priority: "high",
      lastUpdated: "2025-11-05",
    },
    {
      id: 2,
      name: "DNC List Suppression",
      condition: "phone in national_dnc_registry",
      action: "BLOCK all voice calls",
      enabled: true,
      priority: "high",
      lastUpdated: "2025-11-09",
    },
    {
      id: 3,
      name: "Email Preference Check",
      condition: "buyer.email_opt_in === TRUE",
      action: "ALLOW email outreach",
      enabled: true,
      priority: "medium",
      lastUpdated: "2025-11-08",
    },
    {
      id: 4,
      name: "TCPA Compliance",
      condition: "caller_id verified AND time in business_hours",
      action: "ALLOW calls with disclaimer",
      enabled: true,
      priority: "high",
      lastUpdated: "2025-11-07",
    },
    {
      id: 5,
      name: "Opt-Out Respect",
      condition: "buyer.global_opt_out === TRUE",
      action: "BLOCK all contact",
      enabled: true,
      priority: "high",
      lastUpdated: "2025-11-09",
    },
  ])

  const toggleRule = (id: number) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const enabledCount = rules.filter((r) => r.enabled).length

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold text-foreground mt-2">
                  {enabledCount}/{rules.length}
                </p>
              </div>
              <Shield className="w-4 h-4 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Compliance Status</p>
                <p className="text-2xl font-bold text-green-600 mt-2">Compliant</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Blocked Today</p>
                <p className="text-2xl font-bold text-foreground mt-2">127</p>
              </div>
              <AlertCircle className="w-4 h-4 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rules List */}
      <Card>
        <CardHeader>
          <CardTitle>Consent Rules Engine</CardTitle>
          <CardDescription>Compliance rules enforced on all outreach</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`p-4 border rounded-lg transition-all ${
                rule.enabled ? "border-border bg-card" : "border-border/50 bg-muted/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-primary" />
                    <p className="font-medium text-sm">{rule.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Condition: {rule.condition}</p>
                  <div className="p-2 bg-secondary rounded text-xs text-foreground">→ {rule.action}</div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <Badge
                      variant={
                        rule.priority === "high" ? "destructive" : rule.priority === "medium" ? "secondary" : "outline"
                      }
                      className="text-xs mb-2 block"
                    >
                      {rule.priority}
                    </Badge>
                    <p className="text-xs text-muted-foreground">Updated {rule.lastUpdated}</p>
                  </div>
                  <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Compliance Info */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-blue-900 dark:text-blue-100">TCPA & GDPR Compliant</p>
              <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                All outreach automatically enforces consent rules, DNC compliance, and opt-out preferences. Audit logs
                are maintained for all blocked outreach attempts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
