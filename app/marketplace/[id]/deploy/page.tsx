// "use client"

// import type React from "react"

// import { useState } from "react"
// import Link from "next/link"
// import { useParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { useToast } from "@/hooks/use-toast"
// import { ArrowLeft, ArrowRight, CheckCircle2, Zap } from "lucide-react"
// import { deployAgent } from "@/lib/actions/agents"

// export default function DeployAgentPage() {
//   const params = useParams()
//   const { toast } = useToast()
//   const agentId = params.id as string

//   const [isLoading, setIsLoading] = useState(false)
//   const [currentStep, setCurrentStep] = useState(1)
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     integrations: {} as Record<string, boolean>,
//     settings: {},
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleIntegrationChange = (integration: string, checked: boolean) => {
//     setFormData((prev) => ({
//       ...prev,
//       integrations: {
//         ...prev.integrations,
//         [integration]: checked,
//       },
//     }))
//   }

//   const handleNextStep = () => {
//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1)
//     } else {
//       handleDeploy()
//     }
//   }

//   const handlePrevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   const handleDeploy = async () => {
//     setIsLoading(true)

//     try {
//       await deployAgent(agentId, {
//         name: formData.name,
//         description: formData.description,
//         settings: {
//           ...formData.settings,
//           integrations: formData.integrations,
//         },
//       })

//       toast({
//         title: "Agent Deployed Successfully",
//         description: `${formData.name} has been added to your dashboard.`,
//       })
//     } catch (error: any) {
//       toast({
//         title: "Deployment Failed",
//         description: error.message || "An error occurred while deploying the agent.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <Link href={`/marketplace/${agentId}`} className="text-purple-600 hover:underline mb-4 inline-block">
//         ← Back to Agent Details
//       </Link>

//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-3xl font-bold mb-2">Deploy Agent</h1>
//         <p className="text-gray-600 mb-8">Follow the steps below to set up and deploy this agent.</p>

//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-2">
//             <div className="flex items-center">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
//                   currentStep >= 1 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 1
//               </div>
//               <span className={currentStep >= 1 ? "font-medium" : "text-gray-500"}>Basic Information</span>
//             </div>
//             <div className="h-px bg-gray-200 flex-1 mx-4"></div>
//             <div className="flex items-center">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
//                   currentStep >= 2 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 2
//               </div>
//               <span className={currentStep >= 2 ? "font-medium" : "text-gray-500"}>Connect Integrations</span>
//             </div>
//             <div className="h-px bg-gray-200 flex-1 mx-4"></div>
//             <div className="flex items-center">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
//                   currentStep >= 3 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 3
//               </div>
//               <span className={currentStep >= 3 ? "font-medium" : "text-gray-500"}>Review & Deploy</span>
//             </div>
//           </div>
//         </div>

//         {currentStep === 1 && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Basic Information</CardTitle>
//               <CardDescription>Provide a name and description for this agent instance</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="agent-name">Agent Name</Label>
//                 <Input id="agent-name" name="name" value={formData.name} onChange={handleChange} required />
//                 <p className="text-sm text-gray-500">This name will be displayed in your dashboard</p>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="agent-description">Description (Optional)</Label>
//                 <Input id="agent-description" name="description" value={formData.description} onChange={handleChange} />
//                 <p className="text-sm text-gray-500">Add a custom description to help you identify this agent</p>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Button variant="outline" asChild>
//                 <Link href={`/marketplace/${agentId}`}>Cancel</Link>
//               </Button>
//               <Button onClick={handleNextStep} disabled={!formData.name}>
//                 Next <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </CardFooter>
//           </Card>
//         )}

//         {currentStep === 2 && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Connect Integrations</CardTitle>
//               <CardDescription>Connect the required services for this agent to function</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <p className="text-sm text-gray-500">This agent requires the following integrations:</p>
//               <div className="space-y-4">
//                 {["Gmail", "Slack", "Salesforce", "Zendesk"].map((integration) => (
//                   <div key={integration} className="flex items-start space-x-4 p-4 border rounded-lg">
//                     <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
//                       <Zap className="h-5 w-5 text-purple-600" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between">
//                         <h3 className="font-medium">{integration}</h3>
//                         <div className="flex items-center">
//                           <Checkbox
//                             id={`integration-${integration}`}
//                             checked={formData.integrations[integration] || false}
//                             onCheckedChange={(checked) => handleIntegrationChange(integration, checked as boolean)}
//                           />
//                           <Label htmlFor={`integration-${integration}`} className="ml-2">
//                             Connected
//                           </Label>
//                         </div>
//                       </div>
//                       <p className="text-sm text-gray-500 mt-1">
//                         Connect your {integration} account to enable this integration
//                       </p>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="mt-2"
//                         onClick={() => {
//                           toast({
//                             title: `${integration} Connected`,
//                             description: `Successfully connected to your ${integration} account.`,
//                           })
//                           handleIntegrationChange(integration, true)
//                         }}
//                       >
//                         Connect {integration}
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Button variant="outline" onClick={handlePrevStep}>
//                 <ArrowLeft className="mr-2 h-4 w-4" /> Back
//               </Button>
//               <Button onClick={handleNextStep}>
//                 Next <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </CardFooter>
//           </Card>
//         )}

//         {currentStep === 3 && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Review & Deploy</CardTitle>
//               <CardDescription>Review your configuration and deploy the agent</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <div className="p-4 border rounded-lg">
//                   <h3 className="font-medium mb-2">Agent Information</h3>
//                   <div className="grid grid-cols-2 gap-2 text-sm">
//                     <div className="text-gray-500">Name:</div>
//                     <div>{formData.name}</div>
//                     <div className="text-gray-500">Description:</div>
//                     <div>{formData.description || "No description provided"}</div>
//                   </div>
//                 </div>

//                 <div className="p-4 border rounded-lg">
//                   <h3 className="font-medium mb-2">Connected Integrations</h3>
//                   <ul className="space-y-2">
//                     {Object.entries(formData.integrations).map(([integration, connected]) => (
//                       <li key={integration} className="flex items-center">
//                         {connected ? (
//                           <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
//                         ) : (
//                           <div className="h-5 w-5 rounded-full border border-gray-300 mr-2" />
//                         )}
//                         <span className={connected ? "" : "text-gray-400"}>
//                           {integration} {connected ? "(Connected)" : "(Not Connected)"}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="p-4 border rounded-lg bg-yellow-50">
//                   <h3 className="font-medium mb-2 flex items-center">
//                     <Zap className="h-5 w-5 text-yellow-500 mr-2" />
//                     Important Note
//                   </h3>
//                   <p className="text-sm">
//                     You can modify these settings later from your dashboard. Missing integrations will need to be
//                     connected before the agent can fully function.
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Button variant="outline" onClick={handlePrevStep}>
//                 <ArrowLeft className="mr-2 h-4 w-4" /> Back
//               </Button>
//               <Button onClick={handleDeploy} disabled={isLoading}>
//                 {isLoading ? "Deploying..." : "Deploy Agent"}
//               </Button>
//             </CardFooter>
//           </Card>
//         )}
//       </div>
//     </div>
//   )
// }

// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useToast } from "@/hooks/use-toast"
// import { Loader2, ArrowLeft, Zap } from "lucide-react"
// import { getWorkflowById, deployWorkflow } from "@/lib/actions/workflows"

// export default function DeployWorkflowPage({ params }: { params: { id: string } }) {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [workflow, setWorkflow] = useState<any>(null)
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     settings: {},
//   })

//   // Fetch workflow data
//   useState(() => {
//     const fetchWorkflow = async () => {
//       try {
//         const data = await getWorkflowById(params.id)
//         setWorkflow(data)
//         setFormData({
//           name: data.name,
//           description: data.description,
//           settings: {},
//         })
//       } catch (error) {
//         console.error("Error fetching workflow:", error)
//         toast({
//           title: "Error",
//           description: "Failed to load workflow details. Please try again.",
//           variant: "destructive",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchWorkflow()
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       await deployWorkflow(params.id, formData)
//       toast({
//         title: "Success",
//         description: "Workflow deployed successfully!",
//       })
//       router.push("/dashboard/my-workflows")
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to deploy workflow. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     )
//   }

