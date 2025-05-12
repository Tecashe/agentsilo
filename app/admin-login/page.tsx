"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bot, AlertCircle, Loader2 } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Check if already logged in and has admin access
    const checkAdminAccess = async () => {
      setLoading(true)
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          // User is logged in, check if they're an admin
          const response = await fetch("/api/admin/check-access")
          const result = await response.json()

          if (result.isAdmin) {
            setStatusMessage("You have admin access. Redirecting...")
            setTimeout(() => router.push("/admin"), 1000)
          } else {
            setStatusMessage("You are logged in but don't have admin privileges.")
            setDebugInfo(result.debug || "No debug info available")
          }
        }
      } catch (err) {
        console.error("Error checking admin access:", err)
      } finally {
        setLoading(false)
      }
    }

    checkAdminAccess()
  }, [router, supabase])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Attempt to sign in
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        throw new Error(signInError.message)
      }

      if (!data.session) {
        throw new Error("No session created after login")
      }

      // Check if the user has admin access
      const response = await fetch("/api/admin/check-access")
      const result = await response.json()

      if (result.isAdmin) {
        setStatusMessage("Login successful! You have admin access. Redirecting...")
        setTimeout(() => router.push("/admin"), 1000)
      } else {
        setError("You don't have admin privileges.")
        setDebugInfo(result.debug || "No debug info available")
        // Sign out since they don't have admin access
        await supabase.auth.signOut()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Bot className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Admin Access</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {statusMessage && (
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Status</AlertTitle>
              <AlertDescription>{statusMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Processing..." : "Login to Admin"}
              </Button>
            </div>
          </form>

          {debugInfo && (
            <div className="mt-4 p-2 bg-muted rounded-md">
              <p className="text-xs font-mono text-muted-foreground">Debug info: {JSON.stringify(debugInfo)}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="ghost" onClick={() => router.push("/login")} disabled={loading}>
            Back to regular login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
