// "use server"

// import { createServerSupabaseClient } from "@/lib/supabase/server"
// import { cache } from "react"

// export const getAdminDashboardStats = cache(async () => {
//   const supabase = await createServerSupabaseClient()

//   // Get total workflows count
//   const { count: totalWorkflows } = await supabase.from("workflows").select("*", { count: "exact", head: true })

//   // Get active workflows (marked as active in the workflows table)
//   const { count: activeWorkflows } = await supabase
//     .from("workflows")
//     .select("*", { count: "exact", head: true })
//     .eq("active", true)

//   // Get total users count
//   const { count: totalUsers } = await supabase.from("profiles").select("*", { count: "exact", head: true })

//   // Get active users this month
//   const startOfMonth = new Date()
//   startOfMonth.setDate(1)
//   startOfMonth.setHours(0, 0, 0, 0)

//   const { count: activeUsers } = await supabase
//     .from("activity_logs")
//     .select("user_id", { count: "exact", head: true })
//     .gte("created_at", startOfMonth.toISOString())
//     .not("user_id", "is", null)

//   // Get total deployments
//   const { count: totalDeployments } = await supabase.from("user_workflows").select("*", { count: "exact", head: true })

//   // Get deployments this month
//   const { count: deploymentsThisMonth } = await supabase
//     .from("user_workflows")
//     .select("*", { count: "exact", head: true })
//     .gte("created_at", startOfMonth.toISOString())

//   // Calculate conversion rate (users who deployed / total users)
//   const { data: usersWithDeployments } = await supabase
//     .from("user_workflows")
//     .select("user_id")
//     .limit(1)
//     .groupBy("user_id")

//   const conversionRate = totalUsers === 0 ? 0 : ((usersWithDeployments?.length || 0) / totalUsers) * 100

//   // Calculate month-over-month change in conversion rate
//   // This would require historical data tracking - simplified version
//   const conversionRateDelta = 2.5 // Example value

//   // Get popular categories
//   const { data: popularCategories } = await supabase
//     .from("workflows")
//     .select("category, count(*)")
//     .groupBy("category")
//     .order("count", { ascending: false })
//     .limit(5)

//   // Get popular integrations
//   const { data: popularIntegrations } = await supabase
//     .from("integrations")
//     .select(`
//       name,
//       count:workflows!integrations_workflows(count)
//     `)
//     .order("count", { ascending: false })
//     .limit(5)

//   // Get recent activity
//   const { data: recentActivity } = await supabase
//     .from("activity_logs")
//     .select(`
//       id,
//       action,
//       category,
//       created_at,
//       user_id,
//       workflow_id
//     `)
//     .order("created_at", { ascending: false })
//     .limit(5)

//   // Format recent activity for display
//   const formattedActivity = recentActivity?.map((activity) => {
//     const type = activity.workflow_id ? "workflow" : activity.user_id ? "user" : "system"

//     return {
//       id: activity.id,
//       type,
//       description: activity.action,
//       timestamp: new Date(activity.created_at).toLocaleString(),
//       category: activity.category,
//     }
//   })

//   return {
//     totalWorkflows,
//     activeWorkflows,
//     totalUsers,
//     activeUsers,
//     totalDeployments,
//     deploymentsThisMonth,
//     conversionRate: Math.round(conversionRate * 10) / 10, // Round to 1 decimal place
//     conversionRateDelta,
//     popularCategories:
//       popularCategories?.map((cat) => ({
//         name: cat.category,
//         count: cat.count,
//       })) || [],
//     popularIntegrations:
//       popularIntegrations?.map((int) => ({
//         name: int.name,
//         count: int.count[0].count,
//       })) || [],
//     recentActivity: formattedActivity || [],
//   }
// })

// "use server"

// import { createServerSupabaseClient } from "@/lib/supabase/server"
// import { cache } from "react"

// // Define types for our data
// interface Category {
//   category: string
//   count: number
// }

// interface Integration {
//   name: string
//   count: Array<{ count: number }>
// }

// interface ActivityLog {
//   id: string
//   action: string
//   category: string
//   created_at: string
//   user_id: string | null
//   workflow_id: string | null
// }

// export const getAdminDashboardStats = cache(async () => {
//   const supabase = await createServerSupabaseClient()

