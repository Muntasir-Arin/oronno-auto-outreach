import { PageHeader } from "@/components/page-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Shield, Bell, Database, Key, Users, Zap } from "lucide-react"

export default function SettingsPage() {
  return (
    <SidebarInset>
      <PageHeader title="Settings" description="Configure system preferences and integrations" />
      <div className="flex-1 space-y-6 p-6">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Account Settings
            </CardTitle>
            <CardDescription>Manage your account and organization details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" defaultValue="Acme Corp" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" defaultValue="admin@acme.com" type="email" />
              </div>
            </div>
            <Button className="w-full md:w-auto">Save Changes</Button>
          </CardContent>
        </Card>

        <Separator />

        {/* Integration Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Integrations
            </CardTitle>
            <CardDescription>Connect external services and platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Salesforce CRM", status: "Connected", icon: "SF" },
              { name: "HubSpot", status: "Not Connected", icon: "HS" },
              { name: "Twilio", status: "Connected", icon: "TW" },
              { name: "Slack", status: "Connected", icon: "SK" },
            ].map((integration) => (
              <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-700">
                    {integration.icon}
                  </div>
                  <div>
                    <p className="font-medium">{integration.name}</p>
                    <p
                      className={`text-sm ${integration.status === "Connected" ? "text-green-600" : "text-muted-foreground"}`}
                    >
                      {integration.status}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {integration.status === "Connected" ? "Disconnect" : "Connect"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Separator />

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription>Manage security and authentication settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Enhance account security</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">IP Whitelisting</p>
                <p className="text-sm text-muted-foreground">Restrict access to allowed IPs</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Select defaultValue="30">
                <SelectTrigger id="session-timeout">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* API & Keys */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Keys
            </CardTitle>
            <CardDescription>Manage API credentials for programmatic access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Active Keys</Label>
              <div className="space-y-2">
                {[
                  { name: "Production Key", created: "Jan 15, 2025", lastUsed: "Today" },
                  { name: "Development Key", created: "Jan 10, 2025", lastUsed: "3 days ago" },
                ].map((key) => (
                  <div key={key.name} className="flex items-center justify-between p-3 border rounded bg-muted/50">
                    <div>
                      <p className="text-sm font-medium">{key.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Created: {key.created} • Last used: {key.lastUsed}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      Revoke
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full md:w-auto">Generate New Key</Button>
          </CardContent>
        </Card>

        <Separator />

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose how you receive alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive alerts via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Slack Integration</p>
                <p className="text-sm text-muted-foreground">Send alerts to Slack channel</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Alerts</p>
                <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Data & Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Data & Privacy
            </CardTitle>
            <CardDescription>Manage data retention and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="retention">Data Retention (days)</Label>
              <Select defaultValue="365">
                <SelectTrigger id="retention">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="1825">5 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">GDPR Compliance Mode</p>
                <p className="text-sm text-muted-foreground">Enhance privacy controls</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