//   if (!workflow) {
//     return (
//       <div className="text-center py-12">
//         <h2 className="text-2xl font-bold mb-4">Workflow Not Found</h2>
//         <p className="text-muted-foreground mb-6">The workflow you're looking for doesn't exist or has been removed.</p>
//         <Button asChild>
//           <Link href="/marketplace">Back to Marketplace</Link>
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="mb-8">
//         <Button variant="ghost" asChild className="mb-4">
//           <Link href={`/marketplace/${params.id}`}>
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Details
//           </Link>
//         </Button>
//         <h1 className="text-3xl font-bold mb-2">Deploy {workflow.name}</h1>
//         <p className="text-lg text-muted-foreground">Configure and deploy this agent to your dashboard.</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Basic Configuration</CardTitle>
//                 <CardDescription>Customize the name and description for this workflow.</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Name</Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="My Email Automation"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     placeholder="Describe how you'll use this workflow..."
//                     rows={3}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {workflow.integrations.length > 0 && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Integrations</CardTitle>
//                   <CardDescription>Connect the required services for this workflow.</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Tabs defaultValue="setup">
//                     <TabsList className="mb-4">
//                       <TabsTrigger value="setup">Setup</TabsTrigger>
//                       <TabsTrigger value="advanced">Advanced</TabsTrigger>
//                     </TabsList>