//   // Get total workflows count
//   const { count: totalWorkflows } = await supabase.from("workflows").select("*", { count: "exact", head: true })

//   // Get active workflows (marked as active in the workflows table)
//   const { count: activeWorkflows } = await supabase
//     .from("workflows")
//     .select("*", { count: "exact", head: true })
//     .eq("active", true)

//   // Get total users count
//   const { count: totalUsers } = await supabase.from("profiles").select("*", { count: "exact", head: true })

//   // Get active users this month
//   const startOfMonth = new Date()
//   startOfMonth.setDate(1)
//   startOfMonth.setHours(0, 0, 0, 0)

//   const { count: activeUsers } = await supabase
//     .from("activity_logs")
//     .select("user_id", { count: "exact", head: true })
//     .gte("created_at", startOfMonth.toISOString())
//     .not("user_id", "is", null)

//   // Get total deployments
//   const { count: totalDeployments } = await supabase.from("user_workflows").select("*", { count: "exact", head: true })

//   // Get deployments this month
//   const { count: deploymentsThisMonth } = await supabase
//     .from("user_workflows")
//     .select("*", { count: "exact", head: true })
//     .gte("created_at", startOfMonth.toISOString())

//   // Fix for groupBy issue - get distinct user IDs with deployments
//   const { data: usersWithDeployments } = await supabase.from("user_workflows").select("user_id").limit(1000) // Use a reasonable limit instead of groupBy

//   // Count unique user IDs manually
//   const uniqueUserIds = new Set(usersWithDeployments?.map((item) => item.user_id) || [])
//   const uniqueUsersWithDeployments = uniqueUserIds.size

//   // Calculate conversion rate (users who deployed / total users)
//   const conversionRate = totalUsers === null || totalUsers === 0 ? 0 : (uniqueUsersWithDeployments / totalUsers) * 100

//   // Calculate month-over-month change in conversion rate
//   // This would require historical data tracking - simplified version
//   const conversionRateDelta = 2.5 // Example value

//   // Get popular categories
//   const { data: popularCategories } = await supabase
//     .from("workflows")
//     .select("category, count(*)")
//     .groupBy("category")
//     .order("count", { ascending: false })
//     .limit(5)

//   // Get popular integrations
//   const { data: popularIntegrations } = await supabase
//     .from("integrations")
//     .select(`
//       name,
//       count:workflows!integrations_workflows(count)
//     `)
//     .order("count", { ascending: false })
//     .limit(5)

//   // Get recent activity
//   const { data: recentActivity } = await supabase
//     .from("activity_logs")
//     .select(`
//       id,
//       action,
//       category,
//       created_at,
//       user_id,
//       workflow_id
//     `)
//     .order("created_at", { ascending: false })
//     .limit(5)

//   // Format recent activity for display
//   const formattedActivity = recentActivity?.map((activity: ActivityLog) => {
//     const type = activity.workflow_id ? "workflow" : activity.user_id ? "user" : "system"

//     return {
//       id: activity.id,
//       type,
//       description: activity.action,
//       timestamp: new Date(activity.created_at).toLocaleString(),
//       category: activity.category,
//     }
//   })

//   return {
//     totalWorkflows: totalWorkflows || 0,
//     activeWorkflows: activeWorkflows || 0,
//     totalUsers: totalUsers || 0,
//     activeUsers: activeUsers || 0,
//     totalDeployments: totalDeployments || 0,
//     deploymentsThisMonth: deploymentsThisMonth || 0,
//     conversionRate: Math.round(conversionRate * 10) / 10, // Round to 1 decimal place
//     conversionRateDelta,
//     popularCategories:
//       popularCategories?.map((cat: Category) => ({
//         name: cat.category,
//         count: cat.count,
//       })) || [],
//     popularIntegrations:
//       popularIntegrations?.map((int: Integration) => ({
//         name: int.name,
//         count: int.count[0]?.count || 0,
//       })) || [],
//     recentActivity: formattedActivity || [],
//   }
// })

"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { cache } from "react"

// Define types for our data
interface Category {
  category: string
  count: number
}

interface Integration {
  name: string
  count: Array<{ count: number }>
}

interface ActivityLog {
  id: string
  action: string
  category: string
  created_at: string
  user_id: string | null
  workflow_id: string | null
}

