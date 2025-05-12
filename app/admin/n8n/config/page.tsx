"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, CheckCircle2, XCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { getN8nConfig, updateN8nConfig, testN8nConnection } from "@/lib/actions/n8n"

const formSchema = z.object({
  apiUrl: z.string().url({ message: "Please enter a valid URL" }),
  apiKey: z.string().min(1, { message: "API key is required" }),
  webhookUrl: z.string().url({ message: "Please enter a valid webhook URL" }).optional().or(z.literal("")),
  useHttps: z.boolean().default(true),
})

export default function N8nConfigPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiUrl: "",
      apiKey: "",
      webhookUrl: "",
      useHttps: true,
    },
  })

  useEffect(() => {
    async function loadConfig() {
      try {
        const config = await getN8nConfig()

        if (config) {
          form.reset({
            apiUrl: config.apiUrl || "",
            apiKey: config.apiKey || "",
            webhookUrl: config.webhookUrl || "",
            useHttps: config.useHttps !== false,
          })
        }
      } catch (error) {
        console.error("Error loading n8n config:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadConfig()
  }, [form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitError(null)

    try {
      await updateN8nConfig(values)
      router.refresh()
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to update configuration")
    }
  }

  const handleTestConnection = async () => {
    setIsTesting(true)
    setTestResult(null)

    try {
      const { apiUrl, apiKey } = form.getValues()

      if (!apiUrl || !apiKey) {
        setTestResult({
          success: false,
          message: "Please enter API URL and API Key before testing",
        })
        return
      }

      const result = await testN8nConnection(apiUrl, apiKey )

      setTestResult({
        success: result.success,
        message: result.message,
      })
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsTesting(false)
    }
  }

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
        <h1 className="text-3xl font-bold">n8n Configuration</h1>
        <p className="text-muted-foreground">Configure your n8n instance to connect with the AI Agents marketplace.</p>
      </div>

      {submitError && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Connection Settings</CardTitle>
          <CardDescription>Configure the connection to your n8n instance</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="apiUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>n8n API URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://n8n.yourdomain.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      The base URL of your n8n instance (e.g., https://n8n.yourdomain.com)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>n8n API Key</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Your n8n API key" {...field} />
                    </FormControl>
                    <FormDescription>The API key for accessing your n8n instance</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="webhookUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Webhook URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourdomain.com/api/n8n-webhook" {...field} />
                    </FormControl>
                    <FormDescription>Webhook URL for n8n callbacks (leave empty to use default)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="useHttps"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Use HTTPS</FormLabel>
                      <FormDescription>Enable secure connections to your n8n instance</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full md:w-auto"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                >
                  {isTesting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    "Test Connection"
                  )}
                </Button>
                <Button type="submit" className="w-full md:w-auto">
                  Save Configuration
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>

        {testResult && (
          <CardFooter className="border-t pt-6">
            <Alert variant={testResult.success ? "default" : "destructive"}>
              {testResult.success ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <AlertTitle>{testResult.success ? "Success" : "Connection Error"}</AlertTitle>
              <AlertDescription>{testResult.message}</AlertDescription>
            </Alert>
          </CardFooter>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>n8n Setup Guide</CardTitle>
          <CardDescription>How to configure your n8n instance to work with the AI Agents marketplace</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-muted p-4">
            <div className="flex items-start">
              <Info className="h-5 w-5 mr-2 mt-0.5 text-primary" />
              <div>
                <h3 className="font-medium">Prerequisites</h3>
                <p className="text-sm text-muted-foreground">
                  You need to have an n8n instance running and accessible over the internet.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Step 1: Generate API Key</h3>
            <p className="text-sm text-muted-foreground">
              In your n8n instance, go to Settings then API Keys and create a new API key with appropriate permissions.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Step 2: Configure Connection</h3>
            <p className="text-sm text-muted-foreground">
              Enter your n8n instance URL and API key in the form above. Make sure your n8n instance is accessible from
              this server.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Step 3: Set Up Webhooks</h3>
            <p className="text-sm text-muted-foreground">
              If you want to receive callbacks from n8n workflows, set up a webhook URL. This allows n8n to send
              execution results back to your marketplace.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Step 4: Test Connection</h3>
            <p className="text-sm text-muted-foreground">
              Use the "Test Connection" button to verify your configuration is working correctly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
