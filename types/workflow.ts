// Define the base Workflow interface with all properties that might come from the database
export interface BaseWorkflow {
  id: string
  name: string
  description: string
  category: string
  integrations: string[]
  rating: number
  usageCount: number
  createdAt: string
  pricing: string
  n8nWorkflowId?: string
  featured?: boolean
  setupTime?: string
  setupInstructions?: string
  features?: string[]
  mediaGallery?: WorkflowMedia[]
  steps?: WorkflowStep[]
}

// Define a FormWorkflow interface that matches exactly what WorkflowForm expects
export interface FormWorkflow {
  id: string
  name: string
  description: string
  category: string
  integrations: string[]
  rating: number
  usageCount: number
  createdAt: string
  pricing: string
  n8nWorkflowId: string
  features: string[]
  setupInstructions: string
  setupTime: string
  featured?: boolean
}

// For backward compatibility, keep the Workflow type
export type Workflow = BaseWorkflow

export interface WorkflowMedia {
  id: string
  workflowId: string
  type: "image" | "video" | "tutorial"
  url: string
  title: string
  description?: string
}

export interface WorkflowStep {
  id: string
  workflowId: string
  order: number
  title: string
  description: string
  icon?: string
}

export interface WorkflowFiltersType {
  searchTerm: string
  categories: string[]
  integrations: string[]
  sortBy: "newest" | "popular" | "rating" | "price-low" | "price-high"
  pricingFilter?: "all" | "free" | "paid"
  setupTime?: string[]
  featured?: boolean
  page: number
  limit: number
}

// Helper function to transform a BaseWorkflow to a FormWorkflow
export function toFormWorkflow(workflow: BaseWorkflow): FormWorkflow {
  return {
    id: workflow.id,
    name: workflow.name,
    description: workflow.description,
    category: workflow.category,
    integrations: workflow.integrations,
    rating: workflow.rating,
    usageCount: workflow.usageCount,
    createdAt: workflow.createdAt,
    pricing: workflow.pricing,
    n8nWorkflowId: workflow.n8nWorkflowId || "",
    features: workflow.features || [],
    setupInstructions: workflow.setupInstructions || "",
    setupTime: workflow.setupTime || "5 minutes",
    featured: workflow.featured,
  }
}
