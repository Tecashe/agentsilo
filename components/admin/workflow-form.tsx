// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { useToast } from "@/hooks/use-toast"
// import { X, Plus, Loader2 } from "lucide-react"
// import { createWorkflow, updateWorkflow } from "@/lib/actions/workflows"

// interface WorkflowFormProps {
//   workflow?: any
//   categories: string[]
//   availableIntegrations: string[]
// }

// export function WorkflowForm({ workflow, categories, availableIntegrations }: WorkflowFormProps) {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [formData, setFormData] = useState({
//     id: workflow?.id || "",
//     name: workflow?.name || "",
//     description: workflow?.description || "",
//     category: workflow?.category || "",
//     n8nWorkflowId: workflow?.n8nWorkflowId || "",
//     pricing: workflow?.pricing || "Free",
//     integrations: workflow?.integrations || [],
//     features: workflow?.features || [],
//     setupInstructions: workflow?.setupInstructions || "",
//     setupTime: workflow?.setupTime || "5 minutes",
//   })

//   const [newIntegration, setNewIntegration] = useState("")
//   const [newFeature, setNewFeature] = useState("")

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const addIntegration = () => {
//     if (!newIntegration) return
//     setFormData((prev) => ({
//       ...prev,
//       integrations: [...prev.integrations, newIntegration],
//     }))
//     setNewIntegration("")
//   }

//   const removeIntegration = (integration: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       integrations: prev.integrations.filter((i) => i !== integration),
//     }))
//   }

//   const addFeature = () => {
//     if (!newFeature) return
//     setFormData((prev) => ({
//       ...prev,
//       features: [...prev.features, newFeature],
//     }))
//     setNewFeature("")
//   }

//   const removeFeature = (feature: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       features: prev.features.filter((f) => f !== feature),
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       if (workflow) {
//         await updateWorkflow(workflow.id, formData)
//         toast({
//           title: "Workflow updated",
//           description: "The workflow has been updated successfully.",
//         })
//       } else {
//         await createWorkflow(formData)
//         toast({
//           title: "Workflow created",
//           description: "The workflow has been created successfully.",
//         })
//       }
//       router.push("/admin/workflows")
//       router.refresh()
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message || "An error occurred. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="space-y-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Basic Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="id">Workflow ID</Label>
//               <Input
//                 id="id"
//                 name="id"
//                 value={formData.id}
//                 onChange={handleChange}
//                 placeholder="unique-workflow-id"
//                 required
//                 disabled={!!workflow}
//               />
//               {!workflow && (
//                 <p className="text-sm text-muted-foreground">
//                   This will be used in URLs. Use lowercase letters, numbers, and hyphens only.
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Email Automation Agent"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Describe what this workflow does..."
//                 rows={4}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="category">Category</Label>
//               <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
//                 <SelectTrigger id="category">
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((category) => (
//                     <SelectItem key={category} value={category}>
//                       {category.charAt(0).toUpperCase() + category.slice(1)}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Workflow Configuration</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="n8nWorkflowId">n8n Workflow ID</Label>
//               <Input
//                 id="n8nWorkflowId"
//                 name="n8nWorkflowId"
//                 value={formData.n8nWorkflowId}
//                 onChange={handleChange}
//                 placeholder="123456"
//                 required
//               />
//               <p className="text-sm text-muted-foreground">The ID of the workflow in your n8n instance.</p>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="pricing">Pricing</Label>
//               <Select value={formData.pricing} onValueChange={(value) => handleSelectChange("pricing", value)}>
//                 <SelectTrigger id="pricing">
//                   <SelectValue placeholder="Select pricing" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Free">Free</SelectItem>
//                   <SelectItem value="$9.99/month">$9.99/month</SelectItem>
//                   <SelectItem value="$19.99/month">$19.99/month</SelectItem>
//                   <SelectItem value="$29.99/month">$29.99/month</SelectItem>
//                   <SelectItem value="$49.99/month">$49.99/month</SelectItem>
//                   <SelectItem value="Custom">Custom Pricing</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="setupTime">Setup Time</Label>
//               <Select value={formData.setupTime} onValueChange={(value) => handleSelectChange("setupTime", value)}>
//                 <SelectTrigger id="setupTime">
//                   <SelectValue placeholder="Select setup time" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="5 minutes">5 minutes</SelectItem>
//                   <SelectItem value="10 minutes">10 minutes</SelectItem>
//                   <SelectItem value="15 minutes">15 minutes</SelectItem>
//                   <SelectItem value="30 minutes">30 minutes</SelectItem>
//                   <SelectItem value="1 hour">1 hour</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Integrations & Features</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-4">
//               <Label>Required Integrations</Label>
//               <div className="flex flex-wrap gap-2 mb-2">
//                 {formData.integrations.map((integration) => (
//                   <Badge key={integration} variant="secondary" className="flex items-center gap-1">
//                     {integration}
//                     <button
//                       type="button"
//                       onClick={() => removeIntegration(integration)}
//                       className="hover:text-destructive"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </Badge>
//                 ))}
//               </div>
//               <div className="flex gap-2">
//                 <Select value={newIntegration} onValueChange={setNewIntegration}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select integration" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {availableIntegrations.map((integration) => (
//                       <SelectItem key={integration} value={integration}>
//                         {integration}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <Button type="button" onClick={addIntegration} variant="outline">
//                   <Plus className="h-4 w-4 mr-2" />
//                   Add
//                 </Button>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <Label>Features</Label>
//               <div className="space-y-2">
//                 {formData.features.map((feature, index) => (
//                   <div key={index} className="flex items-center justify-between p-2 border rounded-md">
//                     <span>{feature}</span>
//                     <button type="button" onClick={() => removeFeature(feature)} className="hover:text-destructive">
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex gap-2">
//                 <Input
//                   value={newFeature}
//                   onChange={(e) => setNewFeature(e.target.value)}
//                   placeholder="Add a feature..."
//                   className="flex-grow"
//                 />
//                 <Button type="button" onClick={addFeature} variant="outline">
//                   <Plus className="h-4 w-4 mr-2" />
//                   Add
//                 </Button>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="setupInstructions">Setup Instructions</Label>
//               <Textarea
//                 id="setupInstructions"
//                 name="setupInstructions"
//                 value={formData.setupInstructions}
//                 onChange={handleChange}
//                 placeholder="Provide instructions for setting up this workflow..."
//                 rows={6}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         <CardFooter className="flex justify-between px-0">
//           <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
//             Cancel
//           </Button>
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//             {workflow ? "Update Workflow" : "Create Workflow"}
//           </Button>
//         </CardFooter>
//       </div>
//     </form>
//   )
// }

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { X, Plus, Loader2 } from "lucide-react"
import { createWorkflow, updateWorkflow } from "@/lib/actions/workflows"

// Define interface for workflow data
interface Workflow {
  id: string
  name: string
  description: string
  category: string
  n8nWorkflowId: string
  pricing: string
  integrations: string[]
  features: string[]
  setupInstructions: string
  setupTime: string
}

interface WorkflowFormProps {
  workflow?: Workflow
  categories: string[]
  availableIntegrations: string[]
}

export function WorkflowForm({ workflow, categories, availableIntegrations }: WorkflowFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Workflow>({
    id: workflow?.id || "",
    name: workflow?.name || "",
    description: workflow?.description || "",
    category: workflow?.category || "",
    n8nWorkflowId: workflow?.n8nWorkflowId || "",
    pricing: workflow?.pricing || "Free",
    integrations: workflow?.integrations || [],
    features: workflow?.features || [],
    setupInstructions: workflow?.setupInstructions || "",
    setupTime: workflow?.setupTime || "5 minutes",
  })

  const [newIntegration, setNewIntegration] = useState("")
  const [newFeature, setNewFeature] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addIntegration = () => {
    if (!newIntegration) return
    setFormData((prev) => ({
      ...prev,
      integrations: [...prev.integrations, newIntegration],
    }))
    setNewIntegration("")
  }

  const removeIntegration = (integration: string) => {
    setFormData((prev) => ({
      ...prev,
      integrations: prev.integrations.filter((i: string) => i !== integration),
    }))
  }

  const addFeature = () => {
    if (!newFeature) return
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, newFeature],
    }))
    setNewFeature("")
  }

  const removeFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f: string) => f !== feature),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (workflow) {
        await updateWorkflow(workflow.id, formData)
        toast({
          title: "Workflow updated",
          description: "The workflow has been updated successfully.",
        })
      } else {
        await createWorkflow(formData)
        toast({
          title: "Workflow created",
          description: "The workflow has been created successfully.",
        })
      }
      router.push("/admin/workflows")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id">Workflow ID</Label>
              <Input
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="unique-workflow-id"
                required
                disabled={!!workflow}
              />
              {!workflow && (
                <p className="text-sm text-muted-foreground">
                  This will be used in URLs. Use lowercase letters, numbers, and hyphens only.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Email Automation Agent"
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
                placeholder="Describe what this workflow does..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workflow Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="n8nWorkflowId">n8n Workflow ID</Label>
              <Input
                id="n8nWorkflowId"
                name="n8nWorkflowId"
                value={formData.n8nWorkflowId}
                onChange={handleChange}
                placeholder="123456"
                required
              />
              <p className="text-sm text-muted-foreground">The ID of the workflow in your n8n instance.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricing">Pricing</Label>
              <Select value={formData.pricing} onValueChange={(value) => handleSelectChange("pricing", value)}>
                <SelectTrigger id="pricing">
                  <SelectValue placeholder="Select pricing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="$9.99/month">$9.99/month</SelectItem>
                  <SelectItem value="$19.99/month">$19.99/month</SelectItem>
                  <SelectItem value="$29.99/month">$29.99/month</SelectItem>
                  <SelectItem value="$49.99/month">$49.99/month</SelectItem>
                  <SelectItem value="Custom">Custom Pricing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="setupTime">Setup Time</Label>
              <Select value={formData.setupTime} onValueChange={(value) => handleSelectChange("setupTime", value)}>
                <SelectTrigger id="setupTime">
                  <SelectValue placeholder="Select setup time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5 minutes">5 minutes</SelectItem>
                  <SelectItem value="10 minutes">10 minutes</SelectItem>
                  <SelectItem value="15 minutes">15 minutes</SelectItem>
                  <SelectItem value="30 minutes">30 minutes</SelectItem>
                  <SelectItem value="1 hour">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrations & Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Required Integrations</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.integrations.map((integration: string) => (
                  <Badge key={integration} variant="secondary" className="flex items-center gap-1">
                    {integration}
                    <button
                      type="button"
                      onClick={() => removeIntegration(integration)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Select value={newIntegration} onValueChange={setNewIntegration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select integration" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableIntegrations.map((integration: string) => (
                      <SelectItem key={integration} value={integration}>
                        {integration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={addIntegration} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Features</Label>
              <div className="space-y-2">
                {formData.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <span>{feature}</span>
                    <button type="button" onClick={() => removeFeature(feature)} className="hover:text-destructive">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature..."
                  className="flex-grow"
                />
                <Button type="button" onClick={addFeature} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="setupInstructions">Setup Instructions</Label>
              <Textarea
                id="setupInstructions"
                name="setupInstructions"
                value={formData.setupInstructions}
                onChange={handleChange}
                placeholder="Provide instructions for setting up this workflow..."
                rows={6}
              />
            </div>
          </CardContent>
        </Card>

        <CardFooter className="flex justify-between px-0">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {workflow ? "Update Workflow" : "Create Workflow"}
          </Button>
        </CardFooter>
      </div>
    </form>
  )
}