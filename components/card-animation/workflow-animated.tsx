// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Bot, Zap, Star, ArrowRight, Users } from "lucide-react"
// import { IntegrationIcon } from "../icon/integration-icons"

// interface WorkflowCardProps {
//   workflow: {
//     id: string
//     name: string
//     description: string
//     category: string
//     integrations: string[]
//     rating: number
//     usageCount: number
//     createdAt: string
//     pricing: string
//   }
// }

// export function WorkflowCardAnimated({ workflow }: WorkflowCardProps) {
//   const [isHovered, setIsHovered] = useState(false)

//   // Generate a random gradient for the card header
//   const gradients = [
//     "from-purple-500 to-indigo-600",
//     "from-blue-500 to-cyan-600",
//     "from-green-500 to-emerald-600",
//     "from-orange-500 to-amber-600",
//     "from-pink-500 to-rose-600",
//     "from-violet-500 to-purple-600",
//   ]

//   const randomGradient = gradients[Math.floor(Math.random() * gradients.length)]

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       whileHover={{
//         scale: 1.03,
//         transition: { duration: 0.2 },
//       }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//     >
//       <Card className="overflow-hidden h-full flex flex-col">
//         <motion.div
//           className={`h-40 bg-gradient-to-r ${randomGradient} flex items-center justify-center`}
//           animate={{
//             y: isHovered ? -5 : 0,
//           }}
//           transition={{ duration: 0.3 }}
//         >
//           <motion.div
//             animate={{
//               rotate: isHovered ? 360 : 0,
//               scale: isHovered ? 1.1 : 1,
//             }}
//             transition={{ duration: 0.5 }}
//           >
//             <Bot className="h-16 w-16 text-white" />
//           </motion.div>
//         </motion.div>
//         <CardHeader>
//           <div className="flex justify-between items-start">
//             <CardTitle className="line-clamp-1">{workflow.name}</CardTitle>
//             <Badge variant="outline" className="capitalize">
//               {workflow.category}
//             </Badge>
//           </div>
//         </CardHeader>
//         <CardContent className="flex-grow">
//           <p className="text-muted-foreground mb-4 line-clamp-2">{workflow.description}</p>
//           <div className="space-y-3">
//             <div className="flex items-center justify-between text-sm">
//               <span className="flex items-center">
//                 <Zap className="h-4 w-4 text-primary mr-2" />
//                 <span>
//                   {workflow.integrations.length} Integration{workflow.integrations.length !== 1 ? "s" : ""}
//                 </span>
//               </span>
//               <span className="text-sm text-muted-foreground">
//                 {workflow.pricing === "Free" ? "Free" : `From ${workflow.pricing}`}
//               </span>
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <span className="flex items-center">
//                 <Star className="h-4 w-4 text-yellow-500 mr-2" />
//                 <span>{workflow.rating.toFixed(1)}</span>
//               </span>
//               <span className="flex items-center">
//                 <Users className="h-4 w-4 text-primary mr-2" />
//                 <span>{workflow.usageCount} users</span>
//               </span>
//             </div>
//             {workflow.integrations.length > 0 && (
//               <div className="flex flex-wrap gap-1 mt-2">
//                 {workflow.integrations.slice(0, 3).map((integration, index) => (
//                   <motion.div
//                     key={index}
//                     whileHover={{ scale: 1.1 }}
//                     className="flex items-center bg-secondary rounded-md px-2 py-1"
//                   >
//                     <IntegrationIcon name={integration} size={14} className="mr-1" />
//                     <span className="text-xs">{integration}</span>
//                   </motion.div>
//                 ))}
//                 {workflow.integrations.length > 3 && (
//                   <Badge variant="secondary" className="text-xs">
//                     +{workflow.integrations.length - 3} more
//                   </Badge>
//                 )}
//               </div>
//             )}
//           </div>
//         </CardContent>
//         <CardFooter className="border-t pt-4 flex justify-between">
//           <Button asChild variant="outline" size="sm">
//             <Link href={`/marketplace/${workflow.id}`}>Details</Link>
//           </Button>
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Button asChild size="sm">
//               <Link href={`/marketplace/${workflow.id}/deploy`}>
//                 Deploy <ArrowRight className="ml-2 h-4 w-4" />
//               </Link>
//             </Button>
//           </motion.div>
//         </CardFooter>
//       </Card>
//     </motion.div>
//   )
// }

"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Zap, Star, ArrowRight, Users, Clock, Check } from "lucide-react"
import { IntegrationIcon } from "@/components/icon/integration-icons"
import type { Workflow } from "@/types/workflow"
import { cn } from "@/lib/utils"

interface WorkflowCardProps {
  workflow: Workflow
  featured?: boolean
}

export function WorkflowCardAnimated({ workflow, featured = false }: WorkflowCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Generate a gradient based on the category
  const getCategoryGradient = (category: string): string => {
    const gradients: Record<string, string> = {
      automation: "from-purple-500 to-indigo-600",
      "data processing": "from-blue-500 to-cyan-600",
      communication: "from-green-500 to-emerald-600",
      marketing: "from-orange-500 to-amber-600",
      analytics: "from-pink-500 to-rose-600",
      productivity: "from-violet-500 to-purple-600",
      finance: "from-emerald-500 to-teal-600",
      "social media": "from-blue-500 to-indigo-600",
      "customer support": "from-yellow-500 to-orange-600",
      development: "from-gray-700 to-gray-900",
    }

    return gradients[category.toLowerCase()] || "from-purple-500 to-indigo-600"
  }

  const gradient = getCategoryGradient(workflow.category)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className={cn("overflow-hidden h-full flex flex-col relative", featured && "ring-2 ring-primary/50")}>
        {featured && (
          <div className="absolute top-0 right-0 z-10">
            <Badge className="rounded-none rounded-bl-md bg-primary text-primary-foreground">
              <Star className="h-3 w-3 mr-1 fill-current" /> Featured
            </Badge>
          </div>
        )}

        <motion.div
          className={`h-40 bg-gradient-to-r ${gradient} flex items-center justify-center relative overflow-hidden`}
          animate={{
            y: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "30px 30px",
            }}
          />

          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <Bot className="h-16 w-16 text-white" />
          </motion.div>
        </motion.div>

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
                {workflow.pricing === "Free" ? (
                  <span className="flex items-center text-green-600 font-medium">
                    <Check className="h-3 w-3 mr-1" /> Free
                  </span>
                ) : (
                  `From ${workflow.pricing}`
                )}
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

            {workflow.setupTime && (
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-muted-foreground">Setup: {workflow.setupTime}</span>
              </div>
            )}

            {workflow.integrations.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {workflow.integrations.slice(0, 3).map((integration, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center bg-secondary rounded-md px-2 py-1"
                  >
                    <IntegrationIcon name={integration} size={14} className="mr-1" />
                    <span className="text-xs">{integration}</span>
                  </motion.div>
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
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="sm">
              <Link href={`/marketplace/${workflow.id}/deploy`}>
                Deploy <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
