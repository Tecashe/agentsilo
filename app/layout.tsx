// import type React from "react"
// import { Navbar } from "@/components/navbar"
// import { ThemeProvider } from "@/components/theme-provider"
// import { AuthProvider } from "@/components/auth-provider"
// import { Toaster } from "@/components/ui/toaster"
// import "./globals.css"

// export const metadata = {
//   title: "AI Agents Marketplace",
//   description: "Discover, deploy, and customize AI agents for your business",
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <ThemeProvider attribute="class" defaultTheme="light">
//           <AuthProvider>
//             <Navbar />
//             <main>{children}</main>
//             <Toaster />
//           </AuthProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }


import { Navbar } from "@/components/navbar"
import { AuthProvider } from "@/components/auth-provider"
import "./globals.css"

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { LanguageSwitcher } from "@/components/language/language-switcher"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Agents Marketplace",
  description: "Discover and deploy AI agents to automate your workflows",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <AuthProvider>
          <main>{children}</main>
          <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
