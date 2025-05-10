import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { z } from "zod"

// Schema for rating a workflow
const rateWorkflowSchema = z.object({
  rating: z.number().min(1).max(5),
  review: z.string().optional(),
})

// POST /api/workflows/[id]/rate - Rate a workflow
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
    const validatedData = rateWorkflowSchema.parse(body)

    // Check if workflow exists and is published
    const { data: workflow, error: workflowError } = await supabase
      .from("workflows")
      .select("id")
      .eq("id", params.id)
      .eq("is_published", true)
      .single()

    if (workflowError) {
      throw new Error("Workflow not found or not published")
    }

    // Check if user has already rated this workflow
    const { data: existingRating, error: ratingError } = await supabase
      .from("workflow_ratings")
      .select("id")
      .eq("workflow_id", params.id)
      .eq("user_id", user.id)
      .maybeSingle()

    if (ratingError) {
      throw ratingError
    }

    let result

    if (existingRating) {
      // Update existing rating
      const { data, error } = await supabase
        .from("workflow_ratings")
        .update({
          rating: validatedData.rating,
          review: validatedData.review || null,
        })
        .eq("id", existingRating.id)
        .select()
        .single()

      if (error) {
        throw error
      }

      result = data
    } else {
      // Create new rating
      const { data, error } = await supabase
        .from("workflow_ratings")
        .insert({
          workflow_id: params.id,
          user_id: user.id,
          rating: validatedData.rating,
          review: validatedData.review || null,
        })
        .select()
        .single()

      if (error) {
        throw error
      }

      result = data
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Error rating workflow:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
