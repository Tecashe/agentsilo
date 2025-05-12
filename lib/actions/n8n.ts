"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { cache } from "react"
import axios from "axios"

interface N8nConfig {
  apiUrl: string
  apiKey: string
  webhookUrl?: string
  useHttps: boolean
}

// Cache the n8n config to avoid repeated database queries
export const getN8nConfig = cache(async (): Promise<N8nConfig | null> => {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.from("system_settings").select("*").eq("key", "n8n_config").single()

  if (error || !data) {
    return null
  }

  return data.value as N8nConfig
})

// Update n8n config
export async function updateN8nConfig(config: N8nConfig) {
  const supabase = await createServerSupabaseClient()

  // Verify user is admin
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    throw new Error("You must be logged in to update n8n configuration")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  if (!profile || profile.role !== "admin") {
    throw new Error("Only administrators can update n8n configuration")
  }

  // Update config
  const { error } = await supabase.from("system_settings").upsert({
    key: "n8n_config",
    value: config,
    updated_at: new Date().toISOString(),
  })

  if (error) {
    throw new Error(`Failed to update n8n configuration: ${error.message}`)
  }

  revalidatePath("/admin/n8n/config")
  return { success: true }
}

// Test n8n connection
export async function testN8nConnectione(config: { apiUrl: string; apiKey: string }) {
  try {
    // Make a request to the n8n API to verify connection
    const response = await axios.get(`${config.apiUrl}/api/v1/workflows`, {
      headers: {
        "X-N8N-API-KEY": config.apiKey,
      },
    })

    if (response.status === 200) {
      return {
        success: true,
        message: `Successfully connected to n8n. Found ${response.data.data.length} workflows.`,
      }
    } else {
      return {
        success: false,
        message: `Connection failed: Received status code ${response.status}`,
      }
    }
  } catch (error) {
    let errorMessage = "Unknown error occurred"

    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNREFUSED") {
        errorMessage = "Connection refused. Please check if the n8n server is running and accessible."
      } else if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data.message || "API error"}`
      } else if (error.request) {
        errorMessage = "No response received from server. Please check the API URL."
      } else {
        errorMessage = error.message
      }
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    return {
      success: false,
      message: `Connection failed: ${errorMessage}`,
    }
  }
}

// Get n8n status
export async function getN8nStatuse() {
  const config = await getN8nConfig()

  if (!config) {
    return {
      connected: false,
      workflowExecution: false,
      activeWorkflows: 0,
    }
  }

  try {
    // Check if we can connect to n8n
    const response = await axios.get(`${config.apiUrl}/api/v1/workflows`, {
      headers: {
        "X-N8N-API-KEY": config.apiKey,
      },
    })

    if (response.status === 200) {
      // Count active workflows
      const activeWorkflows = response.data.data.filter((wf: any) => wf.active).length

      return {
        connected: true,
        workflowExecution: true,
        activeWorkflows,
      }
    } else {
      return {
        connected: false,
        workflowExecution: false,
        activeWorkflows: 0,
      }
    }
  } catch (error) {
    return {
      connected: false,
      workflowExecution: false,
      activeWorkflows: 0,
    }
  }
}

// Get n8n workflows
export async function getN8nWorkflows() {
  const config = await getN8nConfig()

  if (!config) {
    throw new Error("n8n configuration not found. Please configure n8n integration first.")
  }

  try {
    const response = await axios.get(`${config.apiUrl}/api/v1/workflows`, {
      headers: {
        "X-N8N-API-KEY": config.apiKey,
      },
    })

    if (response.status === 200) {
      return response.data.data.map((wf: any) => ({
        id: wf.id,
        name: wf.name,
        description: wf.description,
        active: wf.active,
        createdAt: wf.createdAt,
        updatedAt: wf.updatedAt,
        tags: wf.tags,
      }))
    } else {
      throw new Error(`Failed to fetch workflows: Received status code ${response.status}`)
    }
  } catch (error) {
    let errorMessage = "Unknown error occurred"

    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNREFUSED") {
        errorMessage = "Connection refused. Please check if the n8n server is running and accessible."
      } else if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data.message || "API error"}`
      } else if (error.request) {
        errorMessage = "No response received from server. Please check the API URL."
      } else {
        errorMessage = error.message
      }
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    throw new Error(`Failed to fetch workflows: ${errorMessage}`)
  }
}

