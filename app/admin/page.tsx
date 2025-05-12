// import Link from "next/link"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Bot, Users, BarChart3, ArrowRight, Zap, CheckCircle2, XCircle, AlertCircle, Server } from "lucide-react"
// import { Skeleton } from "@/components/ui/skeleton"
// import { getAdminDashboardStats } from "@/lib/actions/admin"
// import { getN8nStatus } from "@/lib/actions/n8n"

// export default async function AdminDashboardPage() {
//   // Get admin dashboard stats
//   const stats = await getAdminDashboardStats()

//   // Get n8n connection status
//   const n8nStatus = await getN8nStatus()

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//         <p className="text-muted-foreground">Welcome to the AI Agents Marketplace admin area.</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
//             <Bot className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalWorkflows || 0}</div>
//             <p className="text-xs text-muted-foreground">{stats.activeWorkflows || 0} active</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalUsers || 0}</div>
//             <p className="text-xs text-muted-foreground">{stats.activeUsers || 0} active this month</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Deployments</CardTitle>
//             <Zap className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalDeployments || 0}</div>
//             <p className="text-xs text-muted-foreground">{stats.deploymentsThisMonth || 0} this month</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
//             <BarChart3 className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.conversionRate || 0}%</div>
//             <p className="text-xs text-muted-foreground">
//               {stats.conversionRateDelta > 0 ? "+" : ""}
//               {stats.conversionRateDelta || 0}% from last month
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>n8n Integration Status</CardTitle>
//             <CardDescription>Connection status with your n8n instance</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Server className="h-5 w-5 text-muted-foreground" />
//                   <span>API Connection</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {n8nStatus.connected ? (
//                     <>
//                       <CheckCircle2 className="h-5 w-5 text-green-500" />
//                       <span className="text-green-500">Connected</span>
//                     </>
//                   ) : (
//                     <>
//                       <XCircle className="h-5 w-5 text-red-500" />
//                       <span className="text-red-500">Disconnected</span>
//                     </>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Zap className="h-5 w-5 text-muted-foreground" />
//                   <span>Workflow Execution</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {n8nStatus.workflowExecution ? (
//                     <>
//                       <CheckCircle2 className="h-5 w-5 text-green-500" />
//                       <span className="text-green-500">Enabled</span>
//                     </>
//                   ) : (
//                     <>
//                       <AlertCircle className="h-5 w-5 text-amber-500" />
//                       <span className="text-amber-500">Not Tested</span>
//                     </>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Bot className="h-5 w-5 text-muted-foreground" />
//                   <span>Active Workflows</span>
//                 </div>
//                 <div>
//                   <span className="font-medium">{n8nStatus.activeWorkflows || 0}</span>
//                 </div>
//               </div>

//               <Link href="/admin/n8n" className="flex items-center text-sm text-primary hover:underline mt-2">
//                 Configure n8n Integration
//                 <ArrowRight className="h-4 w-4 ml-1" />
//               </Link>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Activity</CardTitle>
//             <CardDescription>Latest admin actions and system events</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {stats.recentActivity ? (
//                 stats.recentActivity.map((activity, index) => (
//                   <div key={index} className="flex items-start gap-2 pb-3 border-b last:border-0 last:pb-0">
//                     <div className="rounded-full p-1 bg-muted">
//                       {activity.type === "workflow" ? (
//                         <Bot className="h-4 w-4" />
//                       ) : activity.type === "user" ? (
//                         <Users className="h-4 w-4" />
//                       ) : (
//                         <Zap className="h-4 w-4" />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm">{activity.description}</p>
//                       <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   {[...Array(4)].map((_, i) => (
//                     <div key={i} className="flex items-start gap-2 pb-3 border-b last:border-0 last:pb-0">
//                       <Skeleton className="h-6 w-6 rounded-full" />
//                       <div className="space-y-2">
//                         <Skeleton className="h-4 w-48" />
//                         <Skeleton className="h-3 w-32" />
//                       </div>
//                     </div>
//                   ))}
//                 </>
//               )}

