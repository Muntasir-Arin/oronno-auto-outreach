"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  MessageSquare,
  Zap,
  FileText,
  Shield,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Phone,
  Mail,
  Users,
  PieChart,
  Headphones,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

export function AppSidebar() {
  const router = useRouter()
  const [expandedItems, setExpandedItems] = useState<string[]>(["feedback", "console", "calls"])

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border">
        <Link href="/" className="flex items-center gap-3 px-4 py-2">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/oronno-icon.svg"
              alt="Oronno Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">Oronno</span>
            <span className="text-xs text-muted-foreground">AI Calling</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={false} tooltip="View dashboard overview">
                  <Link href="/dashboard">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Agent call interface">
                  <Link href="/agent">
                    <Headphones className="w-4 h-4" />
                    <span>Agent Interface</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Manage customer database">
                  <Link href="/customers">
                    <Users className="w-4 h-4" />
                    <span>Customers</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <button
                  onClick={() => toggleExpanded("calls")}
                  className="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-sidebar-accent text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Calls</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedItems.includes("calls") ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedItems.includes("calls") && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/calls/live">Live Monitor</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/calls/history">History</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Manage email campaigns">
                  <Link href="/campaigns">
                    <Mail className="w-4 h-4" />
                    <span>Campaigns</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <button
                  onClick={() => toggleExpanded("feedback")}
                  className="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-sidebar-accent text-sm"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Feedback</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedItems.includes("feedback") ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedItems.includes("feedback") && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/feedback/inbox">Inbox</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/feedback/analytics">Analytics</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Manage outreach orchestration">
                  <Link href="/orchestrator">
                    <Zap className="w-4 h-4" />
                    <span>Orchestrator</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Manage scripts & templates">
                  <Link href="/scripts">
                    <FileText className="w-4 h-4" />
                    <span>Scripts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="View reports and analytics">
                  <Link href="/reports">
                    <PieChart className="w-4 h-4" />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        {/* Administration */}
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <button
                  onClick={() => toggleExpanded("console")}
                  className="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-sidebar-accent text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Console</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedItems.includes("console") ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedItems.includes("console") && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/console/consent">Consent Rules</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/console/dnc">DNC Management</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/console/audit">Audit Log</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="View system alerts">
                  <Link href="/alerts">
                    <Bell className="w-4 h-4" />
                    <span>Alerts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="System configuration">
                  <Link href="/settings">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between w-full px-2 py-2">
              <div className="flex items-center gap-3 flex-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-foreground truncate">Admin</span>
                  <span className="text-xs text-muted-foreground truncate">admin@oronno.io</span>
                </div>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={() => router.push("/login")}
                className="w-full justify-start text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
