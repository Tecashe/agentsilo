import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET /api/user/workflows - Get all workflows subscribed by the current user
export async function GET(request: Request) {
  const supabase = await createServerSupabaseClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Get user workflows with related data
    const { data, error } = await supabase
      .from("user_workflows")
      .select(
        `
        *,
        workflow:workflows (
          id, name, description, category, version, pricing_tier, price, setup_time,
          workflow_features (feature),
          workflow_integrations (id, integration_name, integration_type, is_required, description)
        )
      `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    // Get usage statistics for each workflow
    const workflowIds = data.map((uw) => uw.workflow_id)
    const { data: usageData, error: usageError } = await supabase
      .from("workflow_usage")
      .select("workflow_id, execution_count, last_executed_at")
      .eq("user_id", user.id)
      .in("workflow_id", workflowIds)

    if (usageError) {
      throw usageError
    }

    // Create a map of workflow_id to usage data
    const usageMap = usageData.reduce((map: any, usage) => {
      map[usage.workflow_id] = usage
      return map
    }, {})

    // Format the response
    const formattedData = data.map((userWorkflow) => {
      const usage = usageMap[userWorkflow.workflow_id] || {
        execution_count: 0,
        last_executed_at: null,
      }

      // Extract features
      const features = userWorkflow.workflow.workflow_features.map((f: any) => f.feature)

      return {
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
          execution_count: usage.execution_count,
          last_executed_at: usage.last_executed_at,
        },
      }
    })

    return NextResponse.json(formattedData)
  } catch (error: any) {
    console.error("Error fetching user workflows:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
