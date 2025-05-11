// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { useToast } from "@/hooks/use-toast"
// import { Loader2, Plus, Trash2, Upload, ImageIcon, Video, FileText } from "lucide-react"

// interface WorkflowMedia {
//   id?: string
//   workflow_id: string
//   media_type: "image" | "video" | "document"
//   title: string
//   description: string
//   url: string
//   thumbnail_url?: string
//   display_order: number
// }

// interface WorkflowMediaFormProps {
//   workflowId: string
// }

// export function WorkflowMediaForm({ workflowId }: WorkflowMediaFormProps) {
//   const router = useRouter()
//   const { toast } = useToast()
//   const supabase = createClientComponentClient()
//   const [mediaItems, setMediaItems] = useState<WorkflowMedia[]>([])
//   const [loading, setLoading] = useState(true)
//   const [saving, setSaving] = useState(false)
//   const [uploading, setUploading] = useState<number | null>(null)

//   useEffect(() => {
//     async function fetchWorkflowMedia() {
//       try {
//         const { data, error } = await supabase
//           .from("workflow_media")
//           .select("*")
//           .eq("workflow_id", workflowId)
//           .order("display_order")

//         if (error) throw error

//         setMediaItems(data || [])
//       } catch (error) {
//         console.error("Error fetching workflow media:", error)
//         toast({
//           title: "Error",
//           description: "Failed to load workflow media",
//           variant: "destructive",
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchWorkflowMedia()
//   }, [workflowId, supabase, toast])

//   const handleAddMedia = () => {
//     setMediaItems([
//       ...mediaItems,
//       {
//         workflow_id: workflowId,
//         media_type: "image",
//         title: "",
//         description: "",
//         url: "",
//         display_order: mediaItems.length,
//       },
//     ])
//   }

//   const handleRemoveMedia = (index: number) => {
//     const newMediaItems = mediaItems.filter((_, i) => i !== index)
//     // Update display order
//     newMediaItems.forEach((item, i) => {
//       item.display_order = i
//     })

//     setMediaItems(newMediaItems)
//   }

//   const handleMediaChange = (index: number, field: keyof WorkflowMedia, value: string) => {
//     const newMediaItems = [...mediaItems]
//     newMediaItems[index] = {
//       ...newMediaItems[index],
//       [field]: value,
//     }
//     setMediaItems(newMediaItems)
//   }

//   const handleFileUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (!file) return

//     setUploading(index)

//     try {
//       // Determine file type
//       const mediaType = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "document"

//       // Upload file to Supabase Storage
//       const fileExt = file.name.split(".").pop()
//       const fileName = `${workflowId}/${Date.now()}.${fileExt}`
//       const { data, error } = await supabase.storage.from("workflow-media").upload(fileName, file)

//       if (error) throw error

//       // Get public URL
//       const {
//         data: { publicUrl },
//       } = supabase.storage.from("workflow-media").getPublicUrl(data.path)

//       // Update media item
//       const newMediaItems = [...mediaItems]
//       newMediaItems[index] = {
//         ...newMediaItems[index],
//         media_type: mediaType as any,
//         url: publicUrl,
//         title: newMediaItems[index].title || file.name,
//       }

//       // If it's an image, use it as its own thumbnail
//       if (mediaType === "image") {
//         newMediaItems[index].thumbnail_url = publicUrl
//       }

//       setMediaItems(newMediaItems)

//       toast({
//         title: "Upload Complete",
//         description: "File uploaded successfully",
//       })
//     } catch (error: any) {
//       console.error("Error uploading file:", error)
//       toast({
//         title: "Upload Error",
//         description: error.message || "Failed to upload file",
//         variant: "destructive",
//       })
//     } finally {
//       setUploading(null)
//     }
//   }

//   const handleSave = async () => {
//     setSaving(true)

//     try {
//       // Validate media items
//       const invalidItems = mediaItems.filter((item) => !item.title || !item.url)
//       if (invalidItems.length > 0) {
//         throw new Error("All media items must have a title and URL")
//       }

//       // Get existing media IDs
//       const { data: existingMedia } = await supabase.from("workflow_media").select("id").eq("workflow_id", workflowId)

