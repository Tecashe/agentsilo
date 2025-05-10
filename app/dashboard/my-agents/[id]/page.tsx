// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { ArrowLeft, Bot, Clock, Activity, Zap, History, Play } from "lucide-react"
// import { getUserAgentById } from "@/lib/actions/agents"
// import { notFound } from "next/navigation"
// import { ToggleAgentStatus } from "@/components/toggle-agent-status"

// export default async function AgentDetailPage({ params }: { params: { id: string } }) {
//   const userAgent = await getUserAgentById(params.id)

//   if (!userAgent) {
//     notFound()
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }

//   return (
//     <div className="space-y-8">
//       <div>
//         <Link href="/dashboard/my-agents" className="text-primary hover:underline mb-4 inline-block">
//           <ArrowLeft className="h-4 w-4 inline mr-1" /> Back to My Agents
//         </Link>
//         <div className="flex flex-col md:flex-row justify-between items-start">
//           <div>
//             <h1 className="text-3xl font-bold">{userAgent.name}</h1>
//             <p className="text-muted-foreground">{userAgent.description}</p>
//           </div>
//           <div className="flex items-center mt-4 md:mt-0 space-x-2">
//             <Button asChild variant="outline">
//               <Link href={`/dashboard/my-agents/${userAgent.id}/test`}>
//                 <Play className="mr-2 h-4 w-4" /> Test Agent
//               </Link>
//             </Button>
//             <ToggleAgentStatus agent={userAgent} />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center">
//               <Badge variant={userAgent.status === "active" ? "default" : "secondary"} className="mr-2">
//                 {userAgent.status === "active" ? "Active" : "Paused"}
//               </Badge>
//               {userAgent.status === "active" ? "Running" : "Not running"}
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Created</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center">
//               <Clock className="h-5 w-5 text-primary mr-2" />
//               <div>{formatDate(userAgent.created_at)}</div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Last Updated</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center">
//               <Activity className="h-5 w-5 text-primary mr-2" />
//               <div>{formatDate(userAgent.updated_at)}</div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Category</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center">
//               <Bot className="h-5 w-5 text-primary mr-2" />
//               <div>{userAgent.agent.category}</div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Tabs defaultValue="overview">
//         <TabsList className="grid grid-cols-3 mb-8">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="settings">Settings</TabsTrigger>
//           <TabsTrigger value="activity">Activity</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Agent Details</CardTitle>
//               <CardDescription>Information about this agent</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="font-medium mb-2">Description</h3>
//                   <p className="text-muted-foreground">{userAgent.agent.description}</p>
//                 </div>
//                 <div>
//                   <h3 className="font-medium mb-2">Features</h3>
//                   <ul className="list-disc pl-5 space-y-1">
//                     {userAgent.agent.features.map((feature, index) => (
//                       <li key={index} className="text-muted-foreground">
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Connected Integrations</CardTitle>
//               <CardDescription>Services this agent is connected to</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {userAgent.agent.integrations.map((integration, index) => (
//                   <div key={index} className="flex items-center p-3 border rounded-lg dark:border-gray-800">
//                     <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
//                       <Zap className="h-4 w-4 text-primary" />
//                     </div>
//                     <span>{integration}</span>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="settings" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Agent Settings</CardTitle>
//               <CardDescription>Configure how this agent operates</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground">Settings would be displayed here based on the agent type.</p>
//               <div className="mt-4">
//                 <Button asChild>
//                   <Link href={`/dashboard/my-agents/${userAgent.id}/settings`}>Edit Settings</Link>
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="activity" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Activity</CardTitle>
//               <CardDescription>Latest actions performed by this agent</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {[1, 2, 3].map((i) => (
//                   <div key={i} className="flex items-start space-x-4 p-4 border rounded-lg dark:border-gray-800">
//                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                       <History className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <p className="font-medium">
//                         {i === 1 ? "Agent was deployed" : i === 2 ? "Settings were updated" : "Agent was activated"}
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         {i === 1
//                           ? formatDate(userAgent.created_at)
//                           : i === 2
//                             ? formatDate(userAgent.updated_at)
//                             : "A few minutes ago"}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           <div className="text-center">
//             <Button variant="outline" asChild>
//               <Link href="/dashboard/activity">View Full Activity Log</Link>
//             </Button>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bot, Clock, Activity, Zap, History, Play } from "lucide-react"
import { getUserAgentById } from "@/lib/actions/agents"
import { notFound } from "next/navigation"
import { ToggleAgentStatus } from "@/components/toggle-agent-status"

// Define interface for Agent
interface Agent {
  id: string
  category: string
  description: string
  features: string[]
  integrations: string[]
}

// Define interface for UserAgent
interface UserAgent {
  id: string
  name: string
  description: string
  status: string
  created_at: string
  updated_at: string
  agent: Agent
}

export default async function AgentDetailPage({ params }: { params: { id: string } }) {
  const userAgent = await getUserAgentById(params.id) as UserAgent

  if (!userAgent) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <Link href="/dashboard/my-agents" className="text-primary hover:underline mb-4 inline-block">
          <ArrowLeft className="h-4 w-4 inline mr-1" /> Back to My Agents
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{userAgent.name}</h1>
            <p className="text-muted-foreground">{userAgent.description}</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <Button asChild variant="outline">
              <Link href={`/dashboard/my-agents/${userAgent.id}/test`}>
                <Play className="mr-2 h-4 w-4" /> Test Agent
              </Link>
            </Button>
            <ToggleAgentStatus agent={userAgent} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Badge variant={userAgent.status === "active" ? "default" : "secondary"} className="mr-2">
                {userAgent.status === "active" ? "Active" : "Paused"}
              </Badge>
              {userAgent.status === "active" ? "Running" : "Not running"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Created</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-primary mr-2" />
              <div>{formatDate(userAgent.created_at)}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-primary mr-2" />
              <div>{formatDate(userAgent.updated_at)}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Bot className="h-5 w-5 text-primary mr-2" />
              <div>{userAgent.agent.category}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Details</CardTitle>
              <CardDescription>Information about this agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{userAgent.agent.description}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Features</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {userAgent.agent.features.map((feature: string, index: number) => (
                      <li key={index} className="text-muted-foreground">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected Integrations</CardTitle>
              <CardDescription>Services this agent is connected to</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {userAgent.agent.integrations.map((integration: string, index: number) => (
                  <div key={index} className="flex items-center p-3 border rounded-lg dark:border-gray-800">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <span>{integration}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Settings</CardTitle>
              <CardDescription>Configure how this agent operates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Settings would be displayed here based on the agent type.</p>
              <div className="mt-4">
                <Button asChild>
                  <Link href={`/dashboard/my-agents/${userAgent.id}/settings`}>Edit Settings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions performed by this agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i: number) => (
                  <div key={i} className="flex items-start space-x-4 p-4 border rounded-lg dark:border-gray-800">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <History className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {i === 1 ? "Agent was deployed" : i === 2 ? "Settings were updated" : "Agent was activated"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {i === 1
                          ? formatDate(userAgent.created_at)
                          : i === 2
                            ? formatDate(userAgent.updated_at)
                            : "A few minutes ago"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/dashboard/activity">View Full Activity Log</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}