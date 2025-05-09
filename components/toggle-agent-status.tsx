"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { updateUserAgent } from "@/lib/actions/agents"

export function ToggleAgentStatus({ agent }: { agent: any }) {
  const { toast } = useToast()
  const [status, setStatus] = useState(agent.status)
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusToggle = async () => {
    setIsLoading(true)
    const newStatus = status === "active" ? "paused" : "active"

    try {
      await updateUserAgent(agent.id, { status: newStatus })
      setStatus(newStatus)

      toast({
        title: `Agent ${newStatus === "active" ? "Activated" : "Paused"}`,
        description: `The agent has been ${newStatus === "active" ? "activated" : "paused"}.`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while updating the agent status.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="agent-status"
        checked={status === "active"}
        onCheckedChange={handleStatusToggle}
        disabled={isLoading}
      />
      <Label htmlFor="agent-status">{status === "active" ? "Active" : "Paused"}</Label>
    </div>
  )
}
