"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

export async function getAgents() {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.from("agents").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching agents:", error)
    return []
  }

  return data
}

export async function getAgentById(id: string) {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.from("agents").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching agent:", error)
    return null
  }

  return data
}

export async function getUserAgents() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from("user_agents")
    .select("*, agent:agents(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user agents:", error)
    return []
  }

  return data
}

export async function getUserAgentById(id: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from("user_agents")
    .select("*, agent:agents(*)")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (error) {
    console.error("Error fetching user agent:", error)
    return null
  }

  return data
}

export async function deployAgent(
  agentId: string,
  formData: {
    name: string
    description: string
    settings?: any
  },
) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to deploy an agent")
  }

  // Get the agent details
  const agent = await getAgentById(agentId)

  if (!agent) {
    throw new Error("Agent not found")
  }

  // Create a new user agent
  const { error } = await supabase.from("user_agents").insert({
    id: uuidv4(),
    user_id: user.id,
    agent_id: agentId,
    name: formData.name || agent.name,
    description: formData.description || agent.description,
    status: "active",
    settings: formData.settings || {},
  })

  if (error) {
    console.error("Error deploying agent:", error)
    throw new Error("Failed to deploy agent")
  }

  // Log the activity
  await supabase.from("activity_logs").insert({
    user_id: user.id,
    agent_id: agentId,
    action: `Deployed agent: ${formData.name || agent.name}`,
    status: "success",
    category: agent.category,
  })

  revalidatePath("/dashboard/my-agents")
  redirect("/dashboard/my-agents")
}

export async function updateUserAgent(
  id: string,
  updates: {
    name?: string
    description?: string
    status?: string
    settings?: any
  },
) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to update an agent")
  }

  // Get the current user agent
  const userAgent = await getUserAgentById(id)

  if (!userAgent) {
    throw new Error("Agent not found")
  }

  // Update the user agent
  const { error } = await supabase
    .from("user_agents")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) {
    console.error("Error updating agent:", error)
    throw new Error("Failed to update agent")
  }

  // Log the activity
  await supabase.from("activity_logs").insert({
    user_id: user.id,
    agent_id: userAgent.agent_id,
    action: `Updated agent: ${userAgent.name}`,
    status: "success",
    category: userAgent.agent.category,
  })

  revalidatePath(`/dashboard/my-agents/${id}`)
  revalidatePath("/dashboard/my-agents")
}

export async function deleteUserAgent(id: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to delete an agent")
  }

  // Get the current user agent
  const userAgent = await getUserAgentById(id)

  if (!userAgent) {
    throw new Error("Agent not found")
  }

  // Delete the user agent
  const { error } = await supabase.from("user_agents").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    console.error("Error deleting agent:", error)
    throw new Error("Failed to delete agent")
  }

  // Log the activity
  await supabase.from("activity_logs").insert({
    user_id: user.id,
    agent_id: userAgent.agent_id,
    action: `Deleted agent: ${userAgent.name}`,
    status: "success",
    category: userAgent.agent.category,
  })

  revalidatePath("/dashboard/my-agents")
  redirect("/dashboard/my-agents")
}
