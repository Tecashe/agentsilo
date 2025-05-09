"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

export async function submitCustomRequest(formData: {
  name: string
  email: string
  company: string
  description: string
  selectedIntegrations: string[]
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to submit a custom request")
  }

  const { error } = await supabase.from("custom_requests").insert({
    id: uuidv4(),
    user_id: user.id,
    name: formData.name,
    email: formData.email,
    company: formData.company,
    description: formData.description,
    selected_integrations: formData.selectedIntegrations,
    status: "pending",
  })

  if (error) {
    console.error("Error submitting custom request:", error)
    throw new Error("Failed to submit custom request")
  }

  // Log the activity
  await supabase.from("activity_logs").insert({
    user_id: user.id,
    agent_id: "system",
    action: "Submitted custom agent request",
    status: "success",
    category: "custom-request",
  })

  revalidatePath("/request-custom")
  redirect("/request-custom/success")
}