// Get workflow by ID
export async function getN8nWorkflowById(workflowId: string) {
  const config = await getN8nConfig()

  if (!config) {
    throw new Error("n8n configuration not found. Please configure n8n integration first.")
  }

  try {
    const response = await axios.get(`${config.apiUrl}/api/v1/workflows/${workflowId}`, {
      headers: {
        "X-N8N-API-KEY": config.apiKey,
      },
    })

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Failed to fetch workflow: Received status code ${response.status}`)
    }
  } catch (error) {
    let errorMessage = "Unknown error occurred"

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        errorMessage = "Workflow not found"
      } else if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data.message || "API error"}`
      } else {
        errorMessage = error.message
      }
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    throw new Error(`Failed to fetch workflow: ${errorMessage}`)
  }
}

// Test workflow execution
export async function testN8nWorkflow({ workflowId, testData }: { workflowId: string; testData: any }) {
  const config = await getN8nConfig()

  if (!config) {
    throw new Error("n8n configuration not found. Please configure n8n integration first.")
  }

  try {
    const startTime = performance.now()

    // Execute the workflow
    const response = await axios.post(
      `${config.apiUrl}/api/v1/workflows/${workflowId}/execute`,
      {
        data: testData,
      },
      {
        headers: {
          "X-N8N-API-KEY": config.apiKey,
          "Content-Type": "application/json",
        },
      },
    )

    const endTime = performance.now()

    if (response.status === 200) {
      return {
        success: true,
        message: "Workflow executed successfully",
        data: response.data.data,
        executionId: response.data.executionId,
        duration: endTime - startTime,
      }
    } else {
      return {
        success: false,
        message: `Execution failed: Received status code ${response.status}`,
      }
    }
  } catch (error) {
    let errorMessage = "Unknown error occurred"

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data.message || "API error"}`
      } else if (error.request) {
        errorMessage = "No response received from server. Please check the API URL."
      } else {
        errorMessage = error.message
      }
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    return {
      success: false,
      message: `Execution failed: ${errorMessage}`,
    }
  }
}

// Create a new workflow in n8n
export async function createN8nWorkflow(workflowData: any) {
  const config = await getN8nConfig()

  if (!config) {
    throw new Error("n8n configuration not found. Please configure n8n integration first.")
  }

  try {
    const response = await axios.post(`${config.apiUrl}/api/v1/workflows`, workflowData, {
      headers: {
        "X-N8N-API-KEY": config.apiKey,
        "Content-Type": "application/json",
      },
    })

    if (response.status === 200) {
      return {
        success: true,
        message: "Workflow created successfully",
        workflowId: response.data.id,
      }
    } else {
      throw new Error(`Failed to create workflow: Received status code ${response.status}`)
    }
  } catch (error) {
    let errorMessage = "Unknown error occurred"

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data.message || "API error"}`
      } else {
        errorMessage = error.message
      }
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    throw new Error(`Failed to create workflow: ${errorMessage}`)
  }
}

// Update a workflow in n8n
export async function updateN8nWorkflow(workflowId: string, workflowData: any) {
  const config = await getN8nConfig()

  if (!config) {
    throw new Error("n8n configuration not found. Please configure n8n integration first.")
  }

  try {
    const response = await axios.put(`${config.apiUrl}/api/v1/workflows/${workflowId}`, workflowData, {
      headers: {
        "X-N8N-API-KEY": config.apiKey,
        "Content-Type": "application/json",
      },
    })

    if (response.status === 200) {
      return {
        success: true,
        message: "Workflow updated successfully",
      }
    } else {
      throw new Error(`Failed to update workflow: Received status code ${response.status}`)
    }
  } catch (error) {
    let errorMessage = "Unknown error occurred"

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data.message || "API error"}`
      } else {
        errorMessage = error.message
      }
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    throw new Error(`Failed to update workflow: ${errorMessage}`)
  }
}

// Activate a workflow in n8n
export async function activateN8nWorkflow(workflowId: string, active: boolean) {
  const config = await getN8nConfig()

  if (!config) {
    throw new Error("n8n configuration not found. Please configure n8n integration first.")
  }

  try {
    const response = await axios.patch(
      `${config.apiUrl}/api/v1/workflows/${workflowId}/activate`,
      { active },
      {
        headers: {
          "X-N8N-API-KEY": config.apiKey,
          "Content-Type": "application/json",
        },
      },
    )

    if (response.status === 200) {
      return {
        success: true,
        message: active ? "Workflow activated successfully" : "Workflow deactivated successfully",
      }
    } else {
      throw new Error(
        `Failed to ${active ? "activate" : "deactivate"} workflow: Received status code ${response.status}`,
      )
    }
  } catch (error) {
    let errorMessage = "Unknown error occurred"

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data.message || "API error"}`
      } else {
        errorMessage = error.message
      }
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    throw new Error(`Failed to ${active ? "activate" : "deactivate"} workflow: ${errorMessage}`)
  }
}

