"use client"

import { createClientSupabaseClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
//import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

interface WorkflowStep {
  id: string
  workflow_id: string
  step_number: number
  title: string
  description: string
  icon: string
  color: string
}

interface WorkflowFlowDiagramProps {
  workflowId: string
}

export function WorkflowFlowDiagram({ workflowId }: WorkflowFlowDiagramProps) {
  const [steps, setSteps] = useState<WorkflowStep[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"flow" | "steps">("flow")
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    async function fetchWorkflowSteps() {
      try {
        const { data, error } = await supabase
          .from("workflow_steps")
          .select("*")
          .eq("workflow_id", workflowId)
          .order("step_number")

        if (error) throw error

        setSteps(data || [])
      } catch (error) {
        console.error("Error fetching workflow steps:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkflowSteps()
  }, [workflowId, supabase])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (steps.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No workflow steps have been defined for this agent.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="flow" onValueChange={(value) => setView(value as "flow" | "steps")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="flow">Flow Diagram</TabsTrigger>
          <TabsTrigger value="steps">Step by Step</TabsTrigger>
        </TabsList>

        <TabsContent value="flow" className="pt-4">
          <div className="relative">
            {/* Flow diagram visualization */}
            <div className="flex flex-col md:flex-row items-start justify-between relative">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center text-center mb-8 md:mb-0 relative z-10"
                  style={{ flex: `1 0 ${100 / steps.length}%` }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-2 text-white"
                    style={{ backgroundColor: step.color || "#7c3aed" }}
                  >
                    <span className="font-bold">{step.step_number}</span>
                  </div>
                  <h3 className="font-medium text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground max-w-[150px]">{step.description}</p>
                </div>
              ))}

              {/* Connecting lines */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted z-0 hidden md:block" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="steps" className="pt-4">
          <div className="space-y-4">
            {steps.map((step) => (
              <Card key={step.id}>
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white shrink-0 mt-1"
                      style={{ backgroundColor: step.color || "#7c3aed" }}
                    >
                      <span className="font-bold text-sm">{step.step_number}</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
