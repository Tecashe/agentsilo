// import { createServerSupabaseClient } from "@/lib/supabase/server"
// import { redirect } from "next/navigation"

// export async function getSession() {
//   const supabase = await createServerSupabaseClient()

//   try {
//     const {
//       data: { session },
//     } = await supabase.auth.getSession()
//     return session
//   } catch (error) {
//     console.error("Error getting session:", error)
//     return null
//   }
// }

// export async function getUserDetails() {
//   const supabase = await createServerSupabaseClient()

//   try {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) return null

//     // Get user profile from the database
//     const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

//     return {
//       ...user,
//       profile: profile || null,
//     }
//   } catch (error) {
//     console.error("Error getting user details:", error)
//     return null
//   }
// }

// export async function requireAuth() {
//   const session = await getSession()

//   if (!session) {
//     redirect("/login")
//   }

//   return session
// }

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function getSession() {
  const supabase = await createServerSupabaseClient()

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

export async function getUserDetails() {
  const supabase = await createServerSupabaseClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    // Get user profile from the database
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    return {
      ...user,
      profile: profile || null,
    }
  } catch (error) {
    console.error("Error getting user details:", error)
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return session
}

export async function requireAdmin() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Check if user is an admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  if (!profile || profile.role !== "admin") {
    redirect("/dashboard")
  }

  return session
}
