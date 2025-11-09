import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Oronno - AI Cold Calling Platform",
  description: "AI-powered cold calling and feedback intelligence system",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                const originalError = console.error;
                console.error = (...args) => {
                  const msg = args[0]?.toString() || '';
                  // Filter out hydration warnings and analytics debug logs
                  if (
                    msg.includes('Extra attributes from the server') ||
                    msg.includes('cz-shortcut-listen') ||
                    msg.includes('Vercel Web Analytics') ||
                    msg.includes('Warning: Text content did not match') ||
                    msg.includes('There was an error while hydrating')
                  ) {
                    return;
                  }
                  originalError.apply(console, args);
                };

                const originalWarn = console.warn;
                console.warn = (...args) => {
                  const msg = args[0]?.toString() || '';
                  if (
                    msg.includes('Extra attributes from the server') ||
                    msg.includes('cz-shortcut-listen')
                  ) {
                    return;
                  }
                  originalWarn.apply(console, args);
                };

                const originalLog = console.log;
                console.log = (...args) => {
                  const msg = args[0]?.toString() || '';
                  if (msg.includes('Vercel Web Analytics')) {
                    return;
                  }
                  originalLog.apply(console, args);
                };
              }
            `,
          }}
        />
      </head>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