//       const existingIds = new Set((existingMedia || []).map((item) => item.id))

//       // Separate items to insert and update
//       const itemsToInsert = mediaItems.filter((item) => !item.id)
//       const itemsToUpdate = mediaItems.filter((item) => item.id && existingIds.has(item.id))
//       const idsToKeep = new Set(itemsToUpdate.map((item) => item.id))

//       // Delete removed items
//       const idsToDelete = Array.from(existingIds).filter((id) => !idsToKeep.has(id))
//       if (idsToDelete.length > 0) {
//         await supabase.from("workflow_media").delete().in("id", idsToDelete)
//       }

//       // Insert new items
//       if (itemsToInsert.length > 0) {
//         const { error: insertError } = await supabase.from("workflow_media").insert(itemsToInsert)

//         if (insertError) throw insertError
//       }

//       // Update existing items
//       for (const item of itemsToUpdate) {
//         const { error: updateError } = await supabase
//           .from("workflow_media")
//           .update({
//             media_type: item.media_type,
//             title: item.title,
//             description: item.description,
//             url: item.url,
//             thumbnail_url: item.thumbnail_url,
//             display_order: item.display_order,
//           })
//           .eq("id", item.id)

//         if (updateError) throw updateError
//       }

//       toast({
//         title: "Success",
//         description: "Workflow media saved successfully",
//       })

//       router.refresh()
//     } catch (error: any) {
//       console.error("Error saving workflow media:", error)
//       toast({
//         title: "Error",
//         description: error.message || "Failed to save workflow media",
//         variant: "destructive",
//       })
//     } finally {
//       setSaving(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center p-8">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-bold">Workflow Media</h2>
//         <Button onClick={handleAddMedia}>
//           <Plus className="h-4 w-4 mr-2" />
//           Add Media
//         </Button>
//       </div>

//       <div className="space-y-4">
//         {mediaItems.map((media, index) => (
//           <Card key={index}>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-base flex items-center justify-between">
//                 <div className="flex items-center">
//                   {media.media_type === "image" && <ImageIcon className="h-4 w-4 mr-2" />}
//                   {media.media_type === "video" && <Video className="h-4 w-4 mr-2" />}
//                   {media.media_type === "document" && <FileText className="h-4 w-4 mr-2" />}
//                   <span>Media Item {index + 1}</span>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => handleRemoveMedia(index)}
//                   className="text-destructive hover:text-destructive"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Title</label>
//                   <Input
//                     value={media.title}
//                     onChange={(e) => handleMediaChange(index, "title", e.target.value)}
//                     placeholder="Enter media title"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Media Type</label>
//                   <Select
//                     value={media.media_type}
//                     onValueChange={(value) => handleMediaChange(index, "media_type", value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select media type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="image">Image</SelectItem>
//                       <SelectItem value="video">Video</SelectItem>
//                       <SelectItem value="document">Document</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Description</label>
//                 <Textarea
//                   value={media.description}
//                   onChange={(e) => handleMediaChange(index, "description", e.target.value)}
//                   placeholder="Enter media description"
//                   rows={2}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">URL</label>
//                   <div className="flex space-x-2">
//                     <Input
//                       value={media.url}
//                       onChange={(e) => handleMediaChange(index, "url", e.target.value)}
//                       placeholder="Enter media URL"
//                     />
//                     <div className="relative">
//                       <input
//                         type="file"
//                         id={`file-upload-${index}`}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         onChange={(e) => handleFileUpload(index, e)}
//                       />
//                       <Button variant="outline" type="button" disabled={uploading === index}>
//                         {uploading === index ? (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                           <Upload className="h-4 w-4" />
//                         )}
//                       </Button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Thumbnail URL (optional)</label>
//                   <Input
//                     value={media.thumbnail_url || ""}
//                     onChange={(e) => handleMediaChange(index, "thumbnail_url", e.target.value)}
//                     placeholder="Enter thumbnail URL"
//                   />
//                 </div>
//               </div>

