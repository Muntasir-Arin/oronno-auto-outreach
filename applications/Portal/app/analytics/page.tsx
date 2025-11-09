import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsPage() {
  const trendData = [
    { month: "Jan", sentiment: 0.62, responses: 890, conversions: 234 },
    { month: "Feb", sentiment: 0.65, responses: 1120, conversions: 312 },
    { month: "Mar", sentiment: 0.68, responses: 1450, conversions: 418 },
    { month: "Apr", sentiment: 0.71, responses: 1680, conversions: 512 },
    { month: "May", sentiment: 0.74, responses: 2140, conversions: 681 },
    { month: "Jun", sentiment: 0.76, responses: 2890, conversions: 847 },
  ]

  const channelData = [
    { name: "Phone", value: 45, color: "#0ea5e9" },
    { name: "Email", value: 28, color: "#06b6d4" },
    { name: "SMS", value: 18, color: "#14b8a6" },
    { name: "Chat", value: 9, color: "#10b981" },
  ]

  const conversionBySegment = [
    { segment: "Enterprise", rate: 45, count: 892 },
    { segment: "Mid-Market", rate: 38, count: 654 },
    { segment: "SMB", rate: 28, count: 421 },
    { segment: "Startup", rate: 19, count: 312 },
  ]

  const peakHours = [
    { hour: "9am", calls: 234, responses: 156 },
    { hour: "10am", calls: 412, responses: 289 },
    { hour: "11am", calls: 523, responses: 356 },
    { hour: "12pm", calls: 289, responses: 198 },
    { hour: "1pm", calls: 198, responses: 112 },
    { hour: "2pm", calls: 456, responses: 334 },
    { hour: "3pm", calls: 612, responses: 445 },
  ]

  return (
    <SidebarInset>
      <PageHeader
        title="Analytics"
        description="Comprehensive insights into campaign performance and trends"
        actions={
          <div className="flex items-center gap-2">
            <Select defaultValue="6m">
              <SelectTrigger className="w-32">
                <Calendar className="w-4 h-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1w">Last Week</SelectItem>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18,492</div>
              <p className="text-xs text-green-600 mt-1">+8.2% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">68.4%</div>
              <p className="text-xs text-green-600 mt-1">+3.1% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4,260</div>
              <p className="text-xs text-green-600 mt-1">+12.4% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">+0.76</div>
              <p className="text-xs text-green-600 mt-1">+0.14 this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>6-month overview of key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" yAxisId="left" />
                <YAxis stroke="#6b7280" yAxisId="right" orientation="right" />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sentiment"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={{ fill: "#0ea5e9" }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="responses"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: "#06b6d4" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Channel & Conversion Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Channel Distribution</CardTitle>
              <CardDescription>Calls by channel</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {channelData.map((channel) => (
                  <div key={channel.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }}></div>
                    <div>
                      <p className="text-sm font-medium">{channel.name}</p>
                      <p className="text-xs text-muted-foreground">{channel.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion by Segment</CardTitle>
              <CardDescription>Performance across customer segments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conversionBySegment}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="segment" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
                  <Bar dataKey="rate" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Peak Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Peak Call Hours</CardTitle>
            <CardDescription>Call volume and response rates by time of day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={peakHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
                <Legend />
                <Bar dataKey="calls" fill="#0ea5e9" />
                <Bar dataKey="responses" fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
