"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { IntegrationIcon } from "../icon/integration-icons"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Check } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase/client"

interface ConnectIntegrationButtonProps {
  integrationName: string
  onSuccess?: () => void
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function ConnectIntegrationButton({
  integrationName,
  onSuccess,
  variant = "outline",
  size = "default",
  className,
}: ConnectIntegrationButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const { toast } = useToast()
  const supabase = createClientSupabaseClient()

  const handleConnect = async () => {
    setIsConnecting(true)

    try {
      // Check if user is authenticated
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to connect integrations",
          variant: "destructive",
        })
        return
      }

      // Simulate OAuth flow based on integration type
      switch (integrationName.toLowerCase()) {
        case "gmail":
        case "google drive":
        case "google calendar":
        case "google sheets":
          // Google OAuth flow
          window.open(
            `/api/oauth/google?integration=${encodeURIComponent(integrationName)}`,
            "_blank",
            "width=600,height=700",
          )
          break

        case "slack":
          window.open("/api/oauth/slack", "_blank", "width=600,height=700")
          break

        case "github":
          window.open("/api/oauth/github", "_blank", "width=600,height=700")
          break

        default:
          // Generic OAuth simulation for demo purposes
          await new Promise((resolve) => setTimeout(resolve, 1500))
          break
      }

      // For demo purposes, we'll just set it as connected
      setIsConnected(true)

      toast({
        title: "Integration connected",
        description: `Successfully connected to ${integrationName}`,
      })

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error connecting integration:", error)
      toast({
        title: "Connection failed",
        description: `Failed to connect to ${integrationName}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleConnect}
      disabled={isConnecting || isConnected}
    >
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : isConnected ? (
        <>
          <Check className="mr-2 h-4 w-4 text-green-500" />
          Connected
        </>
      ) : (
        <>
          <IntegrationIcon name={integrationName} size={16} className="mr-2" />
          Connect {integrationName}
        </>
      )}
    </Button>
  )
}
