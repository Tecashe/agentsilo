"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    useCase: "",
    integrations: {
      crm: false,
      email: false,
      calendar: false,
      slack: false,
      zoom: false,
      salesforce: false,
      hubspot: false,
      zendesk: false,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleIntegrationToggle = (integration: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [integration]: checked,
      },
    }))
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = async () => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Onboarding Complete!",
      description: "Your account has been set up successfully.",
    })

    setLoading(false)
    router.push("/dashboard")
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>Company Info</span>
          </div>
          <div className="h-px bg-border flex-1 mx-4"></div>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>Use Case</span>
          </div>
          <div className="h-px bg-border flex-1 mx-4"></div>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              3
            </div>
            <span className={step >= 3 ? "font-medium" : "text-muted-foreground"}>Integrations</span>
          </div>
          <div className="h-px bg-border flex-1 mx-4"></div>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                step >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              4
            </div>
            <span className={step >= 4 ? "font-medium" : "text-muted-foreground"}>Complete</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Tell us about your business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Acme Inc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Select value={formData.companySize} onValueChange={(value) => handleSelectChange("companySize", value)}>
                <SelectTrigger id="companySize">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="501+">501+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={!formData.companyName || !formData.industry || !formData.companySize}
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Use Case</CardTitle>
            <CardDescription>What are you looking to automate?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="useCase">Primary Use Case</Label>
              <Select value={formData.useCase} onValueChange={(value) => handleSelectChange("useCase", value)}>
                <SelectTrigger id="useCase">
                  <SelectValue placeholder="Select primary use case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer-support">Customer Support Automation</SelectItem>
                  <SelectItem value="sales">Sales Process Automation</SelectItem>
                  <SelectItem value="marketing">Marketing Automation</SelectItem>
                  <SelectItem value="hr">HR & Recruitment</SelectItem>
                  <SelectItem value="finance">Finance & Accounting</SelectItem>
                  <SelectItem value="operations">Operations & Logistics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={!formData.useCase}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Select the tools you want to integrate with</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="crm"
                  checked={formData.integrations.crm}
                  onCheckedChange={(checked) => handleIntegrationToggle("crm", checked as boolean)}
                />
                <Label htmlFor="crm">CRM Systems</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email"
                  checked={formData.integrations.email}
                  onCheckedChange={(checked) => handleIntegrationToggle("email", checked as boolean)}
                />
                <Label htmlFor="email">Email Platforms</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="calendar"
                  checked={formData.integrations.calendar}
                  onCheckedChange={(checked) => handleIntegrationToggle("calendar", checked as boolean)}
                />
                <Label htmlFor="calendar">Calendar Apps</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="slack"
                  checked={formData.integrations.slack}
                  onCheckedChange={(checked) => handleIntegrationToggle("slack", checked as boolean)}
                />
                <Label htmlFor="slack">Slack</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="zoom"
                  checked={formData.integrations.zoom}
                  onCheckedChange={(checked) => handleIntegrationToggle("zoom", checked as boolean)}
                />
                <Label htmlFor="zoom">Zoom</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="salesforce"
                  checked={formData.integrations.salesforce}
                  onCheckedChange={(checked) => handleIntegrationToggle("salesforce", checked as boolean)}
                />
                <Label htmlFor="salesforce">Salesforce</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hubspot"
                  checked={formData.integrations.hubspot}
                  onCheckedChange={(checked) => handleIntegrationToggle("hubspot", checked as boolean)}
                />
                <Label htmlFor="hubspot">HubSpot</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="zendesk"
                  checked={formData.integrations.zendesk}
                  onCheckedChange={(checked) => handleIntegrationToggle("zendesk", checked as boolean)}
                />
                <Label htmlFor="zendesk">Zendesk</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Complete Setup</CardTitle>
            <CardDescription>Review your information and complete the setup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Company Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Company Name:</div>
                <div>{formData.companyName}</div>
                <div className="text-muted-foreground">Industry:</div>
                <div>{formData.industry}</div>
                <div className="text-muted-foreground">Company Size:</div>
                <div>{formData.companySize}</div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Use Case</h3>
              <div>{formData.useCase}</div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Selected Integrations</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(formData.integrations)
                  .filter(([_, selected]) => selected)
                  .map(([integration]) => (
                    <div key={integration} className="bg-background px-2 py-1 rounded-full text-sm flex items-center">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-primary" />
                      {integration}
                    </div>
                  ))}
                {Object.values(formData.integrations).every((v) => !v) && (
                  <div className="text-muted-foreground">No integrations selected</div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleComplete} disabled={loading}>
              {loading ? "Setting up..." : "Complete Setup"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
