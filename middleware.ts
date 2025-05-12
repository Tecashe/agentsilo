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

// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { createServerSupabaseClient } from "@/lib/supabase/server"

// export async function middleware(request: NextRequest) {
//   const response = NextResponse.next()
//   const supabase = await createServerSupabaseClient()

//   // Check if user is authenticated
//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   // If user is not authenticated and trying to access protected routes
//   if (!session) {
//     // Allow only public paths
//     if (
//       request.nextUrl.pathname === "/login" ||
//       request.nextUrl.pathname === "/register" ||
//       request.nextUrl.pathname === "/reset-password" ||
//       request.nextUrl.pathname === "/" ||
//       request.nextUrl.pathname.startsWith("/api/") ||
//       request.nextUrl.pathname.startsWith("/_next/") ||
//       request.nextUrl.pathname.startsWith("/marketplace")
//     ) {
//       return response
//     }

//     // Redirect to login for all other paths
//     return NextResponse.redirect(new URL("/login", request.url))
//   }

//   // If user is authenticated but trying to access admin routes
//   if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.includes("/api/")) {
//     // Check if user is an admin
//     const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

//     // If not admin, redirect to dashboard
//     if (!profile || profile.role !== "admin") {
//       return NextResponse.redirect(new URL("/dashboard", request.url))
//     }
//   }

//   return response
// }

// // Only run the middleware on the following paths
// export const config = {
//   matcher: [
//     /*
//      * Match all paths except for:
//      * 1. /api routes
//      * 2. /_next (Next.js internals)
//      * 3. /fonts (inside /public)
//      * 4. /examples (inside /public)
//      * 5. all root files inside /public (e.g. /favicon.ico)
//      */
//     "/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
//   ],
// }


import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Create a Supabase client using the newer @supabase/ssr library
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          // This is used for setting cookies in the response
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name, options) {
          // This is used for removing cookies in the response
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register", "/reset-password", "/", "/admin-login", "/marketplace"]

  // API paths that should be handled by their own auth
  const apiPaths = ["/api/"]

  // Static assets paths
  const assetPaths = ["/_next/", "/fonts/", "/images/", "/favicon.ico"]

  const path = request.nextUrl.pathname

  // Check if the path is public, an API route, or a static asset
  const isPublicPath = publicPaths.some((publicPath) => path === publicPath || path.startsWith(`${publicPath}/`))
  const isApiPath = apiPaths.some((apiPath) => path.startsWith(apiPath))
  const isAssetPath = assetPaths.some((assetPath) => path.startsWith(assetPath))

  // Allow public paths, API routes, and static assets without authentication
  if (isPublicPath || isApiPath || isAssetPath) {
    return response
  }

  // If not authenticated and trying to access a protected route, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // For admin routes, we'll let the API handle the admin check
  // This prevents middleware complexity and potential issues

  return response
}

// Only run the middleware on the following paths
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /_next (Next.js internals)
     * 2. /fonts (inside /public)
     * 3. /images (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!_next|fonts|images|favicon.ico).*)",
  ],
}