//                     <TabsContent value="setup">
//                       <div className="space-y-4">
//                         {workflow.integrations.map((integration: string, index: number) => (
//                           <div key={index} className="p-4 border rounded-lg">
//                             <div className="flex items-center justify-between mb-4">
//                               <div className="flex items-center">
//                                 <Zap className="h-5 w-5 text-primary mr-2" />
//                                 <h3 className="font-medium">{integration}</h3>
//                               </div>
//                               <Badge variant="outline">Required</Badge>
//                             </div>
//                             <p className="text-sm text-muted-foreground mb-4">
//                               Connect your {integration} account to use this workflow.
//                             </p>
//                             <Button type="button" variant="outline" className="w-full">
//                               Connect {integration}
//                             </Button>
//                           </div>
//                         ))}
//                       </div>
//                     </TabsContent>

//                     <TabsContent value="advanced">
//                       <p className="text-muted-foreground mb-4">
//                         Advanced configuration options for experienced users.
//                       </p>
//                       <div className="space-y-4">
//                         {workflow.integrations.map((integration: string, index: number) => (
//                           <div key={index} className="space-y-2">
//                             <Label htmlFor={`api-key-${index}`}>{integration} API Key</Label>
//                             <Input
//                               id={`api-key-${index}`}
//                               type="password"
//                               placeholder={`Enter your ${integration} API key`}
//                               onChange={(e) => {
//                                 const settings = { ...formData.settings }
//                                 settings[integration] = { apiKey: e.target.value }
//                                 setFormData((prev) => ({ ...prev, settings }))
//                               }}
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </TabsContent>
//                   </Tabs>
//                 </CardContent>
//               </Card>
//             )}

//             <Button type="submit" className="w-full" disabled={isSubmitting}>
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Deploying...
//                 </>
//               ) : (
//                 <>Deploy Agent</>
//               )}
//             </Button>
//           </form>
//         </div>

//         <div>
//           <Card>
//             <CardHeader>
//               <CardTitle>Deployment Summary</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Agent</span>
//                 <span className="font-medium">{workflow.name}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Category</span>
//                 <span className="capitalize">{workflow.category}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Pricing</span>
//                 <span>{workflow.pricing}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Setup Time</span>
//                 <span>{workflow.setup_time}</span>
//               </div>

//               {workflow.integrations.length > 0 && (
//                 <div>
//                   <span className="text-muted-foreground block mb-2">Required Integrations</span>
//                   <div className="flex flex-wrap gap-2">
//                     {workflow.integrations.map((integration: string, index: number) => (
//                       <Badge key={index} variant="secondary">
//                         {integration}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//             <CardFooter className="flex flex-col text-sm text-muted-foreground">
//               <p>By deploying this agent, you agree to the terms of service and privacy policy.</p>
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useToast } from "@/hooks/use-toast"
// import { Loader2, ArrowLeft, Zap } from "lucide-react"
// import { getWorkflowById, deployWorkflow } from "@/lib/actions/workflows"

// // Define interfaces for type safety
// interface ApiKeySettings {
//   [key: string]: { apiKey: string };
// }

