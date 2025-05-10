import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET /api/workflows - Get all published workflows
export async function GET(request: Request) {
  const supabase = await createServerSupabaseClient()
  const url = new URL(request.url)

  // Parse query parameters
  const category = url.searchParams.get("category")
  const featured = url.searchParams.get("featured") === "true"
  const search = url.searchParams.get("search")
  const limit = Number.parseInt(url.searchParams.get("limit") || "100")
  const page = Number.parseInt(url.searchParams.get("page") || "1")
  const offset = (page - 1) * limit

  try {
    // Start building the query
    let query = supabase
      .from("workflows")
      .select(
        `
        *,
        workflow_features (feature),
        workflow_integrations (id, integration_name, integration_type, is_required, description),
        workflow_ratings (rating)
      `,
        { count: "exact" },
      )
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1)

    // Apply filters if provided
    if (category) {
      query = query.eq("category", category)
    }

    if (featured) {
      query = query.eq("is_featured", true)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Execute the query
    const { data, error, count } = await query

    if (error) {
      throw error
    }

    // Process the data to calculate average rating and format the response
    const processedData = data.map((workflow) => {
      // Calculate average rating
      const ratings = workflow.workflow_ratings || []
      const totalRatings = ratings.length
      const averageRating =
        totalRatings > 0 ? ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / totalRatings : null

      // Extract features
      const features = (workflow.workflow_features || []).map((f: any) => f.feature)

      // Return formatted workflow
      return {
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
        },
      }
    })

    return NextResponse.json({
      workflows: processedData,
      pagination: {
        total: count || 0,
        page,
        limit,
        pages: count ? Math.ceil(count / limit) : 0,
      },
    })
  } catch (error: any) {
    console.error("Error fetching workflows:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