export const getAdminDashboardStats = cache(async () => {
  const supabase = await createServerSupabaseClient()

  // Get total workflows count
  const { count: totalWorkflows } = await supabase.from("workflows").select("*", { count: "exact", head: true })

  // Get active workflows (marked as active in the workflows table)
  const { count: activeWorkflows } = await supabase
    .from("workflows")
    .select("*", { count: "exact", head: true })
    .eq("active", true)

  // Get total users count
  const { count: totalUsers } = await supabase.from("profiles").select("*", { count: "exact", head: true })

  // Get active users this month
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { count: activeUsers } = await supabase
    .from("activity_logs")
    .select("user_id", { count: "exact", head: true })
    .gte("created_at", startOfMonth.toISOString())
    .not("user_id", "is", null)

  // Get total deployments
  const { count: totalDeployments } = await supabase.from("user_workflows").select("*", { count: "exact", head: true })

  // Get deployments this month
  const { count: deploymentsThisMonth } = await supabase
    .from("user_workflows")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startOfMonth.toISOString())

  // Fix for groupBy issue - get distinct user IDs with deployments
  const { data: usersWithDeployments } = await supabase.from("user_workflows").select("user_id").limit(1000) // Use a reasonable limit instead of groupBy

  // Count unique user IDs manually
  const uniqueUserIds = new Set(usersWithDeployments?.map((item) => item.user_id) || [])
  const uniqueUsersWithDeployments = uniqueUserIds.size

  // Calculate conversion rate (users who deployed / total users)
  const conversionRate = totalUsers === null || totalUsers === 0 ? 0 : (uniqueUsersWithDeployments / totalUsers) * 100

  // Calculate month-over-month change in conversion rate
  // This would require historical data tracking - simplified version
  const conversionRateDelta = 2.5 // Example value

  // Fix for groupBy issue - use a raw SQL query to get popular categories
  const { data: popularCategoriesRaw } = await supabase.rpc("get_popular_categories", {
    limit_count: 5,
  })

  // If the RPC doesn't exist yet, we'll use a fallback approach
  let popularCategories = popularCategoriesRaw

  if (!popularCategoriesRaw) {
    // Fallback: Get all workflows and count categories manually
    const { data: allWorkflows } = await supabase.from("workflows").select("category")

    if (allWorkflows) {
      // Count categories manually
      const categoryCount: Record<string, number> = {}
      allWorkflows.forEach((workflow) => {
        const category = workflow.category || "Uncategorized"
        categoryCount[category] = (categoryCount[category] || 0) + 1
      })

      // Convert to array and sort
      popularCategories = Object.entries(categoryCount)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    } else {
      popularCategories = []
    }
  }

  // Get popular integrations
  const { data: popularIntegrations } = await supabase
    .from("integrations")
    .select(`
      name,
      count:workflows!integrations_workflows(count)
    `)
    .order("count", { ascending: false })
    .limit(5)

  // Get recent activity
  const { data: recentActivity } = await supabase
    .from("activity_logs")
    .select(`
      id,
      action,
      category,
      created_at,
      user_id,
      workflow_id
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  // Format recent activity for display
  const formattedActivity = recentActivity?.map((activity: ActivityLog) => {
    const type = activity.workflow_id ? "workflow" : activity.user_id ? "user" : "system"

    return {
      id: activity.id,
      type,
      description: activity.action,
      timestamp: new Date(activity.created_at).toLocaleString(),
      category: activity.category,
    }
  })

  return {
    totalWorkflows: totalWorkflows || 0,
    activeWorkflows: activeWorkflows || 0,
    totalUsers: totalUsers || 0,
    activeUsers: activeUsers || 0,
    totalDeployments: totalDeployments || 0,
    deploymentsThisMonth: deploymentsThisMonth || 0,
    conversionRate: Math.round(conversionRate * 10) / 10, // Round to 1 decimal place
    conversionRateDelta,
    popularCategories:
      popularCategories?.map((cat: Category) => ({
        name: cat.category,
        count: cat.count,
      })) || [],
    popularIntegrations:
      popularIntegrations?.map((int: Integration) => ({
        name: int.name,
        count: int.count[0]?.count || 0,
      })) || [],
    recentActivity: formattedActivity || [],
  }
})
