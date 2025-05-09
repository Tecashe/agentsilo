"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function getUserActivityLogs(limit = 50) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from("activity_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching activity logs:", error)
    return []
  }

  return data
}

export async function logActivity(activityData: {
  agent_id: string
  action: string
  status: string
  category: string
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to log activity")
  }

  const { error } = await supabase.from("activity_logs").insert({
    user_id: user.id,
    agent_id: activityData.agent_id,
    action: activityData.action,
    status: activityData.status,
    category: activityData.category,
  })

  if (error) {
    console.error("Error logging activity:", error)
    throw new Error("Failed to log activity")
  }
}