// Delete a workflow in n8n
export async function deleteN8nWorkflow(workflowId: string) {
  const config = await getN8nConfig()

  if (!config) {
    throw new Error("n8n configuration not found. Please configure n8n integration first.")
  }

  try {
    const response = await axios.delete(`${config.apiUrl}/api/v1/workflows/${workflowId}`, {
      headers: {
        "X-N8N-API-KEY": config.apiKey,
      },
    })

    if (response.status === 200) {
      return {
        success: true,
        message: "Workflow deleted successfully",
      }
    } else {
      throw new Error(`Failed to delete workflow: Received status code ${response.status}`)
    }
  } catch (error) {
    let errorMessage = "Unknown error occurred"

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data.message || "API error"}`
      } else {
        errorMessage = error.message
      }
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    throw new Error(`Failed to delete workflow: ${errorMessage}`)
  }
}










// "use server"

// import { createServerSupabaseClient } from "@/lib/supabase/server"
// import { cache } from "react"

interface N8nStatus {
  connected: boolean
  workflowExecution: boolean
  activeWorkflows: number
}

export const getN8nStatus = cache(async (): Promise<N8nStatus> => {
  const supabase = await createServerSupabaseClient()

  // Get n8n configuration from system_settings
  const { data: n8nConfig } = await supabase.from("system_settings").select("*").eq("key", "n8n_config").single()

  if (!n8nConfig || !n8nConfig.value?.api_url || !n8nConfig.value?.api_key) {
    return {
      connected: false,
      workflowExecution: false,
      activeWorkflows: 0,
    }
  }

  // Try to connect to n8n
  try {
    const response = await fetch(`${n8nConfig.value.api_url}/workflows`, {
      headers: {
        "X-N8N-API-KEY": n8nConfig.value.api_key,
      },
    })

    if (!response.ok) {
      return {
        connected: false,
        workflowExecution: false,
        activeWorkflows: 0,
      }
    }

    const workflows = await response.json()

    // Count active workflows
    const activeWorkflows = workflows.filter((workflow: any) => workflow.active).length

    return {
      connected: true,
      workflowExecution: true,
      activeWorkflows,
    }
  } catch (error) {
    console.error("Error connecting to n8n:", error)
    return {
      connected: false,
      workflowExecution: false,
      activeWorkflows: 0,
    }
  }
})

export async function testN8nConnection(apiUrl: string, apiKey: string) {
  try {
    const response = await fetch(`${apiUrl}/workflows`, {
      headers: {
        "X-N8N-API-KEY": apiKey,
      },
    })

    if (!response.ok) {
      return { success: false, message: `Error: ${response.status} ${response.statusText}` }
    }

    return { success: true, message: "Successfully connected to n8n!" }
  } catch (error) {
    console.error("Error testing n8n connection:", error)
    return { success: false, message: `Connection failed: ${error instanceof Error ? error.message : String(error)}` }
  }
}

export async function saveN8nConfig(apiUrl: string, apiKey: string) {
  const supabase = await createServerSupabaseClient()

  // Test connection first
  const testResult = await testN8nConnection(apiUrl, apiKey)

  if (!testResult.success) {
    return testResult
  }

  // Save configuration to system_settings
  const { error } = await supabase.from("system_settings").upsert({
    key: "n8n_config",
    value: { api_url: apiUrl, api_key: apiKey },
    updated_at: new Date().toISOString(),
  })

  if (error) {
    console.error("Error saving n8n config:", error)
    return { success: false, message: `Error saving configuration: ${error.message}` }
  }

  return { success: true, message: "n8n configuration saved successfully!" }
}

export async function executeWorkflow(workflowId: string, inputData: any) {
  const supabase = await createServerSupabaseClient()

  // Get n8n configuration
  const { data: n8nConfig } = await supabase.from("system_settings").select("*").eq("key", "n8n_config").single()

  if (!n8nConfig || !n8nConfig.value?.api_url || !n8nConfig.value?.api_key) {
    return { success: false, message: "n8n is not configured" }
  }

  try {
    // Execute workflow
    const response = await fetch(`${n8nConfig.value.api_url}/workflows/${workflowId}/execute`, {
      method: "POST",
      headers: {
        "X-N8N-API-KEY": n8nConfig.value.api_key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: inputData,
        // Set to true if you want to wait for the workflow to complete
        waitForExecution: true,
      }),
    })

    if (!response.ok) {
      return {
        success: false,
        message: `Workflow execution failed: ${response.status} ${response.statusText}`,
        data: null,
      }
    }

    const resultData = await response.json()

    return {
      success: true,
      message: "Workflow executed successfully",
      data: resultData,
    }
  } catch (error) {
    console.error("Error executing workflow:", error)
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : String(error)}`,
      data: null,
    }
  }
}
