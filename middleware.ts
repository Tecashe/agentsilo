// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { createServerSupabaseClient } from "@/lib/supabase/server"

// // List of paths that don't require authentication
// const publicPaths = ["/", "/login", "/signup", "/marketplace", "/request-custom", "/pricing"]

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   // Check if the path is public
//   const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

//   // Create a Supabase client
//   const supabase = await createServerSupabaseClient()

//   // Check if the user is authenticated
//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   // If the path requires authentication and the user is not authenticated, redirect to login
//   if (!isPublicPath && !session) {
//     const redirectUrl = new URL("/login", request.url)
//     redirectUrl.searchParams.set("redirect", pathname)
//     return NextResponse.redirect(redirectUrl)
//   }

//   // If the user is authenticated and trying to access login/signup, redirect to dashboard
//   if ((pathname === "/login" || pathname === "/signup") && session) {
//     return NextResponse.redirect(new URL("/admin/workflows", request.url))
//   }

//   return NextResponse.next()
// }

// // Configure the middleware to run on specific paths
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
// }

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = await createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is not authenticated and trying to access protected routes
  if (!session) {
    // Allow only public paths
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register" ||
      request.nextUrl.pathname === "/reset-password" ||
      request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname.startsWith("/api/") ||
      request.nextUrl.pathname.startsWith("/_next/") ||
      request.nextUrl.pathname.startsWith("/marketplace")
    ) {
      return response
    }

    // Redirect to login for all other paths
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If user is authenticated but trying to access admin routes
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.includes("/api/")) {
    // Check if user is an admin
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    // If not admin, redirect to dashboard
    if (!profile || profile.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return response
}

// Only run the middleware on the following paths
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
  ],
}
