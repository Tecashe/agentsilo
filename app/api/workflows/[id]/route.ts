import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET /api/workflows/[id] - Get a published workflow by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()

  try {
    // Get workflow with related data
    const { data: workflow, error } = await supabase
      .from("workflows")
      .select(
        `
        *,
        workflow_features (feature),
        workflow_integrations (id, integration_name, integration_type, is_required, config_schema, description),
        workflow_ratings (id, user_id, rating, review, created_at)
      `,
      )
      .eq("id", params.id)
      .eq("is_published", true)
      .single()

    if (error) {
      throw error
    }

    // Calculate average rating
    const ratings = workflow.workflow_ratings || []
    const totalRatings = ratings.length
    const averageRating =
      totalRatings > 0 ? ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / totalRatings : null

    // Extract features
    const features = (workflow.workflow_features || []).map((f: any) => f.feature)

    // Format the response
    const formattedWorkflow = {
      id: workflow.id,
      name: workflow.name,
      description: workflow.description,
      category: workflow.category,
      version: workflow.version,
      pricing_tier: workflow.pricing_tier,
      price: workflow.price,
      setup_time: workflow.setup_time,
      is_featured: workflow.is_featured,
      created_at: workflow.created_at,
      updated_at: workflow.updated_at,
      features,
      integrations: workflow.workflow_integrations || [],
      rating: {
        average: averageRating,
        count: totalRatings,
        reviews: workflow.workflow_ratings || [],
      },
    }

    return NextResponse.json(formattedWorkflow)
  } catch (error: any) {
    console.error("Error fetching workflow:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