// interface FormData {
//   name: string;
//   description: string;
//   settings: ApiKeySettings;
// }

// interface Workflow {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
//   setup_time: string;
//   integrations: string[];
//   pricing: string;
//   // Add other properties as needed
// }

// export default function DeployWorkflowPage({ params }: { params: { id: string } }) {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [workflow, setWorkflow] = useState<Workflow | null>(null)
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     description: "",
//     settings: {},
//   })

//   // Fetch workflow data
//   useEffect(() => {
//     const fetchWorkflow = async () => {
//       try {
//         const data = await getWorkflowById(params.id) as Workflow
//         setWorkflow(data)
//         setFormData({
//           name: data.name,
//           description: data.description,
//           settings: {},
//         })
//       } catch (error) {
//         console.error("Error fetching workflow:", error)
//         toast({
//           title: "Error",
//           description: "Failed to load workflow details. Please try again.",
//           variant: "destructive",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchWorkflow()
//   }, [params.id, toast]) // Fixed: Added dependencies to useEffect

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       await deployWorkflow(params.id, formData)
//       toast({
//         title: "Success",
//         description: "Workflow deployed successfully!",
//       })
//       router.push("/dashboard/my-workflows")
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to deploy workflow. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     )
//   }

//   if (!workflow) {
//     return (
//       <div className="text-center py-12">
//         <h2 className="text-2xl font-bold mb-4">Workflow Not Found</h2>
//         <p className="text-muted-foreground mb-6">The workflow you're looking for doesn't exist or has been removed.</p>
//         <Button asChild>
//           <Link href="/marketplace">Back to Marketplace</Link>
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="mb-8">
//         <Button variant="ghost" asChild className="mb-4">
//           <Link href={`/marketplace/${params.id}`}>
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Details
//           </Link>
//         </Button>
//         <h1 className="text-3xl font-bold mb-2">Deploy {workflow.name}</h1>
//         <p className="text-lg text-muted-foreground">Configure and deploy this agent to your dashboard.</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Basic Configuration</CardTitle>
//                 <CardDescription>Customize the name and description for this workflow.</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Name</Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="My Email Automation"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     placeholder="Describe how you'll use this workflow..."
//                     rows={3}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {workflow.integrations.length > 0 && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Integrations</CardTitle>
//                   <CardDescription>Connect the required services for this workflow.</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Tabs defaultValue="setup">
//                     <TabsList className="mb-4">
//                       <TabsTrigger value="setup">Setup</TabsTrigger>
//                       <TabsTrigger value="advanced">Advanced</TabsTrigger>
//                     </TabsList>

//                     <TabsContent value="setup">
//                       <div className="space-y-4">
//                         {workflow.integrations.map((integration: string, index: number) => (
//                           <div key={index} className="p-4 border rounded-lg">
//                             <div className="flex items-center justify-between mb-4">
//                               <div className="flex items-center">
//                                 <Zap className="h-5 w-5 text-primary mr-2" />
//                                 <h3 className="font-medium">{integration}</h3>
//                               </div>
//                               <Badge variant="outline">Required</Badge>
//                             </div>
//                             <p className="text-sm text-muted-foreground mb-4">
//                               Connect your {integration} account to use this workflow.
//                             </p>
//                             <Button type="button" variant="outline" className="w-full">
//                               Connect {integration}
//                             </Button>
//                           </div>
//                         ))}
//                       </div>
//                     </TabsContent>

//                     <TabsContent value="advanced">
//                       <p className="text-muted-foreground mb-4">
//                         Advanced configuration options for experienced users.
//                       </p>
//                       <div className="space-y-4">
//                         {workflow.integrations.map((integration: string, index: number) => (
//                           <div key={index} className="space-y-2">
//                             <Label htmlFor={`api-key-${index}`}>{integration} API Key</Label>
//                             <Input
//                               id={`api-key-${index}`}
//                               type="password"
//                               placeholder={`Enter your ${integration} API key`}
//                               onChange={(e) => {
//                                 const settings = { ...formData.settings };
//                                 settings[integration] = { apiKey: e.target.value };
//                                 setFormData((prev) => ({ ...prev, settings }));
//                               }}
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </TabsContent>
//                   </Tabs>
//                 </CardContent>
//               </Card>
//             )}

