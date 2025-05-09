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
          created_at?: string
          updated_at?: string
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
