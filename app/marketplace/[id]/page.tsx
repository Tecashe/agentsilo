// import { getAgentById } from "@/lib/actions/agents"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Zap, Clock, CheckCircle2 } from "lucide-react"
// import { notFound } from "next/navigation"

// export default async function AgentDetailPage({ params }: { params: { id: string } }) {
//   const agent = await getAgentById(params.id)

//   if (!agent) {
//     notFound()
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="flex flex-col md:flex-row justify-between items-start mb-8">
//         <div>
//           <Link href="/marketplace" className="text-purple-600 hover:underline mb-4 inline-block">
//             ← Back to Marketplace
//           </Link>
//           <h1 className="text-3xl font-bold">{agent.name}</h1>
//           <div className="flex items-center mt-2">
//             <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
//               {agent.category}
//             </Badge>
//             <span className="ml-4 text-sm text-gray-500 flex items-center">
//               <Clock className="h-4 w-4 mr-1" /> {agent.setupTime} setup
//             </span>
//           </div>
//         </div>
//         <Button asChild className="mt-4 md:mt-0">
//           <Link href={`/marketplace/${agent.id}/deploy`}>Deploy This Agent</Link>
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <Tabs defaultValue="overview">
//             <TabsList className="grid grid-cols-3 mb-8">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="integrations">Integrations</TabsTrigger>
//               <TabsTrigger value="code">Code</TabsTrigger>
//             </TabsList>
//             <TabsContent value="overview" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Description</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p>{agent.description}</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Features</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-2">
//                     {agent.features.map((feature, index) => (
//                       <li key={index} className="flex items-start">
//                         <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
//                         <span>{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="integrations" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Required Integrations</CardTitle>
//                   <CardDescription>This agent connects with the following services:</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                     {agent.integrations.map((integration, index) => (
//                       <div key={index} className="flex items-center p-3 border rounded-lg">
//                         <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
//                           <Zap className="h-4 w-4 text-purple-600" />
//                         </div>
//                         <span>{integration}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Tools Used</CardTitle>
//                   <CardDescription>This agent is built with the following tools:</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex flex-wrap gap-2">
//                     {agent.tools.map((tool, index) => (
//                       <Badge key={index} variant="secondary">
//                         {tool}
//                       </Badge>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="code" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Implementation Details</CardTitle>
//                   <CardDescription>Sample code showing how this agent is implemented:</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
//                     <pre className="text-sm">
//                       <code>{agent.code}</code>
//                     </pre>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>

//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Pricing</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold mb-2">{agent.pricing}</div>
//               <p className="text-gray-500 text-sm mb-4">Includes all features and integrations</p>
//               <Button asChild className="w-full">
//                 <Link href={`/marketplace/${agent.id}/deploy`}>Deploy Now</Link>
//               </Button>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Setup Process</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ol className="space-y-4">
//                 <li className="flex items-start">
//                   <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
//                     1
//                   </div>
//                   <div>
//                     <p className="font-medium">Deploy the agent</p>
//                     <p className="text-sm text-gray-500">Click the Deploy button to add this agent to your account</p>
//                   </div>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
//                     2
//                   </div>
//                   <div>
//                     <p className="font-medium">Connect your integrations</p>
//                     <p className="text-sm text-gray-500">Authorize access to the required services for this agent</p>
//                   </div>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
//                     3
//                   </div>
//                   <div>
//                     <p className="font-medium">Configure settings</p>
//                     <p className="text-sm text-gray-500">Customize the agent behavior to match your workflow</p>
//                   </div>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
//                     4
//                   </div>
//                   <div>
//                     <p className="font-medium">Start using your agent</p>
//                     <p className="text-sm text-gray-500">Your agent is now ready to automate your workflows</p>
//                   </div>
//                 </li>
//               </ol>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Need Help?</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <p className="text-sm text-gray-500">
//                 Our support team is available to help you set up and configure this agent.
//               </p>
//               <Button variant="outline" className="w-full">
//                 Contact Support
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

