"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Database, Upload, Download, Send as Sync, AlertCircle, CheckCircle2 } from "lucide-react"

interface DNCRecord {
  id: number
  contact: string
  type: "phone" | "email"
  status: "active" | "expired"
  addedDate: string
  reason: string
}

export function ConsentDNCManagement() {
  const [dncRecords, setDncRecords] = useState<DNCRecord[]>([
    {
      id: 1,
      contact: "+1-555-123-4567",
      type: "phone",
      status: "active",
      addedDate: "2025-11-09",
      reason: "Customer request",
    },
    {
      id: 2,
      contact: "sohan@gmail.com",
      type: "email",
      status: "active",
      addedDate: "2025-11-08",
      reason: "Unsubscribe",
    },
    {
      id: 3,
      contact: "+1-555-234-5678",
      type: "phone",
      status: "expired",
      addedDate: "2025-05-12",
      reason: "TCPA complaint",
    },
  ])

  const [newContact, setNewContact] = useState("")
  const [newReason, setNewReason] = useState("")

  const dncStatus = {
    lastSync: "2 hours ago",
    records: "1,247,890",
    status: "Healthy",
  }

  const activeRecords = dncRecords.filter((r) => r.status === "active").length

  const handleAddContact = () => {
    if (newContact && newReason) {
      const isPhone = /^\+?1?[-.\s]?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/.test(newContact)
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newContact)

      if (isPhone || isEmail) {
        setDncRecords([
          ...dncRecords,
          {
            id: Math.max(...dncRecords.map((r) => r.id), 0) + 1,
            contact: newContact,
            type: isPhone ? "phone" : "email",
            status: "active",
            addedDate: new Date().toISOString().split("T")[0],
            reason: newReason,
          },
        ])
        setNewContact("")
        setNewReason("")
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* DNC Registry Status */}
      <Card>
        <CardHeader>
          <CardTitle>National DNC Registry</CardTitle>
          <CardDescription>Do Not Call list synchronization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground">Registry Records</p>
              <p className="text-2xl font-bold text-foreground mt-2">{dncStatus.records}</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground">Local Active</p>
              <p className="text-2xl font-bold text-foreground mt-2">{activeRecords}</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground">Last Sync</p>
              <p className="text-lg font-bold text-foreground mt-2">{dncStatus.lastSync}</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground">Status</p>
              <div className="flex items-center gap-1 mt-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <p className="font-bold text-foreground">{dncStatus.status}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2 bg-transparent">
              <Sync className="w-4 h-4" />
              Sync Registry
            </Button>
            <Button variant="outline" className="flex-1 gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export Local
            </Button>
            <Button variant="outline" className="flex-1 gap-2 bg-transparent">
              <Upload className="w-4 h-4" />
              Import List
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add to DNC */}
      <Card>
        <CardHeader>
          <CardTitle>Add to DNC List</CardTitle>
          <CardDescription>Manually add contacts to prevent outreach</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Phone or Email</label>
              <Input
                placeholder="e.g., +1-555-123-4567 or email@example.com"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Reason for Addition</label>
              <Textarea
                placeholder="e.g., Customer request, TCPA complaint, Deceased..."
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button onClick={handleAddContact} className="w-full">
              Add to DNC List
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* DNC Records */}
      <Card>
        <CardHeader>
          <CardTitle>Local DNC Records</CardTitle>
          <CardDescription>Manually added contacts ({activeRecords} active)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {dncRecords.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Database className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No DNC records</p>
              </div>
            ) : (
              dncRecords.map((record) => (
                <div key={record.id} className="flex items-start justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {record.type}
                      </Badge>
                      <p className="font-medium text-sm">{record.contact}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{record.reason}</span>
                      <span>•</span>
                      <span>{record.addedDate}</span>
                    </div>
                  </div>
                  <Badge
                    variant={record.status === "active" ? "default" : "secondary"}
                    className="text-xs flex-shrink-0"
                  >
                    {record.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Alert */}
      <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-amber-900 dark:text-amber-100">DNC Compliance Required</p>
              <p className="text-sm text-amber-700 dark:text-amber-200 mt-1">
                Ensure all DNC records are current and accurate. Non-compliance can result in FCC fines up to $43,792
                per violation. Registry syncs daily at 2 AM UTC.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
