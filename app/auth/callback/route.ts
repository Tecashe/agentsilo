// import { NextResponse } from 'next/server'
// // The client you created from the Server-Side Auth instructions
// //import { createClient } from '@/utils/supabase/server'
// import {createServerSupabaseClient} from "@/lib/supabase/server"

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url)
//   const code = searchParams.get('code')
//   // if "next" is in param, use it as the redirect URL
//   const next = searchParams.get('next') ?? '/dashboard'

//   if (code) {
//     const supabase = await createServerSupabaseClient()
//     const { error } = await supabase.auth.exchangeCodeForSession(code)
//     if (!error) {
//       const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
//       const isLocalEnv = process.env.NODE_ENV === 'development'
//       if (isLocalEnv) {
//         // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
//         return NextResponse.redirect(`${origin}${next}`)
//       } else if (forwardedHost) {
//         return NextResponse.redirect(`https://${forwardedHost}${next}`)
//       } else {
//         return NextResponse.redirect(`${origin}${next}`)
//       }
//     }
//   }

//   // return the user to an error page with instructions
//   return NextResponse.redirect(`${origin}/auth/auth-code-error`)
// }

// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
// import { cookies } from "next/headers"
// import { type NextRequest, NextResponse } from "next/server"

// export async function GET(request: NextRequest) {
//   const requestUrl = new URL(request.url)
//   const code = requestUrl.searchParams.get("code")
//   const next = requestUrl.searchParams.get("next") || "/dashboard"

//   if (code) {
//     const cookieStore = cookies()
//     const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

//     // Exchange the code for a session
//     await supabase.auth.exchangeCodeForSession(code)

//     // Check if the user exists in the profiles table
//     const {
//       data: { session },
//     } = await supabase.auth.getSession()

//     if (session?.user) {
//       // Check if user has a profile
//       const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

//       // If no profile exists, create one
//       if (!profile) {
//         await supabase.from("profiles").insert({
//           id: session.user.id,
//           email: session.user.email,
//           full_name: session.user.user_metadata.full_name || session.user.email?.split("@")[0],
//           subscription_tier: "free",
//           notification_settings: {
//             emailNotifications: true,
//             agentUpdates: true,
//             weeklyReports: true,
//             marketingEmails: false,
//           },
//         })
//       }
//     }
//   }

//   // URL to redirect to after sign in process completes
//   return NextResponse.redirect(`${requestUrl.origin}${next}`)
// }

import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Get the user session after code exchange
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        // Check if user has a profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()
          
        // If no profile exists, create one (this fixes the RLS error)
        if (!profile && !profileError?.message.includes("Results contain 0 rows")) {
          const { error: insertError } = await supabase.from("profiles").insert({
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata.full_name || session.user.email?.split("@")[0],
            subscription_tier: "free",
            notification_settings: {
              emailNotifications: true,
              agentUpdates: true,
              weeklyReports: true,
              marketingEmails: false,
            },
          })
          
          if (insertError) {
            console.error("Error creating profile:", insertError)
          }
        }
        
        // Check if user is an admin for admin-specific redirects
        if (next.startsWith('/admin') && profile) {
          // If trying to access admin area, verify admin status
          if (!profile.is_admin) {
            // Redirect non-admins away from admin pages
            const forwardedHost = request.headers.get('x-forwarded-host')
            const baseUrl = forwardedHost 
              ? `https://${forwardedHost}` 
              : (process.env.NODE_ENV === 'development' ? origin : `https://${request.headers.get('host')}`)
              
            return NextResponse.redirect(`${baseUrl}/login?message=You do not have admin access`)
          }
        }
      }
      
      // Handle redirect with proper URL construction
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}