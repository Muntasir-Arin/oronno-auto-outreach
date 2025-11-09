"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader } from "@/components/ui/loader"
import { Mail, Lock, Eye, EyeOff, Phone } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login delay
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <>
      {isLoading && <Loader fullScreen text="Signing you in..." />}
      <div className="min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 p-12 flex-col justify-between relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
          </div>

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <Image
                src="/oronno-logo-no-bg.svg"
                alt="Oronno Logo"
                width={240}
                height={70}
                className="h-14 w-auto brightness-0 invert"
              />
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="relative z-10 space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                AI-Powered Customer Engagement
              </h2>
              <p className="text-blue-100 text-lg">
                Intelligent voice conversations and personalized email outreach powered by Gemini Live API
              </p>
            </div>

            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Natural Voice Calls</h3>
                  <p className="text-blue-100 text-sm">AI agents conduct natural conversations with customers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Smart Email Outreach</h3>
                  <p className="text-blue-100 text-sm">Personalized email campaigns at scale</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10">
            <p className="text-blue-100 text-sm">
              © 2025 Oronno AI. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-background">
          <div className="w-full max-w-md">

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back</h2>
              <p className="text-muted-foreground">Sign in to access your dashboard</p>
            </div>

            {/* Login Card */}
            <Card className="border shadow-sm">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl">Sign in to your account</CardTitle>
                <CardDescription>Enter your credentials to continue</CardDescription>
              </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@oronno.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground cursor-pointer select-none"
                  >
                    Remember me
                  </label>
                </div>
                <Button variant="link" className="text-sm px-0" type="button">
                  Forgot password?
                </Button>
              </div>

              {/* Login Button */}
              <Button type="submit" className="w-full mb-6" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Demo Credentials Info */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-4">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                <div>
                  <p className="text-xs text-blue-900 font-semibold mb-2">Demo Credentials</p>
                  <div className="space-y-1">
                    <p className="text-xs text-blue-700">
                      <span className="font-medium">Email:</span> admin@oronno.io
                    </p>
                    <p className="text-xs text-blue-700">
                      <span className="font-medium">Password:</span> Any password
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mobile Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8 lg:hidden">
          © 2025 Oronno AI. All rights reserved.
        </p>
      </div>
    </div>
      </div>
    </>
  )
}
