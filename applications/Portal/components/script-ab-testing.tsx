"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, Award } from "lucide-react"

interface ABTest {
  id: number
  name: string
  variantA: string
  variantB: string
  startDate: string
  status: "Running" | "Completed"
  sampleSize: number
  conversionA: number
  conversionB: number
}

export function ScriptABTesting() {
  const tests: ABTest[] = [
    {
      id: 1,
      name: "Professional vs Casual Tone",
      variantA: "v2.1 (Professional)",
      variantB: "v2.0 (Casual)",
      startDate: "2025-11-05",
      status: "Running",
      sampleSize: 2500,
      conversionA: 342,
      conversionB: 245,
    },
    {
      id: 2,
      name: "Opening Line Test",
      variantA: "Standard Opening",
      variantB: "Question-Based Opening",
      startDate: "2025-10-28",
      status: "Completed",
      sampleSize: 1800,
      conversionA: 198,
      conversionB: 267,
    },
  ]

  const performanceData = [
    { test: "Prof vs Casual", variantA: 27.4, variantB: 27.5, difference: 0.1 },
    { test: "Opening Line", variantA: 11, variantB: 14.8, difference: 3.8 },
  ]

  const timeSeriesData = [
    { date: "Day 1", A: 15.2, B: 14.8 },
    { date: "Day 2", A: 18.5, B: 19.2 },
    { date: "Day 3", A: 22.1, B: 24.3 },
    { date: "Day 4", A: 24.8, B: 26.5 },
    { date: "Day 5", A: 26.1, B: 27.8 },
    { date: "Day 6", A: 27.4, B: 27.5 },
  ]

  const getWinner = (a: number, b: number) => (a > b ? "A" : b > a ? "B" : "Tie")
  const getConfidence = (winner: string, a: number, b: number) => {
    const diff = Math.abs(a - b)
    return Math.min(95, 50 + diff * 5)
  }

  return (
    <div className="space-y-6">
      {/* Active Tests */}
      <Card>
        <CardHeader>
          <CardTitle>A/B Tests</CardTitle>
          <CardDescription>Compare script performance with live testing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {tests.map((test) => {
            const rateA = ((test.conversionA / test.sampleSize) * 100).toFixed(2)
            const rateB = ((test.conversionB / test.sampleSize) * 100).toFixed(2)
            const winner = getWinner(Number.parseFloat(rateA), Number.parseFloat(rateB))
            const confidence = getConfidence(winner, Number.parseFloat(rateA), Number.parseFloat(rateB))

            return (
              <div key={test.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-medium text-sm">{test.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">Started {test.startDate}</p>
                  </div>
                  <Badge variant={test.status === "Running" ? "default" : "secondary"}>{test.status}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div
                    className={`p-3 rounded-lg ${winner === "A" ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800" : "bg-secondary"}`}
                  >
                    <p className="text-xs font-medium text-muted-foreground">{test.variantA}</p>
                    <p className="text-lg font-bold mt-1">{rateA}%</p>
                    <p className="text-xs text-muted-foreground mt-1">{test.conversionA} conversions</p>
                    {winner === "A" && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-green-700 dark:text-green-200">
                        <Award className="w-3 h-3" />
                        Winner
                      </div>
                    )}
                  </div>

                  <div
                    className={`p-3 rounded-lg ${winner === "B" ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800" : "bg-secondary"}`}
                  >
                    <p className="text-xs font-medium text-muted-foreground">{test.variantB}</p>
                    <p className="text-lg font-bold mt-1">{rateB}%</p>
                    <p className="text-xs text-muted-foreground mt-1">{test.conversionB} conversions</p>
                    {winner === "B" && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-green-700 dark:text-green-200">
                        <Award className="w-3 h-3" />
                        Winner
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Statistical Confidence</span>
                    <span className="font-medium">{confidence}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                </div>

                {test.status === "Running" ? (
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    View Real-Time Results
                  </Button>
                ) : (
                  <Button size="sm" className="w-full gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Deploy Winner
                  </Button>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Rate Comparison</CardTitle>
          <CardDescription>All active and recent tests</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="test" stroke="#6b7280" />
              <YAxis stroke="#6b7280" label={{ value: "%", angle: -90, position: "insideLeft" }} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
              <Bar dataKey="variantA" fill="#0ea5e9" name="Variant A" />
              <Bar dataKey="variantB" fill="#06b6d4" name="Variant B" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Time Series */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Rate Over Time</CardTitle>
          <CardDescription>Professional vs Casual tone test</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" label={{ value: "%", angle: -90, position: "insideLeft" }} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
              <Line type="monotone" dataKey="A" stroke="#0ea5e9" strokeWidth={2} name="Professional" />
              <Line type="monotone" dataKey="B" stroke="#06b6d4" strokeWidth={2} name="Casual" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
