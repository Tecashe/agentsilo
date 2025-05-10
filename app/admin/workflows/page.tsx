// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { useToast } from "@/hooks/use-toast"
// import { Plus, Search, MoreHorizontal, Edit, Trash, Eye, CheckCircle, XCircle } from "lucide-react"

// export default function AdminWorkflowsPage() {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [isLoading, setIsLoading] = useState(true)
//   const [workflows, setWorkflows] = useState([])
//   const [n8nWorkflows, setN8nWorkflows] = useState([])
//   const [searchQuery, setSearchQuery] = useState("")
//   const [activeTab, setActiveTab] = useState("all")

//   useEffect(() => {
//     fetchWorkflows()
//   }, [])

//   const fetchWorkflows = async () => {
//     setIsLoading(true)
//     try {
//       const response = await fetch("/api/admin/workflows")
//       if (!response.ok) {
//         throw new Error("Failed to fetch workflows")
//       }
//       const data = await response.json()
//       setWorkflows(data.workflows || [])
//       setN8nWorkflows(data.n8nWorkflows || [])
//     } catch (error) {
//       console.error("Error fetching workflows:", error)
//       toast({
//         title: "Error",
//         description: "Failed to load workflows. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleDeleteWorkflow = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this workflow?")) {
//       return
//     }

//     try {
//       const response = await fetch(`/api/admin/workflows/${id}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete workflow")
//       }

//       toast({
//         title: "Success",
//         description: "Workflow deleted successfully",
//       })

//       // Refresh the list
//       fetchWorkflows()
//     } catch (error) {
//       console.error("Error deleting workflow:", error)
//       toast({
//         title: "Error",
//         description: "Failed to delete workflow. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleTogglePublish = async (id: string, currentStatus: boolean) => {
//     try {
//       const response = await fetch(`/api/admin/workflows/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           is_published: !currentStatus,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update workflow")
//       }

//       toast({
//         title: "Success",
//         description: `Workflow ${!currentStatus ? "published" : "unpublished"} successfully`,
//       })

//       // Refresh the list
//       fetchWorkflows()
//     } catch (error) {
//       console.error("Error updating workflow:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update workflow. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const filteredWorkflows = workflows.filter((workflow) => {
//     // Filter by search query
//     const matchesSearch =
//       searchQuery === "" ||
//       workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       workflow.description.toLowerCase().includes(searchQuery.toLowerCase())

//     // Filter by tab
//     if (activeTab === "all") {
//       return matchesSearch
//     } else if (activeTab === "published") {
//       return matchesSearch && workflow.is_published
//     } else if (activeTab === "draft") {
//       return matchesSearch && !workflow.is_published
//     } else if (activeTab === "featured") {
//       return matchesSearch && workflow.is_featured
//     }

//     return matchesSearch
//   })

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Manage Workflows</h1>
//         <Button asChild>
//           <Link href="/admin/workflows/new">
//             <Plus className="mr-2 h-4 w-4" /> Add New Workflow
//           </Link>
//         </Button>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Workflows</CardTitle>
//           <CardDescription>Manage your n8n workflows that are available in the marketplace.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="flex items-center gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search workflows..."
//                   className="pl-8"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
//                 <TabsList className="grid grid-cols-4">
//                   <TabsTrigger value="all">All</TabsTrigger>
//                   <TabsTrigger value="published">Published</TabsTrigger>
//                   <TabsTrigger value="draft">Draft</TabsTrigger>
//                   <TabsTrigger value="featured">Featured</TabsTrigger>
//                 </TabsList>
//               </Tabs>
//             </div>

