"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getUserProfile() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (error) {
    console.error("Error fetching profile:", error)
    return null
  }

  return data
}

export async function updateUserProfile(updates: {
  full_name?: string
  company?: string
  bio?: string
  avatar_url?: string
  notification_settings?: any
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to update your profile")
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    console.error("Error updating profile:", error)
    throw new Error("Failed to update profile")
  }

  revalidatePath("/dashboard/settings")
}

export async function updatePassword(currentPassword: string, newPassword: string) {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    console.error("Error updating password:", error)
    throw new Error(error.message || "Failed to update password")
  }

  revalidatePath("/dashboard/settings")
}
