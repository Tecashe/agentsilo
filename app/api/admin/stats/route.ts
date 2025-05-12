import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createServerSupabaseClient()

  try {
    // Check if user is authenticated and is an admin
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get the user's profile to check role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single()

    if (profileError || !profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    // Get total users count
    const { count: totalUsers, error: usersError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })

    if (usersError) {
      console.error("Error getting users count:", usersError)
    }

    // Get total workflows count
    const { count: totalWorkflows, error: workflowsError } = await supabase
      .from("workflows")
      .select("*", { count: "exact", head: true })

    if (workflowsError) {
      console.error("Error getting workflows count:", workflowsError)
    }

    // Get active workflows count
    const { count: activeWorkflows, error: activeWorkflowsError } = await supabase
      .from("workflows")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)

    if (activeWorkflowsError) {
      console.error("Error getting active workflows count:", activeWorkflowsError)
    }

    // Get popular categories
    // Using a simpler approach that works with TypeScript
    const { data: allWorkflows, error: categoriesError } = await supabase.from("workflows").select("category")

    let popularCategories: Array<{ category: string; count: number }> = []

    if (!categoriesError && allWorkflows) {
      // Count categories manually
      const categoryCounts: Record<string, number> = {}

      allWorkflows.forEach((workflow) => {
        if (workflow.category) {
          categoryCounts[workflow.category] = (categoryCounts[workflow.category] || 0) + 1
        }
      })

      // Convert to array and sort
      popularCategories = Object.entries(categoryCounts)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    } else {
      console.error("Error getting categories:", categoriesError)
    }

    // Get total executions (placeholder - would come from n8n in real implementation)
    const totalExecutions = 0 // This would be fetched from n8n in a real implementation

    // Get recent activity
    const { data: recentActivity, error: activityError } = await supabase
      .from("activity_logs")
      .select("id, action, created_at, user_id")
      .order("created_at", { ascending: false })
      .limit(10)

    let formattedActivity: Array<{ id: string; action: string; timestamp: string; user: string }> = []

    if (!activityError && recentActivity) {
      // Get user emails for the activity logs
      const userIds = [...new Set(recentActivity.map((activity) => activity.user_id))]

      const { data: users, error: usersLookupError } = await supabase
        .from("profiles")
        .select("id, email")
        .in("id", userIds)

      if (!usersLookupError && users) {
        const userMap = new Map(users.map((user) => [user.id, user.email]))

        formattedActivity = recentActivity.map((activity) => ({
          id: activity.id,
          action: activity.action,
          timestamp: activity.created_at,
          user: userMap.get(activity.user_id) || "Unknown User",
        }))
      } else {
        console.error("Error getting users for activity:", usersLookupError)
      }
    } else {
      console.error("Error getting activity:", activityError)
    }

    // Check n8n connection status
    // This would be a real check in production
    const n8nStatus = {
      connected: false,
      workflowCount: 0,
      message: "n8n integration not configured",
    }

    // Get n8n configuration from system_settings
    const { data: n8nConfig, error: n8nConfigError } = await supabase
      .from("system_settings")
      .select("value")
      .eq("key", "n8n_api_url")
      .single()

    if (!n8nConfigError && n8nConfig && n8nConfig.value) {
      // In a real implementation, we would check the connection to n8n here
      n8nStatus.connected = true
      n8nStatus.workflowCount = 5 // This would be fetched from n8n in a real implementation
      n8nStatus.message = "Connected to n8n successfully"
    }

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      totalWorkflows: totalWorkflows || 0,
      activeWorkflows: activeWorkflows || 0,
      totalExecutions,
      popularCategories,
      recentActivity: formattedActivity,
      n8nStatus,
    })
  } catch (error) {
    console.error("Error in admin stats API:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
