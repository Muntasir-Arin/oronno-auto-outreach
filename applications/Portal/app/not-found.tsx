import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* 404 Number */}
            <div className="relative">
              <h1 className="text-9xl font-bold text-primary/10">404</h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-16 h-16 text-muted-foreground animate-pulse" />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Page Not Found</h2>
              <p className="text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button asChild variant="default" className="flex-1">
                <Link href="/dashboard">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="javascript:history.back()">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="w-full pt-4 border-t">
              <p className="text-xs text-muted-foreground mb-3">Quick Links</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <Link href="/feedback/inbox">Feedback Inbox</Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <Link href="/orchestrator">Orchestrator</Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <Link href="/settings">Settings</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
