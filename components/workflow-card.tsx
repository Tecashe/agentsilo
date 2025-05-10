import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Zap, Star, ArrowRight, Users } from "lucide-react"

interface WorkflowCardProps {
  workflow: {
    id: string
    name: string
    description: string
    category: string
    integrations: string[]
    rating: number
    usageCount: number
    createdAt: string
    pricing: string
  }
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-40 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
        <Bot className="h-16 w-16 text-white" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1">{workflow.name}</CardTitle>
          <Badge variant="outline" className="capitalize">
            {workflow.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4 line-clamp-2">{workflow.description}</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center">
              <Zap className="h-4 w-4 text-primary mr-2" />
              <span>
                {workflow.integrations.length} Integration{workflow.integrations.length !== 1 ? "s" : ""}
              </span>
            </span>
            <span className="text-sm text-muted-foreground">
              {workflow.pricing === "Free" ? "Free" : `From ${workflow.pricing}`}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-2" />
              <span>{workflow.rating.toFixed(1)}</span>
            </span>
            <span className="flex items-center">
              <Users className="h-4 w-4 text-primary mr-2" />
              <span>{workflow.usageCount} users</span>
            </span>
          </div>
          {workflow.integrations.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {workflow.integrations.slice(0, 3).map((integration, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {integration}
                </Badge>
              ))}
              {workflow.integrations.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{workflow.integrations.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button asChild variant="outline" size="sm">
          <Link href={`/marketplace/${workflow.id}`}>Details</Link>
        </Button>
        <Button asChild size="sm">
          <Link href={`/marketplace/${workflow.id}/deploy`}>
            Deploy <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
