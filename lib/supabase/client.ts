import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/supabase"

export function createClientSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}


// import { createClient } from "@supabase/supabase-js"

// export function createClientSupabaseClient() {
//   return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
//      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
// }