// import Link from "next/link"
// import { notFound } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { WorkflowRating } from "@/components/workflow-rating"
// import { getWorkflowById, getUserWorkflows } from "@/lib/actions/workflows"
// import { getUserDetails } from "@/lib/auth"
// import { Clock, Zap, Users, ArrowRight, Check } from "lucide-react"

// export default async function WorkflowDetailPage({ params }: { params: { id: string } }) {
//   const workflow = await getWorkflowById(params.id)

//   if (!workflow) {
//     notFound()
//   }

//   // Get user details to check if they've already deployed this workflow
//   const user = await getUserDetails()
//   let userWorkflows = []

//   if (user) {
//     userWorkflows = await getUserWorkflows()
//   }

//   const hasDeployed = userWorkflows.some((uw) => uw.workflow_id === workflow.id)

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-8">
//           <div>
//             <div className="flex items-center gap-2 mb-2">
//               <Link href="/marketplace" className="text-sm text-muted-foreground hover:underline">
//                 Marketplace
//               </Link>
//               <span className="text-sm text-muted-foreground">/</span>
//               <span className="text-sm">{workflow.name}</span>
//             </div>
//             <h1 className="text-3xl font-bold mb-4">{workflow.name}</h1>
//             <p className="text-lg text-muted-foreground mb-6">{workflow.description}</p>

//             <div className="flex flex-wrap gap-4 mb-8">
//               <div className="flex items-center">
//                 <Badge variant="outline" className="capitalize">
//                   {workflow.category}
//                 </Badge>
//               </div>
//               <div className="flex items-center">
//                 <Clock className="h-4 w-4 text-muted-foreground mr-2" />
//                 <span className="text-sm text-muted-foreground">{workflow.setup_time} setup</span>
//               </div>
//               <div className="flex items-center">
//                 <Zap className="h-4 w-4 text-muted-foreground mr-2" />
//                 <span className="text-sm text-muted-foreground">
//                   {workflow.integrations.length} Integration{workflow.integrations.length !== 1 ? "s" : ""}
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <Users className="h-4 w-4 text-muted-foreground mr-2" />
//                 <span className="text-sm text-muted-foreground">{workflow.usage_count || 0} users</span>
//               </div>
//             </div>
//           </div>

//           <Tabs defaultValue="overview">
//             <TabsList>
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="setup">Setup Instructions</TabsTrigger>
//               <TabsTrigger value="integrations">Integrations</TabsTrigger>
//             </TabsList>
//             <TabsContent value="overview" className="space-y-6">
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Features</h2>
//                 <ul className="space-y-2">
//                   {workflow.features.map((feature, index) => (
//                     <li key={index} className="flex items-start">
//                       <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Use Cases</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="text-lg">Business</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <p>Streamline your business processes and automate repetitive tasks.</p>
//                     </CardContent>
//                   </Card>
//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="text-lg">Personal</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <p>Simplify your daily routines and save time on manual work.</p>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="setup" className="space-y-6">
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Setup Instructions</h2>
//                 <div className="prose max-w-none">
//                   {workflow.setup_instructions ? (
//                     <div className="whitespace-pre-wrap">{workflow.setup_instructions}</div>
//                   ) : (
//                     <p>No setup instructions provided. This workflow is ready to use out of the box.</p>
//                   )}
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="integrations" className="space-y-6">
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Required Integrations</h2>
//                 {workflow.integrations.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {workflow.integrations.map((integration, index) => (
//                       <Card key={index}>
//                         <CardHeader>
//                           <CardTitle className="text-lg">{integration}</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                           <p className="text-muted-foreground">
//                             You'll need to connect your {integration} account during setup.
//                           </p>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 ) : (
//                   <p>This workflow doesn't require any external integrations.</p>
//                 )}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>

