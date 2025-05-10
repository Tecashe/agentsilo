"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Play, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TestAgentPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<null | {
    success: boolean
    message: string
    logs: string[]
    executionTime: number
  }>(null)
  const [testInput, setTestInput] = useState("")

  const runTest = async () => {
    if (!testInput.trim()) {
      toast({
        title: "Input required",
        description: "Please provide test input for the agent",
        variant: "destructive",
      })
      return
    }

    setIsRunning(true)
    setTestResults(null)

    // Simulate API call to test the agent
    try {
      // This is a mock implementation - in a real app, you would call your backend
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate test results
      const success = Math.random() > 0.3 // 70% chance of success for demo
      const executionTime = Math.floor(Math.random() * 1000) + 500 // Random time between 500-1500ms

      const logs = [
        "Initializing agent...",
        "Loading configuration...",
        "Connecting to integrations...",
        "Processing input data...",
        "Executing agent workflow...",
        success ? "Task completed successfully!" : "Error encountered during execution",
      ]

      setTestResults({
        success,
        message: success
          ? "The agent successfully processed the input and completed the task."
          : "The agent encountered an error while processing the input.",
        logs,
        executionTime,
      })
    } catch (error) {
      toast({
        title: "Test failed",
        description: "An unexpected error occurred while testing the agent",
        variant: "destructive",
      })
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <Link href={`/dashboard/my-agents/${params.id}`} className="text-primary hover:underline mb-4 inline-block">
          <ArrowLeft className="h-4 w-4 inline mr-1" /> Back to Agent Details
        </Link>
        <h1 className="text-3xl font-bold">Test Agent</h1>
        <p className="text-muted-foreground mt-2">Test your agent with sample inputs to see how it performs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Test Input</CardTitle>
            <CardDescription>Provide sample data for your agent to process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="test-input">Input Data</Label>
              <Textarea
                id="test-input"
                placeholder="Enter test data here..."
                rows={8}
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                This could be an email, customer inquiry, or any data relevant to your agent's purpose.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={runTest} disabled={isRunning} className="w-full">
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Running Test...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" /> Run Test
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>View the output and performance of your agent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {testResults ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      testResults.success ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                    }`}
                  >
                    {testResults.success ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{testResults.success ? "Test Passed" : "Test Failed"}</p>
                    <p className="text-sm text-muted-foreground">Execution time: {testResults.executionTime}ms</p>
                  </div>
                </div>

                <div>
                  <Label>Message</Label>
                  <div className="mt-1 p-3 bg-muted rounded-md text-sm">{testResults.message}</div>
                </div>

                <div>
                  <Label>Execution Logs</Label>
                  <div className="mt-1 p-3 bg-muted rounded-md text-sm font-mono h-[200px] overflow-y-auto">
                    {testResults.logs.map((log, index) => (
                      <div key={index} className="py-1">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-center">
                <div className="text-muted-foreground">
                  <p>No test results yet</p>
                  <p className="text-sm mt-1">Run a test to see results here</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Testing Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc pl-5">
            <li>Use realistic data that matches what your agent will process in production</li>
            <li>Test edge cases and unexpected inputs to ensure your agent is robust</li>
            <li>Check that integrations are properly connected before testing</li>
            <li>For complex agents, start with simple inputs and gradually increase complexity</li>
            <li>Review execution logs to identify any bottlenecks or errors</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
