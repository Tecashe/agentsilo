import { notFound } from "next/navigation"
import { WorkflowForm } from "@/components/admin/workflow-form"
import { getWorkflowById, getCategories, getAvailableIntegrations } from "@/lib/actions/workflows"
import { requireAdmin } from "@/lib/auth"

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Workflow</h1>
        <p className="text-muted-foreground">Update the details of this workflow.</p>
      </div>

      <WorkflowForm workflow={workflow} categories={categories} availableIntegrations={availableIntegrations} />
    </div>
  )
}
