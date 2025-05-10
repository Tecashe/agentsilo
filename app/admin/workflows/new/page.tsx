// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { useToast } from "@/hooks/use-toast"
// import { ArrowLeft, Plus, X, Trash } from "lucide-react"
// import { getWorkflow } from "@/lib/n8n-service"

// // Categories for workflows
// const CATEGORIES = [
//   "customer-support",
//   "sales",
//   "marketing",
//   "hr",
//   "finance",
//   "operations",
//   "productivity",
//   "data-processing",
//   "communication",
//   "other",
// ]

// // Pricing tiers
// const PRICING_TIERS = ["free", "basic", "premium", "enterprise", "custom"]

// // Integration types
// const INTEGRATION_TYPES = [
//   "crm",
//   "email",
//   "calendar",
//   "messaging",
//   "social-media",
//   "payment",
//   "storage",
//   "analytics",
//   "database",
//   "api",
//   "other",
// ]

// export default function NewWorkflowPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const { toast } = useToast()
//   const [isLoading, setIsLoading] = useState(false)
//   const [activeTab, setActiveTab] = useState("basic")
//   const [n8nWorkflowDetails, setN8nWorkflowDetails] = useState(null)

//   // Form state
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     n8n_workflow_id: "",
//     category: "",
//     version: "1.0.0",
//     pricing_tier: "free",
//     price: 0,
//     setup_time: "5 minutes",
//     is_published: false,
//     is_featured: false,
//     features: [""],
//     integrations: [
//       {
//         integration_name: "",
//         integration_type: "",
//         is_required: true,
//         config_schema: {},
//         description: "",
//       },
//     ],
//   })

//   // Initialize form with search params if available
//   useEffect(() => {
//     const n8nWorkflowId = searchParams.get("n8n_workflow_id")
//     const name = searchParams.get("name")

//     if (n8nWorkflowId) {
//       setFormData((prev) => ({
//         ...prev,
//         n8n_workflow_id: n8nWorkflowId,
//         name: name || prev.name,
//       }))

//       // Fetch workflow details from n8n
//       fetchN8nWorkflowDetails(n8nWorkflowId)
//     }
//   }, [searchParams])

//   const fetchN8nWorkflowDetails = async (workflowId: string) => {
//     try {
//       const workflow = await getWorkflow(workflowId)
//       setN8nWorkflowDetails(workflow)
//     } catch (error) {
//       console.error("Error fetching n8n workflow details:", error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch workflow details from n8n.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSwitchChange = (name: string, checked: boolean) => {
//     setFormData((prev) => ({ ...prev, [name]: checked }))
//   }

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Number.parseFloat(e.target.value)
//     setFormData((prev) => ({ ...prev, price: isNaN(value) ? 0 : value }))
//   }

//   const handleFeatureChange = (index: number, value: string) => {
//     setFormData((prev) => {
//       const features = [...prev.features]
//       features[index] = value
//       return { ...prev, features }
//     })
//   }

//   const addFeature = () => {
//     setFormData((prev) => ({
//       ...prev,
//       features: [...prev.features, ""],
//     }))
//   }

//   const removeFeature = (index: number) => {
//     setFormData((prev) => {
//       const features = [...prev.features]
//       features.splice(index, 1)
//       return { ...prev, features }
//     })
//   }

//   const handleIntegrationChange = (index: number, field: string, value: any) => {
//     setFormData((prev) => {
//       const integrations = [...prev.integrations]
//       integrations[index] = { ...integrations[index], [field]: value }
//       return { ...prev, integrations }
//     })
//   }

//   const addIntegration = () => {
//     setFormData((prev) => ({
//       ...prev,
//       integrations: [
//         ...prev.integrations,
//         {
//           integration_name: "",
//           integration_type: "",
//           is_required: true,
//           config_schema: {},
//           description: "",
//         },
//       ],
//     }))
//   }

//   const removeIntegration = (index: number) => {
//     setFormData((prev) => {
//       const integrations = [...prev.integrations]
//       integrations.splice(index, 1)
//       return { ...prev, integrations }
//     })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       // Filter out empty features
//       const filteredFeatures = formData.features.filter((feature) => feature.trim() !== "")

//       // Filter out incomplete integrations
//       const filteredIntegrations = formData.integrations.filter(
//         (integration) => integration.integration_name.trim() !== "" && integration.integration_type.trim() !== "",
//       )

//       // Prepare data for submission
//       const submitData = {
//         ...formData,
//         features: filteredFeatures,
//         integrations: filteredIntegrations,
//       }

//       // Submit to API
//       const response = await fetch("/api/admin/workflows", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(submitData),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Failed to create workflow")
//       }

//       const data = await response.json()