//             <Button type="submit" className="w-full" disabled={isSubmitting}>
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Deploying...
//                 </>
//               ) : (
//                 <>Deploy Agent</>
//               )}
//             </Button>
//           </form>
//         </div>

//         <div>
//           <Card>
//             <CardHeader>
//               <CardTitle>Deployment Summary</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Agent</span>
//                 <span className="font-medium">{workflow.name}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Category</span>
//                 <span className="capitalize">{workflow.category}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Pricing</span>
//                 <span>{workflow.pricing}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Setup Time</span>
//                 <span>{workflow.setup_time}</span>
//               </div>

//               {workflow.integrations.length > 0 && (
//                 <div>
//                   <span className="text-muted-foreground block mb-2">Required Integrations</span>
//                   <div className="flex flex-wrap gap-2">
//                     {workflow.integrations.map((integration: string, index: number) => (
//                       <Badge key={index} variant="secondary">
//                         {integration}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//             <CardFooter className="flex flex-col text-sm text-muted-foreground">
//               <p>By deploying this agent, you agree to the terms of service and privacy policy.</p>
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useToast } from "@/hooks/use-toast"
// import { Loader2, ArrowLeft } from "lucide-react"
// import { getWorkflowById, deployWorkflow } from "@/lib/actions/workflows"
// import { ConnectIntegrationButton } from "@/components/integrations/connect-integration-button"
// import { IntegrationIcon } from "@/components/icon/integration-icons"
// import { motion } from "framer-motion"

// export default function DeployWorkflowPage({ params }: { params: { id: string } }) {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [workflow, setWorkflow] = useState<any>(null)
//   const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([])
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     settings: {},
//   })

//   // Fetch workflow data
//   useEffect(() => {
//     const fetchWorkflow = async () => {
//       try {
//         const data = await getWorkflowById(params.id)
//         setWorkflow(data)
//         setFormData({
//           name: data?.name ||"Name",
//           description: data?.description||"Description Goes here",
//           settings: {},
//         })
//       } catch (error) {
//         console.error("Error fetching workflow:", error)
//         toast({
//           title: "Error",
//           description: "Failed to load workflow details. Please try again.",
//           variant: "destructive",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchWorkflow()
//   }, [params.id, toast])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleIntegrationConnect = (integration: string) => {
//     setConnectedIntegrations((prev) => [...prev, integration])
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       // Check if all required integrations are connected
//       const requiredIntegrations = workflow.integrations || []
//       const missingIntegrations = requiredIntegrations.filter(
//         (integration: string) => !connectedIntegrations.includes(integration),
//       )

//       if (missingIntegrations.length > 0) {
//         throw new Error(`Please connect all required integrations: ${missingIntegrations.join(", ")}`)
//       }

//       await deployWorkflow(params.id, formData)
//       toast({
//         title: "Success",
//         description: "Workflow deployed successfully!",
//       })
//       router.push("/dashboard/my-workflows")
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to deploy workflow. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     )
//   }

//   if (!workflow) {
//     return (
//       <div className="text-center py-12">
//         <h2 className="text-2xl font-bold mb-4">Workflow Not Found</h2>
//         <p className="text-muted-foreground mb-6">The workflow you're looking for doesn't exist or has been removed.</p>
//         <Button asChild>
//           <Link href="/marketplace">Back to Marketplace</Link>
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="mb-8">
//         <Button variant="ghost" asChild className="mb-4">
//           <Link href={`/marketplace/${params.id}`}>
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Details
//           </Link>
//         </Button>
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//           <h1 className="text-3xl font-bold mb-2">Deploy {workflow.name}</h1>
//           <p className="text-lg text-muted-foreground">Configure and deploy this agent to your dashboard.</p>
//         </motion.div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <motion.div
//           className="lg:col-span-2"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <form onSubmit={handleSubmit} className="space-y-8">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Basic Configuration</CardTitle>
//                 <CardDescription>Customize the name and description for this workflow.</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Name</Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="My Email Automation"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     placeholder="Describe how you'll use this workflow..."
//                     rows={3}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {workflow.integrations.length > 0 && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Integrations</CardTitle>
//                   <CardDescription>Connect the required services for this workflow.</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Tabs defaultValue="setup">
//                     <TabsList className="mb-4">
//                       <TabsTrigger value="setup">Setup</TabsTrigger>
//                       <TabsTrigger value="advanced">Advanced</TabsTrigger>
//                     </TabsList>

