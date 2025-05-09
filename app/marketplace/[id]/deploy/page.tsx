"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, ArrowRight, CheckCircle2, Zap } from "lucide-react"
import { deployAgent } from "@/lib/actions/agents"

export default function DeployAgentPage() {
  const params = useParams()
  const { toast } = useToast()
  const agentId = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    integrations: {} as Record<string, boolean>,
    settings: {},
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleIntegrationChange = (integration: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [integration]: checked,
      },
    }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleDeploy()
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDeploy = async () => {
    setIsLoading(true)

    try {
      await deployAgent(agentId, {
        name: formData.name,
        description: formData.description,
        settings: {
          ...formData.settings,
          integrations: formData.integrations,
        },
      })

      toast({
        title: "Agent Deployed Successfully",
        description: `${formData.name} has been added to your dashboard.`,
      })
    } catch (error: any) {
      toast({
        title: "Deployment Failed",
        description: error.message || "An error occurred while deploying the agent.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href={`/marketplace/${agentId}`} className="text-purple-600 hover:underline mb-4 inline-block">
        ← Back to Agent Details
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Deploy Agent</h1>
        <p className="text-gray-600 mb-8">Follow the steps below to set up and deploy this agent.</p>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  currentStep >= 1 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>
              <span className={currentStep >= 1 ? "font-medium" : "text-gray-500"}>Basic Information</span>
            </div>
            <div className="h-px bg-gray-200 flex-1 mx-4"></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  currentStep >= 2 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <span className={currentStep >= 2 ? "font-medium" : "text-gray-500"}>Connect Integrations</span>
            </div>
            <div className="h-px bg-gray-200 flex-1 mx-4"></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  currentStep >= 3 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
              <span className={currentStep >= 3 ? "font-medium" : "text-gray-500"}>Review & Deploy</span>
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Provide a name and description for this agent instance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent-name">Agent Name</Label>
                <Input id="agent-name" name="name" value={formData.name} onChange={handleChange} required />
                <p className="text-sm text-gray-500">This name will be displayed in your dashboard</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="agent-description">Description (Optional)</Label>
                <Input id="agent-description" name="description" value={formData.description} onChange={handleChange} />
                <p className="text-sm text-gray-500">Add a custom description to help you identify this agent</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/marketplace/${agentId}`}>Cancel</Link>
              </Button>
              <Button onClick={handleNextStep} disabled={!formData.name}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Connect Integrations</CardTitle>
              <CardDescription>Connect the required services for this agent to function</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-gray-500">This agent requires the following integrations:</p>
              <div className="space-y-4">
                {["Gmail", "Slack", "Salesforce", "Zendesk"].map((integration) => (
                  <div key={integration} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Zap className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{integration}</h3>
                        <div className="flex items-center">
                          <Checkbox
                            id={`integration-${integration}`}
                            checked={formData.integrations[integration] || false}
                            onCheckedChange={(checked) => handleIntegrationChange(integration, checked as boolean)}
                          />
                          <Label htmlFor={`integration-${integration}`} className="ml-2">
                            Connected
                          </Label>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Connect your {integration} account to enable this integration
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          toast({
                            title: `${integration} Connected`,
                            description: `Successfully connected to your ${integration} account.`,
                          })
                          handleIntegrationChange(integration, true)
                        }}
                      >
                        Connect {integration}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNextStep}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Review & Deploy</CardTitle>
              <CardDescription>Review your configuration and deploy the agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Agent Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Name:</div>
                    <div>{formData.name}</div>
                    <div className="text-gray-500">Description:</div>
                    <div>{formData.description || "No description provided"}</div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Connected Integrations</h3>
                  <ul className="space-y-2">
                    {Object.entries(formData.integrations).map(([integration, connected]) => (
                      <li key={integration} className="flex items-center">
                        {connected ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border border-gray-300 mr-2" />
                        )}
                        <span className={connected ? "" : "text-gray-400"}>
                          {integration} {connected ? "(Connected)" : "(Not Connected)"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 border rounded-lg bg-yellow-50">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                    Important Note
                  </h3>
                  <p className="text-sm">
                    You can modify these settings later from your dashboard. Missing integrations will need to be
                    connected before the agent can fully function.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleDeploy} disabled={isLoading}>
                {isLoading ? "Deploying..." : "Deploy Agent"}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
