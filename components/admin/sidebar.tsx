// "use client"

// import type React from "react"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { createClientSupabaseClient } from "@/lib/supabase/client"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Home, Users, Database, BarChart2, Zap, Globe, MessageSquare, LogOut, Bot } from "lucide-react"

// interface AdminSidebarProps {
//   children: React.ReactNode
// }

// export function AdminSidebarLayout({ children }: AdminSidebarProps) {
//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen">
//         <AdminSidebar />
//         <main className="flex-1 p-6">
//           <div className="container mx-auto">{children}</div>
//         </main>
//       </div>
//     </SidebarProvider>
//   )
// }

// function AdminSidebar() {
//   const pathname = usePathname()
//   const [user, setUser] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const supabase = createClientSupabaseClient()

//   useEffect(() => {
//     async function getUser() {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession()

//       if (session?.user) {
//         const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

//         setUser({
//           ...session.user,
//           profile,
//         })
//       }

//       setLoading(false)
//     }

//     getUser()
//   }, [supabase])

//   const isActive = (path: string) => {
//     return pathname === path || pathname.startsWith(`${path}/`)
//   }

//   const handleSignOut = async () => {
//     await supabase.auth.signOut()
//     window.location.href = "/login"
//   }

//   if (loading) {
//     return (
//       <Sidebar>
//         <SidebarHeader className="flex items-center px-4 py-2">
//           <div className="flex items-center space-x-2">
//             <Bot className="h-6 w-6" />
//             <span className="text-lg font-bold">AI Agents</span>
//           </div>
//         </SidebarHeader>
//         <SidebarContent>
//           <div className="p-4 space-y-4">
//             <div className="h-8 bg-muted animate-pulse rounded-md"></div>
//             <div className="h-8 bg-muted animate-pulse rounded-md"></div>
//             <div className="h-8 bg-muted animate-pulse rounded-md"></div>
//           </div>
//         </SidebarContent>
//       </Sidebar>
//     )
//   }

//   return (
//     <Sidebar>
//       <SidebarHeader className="flex items-center px-4 py-2">
//         <div className="flex items-center space-x-2">
//           <Bot className="h-6 w-6" />
//           <span className="text-lg font-bold">AI Agents</span>
//         </div>
//         <SidebarTrigger className="ml-auto" />
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
//               <Link href="/dashboard">
//                 <Home className="h-4 w-4 mr-2" />
//                 <span>Dashboard</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>

//           <SidebarMenuItem>
//             <SidebarMenuButton asChild isActive={isActive("/marketplace")}>
//               <Link href="/marketplace">
//                 <Globe className="h-4 w-4 mr-2" />
//                 <span>Marketplace</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>

//           <SidebarMenuItem>
//             <SidebarMenuButton asChild isActive={isActive("/dashboard/my-workflows")}>
//               <Link href="/dashboard/my-workflows">
//                 <Zap className="h-4 w-4 mr-2" />
//                 <span>My Workflows</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>

//         {user?.profile?.role === "admin" && (
//           <>
//             <div className="px-3 pt-5 pb-2">
//               <h3 className="text-xs font-semibold text-muted-foreground">Admin</h3>
//             </div>

//             <SidebarMenu>
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild isActive={isActive("/admin/workflows")}>
//                   <Link href="/admin/workflows">
//                     <Bot className="h-4 w-4 mr-2" />
//                     <span>Workflows</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>

//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild isActive={isActive("/admin/users")}>
//                   <Link href="/admin/users">
//                     <Users className="h-4 w-4 mr-2" />
//                     <span>Users</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>

//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild isActive={isActive("/admin/analytics")}>
//                   <Link href="/admin/analytics">
//                     <BarChart2 className="h-4 w-4 mr-2" />
//                     <span>Analytics</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>

//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild isActive={isActive("/admin/integrations")}>
//                   <Link href="/admin/integrations">
//                     <Database className="h-4 w-4 mr-2" />
//                     <span>Integrations</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>

//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild isActive={isActive("/admin/translations")}>
//                   <Link href="/admin/translations">
//                     <MessageSquare className="h-4 w-4 mr-2" />
//                     <span>Translations</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </>
//         )}
//       </SidebarContent>

//       <SidebarFooter className="p-4">
//         <div className="flex items-center space-x-3">
//           <Avatar>
//             <AvatarImage src={user?.profile?.avatar_url || ""} />
//             <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
//           </Avatar>
//           <div className="flex flex-col">
//             <span className="text-sm font-medium">{user?.profile?.full_name || user?.email}</span>
//             <span className="text-xs text-muted-foreground capitalize">{user?.profile?.role || "User"}</span>
//           </div>
//           <Button variant="ghost" size="icon" onClick={handleSignOut} className="ml-auto">
//             <LogOut className="h-4 w-4" />
//           </Button>
//         </div>
//       </SidebarFooter>
//     </Sidebar>
//   )
// }

// export default AdminSidebarLayout


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase/client"
import {
  Bot,
  Users,
  BarChart2,
  Database,
  Settings,
  List,
  Grid3X3,
  LogOut,
  Home,
  Server,
  Zap,
  FileCode,
  MessageSquare,
  Activity,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AdminSidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1">
        <main className="flex-1 p-6">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

function AdminSidebar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

        setUser({
          ...session.user,
          profile,
        })
      }

      setLoading(false)
    }

    getUser()
  }, [supabase])

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  if (loading) {
    return (
      <div className="w-64 h-screen bg-muted/20 border-r shrink-0">
        <div className="p-4 border-b">
          <div className="h-8 bg-muted animate-pulse rounded-md"></div>
        </div>
        <div className="p-4 space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-8 bg-muted animate-pulse rounded-md"></div>
          ))}
        </div>
      </div>
    )
  }

  const mainMenuItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Workflows", href: "/admin/workflows", icon: Bot },
    { name: "n8n Integration", href: "/admin/n8n", icon: Zap },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart2 },
  ]

  const workflowMenuItems = [
    { name: "All Workflows", href: "/admin/workflows", icon: List },
    { name: "Categories", href: "/admin/workflows/categories", icon: Grid3X3 },
    { name: "Integrations", href: "/admin/workflows/integrations", icon: Server },
    { name: "Test Workflows", href: "/admin/workflows/test", icon: Activity },
  ]

  const systemMenuItems = [
    { name: "Database", href: "/admin/database", icon: Database },
    { name: "n8n Config", href: "/admin/n8n/config", icon: FileCode },
    { name: "Translations", href: "/admin/translations", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="w-64 h-screen border-r shrink-0 flex flex-col">
      <div className="p-4 border-b flex items-center">
        <Bot className="h-6 w-6 mr-2 text-primary" />
        <h1 className="font-semibold text-lg">Admin Dashboard</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Main</h2>
            <nav className="space-y-1">
              {mainMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive(item.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mb-6">
            <h2 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              Workflow Management
            </h2>
            <nav className="space-y-1">
              {workflowMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive(item.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mb-6">
            <h2 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">System</h2>
            <nav className="space-y-1">
              {systemMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive(item.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.profile?.avatar_url || ""} />
            <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.profile?.full_name || user?.email}</span>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default AdminSidebarLayout