//               <Link href="/admin/analytics" className="flex items-center text-sm text-primary hover:underline mt-2">
//                 View All Activity
//                 <ArrowRight className="h-4 w-4 ml-1" />
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <Link className="block p-2 rounded-md hover:bg-muted text-sm" href="/admin/workflows/new">
//               Create new workflow
//             </Link>
//             <Link className="block p-2 rounded-md hover:bg-muted text-sm" href="/admin/n8n/test">
//               Test n8n connection
//             </Link>
//             <Link className="block p-2 rounded-md hover:bg-muted text-sm" href="/admin/users">
//               Manage users
//             </Link>
//             <Link className="block p-2 rounded-md hover:bg-muted text-sm" href="/admin/database">
//               Database management
//             </Link>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Popular Categories</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               {stats.popularCategories ? (
//                 stats.popularCategories.map((category, index) => (
//                   <div key={index} className="flex justify-between items-center">
//                     <span className="text-sm">{category.name}</span>
//                     <span className="text-sm text-muted-foreground">{category.count} workflows</span>
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   {[...Array(5)].map((_, i) => (
//                     <div key={i} className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-24" />
//                       <Skeleton className="h-4 w-12" />
//                     </div>
//                   ))}
//                 </>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Popular Integrations</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               {stats.popularIntegrations ? (
//                 stats.popularIntegrations.map((integration, index) => (
//                   <div key={index} className="flex justify-between items-center">
//                     <span className="text-sm">{integration.name}</span>
//                     <span className="text-sm text-muted-foreground">{integration.count} workflows</span>
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   {[...Array(5)].map((_, i) => (
//                     <div key={i} className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-24" />
//                       <Skeleton className="h-4 w-12" />
//                     </div>
//                   ))}
//                 </>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// import Link from "next/link"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Bot, Users, BarChart3, ArrowRight, Zap, CheckCircle2, XCircle, AlertCircle, Server } from "lucide-react"
// import { Skeleton } from "@/components/ui/skeleton"
// import { getAdminDashboardStats } from "@/lib/actions/admin"
// import { getN8nStatus } from "@/lib/actions/n8n"

// // Define types for the category and integration objects
// interface Category {
//   name: string
//   count: number
// }

// interface Integration {
//   name: string
//   count: number
// }

// interface Activity {
//   id: string
//   type: string
//   description: string
//   timestamp: string
//   category?: string
// }

// export default async function AdminDashboardPage() {
//   // Get admin dashboard stats
//   const stats = await getAdminDashboardStats()

//   // Get n8n connection status
//   const n8nStatus = await getN8nStatus()

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//         <p className="text-muted-foreground">Welcome to the AI Agents Marketplace admin area.</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
//             <Bot className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalWorkflows || 0}</div>
//             <p className="text-xs text-muted-foreground">{stats.activeWorkflows || 0} active</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalUsers || 0}</div>
//             <p className="text-xs text-muted-foreground">{stats.activeUsers || 0} active this month</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Deployments</CardTitle>
//             <Zap className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalDeployments || 0}</div>
//             <p className="text-xs text-muted-foreground">{stats.deploymentsThisMonth || 0} this month</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
//             <BarChart3 className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.conversionRate || 0}%</div>
//             <p className="text-xs text-muted-foreground">
//               {stats.conversionRateDelta > 0 ? "+" : ""}
//               {stats.conversionRateDelta || 0}% from last month
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>n8n Integration Status</CardTitle>
//             <CardDescription>Connection status with your n8n instance</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Server className="h-5 w-5 text-muted-foreground" />
//                   <span>API Connection</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {n8nStatus.connected ? (
//                     <>
//                       <CheckCircle2 className="h-5 w-5 text-green-500" />
//                       <span className="text-green-500">Connected</span>
//                     </>
//                   ) : (
//                     <>
//                       <XCircle className="h-5 w-5 text-red-500" />
//                       <span className="text-red-500">Disconnected</span>
//                     </>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Zap className="h-5 w-5 text-muted-foreground" />
//                   <span>Workflow Execution</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {n8nStatus.workflowExecution ? (
//                     <>
//                       <CheckCircle2 className="h-5 w-5 text-green-500" />
//                       <span className="text-green-500">Enabled</span>
//                     </>
//                   ) : (
//                     <>
//                       <AlertCircle className="h-5 w-5 text-amber-500" />
//                       <span className="text-amber-500">Not Tested</span>
//                     </>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Bot className="h-5 w-5 text-muted-foreground" />
//                   <span>Active Workflows</span>
//                 </div>
//                 <div>
//                   <span className="font-medium">{n8nStatus.activeWorkflows || 0}</span>
//                 </div>
//               </div>

//               <Link href="/admin/n8n" className="flex items-center text-sm text-primary hover:underline mt-2">
//                 Configure n8n Integration
//                 <ArrowRight className="h-4 w-4 ml-1" />
//               </Link>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Activity</CardTitle>
//             <CardDescription>Latest admin actions and system events</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {stats.recentActivity ? (
//                 stats.recentActivity.map((activity: Activity, index: number) => (
//                   <div key={index} className="flex items-start gap-2 pb-3 border-b last:border-0 last:pb-0">
//                     <div className="rounded-full p-1 bg-muted">
//                       {activity.type === "workflow" ? (
//                         <Bot className="h-4 w-4" />
//                       ) : activity.type === "user" ? (
//                         <Users className="h-4 w-4" />
//                       ) : (
//                         <Zap className="h-4 w-4" />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm">{activity.description}</p>
//                       <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   {[...Array(4)].map((_, i) => (
//                     <div key={i} className="flex items-start gap-2 pb-3 border-b last:border-0 last:pb-0">
//                       <Skeleton className="h-6 w-6 rounded-full" />
//                       <div className="space-y-2">
//                         <Skeleton className="h-4 w-48" />
//                         <Skeleton className="h-3 w-32" />
//                       </div>
//                     </div>
//                   ))}
//                 </>
//               )}

//               <Link href="/admin/analytics" className="flex items-center text-sm text-primary hover:underline mt-2">
//                 View All Activity
//                 <ArrowRight className="h-4 w-4 ml-1" />
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <Link className="block p-2 rounded-md hover:bg-muted text-sm" href="/admin/workflows/new">
//               Create new workflow
//             </Link>
//             <Link className="block p-2 rounded-md hover:bg-muted text-sm" href="/admin/n8n/test">
//               Test n8n connection
//             </Link>
//             <Link className="block p-2 rounded-md hover:bg-muted text-sm" href="/admin/users">
//               Manage users
//             </Link>
//             <Link className="block p-2 rounded-md hover:bg-muted text-sm" href="/admin/database">
//               Database management
//             </Link>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Popular Categories</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               {stats.popularCategories ? (
//                 stats.popularCategories.map((category: Category, index: number) => (
//                   <div key={index} className="flex justify-between items-center">
//                     <span className="text-sm">{category.name}</span>
//                     <span className="text-sm text-muted-foreground">{category.count} workflows</span>
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   {[...Array(5)].map((_, i) => (
//                     <div key={i} className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-24" />
//                       <Skeleton className="h-4 w-12" />
//                     </div>
//                   ))}
//                 </>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Popular Integrations</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               {stats.popularIntegrations ? (
//                 stats.popularIntegrations.map((integration: Integration, index: number) => (
//                   <div key={index} className="flex justify-between items-center">
//                     <span className="text-sm">{integration.name}</span>
//                     <span className="text-sm text-muted-foreground">{integration.count} workflows</span>
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   {[...Array(5)].map((_, i) => (
//                     <div key={i} className="flex justify-between items-center">
//                       <Skeleton className="h-4 w-24" />
//                       <Skeleton className="h-4 w-12" />
//                     </div>
//                   ))}
//                 </>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Users, Bot, Zap, BarChart2, ArrowUpRight } from "lucide-react"

interface AdminStats {
  totalUsers: number
  totalWorkflows: number
  activeWorkflows: number
  totalExecutions: number
  popularCategories: Array<{ category: string; count: number }>
  recentActivity: Array<{ id: string; action: string; timestamp: string; user: string }>
  n8nStatus: { connected: boolean; workflowCount: number; message: string }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [adminCheckResult, setAdminCheckResult] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const response = await fetch("/api/admin/check-access")
        const result = await response.json()
        setAdminCheckResult(result)

        if (!result.isAdmin) {
          console.error("Admin access denied:", result)
          setError("You don't have admin privileges. Please use the admin login page.")
          return false
        }

        return true
      } catch (err) {
        console.error("Error checking admin access:", err)
        setError("Failed to verify admin access. Please try again.")
        return false
      }
    }

    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats")
        if (!response.ok) {
          throw new Error(`Failed to fetch stats: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        setStats(data)
      } catch (err) {
        console.error("Error fetching admin stats:", err)
        setError(`Failed to load dashboard data: ${err instanceof Error ? err.message : String(err)}`)
      } finally {
        setLoading(false)
      }
    }

    const init = async () => {
      const hasAccess = await checkAdminAccess()
      if (hasAccess) {
        fetchStats()
      } else {
        setLoading(false)
      }
    }

    init()
  }, [router])

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <div className="flex justify-center mt-6">
          <Button onClick={() => router.push("/admin-login")}>Go to Admin Login</Button>
        </div>

        {adminCheckResult && (
          <div className="mt-8 p-4 bg-muted rounded-md">
            <h3 className="text-sm font-semibold mb-2">Debug Information</h3>
            <pre className="text-xs overflow-auto p-2 bg-background rounded">
              {JSON.stringify(adminCheckResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-6 mt-6 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-40" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Bot className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{stats?.totalWorkflows || 0}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Zap className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{stats?.activeWorkflows || 0}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart2 className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{stats?.totalExecutions || 0}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="n8n">n8n Status</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
                <CardDescription>Most used workflow categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.popularCategories?.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="font-medium">{category.category}</div>
                      <div className="text-sm text-muted-foreground">{category.count} workflows</div>
                    </div>
                  )) || <div className="text-muted-foreground">No data available</div>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>n8n Integration</CardTitle>
                <CardDescription>Connection status and workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Connection Status</div>
                    <div className={`text-sm ${stats?.n8nStatus?.connected ? "text-green-500" : "text-red-500"}`}>
                      {stats?.n8nStatus?.connected ? "Connected" : "Disconnected"}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-medium">n8n Workflows</div>
                    <div className="text-sm text-muted-foreground">{stats?.n8nStatus?.workflowCount || 0}</div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => router.push("/admin/n8n/config")}
                  >
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Manage n8n Integration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="n8n">
          <Card>
            <CardHeader>
              <CardTitle>n8n Integration Status</CardTitle>
              <CardDescription>Details about your n8n connection</CardDescription>
            </CardHeader>
            <CardContent>
              {stats?.n8nStatus?.connected ? (
                <div className="space-y-4">
                  <Alert>
                    <AlertTitle>Connected to n8n</AlertTitle>
                    <AlertDescription>{stats.n8nStatus.message}</AlertDescription>
                  </Alert>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="font-medium">Workflow Statistics</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Workflows</span>
                        <span>{stats.n8nStatus.workflowCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Active Workflows</span>
                        <span>{stats.activeWorkflows}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Actions</h3>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => router.push("/admin/workflows/test")}
                        >
                          Test Workflows
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => router.push("/admin/n8n/config")}
                        >
                          Configure n8n
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Not Connected</AlertTitle>
                    <AlertDescription>
                      {stats?.n8nStatus?.message || "n8n integration is not configured."}
                    </AlertDescription>
                  </Alert>

                  <Button onClick={() => router.push("/admin/n8n/config")}>Configure n8n Integration</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions in the system</CardDescription>
            </CardHeader>
            <CardContent>
              {stats?.recentActivity && stats.recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-sm text-muted-foreground">By {activity.user}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground">No recent activity</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
