"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase/client"
//import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, Trash2, MoveUp, MoveDown } from "lucide-react"

interface WorkflowStep {
  id?: string
  workflow_id: string
  step_number: number
  title: string
  description: string
  icon?: string
  color: string
}

interface WorkflowStepsFormProps {
  workflowId: string
}

export function WorkflowStepsForm({ workflowId }: WorkflowStepsFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientSupabaseClient()
  const [steps, setSteps] = useState<WorkflowStep[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function fetchWorkflowSteps() {
      try {
        const { data, error } = await supabase
          .from("workflow_steps")
          .select("*")
          .eq("workflow_id", workflowId)
          .order("step_number")

        if (error) throw error

        if (data && data.length > 0) {
          setSteps(data)
        } else {
          // Initialize with one empty step
          setSteps([
            {
              workflow_id: workflowId,
              step_number: 1,
              title: "",
              description: "",
              color: "#7c3aed",
            },
          ])
        }
      } catch (error) {
        console.error("Error fetching workflow steps:", error)
        toast({
          title: "Error",
          description: "Failed to load workflow steps",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWorkflowSteps()
  }, [workflowId, supabase, toast])

  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        workflow_id: workflowId,
        step_number: steps.length + 1,
        title: "",
        description: "",
        color: "#7c3aed",
      },
    ])
  }

  const handleRemoveStep = (index: number) => {
    if (steps.length <= 1) {
      toast({
        title: "Cannot Remove",
        description: "Workflow must have at least one step",
        variant: "destructive",
      })
      return
    }

    const newSteps = steps.filter((_, i) => i !== index)
    // Renumber steps
    newSteps.forEach((step, i) => {
      step.step_number = i + 1
    })

    setSteps(newSteps)
  }

  const handleMoveStep = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === steps.length - 1)) {
      return
    }

    const newSteps = [...steps]
    const targetIndex = direction === "up" ? index - 1 : index + 1

    // Swap steps
    const temp = newSteps[index]
    newSteps[index] = newSteps[targetIndex]
    newSteps[targetIndex] = temp

    // Renumber steps
    newSteps.forEach((step, i) => {
      step.step_number = i + 1
    })

    setSteps(newSteps)
  }

  const handleStepChange = (index: number, field: keyof WorkflowStep, value: string) => {
    const newSteps = [...steps]
    newSteps[index] = {
      ...newSteps[index],
      [field]: value,
    }
    setSteps(newSteps)
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      // Validate steps
      const emptySteps = steps.filter((step) => !step.title)
      if (emptySteps.length > 0) {
        throw new Error("All steps must have a title")
      }

      // Delete existing steps
      await supabase.from("workflow_steps").delete().eq("workflow_id", workflowId)

      // Insert new steps
      const { error } = await supabase.from("workflow_steps").insert(
        steps.map((step) => ({
          workflow_id: step.workflow_id,
          step_number: step.step_number,
          title: step.title,
          description: step.description,
          icon: step.icon,
          color: step.color,
        })),
      )

      if (error) throw error

      toast({
        title: "Success",
        description: "Workflow steps saved successfully",
      })

      router.refresh()
    } catch (error: any) {
      console.error("Error saving workflow steps:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save workflow steps",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Workflow Steps</h2>
        <Button onClick={handleAddStep}>
          <Plus className="h-4 w-4 mr-2" />
          Add Step
        </Button>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center justify-between">
                <span>Step {step.step_number}</span>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMoveStep(index, "up")}
                    disabled={index === 0}
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMoveStep(index, "down")}
                    disabled={index === steps.length - 1}
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveStep(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={step.title}
                  onChange={(e) => handleStepChange(index, "title", e.target.value)}
                  placeholder="Enter step title"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={step.description}
                  onChange={(e) => handleStepChange(index, "description", e.target.value)}
                  placeholder="Enter step description"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={step.color}
                    onChange={(e) => handleStepChange(index, "color", e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <Input
                    value={step.color}
                    onChange={(e) => handleStepChange(index, "color", e.target.value)}
                    className="w-32"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Steps
        </Button>
      </div>
    </div>
  )
}
