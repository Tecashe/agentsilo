"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Play, ArrowDownToLine, ArrowUpToLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { testN8nWorkflow, getN8nWorkflows } from "@/lib/actions/n8n"

const formSchema = z.object({
  workflowId: z.string().min(1, { message: "Workflow ID is required" }),
  testData: z.string().optional(),
})

export default function TestWorkflowPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [workflowList, setWorkflowList] = useState<any[]>([])
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<{
    success: boolean
    message: string
    data?: any
    executionId?: string
    duration?: number
  } | null>(null)
  const [activeTab, setActiveTab] = useState("form")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workflowId: "",
      testData: '{\n  "email": "test@example.com",\n  "name": "Test User"\n}',
    },
  })

  useEffect(() => {
    async function loadWorkflows() {
      try {
        const workflows = await getN8nWorkflows()
        setWorkflowList(workflows)
      } catch (error) {
        console.error("Error loading n8n workflows:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadWorkflows()
  }, [])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsTesting(true)
    setTestResult(null)

    try {
      let testData = {}

      if (values.testData) {
        try {
          testData = JSON.parse(values.testData)
        } catch (error) {
          setTestResult({
            success: false,
            message: "Invalid JSON in test data",
          })
          setIsTesting(false)
          return
        }
      }

      const result = await testN8nWorkflow({
        workflowId: values.workflowId,
        testData,
      })

      setTestResult({
        success: result.success,
        message: result.message,
        data: result.data,
        executionId: result.executionId,
        duration: result.duration,
      })

      if (result.success) {
        setActiveTab("results")
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsTesting(false)
    }
  }

  function formatJson(data: any) {
    return JSON.stringify(data, null, 2)
  }

  const selectedWorkflow = workflowList.find((wf) => wf.id === form.watch("workflowId"))

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Test n8n Workflows</h1>
        <p className="text-muted-foreground">Test your n8n workflows before deploying them to production.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Workflow Tester</TabsTrigger>
          <TabsTrigger value="results" disabled={!testResult}>
            Test Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>Test Workflow</CardTitle>
              <CardDescription>Select a workflow and provide test data to execute it</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="workflowId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>n8n Workflow</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a workflow" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {workflowList.map((workflow) => (
                              <SelectItem key={workflow.id} value={workflow.id}>
                                {workflow.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Select the n8n workflow you want to test</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedWorkflow && (
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium mb-2">{selectedWorkflow.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {selectedWorkflow.description || "No description available"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">ID: {selectedWorkflow.id}</Badge>
                        <Badge variant="outline">Active: {selectedWorkflow.active ? "Yes" : "No"}</Badge>
                        <Badge variant="outline">
                          Created: {new Date(selectedWorkflow.createdAt).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="testData"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Test Data (JSON)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter JSON test data" className="font-mono h-48" {...field} />
                        </FormControl>
                        <FormDescription>Enter JSON data to pass to the workflow as input</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                    <Button type="button" variant="outline" onClick={() => form.reset()} className="w-full md:w-auto">
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      className="w-full md:w-auto"
                      disabled={isTesting || !form.watch("workflowId")}
                    >
                      {isTesting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Run Workflow
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Test Results
                {testResult?.success ? (
                  <Badge className="bg-green-500">Success</Badge>
                ) : (
                  <Badge variant="destructive">Failed</Badge>
                )}
              </CardTitle>
              <CardDescription>
                {testResult?.success
                  ? `Successfully executed workflow in ${
                      testResult.duration ? `${testResult.duration.toFixed(2)}ms` : "unknown time"
                    }`
                  : "Workflow execution failed"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {testResult && (
                <div className="space-y-4">
                  <div className="rounded-md bg-muted p-4">
                    <p className="text-sm">{testResult.message}</p>
                    {testResult.executionId && (
                      <p className="text-xs text-muted-foreground mt-2">Execution ID: {testResult.executionId}</p>
                    )}
                  </div>

                  <Accordion type="single" collapsible defaultValue="data">
                    <AccordionItem value="data">
                      <AccordionTrigger>
                        <div className="flex items-center">
                          <ArrowDownToLine className="h-4 w-4 mr-2" />
                          Response Data
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ScrollArea className="h-96 w-full rounded-md border">
                          <pre className="p-4 text-sm font-mono">
                            {testResult.data ? formatJson(testResult.data) : "No data returned"}
                          </pre>
                        </ScrollArea>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="request">
                      <AccordionTrigger>
                        <div className="flex items-center">
                          <ArrowUpToLine className="h-4 w-4 mr-2" />
                          Request Data
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ScrollArea className="h-48 w-full rounded-md border">
                          <pre className="p-4 text-sm font-mono">
                            {formatJson(JSON.parse(form.getValues("testData") || "{}"))}
                          </pre>
                        </ScrollArea>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("form")}>
                Back to Test Form
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setTestResult(null)
                  form.reset()
                  setActiveTab("form")
                }}
              >
                Start New Test
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
