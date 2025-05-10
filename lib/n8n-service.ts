/**
 * Service for interacting with n8n API
 */

import { z } from "zod"

// Environment variables validation
const envSchema = z.object({
  N8N_API_URL: z.string().url(),
  N8N_API_KEY: z.string().min(1),
})

// Validate environment variables
function getEnvVariables() {
  try {
    return envSchema.parse({
      N8N_API_URL: process.env.N8N_API_URL,
      N8N_API_KEY: process.env.N8N_API_KEY,
    })
  } catch (error) {
    console.error("Missing or invalid environment variables for n8n service:", error)
    throw new Error("Missing or invalid environment variables for n8n service")
  }
}

// Types for n8n API responses
export interface N8nWorkflow {
  id: string
  name: string
  active: boolean
  nodes: any[]
  connections: any
  createdAt: string
  updatedAt: string
}

export interface N8nWorkflowExecution {
  id: string
  finished: boolean
  mode: string
  startedAt: string
  stoppedAt?: string
  status: "running" | "success" | "error" | "waiting"
  data?: any
  error?: {
    message: string
    stack?: string
  }
}

/**
 * Fetches a workflow from n8n by ID
 */
export async function getWorkflow(workflowId: string): Promise<N8nWorkflow> {
  const { N8N_API_URL, N8N_API_KEY } = getEnvVariables()

  const response = await fetch(`${N8N_API_URL}/workflows/${workflowId}`, {
    headers: {
      "X-N8N-API-KEY": N8N_API_KEY,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to fetch workflow: ${error}`)
  }

  return response.json()
}

/**
 * Fetches all workflows from n8n
 */
export async function getAllWorkflows(): Promise<N8nWorkflow[]> {
  const { N8N_API_URL, N8N_API_KEY } = getEnvVariables()

  const response = await fetch(`${N8N_API_URL}/workflows`, {
    headers: {
      "X-N8N-API-KEY": N8N_API_KEY,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to fetch workflows: ${error}`)
  }

  return response.json()
}

/**
 * Executes a workflow with the provided data
 */
export async function executeWorkflow(workflowId: string, data: Record<string, any>): Promise<N8nWorkflowExecution> {
  const { N8N_API_URL, N8N_API_KEY } = getEnvVariables()

  const response = await fetch(`${N8N_API_URL}/workflows/${workflowId}/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-N8N-API-KEY": N8N_API_KEY,
    },
    body: JSON.stringify({ data }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to execute workflow: ${error}`)
  }

  return response.json()
}

/**
 * Gets the status of a workflow execution
 */
export async function getExecutionStatus(executionId: string): Promise<N8nWorkflowExecution> {
  const { N8N_API_URL, N8N_API_KEY } = getEnvVariables()

  const response = await fetch(`${N8N_API_URL}/executions/${executionId}`, {
    headers: {
      "X-N8N-API-KEY": N8N_API_KEY,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get execution status: ${error}`)
  }

  return response.json()
}

/**
 * Activates a workflow
 */
export async function activateWorkflow(workflowId: string): Promise<N8nWorkflow> {
  const { N8N_API_URL, N8N_API_KEY } = getEnvVariables()

  const response = await fetch(`${N8N_API_URL}/workflows/${workflowId}/activate`, {
    method: "POST",
    headers: {
      "X-N8N-API-KEY": N8N_API_KEY,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to activate workflow: ${error}`)
  }

  return response.json()
}

/**
 * Deactivates a workflow
 */
export async function deactivateWorkflow(workflowId: string): Promise<N8nWorkflow> {
  const { N8N_API_URL, N8N_API_KEY } = getEnvVariables()

  const response = await fetch(`${N8N_API_URL}/workflows/${workflowId}/deactivate`, {
    method: "POST",
    headers: {
      "X-N8N-API-KEY": N8N_API_KEY,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to deactivate workflow: ${error}`)
  }

  return response.json()
}
