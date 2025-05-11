"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Workflow } from "@/types/workflow"
import { IntegrationIcon } from "@/components/icon/integration-icons"

interface FeaturedAgentCardProps {
  workflow: Workflow
  index: number
}

export function FeaturedAgentCard({ workflow, index }: FeaturedAgentCardProps) {
  // Generate a gradient based on the index
  const gradients = [
    "from-purple-500 to-indigo-600",
    "from-blue-500 to-cyan-600",
    "from-green-500 to-emerald-600",
    "from-orange-500 to-amber-600",
  ]

  const gradient = gradients[index % gradients.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col relative">
        <div className="absolute top-0 right-0 z-10">
          <Badge className="rounded-none rounded-bl-md bg-primary text-primary-foreground">
            <Star className="h-3 w-3 mr-1 fill-current" /> Featured
          </Badge>
        </div>

        <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
          <h3 className="text-xl font-bold mb-2">{workflow.name}</h3>
          <p className="opacity-90 line-clamp-2">{workflow.description}</p>
        </div>

        <CardContent className="flex-grow p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="capitalize">
                {workflow.category}
              </Badge>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{workflow.rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Integrations</h4>
              <div className="flex flex-wrap gap-1">
                {workflow.integrations.slice(0, 4).map((integration, idx) => (
                  <div key={idx} className="flex items-center bg-secondary rounded-md px-2 py-1">
                    <IntegrationIcon name={integration} size={14} className="mr-1" />
                    <span className="text-xs">{integration}</span>
                  </div>
                ))}
                {workflow.integrations.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{workflow.integrations.length - 4} more
                  </Badge>
                )}
              </div>
            </div>

            <div className="pt-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className="w-full">
                  <Link href={`/marketplace/${workflow.id}`}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
