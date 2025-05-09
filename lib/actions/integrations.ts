"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"

export async function getUserIntegrations() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from("integrations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching integrations:", error)
    return []
  }

  return data
}

export async function connectIntegration(integrationData: {
  name: string
  description: string
  category: string
  credentials?: any
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to connect an integration")
  }

  // Check if integration already exists
  const { data: existingIntegration } = await supabase
    .from("integrations")
    .select("*")
    .eq("user_id", user.id)
    .eq("name", integrationData.name)
    .single()

  if (existingIntegration) {
    // Update existing integration
    const { error } = await supabase
      .from("integrations")
      .update({
        connected: true,
        credentials: integrationData.credentials || existingIntegration.credentials,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingIntegration.id)

    if (error) {
      console.error("Error updating integration:", error)
      throw new Error("Failed to update integration")
    }
  } else {
    // Create new integration
    const { error } = await supabase.from("integrations").insert({
      id: uuidv4(),
      user_id: user.id,
      name: integrationData.name,
      description: integrationData.description,
      category: integrationData.category,
      connected: true,
      credentials: integrationData.credentials || {},
    })

    if (error) {
      console.error("Error connecting integration:", error)
      throw new Error("Failed to connect integration")
    }
  }

  // Log the activity
  await supabase.from("activity_logs").insert({
    user_id: user.id,
    agent_id: "system",
    action: `Connected integration: ${integrationData.name}`,
    status: "success",
    category: "integration",
  })

  revalidatePath("/dashboard/integrations")
}

export async function disconnectIntegration(integrationId: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to disconnect an integration")
  }

  // Get the integration
  const { data: integration } = await supabase
    .from("integrations")
    .select("*")
    .eq("id", integrationId)
    .eq("user_id", user.id)
    .single()

  if (!integration) {
    throw new Error("Integration not found")
  }

  // Update the integration
  const { error } = await supabase
    .from("integrations")
    .update({
      connected: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", integrationId)
    .eq("user_id", user.id)

  if (error) {
    console.error("Error disconnecting integration:", error)
    throw new Error("Failed to disconnect integration")
  }

  // Log the activity
  await supabase.from("activity_logs").insert({
    user_id: user.id,
    agent_id: "system",
    action: `Disconnected integration: ${integration.name}`,
    status: "success",
    category: "integration",
  })

  revalidatePath("/dashboard/integrations")
}