//               {media.url && (
//                 <div className="mt-4">
//                   <div className="border rounded-md p-2 bg-muted/30">
//                     {media.media_type === "image" && (
//                       <img
//                         src={media.url || "/placeholder.svg"}
//                         alt={media.title}
//                         className="max-h-40 object-contain mx-auto"
//                       />
//                     )}
//                     {media.media_type === "video" && (
//                       <div className="flex items-center justify-center">
//                         <Video className="h-10 w-10 text-muted-foreground" />
//                         <span className="ml-2 text-sm text-muted-foreground">Video Preview</span>
//                       </div>
//                     )}
//                     {media.media_type === "document" && (
//                       <div className="flex items-center justify-center">
//                         <FileText className="h-10 w-10 text-muted-foreground" />
//                         <span className="ml-2 text-sm text-muted-foreground">Document Preview</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="flex justify-end">
//         <Button onClick={handleSave} disabled={saving}>
//           {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//           Save Media
//         </Button>
//       </div>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase/client"
//import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, Trash2, Upload, ImageIcon, Video, FileText } from "lucide-react"

interface WorkflowMedia {
  id?: string
  workflow_id: string
  media_type: "image" | "video" | "document"
  title: string
  description: string
  url: string
  thumbnail_url?: string
  display_order: number
}

// Interface for the existing media item with ID
interface ExistingMediaItem {
  id: string
}

interface WorkflowMediaFormProps {
  workflowId: string
}

