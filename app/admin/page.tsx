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

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Users, BarChart3, ArrowRight, Zap, CheckCircle2, XCircle, AlertCircle, Server } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { getAdminDashboardStats } from "@/lib/actions/admin"
import { getN8nStatus } from "@/lib/actions/n8n"

// Define types for the category and integration objects
interface Category {
  name: string
  count: number
}

interface Integration {
  name: string
  count: number
}

interface Activity {
  id: string
  type: string
  description: string
  timestamp: string
  category?: string
}

export default async function AdminDashboardPage() {
  // Get admin dashboard stats
  const stats = await getAdminDashboardStats()

  // Get n8n connection status
  const n8nStatus = await getN8nStatus()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the AI Agents Marketplace admin area.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWorkflows || 0}</div>
            <p className="text-xs text-muted-foreground">{stats.activeWorkflows || 0} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">{stats.activeUsers || 0} active this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Deployments</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDeployments || 0}</div>
            <p className="text-xs text-muted-foreground">{stats.deploymentsThisMonth || 0} this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate || 0}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.conversionRateDelta > 0 ? "+" : ""}
              {stats.conversionRateDelta || 0}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>n8n Integration Status</CardTitle>
            <CardDescription>Connection status with your n8n instance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-muted-foreground" />
                  <span>API Connection</span>
                </div>
                <div className="flex items-center gap-2">
                  {n8nStatus.connected ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-green-500">Connected</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span className="text-red-500">Disconnected</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-muted-foreground" />
                  <span>Workflow Execution</span>
                </div>
                <div className="flex items-center gap-2">
                  {n8nStatus.workflowExecution ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-green-500">Enabled</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <span className="text-amber-500">Not Tested</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-muted-foreground" />
                  <span>Active Workflows</span>
                </div>
                <div>
                  <span className="font-medium">{n8nStatus.activeWorkflows || 0}</span>
                </div>
              </div>

              <Link href="/admin/n8n" className="flex items-center text-sm text-primary hover:underline mt-2">
                Configure n8n Integration
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest admin actions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity ? (
                stats.recentActivity.map((activity: Activity, index: number) => (
                  <div key={index} className="flex items-start gap-2 pb-3 border-b last:border-0 last:pb-0">
                    <div className="rounded-full p-1 bg-muted">
                      {activity.type === "workflow" ? (
                        <Bot className="h-4 w-4" />
                      ) : activity.type === "user" ? (
                        <Users className="h-4 w-4" />
                      ) : (
                        <Zap className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-start gap-2 pb-3 border-b last:border-0 last:pb-0">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  ))}
                </>
              )}

              <Link href="/admin/analytics" className="flex items-center text-sm text-primary hover:underline mt-2">
                View All Activity
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link className="block p-2 rounded-md hover:bg-muted text-sm" href="/admin/workflows/new">
              Create new workflow
            </Link>
            <Link className="block p-2 rounded-md hover:bg-muted text-sm" href="/admin/n8n/test">
              Test n8n connection
            </Link>
            <Link className="block p-2 rounded-md hover:bg-muted text-sm" href="/admin/users">
              Manage users
            </Link>
            <Link className="block p-2 rounded-md hover:bg-muted text-sm" href="/admin/database">
              Database management
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.popularCategories ? (
                stats.popularCategories.map((category: Category, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{category.name}</span>
                    <span className="text-sm text-muted-foreground">{category.count} workflows</span>
                  </div>
                ))
              ) : (
                <>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.popularIntegrations ? (
                stats.popularIntegrations.map((integration: Integration, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{integration.name}</span>
                    <span className="text-sm text-muted-foreground">{integration.count} workflows</span>
                  </div>
                ))
              ) : (
                <>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