//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Deploy This Agent</CardTitle>
//               <CardDescription>Add this agent to your dashboard and start using it right away.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium">Pricing</span>
//                   <span>{workflow.pricing}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium">Setup Time</span>
//                   <span>{workflow.setup_time}</span>
//                 </div>
//                 <WorkflowRating
//                   workflowId={workflow.id}
//                   initialRating={workflow.rating || 0}
//                   totalRatings={10} // This would come from the database in a real app
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               {hasDeployed ? (
//                 <Button asChild className="w-full">
//                   <Link href="/dashboard/my-workflows">View in Dashboard</Link>
//                 </Button>
//               ) : (
//                 <Button asChild className="w-full">
//                   <Link href={`/marketplace/${workflow.id}/deploy`}>
//                     Deploy Agent <ArrowRight className="ml-2 h-4 w-4" />
//                   </Link>
//                 </Button>
//               )}
//             </CardFooter>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Need Help?</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground mb-4">
//                 Have questions about this agent or need assistance with setup?
//               </p>
//               <Button variant="outline" className="w-full" asChild>
//                 <Link href="/support">Contact Support</Link>
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

// import Link from "next/link"
// import { notFound } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { WorkflowRating } from "@/components/workflow-rating"
// import { getWorkflowById, getUserWorkflows } from "@/lib/actions/workflows"
// import { getUserDetails } from "@/lib/auth"
// import { Clock, Zap, Users, ArrowRight, Check } from "lucide-react"

// // Define interfaces for your data structure
// interface Workflow {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
//   setup_time: string;
//   integrations: string[];
//   features: string[];
//   usage_count?: number;
//   setup_instructions?: string;
//   pricing: string;
//   rating?: number;
// }

// interface UserWorkflow {
//   workflow_id: string;
//   // Add other properties as needed
// }

// export default async function WorkflowDetailPage({ params }: { params: { id: string } }) {
//   const workflow = await getWorkflowById(params.id) as Workflow;

//   if (!workflow) {
//     notFound()
//   }

//   // Get user details to check if they've already deployed this workflow
//   const user = await getUserDetails()
//   let userWorkflows: UserWorkflow[] = []

//   if (user) {
//     userWorkflows = await getUserWorkflows() as UserWorkflow[];
//   }

//   const hasDeployed = userWorkflows.some((uw) => uw.workflow_id === workflow.id)

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-8">
//           <div>
//             <div className="flex items-center gap-2 mb-2">
//               <Link href="/marketplace" className="text-sm text-muted-foreground hover:underline">
//                 Marketplace
//               </Link>
//               <span className="text-sm text-muted-foreground">/</span>
//               <span className="text-sm">{workflow.name}</span>
//             </div>
//             <h1 className="text-3xl font-bold mb-4">{workflow.name}</h1>
//             <p className="text-lg text-muted-foreground mb-6">{workflow.description}</p>

//             <div className="flex flex-wrap gap-4 mb-8">
//               <div className="flex items-center">
//                 <Badge variant="outline" className="capitalize">
//                   {workflow.category}
//                 </Badge>
//               </div>
//               <div className="flex items-center">
//                 <Clock className="h-4 w-4 text-muted-foreground mr-2" />
//                 <span className="text-sm text-muted-foreground">{workflow.setup_time} setup</span>
//               </div>
//               <div className="flex items-center">
//                 <Zap className="h-4 w-4 text-muted-foreground mr-2" />
//                 <span className="text-sm text-muted-foreground">
//                   {workflow.integrations.length} Integration{workflow.integrations.length !== 1 ? "s" : ""}
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <Users className="h-4 w-4 text-muted-foreground mr-2" />
//                 <span className="text-sm text-muted-foreground">{workflow.usage_count || 0} users</span>
//               </div>
//             </div>
//           </div>

//           <Tabs defaultValue="overview">
//             <TabsList>
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="setup">Setup Instructions</TabsTrigger>
//               <TabsTrigger value="integrations">Integrations</TabsTrigger>
//             </TabsList>
//             <TabsContent value="overview" className="space-y-6">
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Features</h2>
//                 <ul className="space-y-2">
//                   {workflow.features.map((feature: string, index: number) => (
//                     <li key={index} className="flex items-start">
//                       <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Use Cases</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="text-lg">Business</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <p>Streamline your business processes and automate repetitive tasks.</p>
//                     </CardContent>
//                   </Card>
//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="text-lg">Personal</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <p>Simplify your daily routines and save time on manual work.</p>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="setup" className="space-y-6">
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Setup Instructions</h2>
//                 <div className="prose max-w-none">
//                   {workflow.setup_instructions ? (
//                     <div className="whitespace-pre-wrap">{workflow.setup_instructions}</div>
//                   ) : (
//                     <p>No setup instructions provided. This workflow is ready to use out of the box.</p>
//                   )}
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="integrations" className="space-y-6">
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Required Integrations</h2>
//                 {workflow.integrations.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {workflow.integrations.map((integration: string, index: number) => (
//                       <Card key={index}>
//                         <CardHeader>
//                           <CardTitle className="text-lg">{integration}</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                           <p className="text-muted-foreground">
//                             You'll need to connect your {integration} account during setup.
//                           </p>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 ) : (
//                   <p>This workflow doesn't require any external integrations.</p>
//                 )}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>

//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Deploy This Agent</CardTitle>
//               <CardDescription>Add this agent to your dashboard and start using it right away.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium">Pricing</span>
//                   <span>{workflow.pricing}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium">Setup Time</span>
//                   <span>{workflow.setup_time}</span>
//                 </div>
//                 <WorkflowRating
//                   workflowId={workflow.id}
//                   initialRating={workflow.rating || 0}
//                   totalRatings={10} // This would come from the database in a real app
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               {hasDeployed ? (
//                 <Button asChild className="w-full">
//                   <Link href="/dashboard/my-workflows">View in Dashboard</Link>
//                 </Button>
//               ) : (
//                 <Button asChild className="w-full">
//                   <Link href={`/marketplace/${workflow.id}/deploy`}>
//                     Deploy Agent <ArrowRight className="ml-2 h-4 w-4" />
//                   </Link>
//                 </Button>
//               )}
//             </CardFooter>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Need Help?</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground mb-4">
//                 Have questions about this agent or need assistance with setup?
//               </p>
//               <Button variant="outline" className="w-full" asChild>
//                 <Link href="/support">Contact Support</Link>
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

// import Link from "next/link"
// import { notFound } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { WorkflowRating } from "@/components/workflow-rating"
// import { WorkflowFlowDiagram } from "@/components/workflow/workflow-diagram"
// import { WorkflowMediaGallery } from "@/components/workflow/media-gallery"
// import { getWorkflowById, getUserWorkflows } from "@/lib/actions/workflows"
// import { getUserDetails } from "@/lib/auth"
// import { Clock, Zap, Users, ArrowRight, Check } from "lucide-react"

// export default async function WorkflowDetailPage({ params }: { params: { id: string } }) {
//   const workflow = await getWorkflowById(params.id)

//   if (!workflow) {
//     notFound()
//   }

//   // Get user details to check if they've already deployed this workflow
//   const user = await getUserDetails()
//   let userWorkflows = []

//   if (user) {
//     userWorkflows = await getUserWorkflows()
//   }

//   const hasDeployed = userWorkflows.some((uw) => uw.workflow_id === workflow.id)

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-8">
//           <div>
//             <div className="flex items-center gap-2 mb-2">
//               <Link href="/marketplace" className="text-sm text-muted-foreground hover:underline">
//                 Marketplace
//               </Link>
//               <span className="text-sm text-muted-foreground">/</span>
//               <span className="text-sm">{workflow.name}</span>
//             </div>
//             <h1 className="text-3xl font-bold mb-4">{workflow.name}</h1>
//             <p className="text-lg text-muted-foreground mb-6">{workflow.description}</p>

//             <div className="flex flex-wrap gap-4 mb-8">
//               <div className="flex items-center">
//                 <Badge variant="outline" className="capitalize">
//                   {workflow.category}
//                 </Badge>
//               </div>
//               <div className="flex items-center">
//                 <Clock className="h-4 w-4 text-muted-foreground mr-2" />
//                 <span className="text-sm text-muted-foreground">{workflow.setup_time} setup</span>
//               </div>
//               <div className="flex items-center">
//                 <Zap className="h-4 w-4 text-muted-foreground mr-2" />
//                 <span className="text-sm text-muted-foreground">
//                   {workflow.integrations.length} Integration{workflow.integrations.length !== 1 ? "s" : ""}
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <Users className="h-4 w-4 text-muted-foreground mr-2" />
//                 <span className="text-sm text-muted-foreground">{workflow.usage_count || 0} users</span>
//               </div>
//             </div>
//           </div>

//           <Tabs defaultValue="overview">
//             <TabsList>
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
//               <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
//               <TabsTrigger value="setup">Setup Instructions</TabsTrigger>
//               <TabsTrigger value="integrations">Integrations</TabsTrigger>
//             </TabsList>

//             <TabsContent value="overview" className="space-y-6">
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Features</h2>
//                 <ul className="space-y-2">
//                   {workflow.features.map((feature, index) => (
//                     <li key={index} className="flex items-start">
//                       <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Use Cases</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="text-lg">Business</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <p>Streamline your business processes and automate repetitive tasks.</p>
//                     </CardContent>
//                   </Card>
//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="text-lg">Personal</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <p>Simplify your daily routines and save time on manual work.</p>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="how-it-works" className="space-y-6">
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">How This Workflow Works</h2>
//                 <WorkflowFlowDiagram workflowId={workflow.id} />
//               </div>
//             </TabsContent>

//             <TabsContent value="tutorials" className="space-y-6">
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Tutorials & Media</h2>
//                 <WorkflowMediaGallery workflowId={workflow.id} />
//               </div>
//             </TabsContent>

//             <TabsContent value="setup" className="space-y-6">
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Setup Instructions</h2>
//                 <div className="prose max-w-none">
//                   {workflow.setup_instructions ? (
//                     <div className="whitespace-pre-wrap">{workflow.setup_instructions}</div>
//                   ) : (
//                     <p>No setup instructions provided. This workflow is ready to use out of the box.</p>
//                   )}
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="integrations" className="space-y-6">
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Required Integrations</h2>
//                 {workflow.integrations.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {workflow.integrations.map((integration, index) => (
//                       <Card key={index}>
//                         <CardHeader>
//                           <CardTitle className="text-lg">{integration}</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                           <p className="text-muted-foreground">
//                             You'll need to connect your {integration} account during setup.
//                           </p>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 ) : (
//                   <p>This workflow doesn't require any external integrations.</p>
//                 )}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>

//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Deploy This Agent</CardTitle>
//               <CardDescription>Add this agent to your dashboard and start using it right away.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium">Pricing</span>
//                   <span>{workflow.pricing}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium">Setup Time</span>
//                   <span>{workflow.setup_time}</span>
//                 </div>
//                 <WorkflowRating
//                   workflowId={workflow.id}
//                   initialRating={workflow.rating || 0}
//                   totalRatings={10} // This would come from the database in a real app
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               {hasDeployed ? (
//                 <Button asChild className="w-full">
//                   <Link href="/dashboard/my-workflows">View in Dashboard</Link>
//                 </Button>
//               ) : (
//                 <Button asChild className="w-full">
//                   <Link href={`/marketplace/${workflow.id}/deploy`}>
//                     Deploy Agent <ArrowRight className="ml-2 h-4 w-4" />
//                   </Link>
//                 </Button>
//               )}
//             </CardFooter>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Need Help?</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground mb-4">
//                 Have questions about this agent or need assistance with setup?
//               </p>
//               <Button variant="outline" className="w-full" asChild>
//                 <Link href="/support">Contact Support</Link>
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkflowRating } from "@/components/workflow-rating"
import { WorkflowFlowDiagram } from "@/components/workflow/workflow-diagram"
import { WorkflowMediaGallery } from "@/components/workflow/media-gallery"
import { getWorkflowById, getUserWorkflows } from "@/lib/actions/workflows"
import { getUserDetails } from "@/lib/auth"
import { Clock, Zap, Users, ArrowRight, Check } from "lucide-react"

// Define types for the workflow and its properties
interface Workflow {
  id: string;
  name: string;
  description: string;
  category: string;
  setup_time?: string;
  integrations: string[];
  usage_count?: number;
  features: string[];
  setup_instructions?: string;
  pricing: string;
  rating?: number;
}

export default async function WorkflowDetailPage({ params }: { params: { id: string } }) {
  const workflow = await getWorkflowById(params.id) as Workflow;

  if (!workflow) {
    notFound()
  }

  // Get user details to check if they've already deployed this workflow
  const user = await getUserDetails()
  let userWorkflows: any[] = []

  if (user) {
    userWorkflows = await getUserWorkflows()
  }

  const hasDeployed = userWorkflows.some((uw) => uw.workflow_id === workflow.id)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/marketplace" className="text-sm text-muted-foreground hover:underline">
                Marketplace
              </Link>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm">{workflow.name}</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{workflow.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{workflow.description}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center">
                <Badge variant="outline" className="capitalize">
                  {workflow.category}
                </Badge>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">{workflow.setup_time} setup</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">
                  {workflow.integrations.length} Integration{workflow.integrations.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">{workflow.usage_count || 0} users</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="setup">Setup Instructions</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <ul className="space-y-2">
                  {workflow.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Business</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Streamline your business processes and automate repetitive tasks.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Personal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Simplify your daily routines and save time on manual work.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="how-it-works" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">How This Workflow Works</h2>
                <WorkflowFlowDiagram workflowId={workflow.id} />
              </div>
            </TabsContent>

            <TabsContent value="tutorials" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Tutorials & Media</h2>
                <WorkflowMediaGallery workflowId={workflow.id} />
              </div>
            </TabsContent>

            <TabsContent value="setup" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Setup Instructions</h2>
                <div className="prose max-w-none">
                  {workflow.setup_instructions ? (
                    <div className="whitespace-pre-wrap">{workflow.setup_instructions}</div>
                  ) : (
                    <p>No setup instructions provided. This workflow is ready to use out of the box.</p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Required Integrations</h2>
                {workflow.integrations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {workflow.integrations.map((integration: string, index: number) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">{integration}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">
                            You'll need to connect your {integration} account during setup.
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p>This workflow doesn't require any external integrations.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deploy This Agent</CardTitle>
              <CardDescription>Add this agent to your dashboard and start using it right away.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Pricing</span>
                  <span>{workflow.pricing}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Setup Time</span>
                  <span>{workflow.setup_time}</span>
                </div>
                <WorkflowRating
                  workflowId={workflow.id}
                  initialRating={workflow.rating || 0}
                  totalRatings={10} // This would come from the database in a real app
                />
              </div>
            </CardContent>
            <CardFooter>
              {hasDeployed ? (
                <Button asChild className="w-full">
                  <Link href="/dashboard/my-workflows">View in Dashboard</Link>
                </Button>
              ) : (
                <Button asChild className="w-full">
                  <Link href={`/marketplace/${workflow.id}/deploy`}>
                    Deploy Agent <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Have questions about this agent or need assistance with setup?
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/support">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}