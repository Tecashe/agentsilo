import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { agents } from "@/lib/data"

// This is a utility endpoint to seed the database with initial data
// In production, you would want to protect this endpoint or remove it entirely
export async function GET(request: Request) {
  const supabase = await createServerSupabaseClient()

  // Only allow this in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "This endpoint is only available in development" }, { status: 403 })
  }

  try {
    // Seed agents
    for (const agent of agents) {
      const { error } = await supabase.from("agents").upsert({
        id: agent.id,
        name: agent.name,
        description: agent.description,
        category: agent.category,
        features: agent.features,
        integrations: agent.integrations,
        tools: agent.tools,
        code: agent.code,
        setupTime: agent.setupTime,
        pricing: agent.pricing,
        created_at: new Date().toISOString(),
      })

      if (error) {
        console.error(`Error seeding agent ${agent.id}:`, error)
      }
    }

    return NextResponse.json({ success: true, message: "Database seeded successfully" })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
