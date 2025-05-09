"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { submitCustomRequest } from "@/lib/actions/custom-requests"

const integrations = [
  { id: "gmail", name: "Gmail", icon: "mail" },
  { id: "outlook", name: "Outlook", icon: "mail" },
  { id: "salesforce", name: "Salesforce", icon: "briefcase" },
  { id: "hubspot", name: "HubSpot", icon: "users" },
  { id: "zendesk", name: "Zendesk", icon: "headphones" },
  { id: "slack", name: "Slack", icon: "message-square" },
  { id: "twitter", name: "Twitter", icon: "twitter" },
  { id: "facebook", name: "Facebook", icon: "facebook" },
  { id: "instagram", name: "Instagram", icon: "instagram" },
  { id: "linkedin", name: "LinkedIn", icon: "linkedin" },
  { id: "quickbooks", name: "QuickBooks", icon: "dollar-sign" },
  { id: "xero", name: "Xero", icon: "dollar-sign" },
  { id: "shopify", name: "Shopify", icon: "shopping-bag" },
  { id: "woocommerce", name: "WooCommerce", icon: "shopping-cart" },
  { id: "zoom", name: "Zoom", icon: "video" },
  { id: "google-meet", name: "Google Meet", icon: "video" },
]

export default function RequestCustomPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
    selectedIntegrations: [] as string[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleIntegrationToggle = (integrationId: string) => {
    setFormData((prev) => {
      const selectedIntegrations = prev.selectedIntegrations.includes(integrationId)
        ? prev.selectedIntegrations.filter((id) => id !== integrationId)
        : [...prev.selectedIntegrations, integrationId]

      return { ...prev, selectedIntegrations }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitCustomRequest(formData)

      toast({
        title: "Request Submitted",
        description: "We've received your custom agent request. Our team will contact you soon.",
      })
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "An error occurred while submitting your request.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Request a Custom AI Agent</h1>
          <p className="text-xl text-gray-600">
            Tell us about your business needs and we'll build a custom AI agent tailored for you.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Provide your contact details so we can get in touch with you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Agent Requirements</CardTitle>
              <CardDescription>Describe what you want your custom AI agent to do.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Describe Your Needs</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Please describe what you want your AI agent to do, what problems it should solve, and any specific requirements you have."
                  rows={6}
                  required
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-4">
                <Label>Integrations Needed</Label>
                <p className="text-sm text-gray-500">
                  Select the tools and services your AI agent should integrate with:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`integration-${integration.id}`}
                        checked={formData.selectedIntegrations.includes(integration.id)}
                        onCheckedChange={() => handleIntegrationToggle(integration.id)}
                      />
                      <Label htmlFor={`integration-${integration.id}`} className="cursor-pointer">
                        {integration.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Our team reviews your request</h3>
                    <p className="text-gray-500">We'll analyze your requirements and determine the best approach.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">We contact you for details</h3>
                    <p className="text-gray-500">A team member will reach out to discuss specifics and pricing.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Development and deployment</h3>
                    <p className="text-gray-500">We build your custom agent and help you deploy it.</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting Request..." : "Submit Request"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}
