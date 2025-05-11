"use client"

import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase/client"
//import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Play, ImageIcon, FileText } from "lucide-react"

interface WorkflowMedia {
  id: string
  workflow_id: string
  media_type: "image" | "video" | "document"
  title: string
  description: string
  url: string
  thumbnail_url: string
  display_order: number
}

interface WorkflowMediaGalleryProps {
  workflowId: string
}

export function WorkflowMediaGallery({ workflowId }: WorkflowMediaGalleryProps) {
  const [media, setMedia] = useState<WorkflowMedia[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<string>("all")
  const [selectedMedia, setSelectedMedia] = useState<WorkflowMedia | null>(null)
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    async function fetchWorkflowMedia() {
      try {
        const { data, error } = await supabase
          .from("workflow_media")
          .select("*")
          .eq("workflow_id", workflowId)
          .order("display_order")

        if (error) throw error

        setMedia(data || [])
        if (data && data.length > 0) {
          setSelectedMedia(data[0])
        }
      } catch (error) {
        console.error("Error fetching workflow media:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkflowMedia()
  }, [workflowId, supabase])

  const filteredMedia = activeTab === "all" ? media : media.filter((item) => item.media_type === activeTab)

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (media.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No media has been added for this agent.
        </CardContent>
      </Card>
    )
  }

  const renderMediaContent = () => {
    if (!selectedMedia) return null

    switch (selectedMedia.media_type) {
      case "video":
        return (
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
            <iframe src={selectedMedia.url} className="w-full h-full" allowFullScreen title={selectedMedia.title} />
          </div>
        )
      case "image":
        return (
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <img
              src={selectedMedia.url || "/placeholder.svg"}
              alt={selectedMedia.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )
      case "document":
        return (
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted flex flex-col items-center justify-center p-4">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <a
              href={selectedMedia.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View Document: {selectedMedia.title}
            </a>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="image">Images</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-6">
        {/* Main media display */}
        {selectedMedia && (
          <div className="space-y-3">
            {renderMediaContent()}
            <div>
              <h3 className="font-medium">{selectedMedia.title}</h3>
              {selectedMedia.description && (
                <p className="text-sm text-muted-foreground mt-1">{selectedMedia.description}</p>
              )}
            </div>
          </div>
        )}

        {/* Thumbnails */}
        {filteredMedia.length > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className={`cursor-pointer rounded-md overflow-hidden aspect-video relative ${
                  selectedMedia?.id === item.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedMedia(item)}
              >
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  {item.media_type === "video" && <Play className="h-8 w-8 text-white opacity-70" />}
                  {item.media_type === "image" && <ImageIcon className="h-8 w-8 text-white opacity-70" />}
                  {item.media_type === "document" && <FileText className="h-8 w-8 text-white opacity-70" />}
                </div>
                <img src={item.thumbnail_url || item.url} alt={item.title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
