"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Copy, Play, Edit2, Trash2 } from "lucide-react"

interface ScriptVersion {
  id: number
  version: string
  name: string
  date: string
  tone: string
  type: "voice" | "email" | "sms"
  variables: string[]
  content: string
  status: "Active" | "Testing" | "Archived"
  performance: {
    attempts: number
    conversions: number
    rate: number
  }
}

export function ScriptGeneratorBuilder() {
  const [scripts, setScripts] = useState<ScriptVersion[]>([
    {
      id: 1,
      version: "v2.1",
      name: "Premium Voice Script",
      date: "2025-11-09",
      tone: "Professional",
      type: "voice",
      variables: ["{{first_name}}", "{{product_name}}", "{{days_since_purchase}}"],
      content:
        "Hi {{first_name}}, I'm calling about your recent {{product_name}} purchase. I wanted to check in after {{days_since_purchase}} days to see how you're finding it.",
      status: "Active",
      performance: { attempts: 1247, conversions: 342, rate: 27.4 },
    },
    {
      id: 2,
      version: "v2.0",
      name: "Standard Voice Script",
      date: "2025-11-08",
      tone: "Casual",
      type: "voice",
      variables: ["{{first_name}}", "{{company}}"],
      content:
        "Hey {{first_name}}, wanted to check in about {{company}} and see if now's a good time for a quick chat?",
      status: "Testing",
      performance: { attempts: 890, conversions: 245, rate: 27.5 },
    },
    {
      id: 3,
      version: "v2.1",
      name: "Email Follow-up",
      date: "2025-11-09",
      tone: "Professional",
      type: "email",
      variables: ["{{first_name}}", "{{product_name}}"],
      content:
        "Hi {{first_name}},\n\nThanks for trying {{product_name}}! We'd love to hear your thoughts.\n\nBest regards,\nOronno Team",
      status: "Active",
      performance: { attempts: 3420, conversions: 587, rate: 17.2 },
    },
  ])

  const [selectedScript, setSelectedScript] = useState<ScriptVersion | null>(scripts[0])
  const [showBuilder, setShowBuilder] = useState(false)
  const [editingScript, setEditingScript] = useState<Partial<ScriptVersion> | null>(null)

  const createNewScript = () => {
    setEditingScript({
      id: Math.max(...scripts.map((s) => s.id), 0) + 1,
      version: `v${Number.parseFloat(scripts[0]?.version.replace("v", "") || "1") + 0.1}`,
      name: "New Script",
      date: new Date().toISOString().split("T")[0],
      tone: "Professional",
      type: "voice",
      variables: [],
      content: "",
      status: "Active",
      performance: { attempts: 0, conversions: 0, rate: 0 },
    })
    setShowBuilder(true)
  }

  const saveScript = () => {
    if (editingScript) {
      if (editingScript.id && scripts.find((s) => s.id === editingScript.id)) {
        setScripts(scripts.map((s) => (s.id === editingScript.id ? (editingScript as ScriptVersion) : s)))
      } else {
        setScripts([...scripts, editingScript as ScriptVersion])
      }
      setEditingScript(null)
      setShowBuilder(false)
    }
  }

  const deleteScript = (id: number) => {
    setScripts(scripts.filter((s) => s.id !== id))
    if (selectedScript?.id === id) {
      setSelectedScript(scripts[0] || null)
    }
  }

  const duplicateScript = (script: ScriptVersion) => {
    const newScript = {
      ...script,
      id: Math.max(...scripts.map((s) => s.id), 0) + 1,
      version: `v${Number.parseFloat(script.version.replace("v", "")) + 0.1}`,
      status: "Testing" as const,
    }
    setScripts([...scripts, newScript])
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Script List */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Scripts ({scripts.length})</CardTitle>
              <Button size="sm" onClick={createNewScript} className="gap-1">
                <Plus className="w-3 h-3" />
                New
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {scripts.map((script) => (
              <div
                key={script.id}
                onClick={() => setSelectedScript(script)}
                className={`p-3 rounded-lg cursor-pointer transition-all border ${
                  selectedScript?.id === script.id ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{script.name}</p>
                    <p className="text-xs text-muted-foreground">{script.version}</p>
                  </div>
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    {script.type}
                  </Badge>
                </div>
                <Badge
                  variant={
                    script.status === "Active" ? "default" : script.status === "Testing" ? "secondary" : "outline"
                  }
                  className="text-xs"
                >
                  {script.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Script Details & Builder */}
      <div className="lg:col-span-2">
        {showBuilder && editingScript ? (
          <Card>
            <CardHeader>
              <CardTitle>Script Builder</CardTitle>
              <CardDescription>Create or edit a script</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Script Name</label>
                  <Input
                    value={editingScript.name || ""}
                    onChange={(e) => setEditingScript({ ...editingScript, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tone</label>
                  <select
                    value={editingScript.tone || "Professional"}
                    onChange={(e) => setEditingScript({ ...editingScript, tone: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm mt-1"
                  >
                    <option>Professional</option>
                    <option>Casual</option>
                    <option>Enthusiastic</option>
                    <option>Empathetic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Script Content</label>
                <Textarea
                  value={editingScript.content || ""}
                  onChange={(e) => setEditingScript({ ...editingScript, content: e.target.value })}
                  className="mt-1 min-h-[200px]"
                  placeholder="Enter script content. Use {{first_name}}, {{product_name}}, etc. for dynamic fields."
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Tip: Use {{ first_name }}, {{ product_name }}, etc. syntax for dynamic content like {{ first_name }},{" "}
                  {{ product_name }}, etc.
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={saveScript} className="flex-1">
                  Save Script
                </Button>
                <Button onClick={() => setShowBuilder(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : selectedScript ? (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{selectedScript.name}</CardTitle>
                  <CardDescription>{selectedScript.date}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingScript(selectedScript)
                      setShowBuilder(true)
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => duplicateScript(selectedScript)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => deleteScript(selectedScript.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="variables">Variables</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge>{selectedScript.type}</Badge>
                      <Badge variant="outline">{selectedScript.tone}</Badge>
                      <Badge variant={selectedScript.status === "Active" ? "default" : "secondary"}>
                        {selectedScript.status}
                      </Badge>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg font-mono text-sm text-foreground whitespace-pre-wrap break-words">
                      {selectedScript.content}
                    </div>
                  </div>
                  <Button className="w-full gap-2">
                    <Play className="w-4 h-4" />
                    Test Script
                  </Button>
                </TabsContent>

                <TabsContent value="variables" className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-3">Dynamic Variables Used</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedScript.variables.map((variable) => (
                        <Badge key={variable} variant="secondary">
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-3">Common Variables</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "{{first_name}}",
                        "{{last_name}}",
                        "{{company}}",
                        "{{product_name}}",
                        "{{email}}",
                        "{{phone}}",
                      ].map((variable) => (
                        <Button
                          key={variable}
                          variant="outline"
                          size="sm"
                          className="text-xs justify-start bg-transparent"
                          onClick={() => {
                            navigator.clipboard.writeText(variable)
                          }}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          {variable}
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="text-xs text-muted-foreground">Attempts</p>
                      <p className="text-2xl font-bold mt-2">{selectedScript.performance.attempts}</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="text-xs text-muted-foreground">Conversions</p>
                      <p className="text-2xl font-bold mt-2">{selectedScript.performance.conversions}</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="text-xs text-muted-foreground">Conv. Rate</p>
                      <p className="text-2xl font-bold text-accent mt-2">{selectedScript.performance.rate}%</p>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Performance Insight</p>
                    <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                      This script performs {selectedScript.performance.rate > 25 ? "above" : "below"} average. Consider
                      A/B testing variations.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  )
}
