import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createServerSupabaseClient()

  try {
    // Get the current session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      console.log("[ADMIN-CHECK] No session found")
      return NextResponse.json(
        {
          isAdmin: false,
          error: "Not authenticated",
          debug: "No session found",
        },
        { status: 401 },
      )
    }

    // Get the user's profile to check role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single()

    if (profileError) {
      console.log("[ADMIN-CHECK] Profile error:", profileError.message)
      return NextResponse.json(
        {
          isAdmin: false,
          error: "Could not verify admin status",
          debug: `Profile error: ${profileError.message}`,
        },
        { status: 500 },
      )
    }

    if (!profile) {
      console.log("[ADMIN-CHECK] No profile found for user:", session.user.id)
      return NextResponse.json(
        {
          isAdmin: false,
          error: "Profile not found",
          debug: `No profile for user: ${session.user.id}`,
        },
        { status: 404 },
      )
    }

    const isAdmin = profile.role === "admin"
    console.log("[ADMIN-CHECK] User:", session.user.id, "isAdmin:", isAdmin, "Role:", profile.role)

    return NextResponse.json({
      isAdmin,
      role: profile.role,
      userId: session.user.id,
      debug: `User has role: ${profile.role}`,
    })
  } catch (error) {
    console.error("[ADMIN-CHECK] Unexpected error:", error)
    return NextResponse.json(
      {
        isAdmin: false,
        error: "Server error",
        debug: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}

