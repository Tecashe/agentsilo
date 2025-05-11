// import { notFound } from "next/navigation"
// import { WorkflowForm } from "@/components/admin/workflow-form"
// import { getWorkflowById, getCategories, getAvailableIntegrations } from "@/lib/actions/workflows"
// import { requireAdmin } from "@/lib/auth"

// export default async function EditWorkflowPage({ params }: { params: { id: string } }) {
//   // Ensure user is an admin
//   await requireAdmin()

//   // Get workflow, categories, and available integrations
//   const workflow = await getWorkflowById(params.id)

//   if (!workflow) {
//     notFound()
//   }

//   const categories = await getCategories()
//   const availableIntegrations = await getAvailableIntegrations()

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Edit Workflow</h1>
//         <p className="text-muted-foreground">Update the details of this workflow.</p>
//       </div>

//       <WorkflowForm workflow={workflow} categories={categories} availableIntegrations={availableIntegrations} />
//     </div>
//   )
// }

// import { notFound } from "next/navigation"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { WorkflowForm } from "@/components/admin/workflow-form"
// import { WorkflowStepsForm } from "@/components/admin/workflow-steps-form"
// import { WorkflowMediaForm } from "@/components/admin/workflow-media-form"
// import { getWorkflowById, getCategories, getAvailableIntegrations } from "@/lib/actions/workflows"
// import { requireAdmin } from "@/lib/auth"

// export default async function EditWorkflowPage({ params }: { params: { id: string } }) {
//   // Ensure user is an admin
//   await requireAdmin()

//   // Get workflow, categories, and available integrations
//   const workflow = await getWorkflowById(params.id)

//   if (!workflow) {
//     notFound()
//   }

//   const categories = await getCategories()
//   const availableIntegrations = await getAvailableIntegrations()

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Edit Workflow</h1>
//         <p className="text-muted-foreground">Update the details of this workflow.</p>
//       </div>

//       <Tabs defaultValue="basic">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="basic">Basic Information</TabsTrigger>
//           <TabsTrigger value="steps">Workflow Steps</TabsTrigger>
//           <TabsTrigger value="media">Media & Tutorials</TabsTrigger>
//         </TabsList>

//         <TabsContent value="basic" className="pt-6">
//           <WorkflowForm workflow={workflow} categories={categories} availableIntegrations={availableIntegrations} />
//         </TabsContent>

//         <TabsContent value="steps" className="pt-6">
//           <WorkflowStepsForm workflowId={workflow.id} />
//         </TabsContent>

//         <TabsContent value="media" className="pt-6">
//           <WorkflowMediaForm workflowId={workflow.id} />
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkflowForm } from "@/components/admin/workflow-form"
import { WorkflowStepsForm } from "@/components/admin/workflow-steps-form"
import { WorkflowMediaForm } from "@/components/admin/workflow-media-form"
import { getWorkflowById, getCategories, getAvailableIntegrations } from "@/lib/actions/workflows"
import { requireAdmin } from "@/lib/auth"
import { toFormWorkflow } from "@/types/workflow"

export default async function EditWorkflowPage({ params }: { params: { id: string } }) {
  // Ensure user is an admin
  await requireAdmin()

  // Get workflow, categories, and available integrations
  const workflow = await getWorkflowById(params.id)

  if (!workflow) {
    notFound()
  }

  const categories = await getCategories()
  const availableIntegrations = await getAvailableIntegrations()

  // Transform the workflow to match the form's expected type
  const formWorkflow = toFormWorkflow(workflow)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Workflow</h1>
        <p className="text-muted-foreground">Update the details of this workflow.</p>
      </div>

      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="steps">Workflow Steps</TabsTrigger>
          <TabsTrigger value="media">Media & Tutorials</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="pt-6">
          <WorkflowForm workflow={formWorkflow} categories={categories} availableIntegrations={availableIntegrations} />
        </TabsContent>

        <TabsContent value="steps" className="pt-6">
          <WorkflowStepsForm workflowId={workflow.id} />
        </TabsContent>

        <TabsContent value="media" className="pt-6">
          <WorkflowMediaForm workflowId={workflow.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
