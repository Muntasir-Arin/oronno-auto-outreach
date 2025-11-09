"use client"

import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Download,
  Upload,
  User,
  Phone,
  Mail,
  ShoppingBag,
  Calendar,
  MessageSquare,
  TrendingUp,
  Plus,
} from "lucide-react"
import { useState } from "react"

export default function CustomersPage() {
  const [customers] = useState([
    {
      id: 1,
      name: "Fatima Rahman",
      email: "fatima.r@email.com",
      phone: "+88 01712-345678",
      segment: "VIP",
      totalPurchases: 5,
      totalSpent: "৳12,475",
      lastPurchase: "2025-01-07",
      lastProduct: "Premium Headphones",
      callStatus: "completed",
      emailStatus: "responded",
      sentiment: 0.92,
      feedbackCount: 3,
    },
    {
      id: 2,
      name: "Ayesha Khan",
      email: "ayesha.k@email.com",
      phone: "+88 01823-456789",
      segment: "Regular",
      totalPurchases: 2,
      totalSpent: "৳3,420",
      lastPurchase: "2025-01-09",
      lastProduct: "Laptop Stand",
      callStatus: "in-progress",
      emailStatus: "opened",
      sentiment: 0.65,
      feedbackCount: 1,
    },
    {
      id: 3,
      name: "Nusrat Jahan",
      email: "nusrat.j@email.com",
      phone: "+88 01934-567890",
      segment: "New",
      totalPurchases: 1,
      totalSpent: "৳499",
      lastPurchase: "2025-01-10",
      lastProduct: "Wireless Mouse",
      callStatus: "scheduled",
      emailStatus: "sent",
      sentiment: 0.0,
      feedbackCount: 0,
    },
    {
      id: 4,
      name: "Sadia Ahmed",
      email: "sadia.a@email.com",
      phone: "+88 01645-678901",
      segment: "Regular",
      totalPurchases: 3,
      totalSpent: "৳6,890",
      lastPurchase: "2025-01-06",
      lastProduct: "USB-C Hub",
      callStatus: "failed",
      emailStatus: "bounced",
      sentiment: 0.0,
      feedbackCount: 0,
    },
    {
      id: 5,
      name: "Tasnim Hossain",
      email: "tasnim.h@email.com",
      phone: "+88 01756-789012",
      segment: "VIP",
      totalPurchases: 8,
      totalSpent: "৳21,342",
      lastPurchase: "2025-01-05",
      lastProduct: "Desk Lamp",
      callStatus: "completed",
      emailStatus: "responded",
      sentiment: 0.88,
      feedbackCount: 5,
    },
  ])

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case "VIP":
        return "bg-purple-100 text-purple-800"
      case "Regular":
        return "bg-blue-100 text-blue-800"
      case "New":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCallStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEmailStatusColor = (status: string) => {
    switch (status) {
      case "responded":
        return "bg-green-100 text-green-800"
      case "opened":
        return "bg-blue-100 text-blue-800"
      case "sent":
        return "bg-yellow-100 text-yellow-800"
      case "bounced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <SidebarInset>
      <PageHeader
        title="Customers"
        description="Manage customer database and contact history"
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </div>
        }
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                </div>
                <User className="w-8 h-8 text-blue-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">VIP Customers</p>
                  <p className="text-2xl font-bold text-purple-600">89</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Campaigns</p>
                  <p className="text-2xl font-bold text-green-600">342</p>
                </div>
                <MessageSquare className="w-8 h-8 text-green-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Response Rate</p>
                  <p className="text-2xl font-bold text-orange-600">68.4%</p>
                </div>
                <Mail className="w-8 h-8 text-orange-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by name, email, or phone..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Segments</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Customer List */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {customers.map((customer) => (
                <Card key={customer.id} className="border hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      {/* Customer Info */}
                      <div className="lg:col-span-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground truncate">{customer.name}</h4>
                              <Badge className={getSegmentColor(customer.segment)}>{customer.segment}</Badge>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">{customer.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Phone className="w-3 h-3" />
                                <span>{customer.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Purchase Info */}
                      <div className="lg:col-span-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Total Purchases</span>
                            <span className="text-sm font-semibold">{customer.totalPurchases}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Total Spent</span>
                            <span className="text-sm font-semibold text-green-600">{customer.totalSpent}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 border-t">
                            <ShoppingBag className="w-3 h-3" />
                            <span className="truncate">{customer.lastProduct}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{customer.lastPurchase}</span>
                          </div>
                        </div>
                      </div>

                      {/* Engagement Status */}
                      <div className="lg:col-span-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Call Status</span>
                            <Badge className={getCallStatusColor(customer.callStatus)} variant="outline">
                              {customer.callStatus}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Email Status</span>
                            <Badge className={getEmailStatusColor(customer.emailStatus)} variant="outline">
                              {customer.emailStatus}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t">
                            <span className="text-xs text-muted-foreground">Feedbacks</span>
                            <span className="text-sm font-semibold">{customer.feedbackCount}</span>
                          </div>
                          {customer.sentiment > 0 && (
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">Sentiment</span>
                              <span
                                className={`text-sm font-semibold ${
                                  customer.sentiment > 0.7
                                    ? "text-green-600"
                                    : customer.sentiment > 0.5
                                      ? "text-yellow-600"
                                      : "text-orange-600"
                                }`}
                              >
                                {(customer.sentiment * 100).toFixed(0)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="lg:col-span-2 flex flex-col gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Phone className="w-3 h-3 mr-2" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Mail className="w-3 h-3 mr-2" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
