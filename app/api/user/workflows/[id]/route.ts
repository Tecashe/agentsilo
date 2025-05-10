import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { z } from "zod"

// Schema for updating user workflow
const updateUserWorkflowSchema = z.object({
  status: z.enum(["active", "paused"]).optional(),
  integration_config: z.record(z.any()).optional(),
})

// GET /api/user/workflows/[id] - Get a user workflow by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Get user workflow with related data
    const { data: userWorkflow, error } = await supabase
      .from("user_workflows")
      .select(
        `
        *,
        workflow:workflows (
          id, name, description, category, version, pricing_tier, price, setup_time,
          workflow_features (feature),
          workflow_integrations (id, integration_name, integration_type, is_required, config_schema, description)
        )
      `,
      )
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single()

    if (error) {
      throw error
    }

    // Get usage statistics
    const { data: usage, error: usageError } = await supabase
      .from("workflow_usage")
      .select("execution_count, last_executed_at")
      .eq("workflow_id", userWorkflow.workflow_id)
      .eq("user_id", user.id)
      .maybeSingle()

    if (usageError) {
      throw usageError
    }

    // Get recent execution logs
    const { data: executionLogs, error: logsError } = await supabase
      .from("workflow_execution_logs")
      .select("*")
      .eq("user_workflow_id", params.id)
      .order("created_at", { ascending: false })
      .limit(10)

    if (logsError) {
      throw logsError
    }

    // Extract features
    const features = userWorkflow.workflow.workflow_features.map((f: any) => f.feature)

    // Format the response
    const formattedData = {
      id: userWorkflow.id,
      workflow_id: userWorkflow.workflow_id,
      status: userWorkflow.status,
      integration_config: userWorkflow.integration_config,
      created_at: userWorkflow.created_at,
      updated_at: userWorkflow.updated_at,
      workflow: {
        ...userWorkflow.workflow,
        features,
        integrations: userWorkflow.workflow.workflow_integrations,
      },
      usage: {
        execution_count: usage?.execution_count || 0,
        last_executed_at: usage?.last_executed_at || null,
      },
      recent_executions: executionLogs,
    }

    return NextResponse.json(formattedData)
  } catch (error: any) {
    console.error("Error fetching user workflow:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PATCH /api/user/workflows/[id] - Update a user workflow
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Validate request body
    const validatedData = updateUserWorkflowSchema.parse(body)

    // Check if user workflow exists
    const { data: existingWorkflow, error: checkError } = await supabase
      .from("user_workflows")
      .select("id")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single()

    if (checkError) {
      throw new Error("User workflow not found")
    }

    // Update user workflow
    const { data: updatedWorkflow, error } = await supabase
      .from("user_workflows")
      .update({
        ...(validatedData.status && { status: validatedData.status }),
        ...(validatedData.integration_config && { integration_config: validatedData.integration_config }),
      })
      .eq("id", params.id)
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json(updatedWorkflow)
  } catch (error: any) {
    console.error("Error updating user workflow:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE /api/user/workflows/[id] - Delete a user workflow
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Delete user workflow
    const { error } = await supabase.from("user_workflows").delete().eq("id", params.id).eq("user_id", user.id)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deleting user workflow:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
