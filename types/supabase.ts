export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      agents: {
        Row: {
          id: string
          name: string
          description: string
          category: string
          features: string[]
          integrations: string[]
          tools: string[]
          code: string
          setupTime: string
          pricing: string
          created_at: string
        }
        Insert: {
          id: string
          name: string
          description: string
          category: string
          features?: string[]
          integrations?: string[]
          tools?: string[]
          code?: string
          setupTime?: string
          pricing?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category?: string
          features?: string[]
          integrations?: string[]
          tools?: string[]
          code?: string
          setupTime?: string
          pricing?: string
          created_at?: string
        }
      }
      user_agents: {
        Row: {
          id: string
          user_id: string
          agent_id: string
          name: string
          description: string
          status: string
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          agent_id: string
          name: string
          description: string
          status?: string
          settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          agent_id?: string
          name?: string
          description?: string
          status?: string
          settings?: Json
          created_at?: string
          updated_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string
          agent_id: string
          action: string
          status: string
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          agent_id: string
          action: string
          status: string
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          agent_id?: string
          action?: string
          status?: string
          category?: string
          created_at?: string
        }
      }
      integrations: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string
          category: string
          connected: boolean
          credentials: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description: string
          category: string
          connected?: boolean
          credentials?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string
          category?: string
          connected?: boolean
          credentials?: Json
          created_at?: string
          updated_at?: string
        }
      }
      custom_requests: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          company: string
          description: string
          selected_integrations: string[]
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          company: string
          description: string
          selected_integrations?: string[]
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          company?: string
          description?: string
          selected_integrations?: string[]
          status?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          company: string
          bio: string
          avatar_url: string
          subscription_tier: string
          notification_settings: Json
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string
          company?: string
          bio?: string
          avatar_url?: string
          subscription_tier?: string
          notification_settings?: Json
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          company?: string
          bio?: string
          avatar_url?: string
          subscription_tier?: string
          notification_settings?: Json
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      workflows: {
        Row: {
          id: string
          name: string
          description: string
          n8n_workflow_id: string
          category: string
          version: string
          pricing_tier: string
          price: number
          setup_time: string
          is_published: boolean
          is_featured: boolean
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          n8n_workflow_id: string
          category: string
          version?: string
          pricing_tier?: string
          price?: number
          setup_time?: string
          is_published?: boolean
          is_featured?: boolean
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          n8n_workflow_id?: string
          category?: string
          version?: string
          pricing_tier?: string
          price?: number
          setup_time?: string
          is_published?: boolean
          is_featured?: boolean
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      workflow_integrations: {
        Row: {
          id: string
          workflow_id: string
          integration_name: string
          integration_type: string
          is_required: boolean
          config_schema: Json
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          workflow_id: string
          integration_name: string
          integration_type: string
          is_required?: boolean
          config_schema?: Json
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          workflow_id?: string
          integration_name?: string
          integration_type?: string
          is_required?: boolean
          config_schema?: Json
          description?: string | null
          created_at?: string
        }
      }
      workflow_features: {
        Row: {
          id: string
          workflow_id: string
          feature: string
          created_at: string
        }
        Insert: {
          id?: string
          workflow_id: string
          feature: string
          created_at?: string
        }
        Update: {
          id?: string
          workflow_id?: string
          feature?: string
          created_at?: string
        }
      }
      workflow_usage: {
        Row: {
          id: string
          workflow_id: string
          user_id: string
          execution_count: number
          last_executed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workflow_id: string
          user_id: string
          execution_count?: number
          last_executed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workflow_id?: string
          user_id?: string
          execution_count?: number
          last_executed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      workflow_ratings: {
        Row: {
          id: string
          workflow_id: string
          user_id: string
          rating: number
          review: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workflow_id: string
          user_id: string
          rating: number
          review?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workflow_id?: string
          user_id?: string
          rating?: number
          review?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_workflows: {
        Row: {
          id: string
          user_id: string
          workflow_id: string
          status: string
          integration_config: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          workflow_id: string
          status?: string
          integration_config?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          workflow_id?: string
          status?: string
          integration_config?: Json
          created_at?: string
          updated_at?: string
        }
      }
      workflow_execution_logs: {
        Row: {
          id: string
          user_workflow_id: string
          status: string
          input_data: Json | null
          output_data: Json | null
          error_message: string | null
          execution_time: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_workflow_id: string
          status: string
          input_data?: Json | null
          output_data?: Json | null
          error_message?: string | null
          execution_time?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_workflow_id?: string
          status?: string
          input_data?: Json | null
          output_data?: Json | null
          error_message?: string | null
          execution_time?: number | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
