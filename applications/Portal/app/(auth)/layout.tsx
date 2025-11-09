import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Auth pages (login) don't have sidebar
  return <>{children}</>
}
