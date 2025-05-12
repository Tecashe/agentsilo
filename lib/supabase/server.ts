// import { createServerClient } from "@supabase/ssr"
// import { cookies } from "next/headers"
// import type { Database } from "@/types/supabase"

// export async function createServerSupabaseClient() {
//   const cookieStore = await cookies()

//   return createServerClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value
//         },
//         set(name: string, value: string, options: any) {
//           cookieStore.set({ name, value, ...options })
//         },
//         remove(name: string, options: any) {
//           cookieStore.set({ name, value: "", ...options })
//         },
//       },
//     },
//   )
// }

// import { createServerClient } from "@supabase/ssr"
// import { cookies } from "next/headers"

// export async function createServerSupabaseClient() {
//   const cookieStore = await cookies()

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value
//         },
//         set(name: string, value: string, options: any) {
//           try {
//             cookieStore.set({ name, value, ...options })
//           } catch (error) {
//             // Handle cookies in read-only context during SSG
//           }
//         },
//         remove(name: string, options: any) {
//           try {
//             cookieStore.set({ name, value: "", ...options })
//           } catch (error) {
//             // Handle cookies in read-only context during SSG
//           }
//         },
//       },
//     },
//   )

//   return supabase
// }

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

export async function createServerSupabaseClient() {
  // Remove the await - cookies() doesn't return a Promise
  const cookieStore = await cookies()

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookies in read-only context during SSG
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options })
          } catch (error) {
            // Handle cookies in read-only context during SSG
          }
        },
      },
    },
  )

  return supabase
}