//                     <TabsContent value="setup">
//                       <div className="space-y-4">
//                         {workflow.integrations.map((integration: string, index: number) => (
//                           <motion.div
//                             key={index}
//                             className="p-4 border rounded-lg"
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3, delay: index * 0.1 }}
//                           >
//                             <div className="flex items-center justify-between mb-4">
//                               <div className="flex items-center">
//                                 <IntegrationIcon name={integration} className="mr-2" />
//                                 <h3 className="font-medium">{integration}</h3>
//                               </div>
//                               <Badge
//                                 variant={connectedIntegrations.includes(integration) ? "default" : "outline"}
//                                 className={connectedIntegrations.includes(integration) ? "bg-green-500" : ""}
//                               >
//                                 {connectedIntegrations.includes(integration) ? "Connected" : "Required"}
//                               </Badge>
//                             </div>
//                             <p className="text-sm text-muted-foreground mb-4">
//                               Connect your {integration} account to use this workflow.
//                             </p>
//                             <ConnectIntegrationButton
//                               integrationName={integration}
//                               onSuccess={() => handleIntegrationConnect(integration)}
//                               className="w-full"
//                             />
//                           </motion.div>
//                         ))}
//                       </div>
//                     </TabsContent>

//                     <TabsContent value="advanced">
//                       <p className="text-muted-foreground mb-4">
//                         Advanced configuration options for experienced users.
//                       </p>
//                       <div className="space-y-4">
//                         {workflow.integrations.map((integration: string, index: number) => (
//                           <div key={index} className="space-y-2">
//                             <Label htmlFor={`api-key-${index}`}>{integration} API Key</Label>
//                             <Input
//                               id={`api-key-${index}`}
//                               type="password"
//                               placeholder={`Enter your ${integration} API key`}
//                               onChange={(e) => {
//                                 const settings = { ...formData.settings }
//                                 settings[integration] = { apiKey: e.target.value }
//                                 setFormData((prev) => ({ ...prev, settings }))
//                               }}
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </TabsContent>
//                   </Tabs>
//                 </CardContent>
//               </Card>
//             )}

//             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//               <Button type="submit" className="w-full" disabled={isSubmitting}>
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Deploying...
//                   </>
//                 ) : (
//                   <>Deploy Agent</>
//                 )}
//               </Button>
//             </motion.div>
//           </form>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           <Card>
//             <CardHeader>
//               <CardTitle>Deployment Summary</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Agent</span>
//                 <span className="font-medium">{workflow.name}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Category</span>
//                 <span className="capitalize">{workflow.category}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Pricing</span>
//                 <span>{workflow.pricing}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Setup Time</span>
//                 <span>{workflow.setup_time}</span>
//               </div>

//               {workflow.integrations.length > 0 && (
//                 <div>
//                   <span className="text-muted-foreground block mb-2">Required Integrations</span>
//                   <div className="flex flex-wrap gap-2">
//                     {workflow.integrations.map((integration: string, index: number) => (
//                       <div
//                         key={index}
//                         className={`flex items-center gap-1 px-2 py-1 rounded-md ${
//                           connectedIntegrations.includes(integration)
//                             ? "bg-green-500/10 text-green-600 dark:text-green-400"
//                             : "bg-secondary"
//                         }`}
//                       >
//                         <IntegrationIcon name={integration} size={14} />
//                         <span className="text-xs">{integration}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//             <CardFooter className="flex flex-col text-sm text-muted-foreground">
//               <p>By deploying this agent, you agree to the terms of service and privacy policy.</p>
//             </CardFooter>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ArrowLeft } from "lucide-react"
import { getWorkflowById, deployWorkflow } from "@/lib/actions/workflows"
import { ConnectIntegrationButton } from "@/components/integrations/connect-integration-button"
import { IntegrationIcon } from "@/components/icon/integration-icons"
import { motion } from "framer-motion"

// Define interfaces for our data structures
interface WorkflowSettings {
  [key: string]: {
    apiKey: string;
    [key: string]: any; // Allow for other potential settings
  };
}

interface FormDataType {
  name: string;
  description: string;
  settings: WorkflowSettings;
}

