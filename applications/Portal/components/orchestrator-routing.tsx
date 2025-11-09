"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowRight, PhoneOff, Mail, Zap, Clock, TrendingUp } from "lucide-react"

interface RoutingRule {
  id: number
  name: string
  condition: string
  action: string
  priority: "high" | "medium" | "low"
  enabled: boolean
  successRate: number
  conversions: number
}

export function OrchestratorRouting() {
  const [rules, setRules] = useState<RoutingRule[]>([
    {
      id: 1,
      name: "Premium Voice Route",
      condition: "Phone + Consent + High Score",
      action: "Voice Call (Priority Queue)",
      priority: "high",
      enabled: true,
      successRate: 78.5,
      conversions: 342,
    },
    {
      id: 2,
      name: "Email Fallback",
      condition: "Email Only",
      action: "Email Sequence (3 touches)",
      priority: "medium",
      enabled: true,
      successRate: 42.3,
      conversions: 156,
    },
    {
      id: 3,
      name: "A/B Channel Test",
      condition: "Both Channels + New Segment",
      action: "A/B Test (50/50 Split)",
      priority: "high",
      enabled: true,
      successRate: 65.2,
      conversions: 289,
    },
    {
      id: 4,
      name: "SMS Micro-Touch",
      condition: "SMS Opted-In",
      action: "SMS Alert + Email",
      priority: "low",
      enabled: false,
      successRate: 31.8,
      conversions: 87,
    },
  ])

  const toggleRule = (id: number) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const getActionIcon = (action: string) => {
    if (action.includes("Voice")) return <PhoneOff className="w-4 h-4 text-primary" />
    if (action.includes("Email")) return <Mail className="w-4 h-4 text-blue-500" />
    if (action.includes("SMS")) return <Zap className="w-4 h-4 text-purple-500" />
    return <ArrowRight className="w-4 h-4" />
  }

  const totalConversions = rules.reduce((sum, rule) => sum + rule.conversions, 0)
  const avgSuccessRate = (rules.reduce((sum, rule) => sum + rule.successRate, 0) / rules.length).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold text-foreground mt-2">
                  {rules.filter((r) => r.enabled).length}/{rules.length}
                </p>
              </div>
              <Zap className="w-4 h-4 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Conversions</p>
                <p className="text-2xl font-bold text-foreground mt-2">{totalConversions}</p>
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg Success Rate</p>
                <p className="text-2xl font-bold text-foreground mt-2">{avgSuccessRate}%</p>
              </div>
              <TrendingUp className="w-4 h-4 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Rules Updated</p>
                <p className="text-2xl font-bold text-foreground mt-2">Today</p>
              </div>
              <Clock className="w-4 h-4 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Routing Rules List */}
      <Card>
        <CardHeader>
          <CardTitle>Routing Rules Engine</CardTitle>
          <CardDescription>Configure how buyers are routed across channels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`p-4 border rounded-lg transition-all ${
                rule.enabled ? "border-border bg-card" : "border-border bg-muted/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0">{getActionIcon(rule.action)}</div>
                    <div>
                      <p className="font-medium text-sm">{rule.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">Condition: {rule.condition}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div className="p-2 bg-secondary rounded">
                      <p className="text-xs text-muted-foreground">Action</p>
                      <p className="text-sm font-medium mt-1">{rule.action}</p>
                    </div>
                    <div className="p-2 bg-secondary rounded">
                      <p className="text-xs text-muted-foreground">Success Rate</p>
                      <p className="text-sm font-medium mt-1">{rule.successRate}%</p>
                    </div>
                    <div className="p-2 bg-secondary rounded">
                      <p className="text-xs text-muted-foreground">Conversions</p>
                      <p className="text-sm font-medium mt-1">{rule.conversions}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 flex-shrink-0">
                  <Badge variant={rule.priority === "high" ? "default" : "secondary"}>{rule.priority}</Badge>
                  <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