export function WorkflowMediaForm({ workflowId }: WorkflowMediaFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientSupabaseClient()
  const [mediaItems, setMediaItems] = useState<WorkflowMedia[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<number | null>(null)

  useEffect(() => {
    async function fetchWorkflowMedia() {
      try {
        const { data, error } = await supabase
          .from("workflow_media")
          .select("*")
          .eq("workflow_id", workflowId)
          .order("display_order")

        if (error) throw error

        setMediaItems(data || [])
      } catch (error) {
        console.error("Error fetching workflow media:", error)
        toast({
          title: "Error",
          description: "Failed to load workflow media",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWorkflowMedia()
  }, [workflowId, supabase, toast])

  const handleAddMedia = () => {
    setMediaItems([
      ...mediaItems,
      {
        workflow_id: workflowId,
        media_type: "image",
        title: "",
        description: "",
        url: "",
        display_order: mediaItems.length,
      },
    ])
  }

  const handleRemoveMedia = (index: number) => {
    const newMediaItems = mediaItems.filter((_, i) => i !== index)
    // Update display order
    newMediaItems.forEach((item, i) => {
      item.display_order = i
    })

    setMediaItems(newMediaItems)
  }

  const handleMediaChange = (index: number, field: keyof WorkflowMedia, value: string) => {
    const newMediaItems = [...mediaItems]
    newMediaItems[index] = {
      ...newMediaItems[index],
      [field]: value,
    }
    setMediaItems(newMediaItems)
  }

  const handleFileUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(index)

    try {
      // Determine file type
      const mediaType = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "document"

      // Upload file to Supabase Storage
      const fileExt = file.name.split(".").pop()
      const fileName = `${workflowId}/${Date.now()}.${fileExt}`
      const { data, error } = await supabase.storage.from("workflow-media").upload(fileName, file)

      if (error) throw error

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("workflow-media").getPublicUrl(data.path)

      // Update media item
      const newMediaItems = [...mediaItems]
      newMediaItems[index] = {
        ...newMediaItems[index],
        media_type: mediaType as "image" | "video" | "document",
        url: publicUrl,
        title: newMediaItems[index].title || file.name,
      }

      // If it's an image, use it as its own thumbnail
      if (mediaType === "image") {
        newMediaItems[index].thumbnail_url = publicUrl
      }

      setMediaItems(newMediaItems)

      toast({
        title: "Upload Complete",
        description: "File uploaded successfully",
      })
    } catch (error: any) {
      console.error("Error uploading file:", error)
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload file",
        variant: "destructive",
      })
    } finally {
      setUploading(null)
    }
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      // Validate media items
      const invalidItems = mediaItems.filter((item) => !item.title || !item.url)
      if (invalidItems.length > 0) {
        throw new Error("All media items must have a title and URL")
      }

      // Get existing media IDs
      const { data: existingMedia } = await supabase.from("workflow_media").select("id").eq("workflow_id", workflowId)

      const existingIds = new Set((existingMedia || []).map((item: ExistingMediaItem) => item.id))

      // Separate items to insert and update
      const itemsToInsert = mediaItems.filter((item) => !item.id)
      const itemsToUpdate = mediaItems.filter((item) => item.id && existingIds.has(item.id as string))
      const idsToKeep = new Set(itemsToUpdate.map((item) => item.id))

      // Delete removed items
      const idsToDelete = Array.from(existingIds).filter((id) => !idsToKeep.has(id as string))
      if (idsToDelete.length > 0) {
        await supabase.from("workflow_media").delete().in("id", idsToDelete)
      }

      // Insert new items
      if (itemsToInsert.length > 0) {
        const { error: insertError } = await supabase.from("workflow_media").insert(itemsToInsert)

        if (insertError) throw insertError
      }

      // Update existing items
      for (const item of itemsToUpdate) {
        const { error: updateError } = await supabase
          .from("workflow_media")
          .update({
            media_type: item.media_type,
            title: item.title,
            description: item.description,
            url: item.url,
            thumbnail_url: item.thumbnail_url,
            display_order: item.display_order,
          })
          .eq("id", item.id)

        if (updateError) throw updateError
      }

      toast({
        title: "Success",
        description: "Workflow media saved successfully",
      })

      router.refresh()
    } catch (error: any) {
      console.error("Error saving workflow media:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save workflow media",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Workflow Media</h2>
        <Button onClick={handleAddMedia}>
          <Plus className="h-4 w-4 mr-2" />
          Add Media
        </Button>
      </div>

      <div className="space-y-4">
        {mediaItems.map((media, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center justify-between">
                <div className="flex items-center">
                  {media.media_type === "image" && <ImageIcon className="h-4 w-4 mr-2" />}
                  {media.media_type === "video" && <Video className="h-4 w-4 mr-2" />}
                  {media.media_type === "document" && <FileText className="h-4 w-4 mr-2" />}
                  <span>Media Item {index + 1}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveMedia(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={media.title}
                    onChange={(e) => handleMediaChange(index, "title", e.target.value)}
                    placeholder="Enter media title"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Media Type</label>
                  <Select
                    value={media.media_type}
                    onValueChange={(value) => handleMediaChange(index, "media_type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={media.description}
                  onChange={(e) => handleMediaChange(index, "description", e.target.value)}
                  placeholder="Enter media description"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">URL</label>
                  <div className="flex space-x-2">
                    <Input
                      value={media.url}
                      onChange={(e) => handleMediaChange(index, "url", e.target.value)}
                      placeholder="Enter media URL"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        id={`file-upload-${index}`}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => handleFileUpload(index, e)}
                      />
                      <Button variant="outline" type="button" disabled={uploading === index}>
                        {uploading === index ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Thumbnail URL (optional)</label>
                  <Input
                    value={media.thumbnail_url || ""}
                    onChange={(e) => handleMediaChange(index, "thumbnail_url", e.target.value)}
                    placeholder="Enter thumbnail URL"
                  />
                </div>
              </div>

              {media.url && (
                <div className="mt-4">
                  <div className="border rounded-md p-2 bg-muted/30">
                    {media.media_type === "image" && (
                      <img
                        src={media.url || "/placeholder.svg"}
                        alt={media.title}
                        className="max-h-40 object-contain mx-auto"
                      />
                    )}
                    {media.media_type === "video" && (
                      <div className="flex items-center justify-center">
                        <Video className="h-10 w-10 text-muted-foreground" />
                        <span className="ml-2 text-sm text-muted-foreground">Video Preview</span>
                      </div>
                    )}
                    {media.media_type === "document" && (
                      <div className="flex items-center justify-center">
                        <FileText className="h-10 w-10 text-muted-foreground" />
                        <span className="ml-2 text-sm text-muted-foreground">Document Preview</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Media
        </Button>
      </div>
    </div>
  )
}