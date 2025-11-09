import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, TrendingUp, MessageSquare, Zap } from "lucide-react"
import {
  AreaChart,
  Area,
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
} from "recharts"

export default function DashboardPage() {
  const kpis = [
    { label: "Response Rate", value: "67.3%", change: "+2.4%", icon: Phone, color: "text-primary" },
    { label: "Sentiment Score", value: "+0.68", change: "+0.12", icon: TrendingUp, color: "text-accent" },
    { label: "Time to Resolve", value: "4.2h", change: "-18%", icon: MessageSquare, color: "text-blue-500" },
    { label: "Calls Today", value: "1,247", change: "+346", icon: Zap, color: "text-orange-500" },
  ]

  const sentimentData = [
    { date: "Mon", score: 0.62 },
    { date: "Tue", score: 0.65 },
    { date: "Wed", score: 0.68 },
    { date: "Thu", score: 0.66 },
    { date: "Fri", score: 0.72 },
    { date: "Sat", score: 0.7 },
    { date: "Sun", score: 0.68 },
  ]

  const funnelData = [
    { stage: "Calls Made", value: 1200 },
    { stage: "Connected", value: 945 },
    { stage: "Engaged", value: 756 },
    { stage: "Converted", value: 321 },
  ]

  const tagData = [
    { name: "Positive", value: 62, fill: "#22c55e" },
    { name: "Neutral", value: 24, fill: "#6366f1" },
    { name: "Negative", value: 14, fill: "#ef4444" },
  ]

  return (
    <SidebarInset>
      <PageHeader title="Dashboard" description="Real-time overview of your calling operations" />

      <div className="flex-1 space-y-6 p-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            return (
              <Card key={kpi.label}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
                    <Icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                  <p className="text-xs text-accent mt-1">{kpi.change} from yesterday</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Over Time</CardTitle>
              <CardDescription>7-day moving average</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={sentimentData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" domain={[0, 1]} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
                  <Area type="monotone" dataKey="score" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Funnel</CardTitle>
                <CardDescription>Call conversion pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={funnelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" stroke="#6b7280" />
                    <YAxis dataKey="stage" type="category" stroke="#6b7280" width={100} />
                    <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
                    <Bar dataKey="value" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={tagData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {tagData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