//       toast({
//         title: "Success",
//         description: "Workflow created successfully",
//       })

//       // Redirect to workflow list
//       router.push("/admin/workflows")
//     } catch (error: any) {
//       console.error("Error creating workflow:", error)
//       toast({
//         title: "Error",
//         description: error.message || "Failed to create workflow. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center">
//         <Button variant="ghost" size="sm" asChild className="mr-4">
//           <Link href="/admin/workflows">
//             <ArrowLeft className="mr-2 h-4 w-4" /> Back
//           </Link>
//         </Button>
//         <h1 className="text-3xl font-bold">Add New Workflow</h1>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 space-y-6">
//             <Tabs value={activeTab} onValueChange={setActiveTab}>
//               <TabsList className="grid grid-cols-3">
//                 <TabsTrigger value="basic">Basic Info</TabsTrigger>
//                 <TabsTrigger value="features">Features</TabsTrigger>
//                 <TabsTrigger value="integrations">Integrations</TabsTrigger>
//               </TabsList>

//               <TabsContent value="basic" className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Basic Information</CardTitle>
//                     <CardDescription>Enter the basic details for this workflow</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="name">Name</Label>
//                       <Input
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Enter workflow name"
//                         required
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="description">Description</Label>
//                       <Textarea
//                         id="description"
//                         name="description"
//                         value={formData.description}
//                         onChange={handleInputChange}
//                         placeholder="Describe what this workflow does"
//                         rows={4}
//                         required
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="n8n_workflow_id">n8n Workflow ID</Label>
//                       <Input
//                         id="n8n_workflow_id"
//                         name="n8n_workflow_id"
//                         value={formData.n8n_workflow_id}
//                         onChange={handleInputChange}
//                         placeholder="Enter the n8n workflow ID"
//                         required
//                       />
//                       {n8nWorkflowDetails && (
//                         <div className="mt-2">
//                           <Badge variant="outline" className="mr-2">
//                             {n8nWorkflowDetails.name}
//                           </Badge>
//                           <Badge variant={n8nWorkflowDetails.active ? "default" : "outline"}>
//                             {n8nWorkflowDetails.active ? "Active" : "Inactive"}
//                           </Badge>
//                         </div>
//                       )}
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="category">Category</Label>
//                       <Select
//                         value={formData.category}
//                         onValueChange={(value) => handleSelectChange("category", value)}
//                         required
//                       >
//                         <SelectTrigger id="category">
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {CATEGORIES.map((category) => (
//                             <SelectItem key={category} value={category}>
//                               {category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="version">Version</Label>
//                         <Input
//                           id="version"
//                           name="version"
//                           value={formData.version}
//                           onChange={handleInputChange}
//                           placeholder="1.0.0"
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="setup_time">Setup Time</Label>
//                         <Input
//                           id="setup_time"
//                           name="setup_time"
//                           value={formData.setup_time}
//                           onChange={handleInputChange}
//                           placeholder="5 minutes"
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Pricing</CardTitle>
//                     <CardDescription>Set the pricing details for this workflow</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="pricing_tier">Pricing Tier</Label>
//                       <Select
//                         value={formData.pricing_tier}
//                         onValueChange={(value) => handleSelectChange("pricing_tier", value)}
//                       >
//                         <SelectTrigger id="pricing_tier">
//                           <SelectValue placeholder="Select pricing tier" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {PRICING_TIERS.map((tier) => (
//                             <SelectItem key={tier} value={tier}>
//                               {tier.charAt(0).toUpperCase() + tier.slice(1)}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="price">Price (USD)</Label>
//                       <Input
//                         id="price"
//                         name="price"
//                         type="number"
//                         min="0"
//                         step="0.01"
//                         value={formData.price}
//                         onChange={handlePriceChange}
//                         placeholder="0.00"
//                       />
//                       <p className="text-sm text-muted-foreground">
//                         Set to 0 for free workflows or if using a pricing tier.
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="features" className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Features</CardTitle>
//                     <CardDescription>List the features of this workflow</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     {formData.features.map((feature, index) => (
//                       <div key={index} className="flex items-center gap-2">
//                         <Input
//                           value={feature}
//                           onChange={(e) => handleFeatureChange(index, e.target.value)}
//                           placeholder={`Feature ${index + 1}`}
//                         />
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => removeFeature(index)}
//                           disabled={formData.features.length <= 1}
//                         >
//                           <Trash className="h-4 w-4" />
//                           <span className="sr-only">Remove feature</span>
//                         </Button>
//                       </div>
//                     ))}

//                     <Button type="button" variant="outline" size="sm" onClick={addFeature}>
//                       <Plus className="mr-2 h-4 w-4" /> Add Feature
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="integrations" className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Required Integrations</CardTitle>
//                     <CardDescription>Specify the integrations required for this workflow to function</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     {formData.integrations.map((integration, index) => (
//                       <div key={index} className="space-y-4 p-4 border rounded-md">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-lg font-medium">Integration {index + 1}</h3>
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => removeIntegration(index)}
//                             disabled={formData.integrations.length <= 1}
//                           >
//                             <X className="h-4 w-4 mr-2" /> Remove
//                           </Button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div className="space-y-2">
//                             <Label htmlFor={`integration-name-${index}`}>Name</Label>
//                             <Input
//                               id={`integration-name-${index}`}
//                               value={integration.integration_name}
//                               onChange={(e) => handleIntegrationChange(index, "integration_name", e.target.value)}
//                               placeholder="e.g. Gmail, Slack, etc."
//                             />
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor={`integration-type-${index}`}>Type</Label>
//                             <Select
//                               value={integration.integration_type}
//                               onValueChange={(value) => handleIntegrationChange(index, "integration_type", value)}
//                             >
//                               <SelectTrigger id={`integration-type-${index}`}>
//                                 <SelectValue placeholder="Select type" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {INTEGRATION_TYPES.map((type) => (
//                                   <SelectItem key={type} value={type}>
//                                     {type.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <Label htmlFor={`integration-description-${index}`}>Description</Label>
//                           <Textarea
//                             id={`integration-description-${index}`}
//                             value={integration.description || ""}
//                             onChange={(e) => handleIntegrationChange(index, "description", e.target.value)}
//                             placeholder="Describe what this integration is used for"
//                             rows={2}
//                           />
//                         </div>

//                         <div className="flex items-center space-x-2">
//                           <Switch
//                             id={`integration-required-${index}`}
//                             checked={integration.is_required}
//                             onCheckedChange={(checked) => handleIntegrationChange(index, "is_required", checked)}
//                           />
//                           <Label htmlFor={`integration-required-${index}`}>Required</Label>
//                         </div>
//                       </div>
//                     ))}

//                     <Button type="button" variant="outline" onClick={addIntegration}>
//                       <Plus className="mr-2 h-4 w-4" /> Add Integration
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>

//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Publishing Options</CardTitle>
//                 <CardDescription>Control how this workflow appears in the marketplace</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center space-x-2">
//                   <Switch
//                     id="is_published"
//                     checked={formData.is_published}
//                     onCheckedChange={(checked) => handleSwitchChange("is_published", checked)}
//                   />
//                   <Label htmlFor="is_published">Publish workflow</Label>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   When published, this workflow will be visible in the marketplace.
//                 </p>

//                 <div className="flex items-center space-x-2 pt-4">
//                   <Switch
//                     id="is_featured"
//                     checked={formData.is_featured}
//                     onCheckedChange={(checked) => handleSwitchChange("is_featured", checked)}
//                   />
//                   <Label htmlFor="is_featured">Feature workflow</Label>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   Featured workflows appear prominently in the marketplace.
//                 </p>
//               </CardContent>
//               <CardFooter>
//                 <Button type="submit" className="w-full" disabled={isLoading}>
//                   {isLoading ? "Creating..." : "Create Workflow"}
//                 </Button>
//               </CardFooter>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Preview</CardTitle>
//                 <CardDescription>How this workflow will appear in the marketplace</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   <h3 className="font-bold text-lg">{formData.name || "Workflow Name"}</h3>
//                   <p className="text-sm text-muted-foreground">
//                     {formData.description || "Workflow description will appear here"}
//                   </p>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {formData.category && (
//                       <Badge variant="outline">
//                         {formData.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                       </Badge>
//                     )}
//                     <Badge variant="outline">{formData.setup_time}</Badge>
//                     <Badge variant="secondary">
//                       {formData.price > 0
//                         ? `$${formData.price.toFixed(2)}`
//                         : formData.pricing_tier.charAt(0).toUpperCase() + formData.pricing_tier.slice(1)}
//                     </Badge>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

import { WorkflowForm } from "@/components/admin/workflow-form"
import { getCategories, getAvailableIntegrations } from "@/lib/actions/workflows"
import { requireAdmin } from "@/lib/auth"

export default async function NewWorkflowPage() {
  // Ensure user is an admin
  await requireAdmin()

  // Get categories and available integrations
  const categories = await getCategories()
  const availableIntegrations = await getAvailableIntegrations()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Workflow</h1>
        <p className="text-muted-foreground">Add a new n8n workflow to the marketplace.</p>
      </div>

      <WorkflowForm categories={categories} availableIntegrations={availableIntegrations} />
    </div>
  )
}
