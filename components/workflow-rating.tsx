"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { rateWorkflow } from "@/lib/actions/workflows"

interface WorkflowRatingProps {
  workflowId: string
  initialRating?: number
  userRating?: number
  totalRatings: number
}

export function WorkflowRating({ workflowId, initialRating = 0, userRating = 0, totalRatings }: WorkflowRatingProps) {
  const [rating, setRating] = useState(userRating)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleRatingSubmit = async (selectedRating: number) => {
    if (selectedRating === rating) return

    setIsSubmitting(true)
    try {
      await rateWorkflow(workflowId, selectedRating)
      setRating(selectedRating)
      toast({
        title: "Rating submitted",
        description: "Thank you for your feedback!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <div className="flex mr-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={isSubmitting}
              className="p-1 focus:outline-none"
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => handleRatingSubmit(star)}
            >
              <Star
                className={`h-5 w-5 ${
                  (hoveredRating ? star <= hoveredRating : star <= rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {initialRating.toFixed(1)} ({totalRatings} {totalRatings === 1 ? "rating" : "ratings"})
        </span>
      </div>
      {rating > 0 ? (
        <p className="text-sm text-muted-foreground">Thanks for your rating!</p>
      ) : (
        <p className="text-sm text-muted-foreground">Rate this agent</p>
      )}
    </div>
  )
}
