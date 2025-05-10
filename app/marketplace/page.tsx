// import { getAgents } from "@/lib/actions/agents"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Bot, Zap, ArrowRight } from "lucide-react"

// export default async function MarketplacePage() {
//   const agents = await getAgents()

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold mb-4">AI Agents Marketplace</h1>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//           Browse our collection of pre-built AI agents to automate your workflows and boost productivity.
//         </p>
//       </div>

//       {/* Agents Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {agents.map((agent) => (
//           <Card key={agent.id} className="overflow-hidden">
//             <div className="h-40 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
//               <Bot className="h-16 w-16 text-white" />
//             </div>
//             <CardHeader>
//               <div className="flex justify-between items-start">
//                 <CardTitle>{agent.name}</CardTitle>
//                 <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{agent.category}</span>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <p className="text-gray-600 mb-4">{agent.description}</p>
//               <div className="space-y-3">
//                 <div className="flex items-center">
//                   <Zap className="h-4 w-4 text-purple-500 mr-2" />
//                   <span className="text-sm">
//                     {agent.integrations.length} Integration{agent.integrations.length !== 1 ? "s" : ""}
//                   </span>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {agent.integrations.map((integration, index) => (
//                     <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
//                       {integration}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="border-t pt-4 flex justify-between">
//               <Button asChild variant="outline">
//                 <Link href={`/marketplace/${agent.id}`}>Details</Link>
//               </Button>
//               <Button asChild>
//                 <Link href={`/marketplace/${agent.id}/deploy`}>
//                   Deploy <ArrowRight className="ml-2 h-4 w-4" />
//                 </Link>
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       {agents.length === 0 && (
//         <div className="text-center py-12">
//           <h3 className="text-xl font-semibold mb-2">No agents found</h3>
//           <p className="text-gray-600 mb-6">There are no agents available at the moment</p>
//         </div>
//       )}

//       {/* Custom Agent CTA */}
//       <div className="mt-16 bg-purple-50 rounded-lg p-8 text-center">
//         <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
//         <p className="text-lg mb-6 max-w-2xl mx-auto">
//           Request a custom AI agent tailored to your specific business needs.
//         </p>
//         <Button asChild size="lg">
//           <Link href="/request-custom">Request Custom Agent</Link>
//         </Button>
//       </div>
//     </div>
//   )
// }


// import { getWorkflows } from "@/lib/actions/workflows"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Bot, Zap, ArrowRight, Star } from 'lucide-react'
// import { WorkflowCard } from "@/components/workflow-card"
// import { WorkflowFilters } from "@/components/workflow-filters"

// export default async function MarketplacePage({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | string[] | undefined }
// }) {
//   // Parse search parameters
//   const category = typeof searchParams.category === "string" ? searchParams.category : undefined
//   const search = typeof searchParams.search === "string" ? searchParams.search : undefined
//   const featured = searchParams.featured === "true"

//   // Fetch workflows with filters
//   const { workflows, pagination } = await getWorkflows({
//     category,
//     search,
//     featured,
//   })

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold mb-4">AI Agents Marketplace</h1>
//         <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//           Browse our collection of pre-built AI agents to automate your workflows and boost productivity.
//         </p>
//       </div>

//       {/* Filters */}
//       <WorkflowFilters
//         selectedCategory={category}
//         searchQuery={search}
//         featuredOnly={featured}
//       />

//       {/* Featured Workflows */}
//       {featured && (
//         <div className="mb-12">
//           <h2 className="text-2xl font-bold mb-6 flex items-center">
//             <Star className="mr-2 h-5 w-5 text-yellow-500" /> Featured Agents
//           </h2>
//         </div>
//       )}

//       {/* Workflows Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {workflows.map((workflow) => (
//           <WorkflowCard key={workflow.id} workflow={workflow} />
//         ))}
//       </div>

//       {workflows.length === 0 && (
//         <div className="text-center py-12">
//           <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//           <h3 className="text-xl font-semibold mb-2">No agents found</h3>
//           <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
//           <Button asChild variant="outline">
//             <Link href="/marketplace">Clear Filters</Link>
//           </Button>
//         </div>
//       )}

//       {/* Custom Agent CTA */}
//       <div className="mt-16 bg-muted/50 rounded-lg p-8 text-center">
//         <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
//         <p className="text-lg mb-6 max-w-2xl mx-auto">
//           Request a custom AI agent tailored to your specific business needs.
//         </p>
//         <Button asChild size="lg">
//           <Link href="/request-custom">Request Custom Agent</Link>
//         </Button>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { WorkflowCard } from "@/components/workflow-card"
// import { WorkflowFilters } from "@/components/workflow-filters"
// import { getWorkflows, getCategories, getAvailableIntegrations } from "@/lib/actions/workflows"

// // Define TypeScript interfaces for your data structures
// interface Workflow {
//   id: string
//   name: string
//   description: string
//   category: string
//   integrations: string[]
//   pricing: string
//   usageCount: number
//   rating: number
//   createdAt: string
// }

// interface Category {
//   id: number
//   name: string
// }

// interface Integration {
//   id: string | number
//   name: string
// }

// interface FilterOptions {
//   searchTerm: string
//   categories: string[]
//   integrations: string[]
//   sortBy: 'newest' | 'popular' | 'rating' | 'price-low' | 'price-high'
// }

// export default function MarketplacePage() {
//   // Properly type the state variables with their respective interfaces
//   const [workflows, setWorkflows] = useState<Workflow[]>([])
//   const [categories, setCategories] = useState<Category[]>([])
//   const [integrations, setIntegrations] = useState<Integration[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [filters, setFilters] = useState<FilterOptions>({
//     searchTerm: "",
//     categories: [],
//     integrations: [],
//     sortBy: "newest",
//   })

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true)
//       try {
//         const [workflowsData, categoriesData, integrationsData] = await Promise.all([
//           getWorkflows(),
//           getCategories(),
//           getAvailableIntegrations(),
//         ])

//         // Cast the returned data to the proper types
//         setWorkflows(workflowsData as Workflow[])
//         setCategories(categoriesData as Category[])
//         setIntegrations(integrationsData as Integration[])
//       } catch (error) {
//         console.error("Error fetching marketplace data:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   const handleFilterChange = (newFilters: FilterOptions) => {
//     setFilters(newFilters)
//     // In a real implementation, you would fetch filtered data from the server
//     // For now, we'll just simulate filtering on the client side
//   }

//   // Filter and sort workflows based on current filters
//   const filteredWorkflows = workflows.filter((workflow) => {
//     // Filter by search term
//     if (
//       filters.searchTerm &&
//       !workflow.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
//       !workflow.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
//     ) {
//       return false
//     }

//     // Filter by categories
//     if (filters.categories.length > 0 && !filters.categories.includes(workflow.category)) {
//       return false
//     }

//     // Filter by integrations
//     if (
//       filters.integrations.length > 0 &&
//       !filters.integrations.some((integration) => workflow.integrations.includes(integration))
//     ) {
//       return false
//     }

//     return true
//   })

//   // Sort workflows
//   const sortedWorkflows = [...filteredWorkflows].sort((a, b) => {
//     switch (filters.sortBy) {
//       case "popular":
//         return (b.usageCount || 0) - (a.usageCount || 0)
//       case "rating":
//         return (b.rating || 0) - (a.rating || 0)
//       case "price-low":
//         return a.pricing === "Free"
//           ? -1
//           : b.pricing === "Free"
//             ? 1
//             : Number.parseFloat(a.pricing.replace(/[^0-9.]/g, "")) -
//               Number.parseFloat(b.pricing.replace(/[^0-9.]/g, ""))
//       case "price-high":
//         return a.pricing === "Free"
//           ? 1
//           : b.pricing === "Free"
//             ? -1
//             : Number.parseFloat(b.pricing.replace(/[^0-9.]/g, "")) -
//               Number.parseFloat(a.pricing.replace(/[^0-9.]/g, ""))
//       case "newest":
//       default:
//         return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//     }
//   })

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold mb-4">AI Agents Marketplace</h1>
//         <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//           Browse our collection of pre-built AI agents to automate your workflows and boost productivity.
//         </p>
//       </div>

//       <WorkflowFilters 
//         categories={categories} 
//         integrations={integrations} 
//         onFilterChange={handleFilterChange} 
//       />

//       {isLoading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className="h-[400px] rounded-lg bg-muted animate-pulse"></div>
//           ))}
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {sortedWorkflows.map((workflow) => (
//               <WorkflowCard key={workflow.id} workflow={workflow} />
//             ))}
//           </div>

//           {sortedWorkflows.length === 0 && (
//             <div className="text-center py-12 border rounded-lg bg-muted/30">
//               <h3 className="text-xl font-semibold mb-2">No agents found</h3>
//               <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Custom Agent CTA */}
//       <div className="mt-16 bg-muted/30 rounded-lg p-8 text-center">
//         <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
//         <p className="text-lg mb-6 max-w-2xl mx-auto">
//           Request a custom AI agent tailored to your specific business needs.
//         </p>
//         <a
//           href="/request-custom"
//           className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
//         >
//           Request Custom Agent
//         </a>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { WorkflowCard } from "@/components/workflow-card"
import { WorkflowFilters } from "@/components/workflow-filters"
import { getWorkflows, getCategories, getAvailableIntegrations } from "@/lib/actions/workflows"

// Import the WorkflowFiltersProps type or define it here based on the component
interface WorkflowFiltersProps {
  categories: string[]
  integrations: string[]
  onFilterChange: (filters: FilterOptions) => void
}

// Define TypeScript interfaces for your data structures
interface Workflow {
  id: string
  name: string
  description: string
  category: string
  integrations: string[]
  pricing: string
  usageCount: number
  rating: number
  createdAt: string
}

interface Category {
  id: number
  name: string
}

interface Integration {
  id: string | number
  name: string
}

interface FilterOptions {
  searchTerm: string
  categories: string[]
  integrations: string[]
  sortBy: 'newest' | 'popular' | 'rating' | 'price-low' | 'price-high'
}

export default function MarketplacePage() {
  // Properly type the state variables with their respective interfaces
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    categories: [],
    integrations: [],
    sortBy: "newest",
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [workflowsData, categoriesData, integrationsData] = await Promise.all([
          getWorkflows(),
          getCategories(),
          getAvailableIntegrations(),
        ])

        // Cast the returned data to the proper types
        setWorkflows(workflowsData as Workflow[])
        
        // Store the full Category objects but extract names for the filter component
        setCategories(categoriesData as Category[])
        
        // Store the full Integration objects but extract names for the filter component
        setIntegrations(integrationsData as Integration[])
      } catch (error) {
        console.error("Error fetching marketplace data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
    // In a real implementation, you would fetch filtered data from the server
    // For now, we'll just simulate filtering on the client side
  }

  // Filter and sort workflows based on current filters
  const filteredWorkflows = workflows.filter((workflow) => {
    // Filter by search term
    if (
      filters.searchTerm &&
      !workflow.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !workflow.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filter by categories
    if (filters.categories.length > 0 && !filters.categories.includes(workflow.category)) {
      return false
    }

    // Filter by integrations
    if (
      filters.integrations.length > 0 &&
      !filters.integrations.some((integration) => workflow.integrations.includes(integration))
    ) {
      return false
    }

    return true
  })

  // Sort workflows
  const sortedWorkflows = [...filteredWorkflows].sort((a, b) => {
    switch (filters.sortBy) {
      case "popular":
        return (b.usageCount || 0) - (a.usageCount || 0)
      case "rating":
        return (b.rating || 0) - (a.rating || 0)
      case "price-low":
        return a.pricing === "Free"
          ? -1
          : b.pricing === "Free"
            ? 1
            : Number.parseFloat(a.pricing.replace(/[^0-9.]/g, "")) -
              Number.parseFloat(b.pricing.replace(/[^0-9.]/g, ""))
      case "price-high":
        return a.pricing === "Free"
          ? 1
          : b.pricing === "Free"
            ? -1
            : Number.parseFloat(b.pricing.replace(/[^0-9.]/g, "")) -
              Number.parseFloat(a.pricing.replace(/[^0-9.]/g, ""))
      case "newest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">AI Agents Marketplace</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Browse our collection of pre-built AI agents to automate your workflows and boost productivity.
        </p>
      </div>

      <WorkflowFilters 
        categories={categories.map(category => category.name)} 
        integrations={integrations.map(integration => integration.name)} 
        onFilterChange={handleFilterChange} 
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[400px] rounded-lg bg-muted animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkflows.map((workflow) => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </div>

          {sortedWorkflows.length === 0 && (
            <div className="text-center py-12 border rounded-lg bg-muted/30">
              <h3 className="text-xl font-semibold mb-2">No agents found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
            </div>
          )}
        </>
      )}

      {/* Custom Agent CTA */}
      <div className="mt-16 bg-muted/30 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Request a custom AI agent tailored to your specific business needs.
        </p>
        <a
          href="/request-custom"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Request Custom Agent
        </a>
      </div>
    </div>
  )
}