export default function DeployWorkflowPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [workflow, setWorkflow] = useState<any>(null)
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([])
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    description: "",
    settings: {},
  })

  // Fetch workflow data
  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        const data = await getWorkflowById(params.id)
        setWorkflow(data)
        setFormData({
          name: data?.name || "Name",
          description: data?.description || "Description Goes here",
          settings: {},
        })
      } catch (error) {
        console.error("Error fetching workflow:", error)
        toast({
          title: "Error",
          description: "Failed to load workflow details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchWorkflow()
  }, [params.id, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleIntegrationConnect = (integration: string) => {
    setConnectedIntegrations((prev) => [...prev, integration])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Check if all required integrations are connected
      const requiredIntegrations = workflow.integrations || []
      const missingIntegrations = requiredIntegrations.filter(
        (integration: string) => !connectedIntegrations.includes(integration),
      )

      if (missingIntegrations.length > 0) {
        throw new Error(`Please connect all required integrations: ${missingIntegrations.join(", ")}`)
      }

      await deployWorkflow(params.id, formData)
      toast({
        title: "Success",
        description: "Workflow deployed successfully!",
      })
      router.push("/dashboard/my-workflows")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to deploy workflow. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!workflow) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Workflow Not Found</h2>
        <p className="text-muted-foreground mb-6">The workflow you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/marketplace">Back to Marketplace</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/marketplace/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Details
          </Link>
        </Button>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold mb-2">Deploy {workflow.name}</h1>
          <p className="text-lg text-muted-foreground">Configure and deploy this agent to your dashboard.</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Configuration</CardTitle>
                <CardDescription>Customize the name and description for this workflow.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="My Email Automation"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe how you'll use this workflow..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {workflow.integrations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>Connect the required services for this workflow.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="setup">
                    <TabsList className="mb-4">
                      <TabsTrigger value="setup">Setup</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>

                    <TabsContent value="setup">
                      <div className="space-y-4">
                        {workflow.integrations.map((integration: string, index: number) => (
                          <motion.div
                            key={index}
                            className="p-4 border rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <IntegrationIcon name={integration} className="mr-2" />
                                <h3 className="font-medium">{integration}</h3>
                              </div>
                              <Badge
                                variant={connectedIntegrations.includes(integration) ? "default" : "outline"}
                                className={connectedIntegrations.includes(integration) ? "bg-green-500" : ""}
                              >
                                {connectedIntegrations.includes(integration) ? "Connected" : "Required"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              Connect your {integration} account to use this workflow.
                            </p>
                            <ConnectIntegrationButton
                              integrationName={integration}
                              onSuccess={() => handleIntegrationConnect(integration)}
                              className="w-full"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="advanced">
                      <p className="text-muted-foreground mb-4">
                        Advanced configuration options for experienced users.
                      </p>
                      <div className="space-y-4">
                        {workflow.integrations.map((integration: string, index: number) => (
                          <div key={index} className="space-y-2">
                            <Label htmlFor={`api-key-${index}`}>{integration} API Key</Label>
                            <Input
                              id={`api-key-${index}`}
                              type="password"
                              placeholder={`Enter your ${integration} API key`}
                              onChange={(e) => {
                                const settings = { ...formData.settings }
                                settings[integration] = { apiKey: e.target.value }
                                setFormData((prev) => ({ ...prev, settings }))
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>Deploy Agent</>
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Deployment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Agent</span>
                <span className="font-medium">{workflow.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Category</span>
                <span className="capitalize">{workflow.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pricing</span>
                <span>{workflow.pricing}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Setup Time</span>
                <span>{workflow.setup_time}</span>
              </div>

              {workflow.integrations.length > 0 && (
                <div>
                  <span className="text-muted-foreground block mb-2">Required Integrations</span>
                  <div className="flex flex-wrap gap-2">
                    {workflow.integrations.map((integration: string, index: number) => (
                      <div
                        key={index}
                        className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                          connectedIntegrations.includes(integration)
                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                            : "bg-secondary"
                        }`}
                      >
                        <IntegrationIcon name={integration} size={14} />
                        <span className="text-xs">{integration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col text-sm text-muted-foreground">
              <p>By deploying this agent, you agree to the terms of service and privacy policy.</p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}