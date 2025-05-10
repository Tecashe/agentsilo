"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

// Get all workflows
export async function getWorkflows() {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.from("workflows").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching workflows:", error)
    return []
  }

  return data
}

// Get workflow by ID
export async function getWorkflowById(id: string) {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.from("workflows").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching workflow:", error)
    return null
  }

  return data
}

// Create a new workflow
export async function createWorkflow(workflowData: any) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to create a workflow")
  }

  // Check if user is an admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "admin") {
    throw new Error("Only administrators can create workflows")
  }

  const { error } = await supabase.from("workflows").insert({
    id: workflowData.id,
    name: workflowData.name,
    description: workflowData.description,
    category: workflowData.category,
    n8n_workflow_id: workflowData.n8nWorkflowId,
    pricing: workflowData.pricing,
    integrations: workflowData.integrations,
    features: workflowData.features,
    setup_instructions: workflowData.setupInstructions,
    setup_time: workflowData.setupTime,
    created_by: user.id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    rating: 0,
    usage_count: 0,
  })

  if (error) {
    console.error("Error creating workflow:", error)
    throw new Error("Failed to create workflow")
  }

  revalidatePath("/admin/workflows")
  revalidatePath("/marketplace")
}

// Update an existing workflow
export async function updateWorkflow(id: string, workflowData: any) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to update a workflow")
  }

  // Check if user is an admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "admin") {
    throw new Error("Only administrators can update workflows")
  }

  const { error } = await supabase
    .from("workflows")
    .update({
      name: workflowData.name,
      description: workflowData.description,
      category: workflowData.category,
      n8n_workflow_id: workflowData.n8nWorkflowId,
      pricing: workflowData.pricing,
      integrations: workflowData.integrations,
      features: workflowData.features,
      setup_instructions: workflowData.setupInstructions,
      setup_time: workflowData.setupTime,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating workflow:", error)
    throw new Error("Failed to update workflow")
  }

  revalidatePath("/admin/workflows")
  revalidatePath(`/marketplace/${id}`)
  revalidatePath("/marketplace")
}

// Delete a workflow
export async function deleteWorkflow(id: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to delete a workflow")
  }

  // Check if user is an admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "admin") {
    throw new Error("Only administrators can delete workflows")
  }

  // First, check if there are any user deployments of this workflow
  const { data: deployments } = await supabase.from("user_workflows").select("id").eq("workflow_id", id)

  if (deployments && deployments.length > 0) {
    throw new Error("Cannot delete workflow that has active deployments")
  }

  const { error } = await supabase.from("workflows").delete().eq("id", id)

  if (error) {
    console.error("Error deleting workflow:", error)
    throw new Error("Failed to delete workflow")
  }

  revalidatePath("/admin/workflows")
  revalidatePath("/marketplace")
}

// Rate a workflow
export async function rateWorkflow(id: string, rating: number) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to rate a workflow")
  }

  // Check if user has already rated this workflow
  const { data: existingRating } = await supabase
    .from("workflow_ratings")
    .select("*")
    .eq("workflow_id", id)
    .eq("user_id", user.id)
    .single()

  if (existingRating) {
    // Update existing rating
    const { error } = await supabase
      .from("workflow_ratings")
      .update({ rating, updated_at: new Date().toISOString() })
      .eq("id", existingRating.id)

    if (error) {
      console.error("Error updating rating:", error)
      throw new Error("Failed to update rating")
    }
  } else {
    // Create new rating
    const { error } = await supabase.from("workflow_ratings").insert({
      id: uuidv4(),
      workflow_id: id,
      user_id: user.id,
      rating,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error creating rating:", error)
      throw new Error("Failed to create rating")
    }
  }

  // Update the average rating on the workflow
  const { data: ratings } = await supabase.from("workflow_ratings").select("rating").eq("workflow_id", id)

  if (ratings && ratings.length > 0) {
    const averageRating = ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length

    await supabase
      .from("workflows")
      .update({ rating: averageRating, updated_at: new Date().toISOString() })
      .eq("id", id)
  }

  revalidatePath(`/marketplace/${id}`)
}

// Deploy a workflow for a user
export async function deployWorkflow(
  workflowId: string,
  deploymentData: {
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
    throw new Error("You must be logged in to deploy a workflow")
  }

  // Get the workflow details
  const workflow = await getWorkflowById(workflowId)

  if (!workflow) {
    throw new Error("Workflow not found")
  }

  // Create a new user workflow deployment
  const { error } = await supabase.from("user_workflows").insert({
    id: uuidv4(),
    user_id: user.id,
    workflow_id: workflowId,
    name: deploymentData.name || workflow.name,
    description: deploymentData.description || workflow.description,
    status: "active",
    settings: deploymentData.settings || {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  if (error) {
    console.error("Error deploying workflow:", error)
    throw new Error("Failed to deploy workflow")
  }

  // Increment the usage count for the workflow
  await supabase
    .from("workflows")
    .update({
      usage_count: (workflow.usage_count || 0) + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("id", workflowId)

  // Log the activity
  await supabase.from("activity_logs").insert({
    user_id: user.id,
    workflow_id: workflowId,
    action: `Deployed workflow: ${deploymentData.name || workflow.name}`,
    status: "success",
    category: workflow.category,
    created_at: new Date().toISOString(),
  })

  revalidatePath("/dashboard/my-workflows")
  redirect("/dashboard/my-workflows")
}

// Get categories
export async function getCategories() {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.from("categories").select("name").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data.map((category) => category.name)
}

// Get available integrations
export async function getAvailableIntegrations() {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.from("integrations").select("name").order("name")

  if (error) {
    console.error("Error fetching integrations:", error)
    return []
  }

  return data.map((integration) => integration.name)
}

// Get user workflows
export async function getUserWorkflows() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from("user_workflows")
    .select("*, workflow:workflows(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user workflows:", error)
    return []
  }

  return data
}

// Get user workflow by ID
export async function getUserWorkflowById(id: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from("user_workflows")
    .select("*, workflow:workflows(*)")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (error) {
    console.error("Error fetching user workflow:", error)
    return null
  }

  return data
}

// Update user workflow
export async function updateUserWorkflow(
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
    throw new Error("You must be logged in to update a workflow")
  }

  // Get the current user workflow
  const userWorkflow = await getUserWorkflowById(id)

  if (!userWorkflow) {
    throw new Error("Workflow not found")
  }

  // Update the user workflow
  const { error } = await supabase
    .from("user_workflows")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) {
    console.error("Error updating workflow:", error)
    throw new Error("Failed to update workflow")
  }

  // Log the activity
  await supabase.from("activity_logs").insert({
    user_id: user.id,
    workflow_id: userWorkflow.workflow_id,
    action: `Updated workflow: ${userWorkflow.name}`,
    status: "success",
    category: userWorkflow.workflow.category,
    created_at: new Date().toISOString(),
  })

  revalidatePath(`/dashboard/my-workflows/${id}`)
  revalidatePath("/dashboard/my-workflows")
}
