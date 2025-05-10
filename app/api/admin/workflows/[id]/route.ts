import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { z } from "zod"
import { getWorkflow } from "@/lib/n8n-service"

// Schema for updating a workflow
const updateWorkflowSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  n8n_workflow_id: z.string().min(1, "n8n workflow ID is required").optional(),
  category: z.string().min(1, "Category is required").optional(),
  version: z.string().optional(),
  pricing_tier: z.string().optional(),
  price: z.number().min(0).optional(),
  setup_time: z.string().optional(),
  is_published: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  features: z.array(z.string()).optional(),
  integrations: z
    .array(
      z.object({
        id: z.string().optional(), // For existing integrations
        integration_name: z.string().min(1),
        integration_type: z.string().min(1),
        is_required: z.boolean().optional(),
        config_schema: z.record(z.any()).optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
})

// Check if user is admin
async function isAdmin(supabase: any) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  return profile?.role === "admin"
}

// GET /api/admin/workflows/[id] - Get a workflow by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()

  // Check if user is admin
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    // Get workflow from database
    const { data: workflow, error: workflowError } = await supabase
      .from("workflows")
      .select("*")
      .eq("id", params.id)
      .single()

    if (workflowError) {
      throw workflowError
    }

    // Get workflow features
    const { data: features, error: featuresError } = await supabase
      .from("workflow_features")
      .select("*")
      .eq("workflow_id", params.id)

    if (featuresError) {
      throw featuresError
    }

    // Get workflow integrations
    const { data: integrations, error: integrationsError } = await supabase
      .from("workflow_integrations")
      .select("*")
      .eq("workflow_id", params.id)

    if (integrationsError) {
      throw integrationsError
    }

    // Get n8n workflow details
    let n8nWorkflow = null
    try {
      n8nWorkflow = await getWorkflow(workflow.n8n_workflow_id)
    } catch (error) {
      console.error("Failed to fetch n8n workflow:", error)
      // Continue without n8n workflow details
    }

    return NextResponse.json({
      ...workflow,
      features: features.map((f) => f.feature),
      integrations,
      n8nWorkflow,
    })
  } catch (error: any) {
    console.error("Error fetching workflow:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT /api/admin/workflows/[id] - Update a workflow
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()

  // Check if user is admin
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const body = await request.json()

    // Validate request body
    const validatedData = updateWorkflowSchema.parse(body)

    // Update workflow
    const { data: workflow, error: workflowError } = await supabase
      .from("workflows")
      .update({
        ...(validatedData.name && { name: validatedData.name }),
        ...(validatedData.description && { description: validatedData.description }),
        ...(validatedData.n8n_workflow_id && { n8n_workflow_id: validatedData.n8n_workflow_id }),
        ...(validatedData.category && { category: validatedData.category }),
        ...(validatedData.version && { version: validatedData.version }),
        ...(validatedData.pricing_tier && { pricing_tier: validatedData.pricing_tier }),
        ...(validatedData.price !== undefined && { price: validatedData.price }),
        ...(validatedData.setup_time && { setup_time: validatedData.setup_time }),
        ...(validatedData.is_published !== undefined && { is_published: validatedData.is_published }),
        ...(validatedData.is_featured !== undefined && { is_featured: validatedData.is_featured }),
      })
      .eq("id", params.id)
      .select()
      .single()

    if (workflowError) {
      throw workflowError
    }

    // Update features if provided
    if (validatedData.features) {
      // Delete existing features
      const { error: deleteError } = await supabase.from("workflow_features").delete().eq("workflow_id", params.id)

      if (deleteError) {
        throw deleteError
      }

      // Add new features
      if (validatedData.features.length > 0) {
        const featureInserts = validatedData.features.map((feature) => ({
          workflow_id: params.id,
          feature,
        }))

        const { error: featuresError } = await supabase.from("workflow_features").insert(featureInserts)

        if (featuresError) {
          throw featuresError
        }
      }
    }

    // Update integrations if provided
    if (validatedData.integrations) {
      // Delete existing integrations
      const { error: deleteError } = await supabase.from("workflow_integrations").delete().eq("workflow_id", params.id)

      if (deleteError) {
        throw deleteError
      }

      // Add new integrations
      if (validatedData.integrations.length > 0) {
        const integrationInserts = validatedData.integrations.map((integration) => ({
          workflow_id: params.id,
          integration_name: integration.integration_name,
          integration_type: integration.integration_type,
          is_required: integration.is_required ?? true,
          config_schema: integration.config_schema || {},
          description: integration.description || null,
        }))

        const { error: integrationsError } = await supabase.from("workflow_integrations").insert(integrationInserts)

        if (integrationsError) {
          throw integrationsError
        }
      }
    }

    return NextResponse.json(workflow)
  } catch (error: any) {
    console.error("Error updating workflow:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE /api/admin/workflows/[id] - Delete a workflow
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()

  // Check if user is admin
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    // Delete workflow (cascade will handle related records)
    const { error } = await supabase.from("workflows").delete().eq("id", params.id)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deleting workflow:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