//             {isLoading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//               </div>
//             ) : (
//               <div className="rounded-md border">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Name</TableHead>
//                       <TableHead>Category</TableHead>
//                       <TableHead>Price</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>Featured</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredWorkflows.length === 0 ? (
//                       <TableRow>
//                         <TableCell colSpan={6} className="h-24 text-center">
//                           No workflows found.
//                         </TableCell>
//                       </TableRow>
//                     ) : (
//                       filteredWorkflows.map((workflow) => (
//                         <TableRow key={workflow.id}>
//                           <TableCell className="font-medium">{workflow.name}</TableCell>
//                           <TableCell>
//                             <Badge variant="outline">{workflow.category}</Badge>
//                           </TableCell>
//                           <TableCell>
//                             {workflow.price > 0
//                               ? `$${workflow.price.toFixed(2)}`
//                               : workflow.pricing_tier === "free"
//                                 ? "Free"
//                                 : workflow.pricing_tier}
//                           </TableCell>
//                           <TableCell>
//                             {workflow.is_published ? (
//                               <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">
//                                 Published
//                               </Badge>
//                             ) : (
//                               <Badge variant="outline">Draft</Badge>
//                             )}
//                           </TableCell>
//                           <TableCell>
//                             {workflow.is_featured ? (
//                               <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
//                             ) : (
//                               <XCircle className="h-5 w-5 text-muted-foreground" />
//                             )}
//                           </TableCell>
//                           <TableCell className="text-right">
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button variant="ghost" className="h-8 w-8 p-0">
//                                   <span className="sr-only">Open menu</span>
//                                   <MoreHorizontal className="h-4 w-4" />
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                 <DropdownMenuItem asChild>
//                                   <Link href={`/admin/workflows/${workflow.id}`}>
//                                     <Eye className="mr-2 h-4 w-4" /> View
//                                   </Link>
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem asChild>
//                                   <Link href={`/admin/workflows/${workflow.id}/edit`}>
//                                     <Edit className="mr-2 h-4 w-4" /> Edit
//                                   </Link>
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem
//                                   onClick={() => handleTogglePublish(workflow.id, workflow.is_published)}
//                                 >
//                                   {workflow.is_published ? (
//                                     <>
//                                       <XCircle className="mr-2 h-4 w-4" /> Unpublish
//                                     </>
//                                   ) : (
//                                     <>
//                                       <CheckCircle className="mr-2 h-4 w-4" /> Publish
//                                     </>
//                                   )}
//                                 </DropdownMenuItem>
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuItem
//                                   className="text-destructive focus:text-destructive"
//                                   onClick={() => handleDeleteWorkflow(workflow.id)}
//                                 >
//                                   <Trash className="mr-2 h-4 w-4" /> Delete
//                                 </DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     )}
//                   </TableBody>
//                 </Table>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Available n8n Workflows</CardTitle>
//           <CardDescription>
//             These are the workflows available in your n8n instance that can be added to the marketplace.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {isLoading ? (
//             <div className="flex justify-center items-center h-32">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//             </div>
//           ) : n8nWorkflows.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-muted-foreground">No n8n workflows found.</p>
//               <p className="text-sm text-muted-foreground mt-1">
//                 Make sure your n8n instance is running and properly configured.
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {n8nWorkflows.map((workflow) => {
//                 // Check if this n8n workflow is already added to the marketplace
//                 const isAdded = workflows.some((w) => w.n8n_workflow_id === workflow.id)

//                 return (
//                   <Card key={workflow.id} className="overflow-hidden">
//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-lg">{workflow.name}</CardTitle>
//                       <CardDescription className="text-xs">ID: {workflow.id}</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="flex justify-between items-center">
//                         <Badge variant={workflow.active ? "default" : "outline"}>
//                           {workflow.active ? "Active" : "Inactive"}
//                         </Badge>
//                         {isAdded ? (
//                           <Badge variant="outline" className="bg-muted">
//                             Already Added
//                           </Badge>
//                         ) : (
//                           <Button
//                             size="sm"
//                             onClick={() =>
//                               router.push(`/admin/workflows/new?n8n_workflow_id=${workflow.id}&name=${workflow.name}`)
//                             }
//                           >
//                             Add to Marketplace
//                           </Button>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 )
//               })}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { WorkflowList } from "@/components/admin/workflow-list"
import { getWorkflows } from "@/lib/actions/workflows"
import { requireAdmin } from "@/lib/auth"

export default async function AdminWorkflowsPage() {
  // Ensure user is an admin
  await requireAdmin()

  // Get all workflows
  const workflows = await getWorkflows()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your n8n workflows that are available in the marketplace.</p>
        </div>
        <Button asChild>
          <Link href="/admin/workflows/new">
            <Plus className="h-4 w-4 mr-2" />
            New Workflow
          </Link>
        </Button>
      </div>

      <WorkflowList workflows={workflows} />
    </div>
  )
}
