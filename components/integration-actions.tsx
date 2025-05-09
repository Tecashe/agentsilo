"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { connectIntegration, disconnectIntegration } from "@/lib/actions/integrations"
import { CheckCircle2, XCircle } from "lucide-react"
import { useState } from "react"

export function IntegrationActions({ integration }: { integration: any }) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [connected, setConnected] = useState(integration.connected)

  const handleConnect = async () => {
    setIsLoading(true)

    try {
      await connectIntegration({
        name: integration.name,
        description: integration.description,
        category: integration.category,
      })

      setConnected(true)
      toast({
        title: "Integration Connected",
        description: "Successfully connected to the service.",
      })
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "An error occurred while connecting the integration.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    setIsLoading(true)

    try {
      await disconnectIntegration(integration.id)

      setConnected(false)
      toast({
        title: "Integration Disconnected",
        description: "Successfully disconnected from the service.",
      })
    } catch (error: any) {
      toast({
        title: "Disconnection Failed",
        description: error.message || "An error occurred while disconnecting the integration.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return connected ? (
    <Button
      variant="outline"
      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
      onClick={handleDisconnect}
      disabled={isLoading}
    >
      <XCircle className="mr-2 h-4 w-4" /> Disconnect
    </Button>
  ) : (
    <Button className="w-full" onClick={handleConnect} disabled={isLoading}>
      <CheckCircle2 className="mr-2 h-4 w-4" /> Connect
    </Button>
  )
}
