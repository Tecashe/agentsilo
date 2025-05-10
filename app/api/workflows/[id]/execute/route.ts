import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { z } from "zod"
import { executeWorkflow } from "@/lib/n8n-service"

// Schema for executing a workflow
const executeWorkflowSchema = z.object({
  input_data: z.record(z.any()),
})

// POST /api/workflows/[id]/execute - Execute a workflow
export async function POST(request: Request, { params }: { params: { id: string } }) {
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
    const validatedData = executeWorkflowSchema.parse(body)

    // Get the workflow
    const { data: workflow, error: workflowError } = await supabase
      .from("workflows")
      .select("*")
      .eq("id", params.id)
      .eq("is_published", true)
      .single()

    if (workflowError) {
      throw workflowError
    }

    // Check if user has subscribed to this workflow
    const { data: userWorkflow, error: userWorkflowError } = await supabase
      .from("user_workflows")
      .select("*")
      .eq("user_id", user.id)
      .eq("workflow_id", params.id)
      .single()

    if (userWorkflowError) {
      // If user hasn't subscribed, create a subscription
      const { data: newUserWorkflow, error: createError } = await supabase
        .from("user_workflows")
        .insert({
          user_id: user.id,
          workflow_id: params.id,
          status: "active",
          integration_config: {},
        })
        .select()
        .single()

      if (createError) {
        throw createError
      }

      // Use the new subscription
      const userWorkflow = newUserWorkflow
    }

    // Start execution time measurement
    const startTime = Date.now()

    // Execute the workflow
    const executionResult = await executeWorkflow(workflow.n8n_workflow_id, {
      ...validatedData.input_data,
      user_id: user.id,
      workflow_id: params.id,
      integration_config: userWorkflow.integration_config,
    })

    // Calculate execution time
    const executionTime = Date.now() - startTime

    // Log the execution
    const { data: executionLog, error: logError } = await supabase
      .from("workflow_execution_logs")
      .insert({
        user_workflow_id: userWorkflow.id,
        status: executionResult.status,
        input_data: validatedData.input_data,
        output_data: executionResult.data,
        error_message: executionResult.error?.message,
        execution_time: executionTime,
      })
      .select()
      .single()

    if (logError) {
      console.error("Error logging execution:", logError)
      // Continue without throwing, as the execution itself was successful
    }

    // Update usage statistics
    const { error: usageError } = await supabase.rpc("increment_workflow_usage", {
      p_workflow_id: params.id,
      p_user_id: user.id,
    })

    if (usageError) {
      console.error("Error updating usage statistics:", usageError)
      // Continue without throwing
    }

    return NextResponse.json({
      execution_id: executionResult.id,
      status: executionResult.status,
      data: executionResult.data,
      execution_time: executionTime,
    })
  } catch (error: any) {
    console.error("Error executing workflow:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
