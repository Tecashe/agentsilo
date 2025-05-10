import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// List of paths that don't require authentication
const publicPaths = ["/", "/login", "/signup", "/marketplace", "/request-custom", "/pricing"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is public
  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  // Create a Supabase client
  const supabase = await createServerSupabaseClient()

  // Check if the user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If the path requires authentication and the user is not authenticated, redirect to login
  if (!isPublicPath && !session) {
    const redirectUrl = new URL("/login", request.url)
    redirectUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If the user is authenticated and trying to access login/signup, redirect to dashboard
  if ((pathname === "/login" || pathname === "/signup") && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
}
