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

// "use client"

// import { useState, useEffect } from "react"
// import { WorkflowCard } from "@/components/workflow-card"
// import { WorkflowFilters } from "@/components/workflow-filters"
// import { getWorkflows, getCategories, getAvailableIntegrations } from "@/lib/actions/workflows"

// // Import the WorkflowFiltersProps type or define it here based on the component
// interface WorkflowFiltersProps {
//   categories: string[]
//   integrations: string[]
//   onFilterChange: (filters: FilterOptions) => void
// }

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
        
//         // Store the full Category objects but extract names for the filter component
//         setCategories(categoriesData as Category[])
        
//         // Store the full Integration objects but extract names for the filter component
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
//         categories={categories.map(category => category.name)} 
//         integrations={integrations.map(integration => integration.name)} 
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
import { motion, AnimatePresence } from "framer-motion"
import { WorkflowCardAnimated } from "@/components/card-animation/workflow-animated"
import { WorkflowFilters } from "@/components/workflow-filters"
import { CategoryCard } from "@/components/category/category-card"
import { FeaturedAgentCard } from "@/components/featured/featured-agent-card"
import {
  getWorkflows,
  getFeaturedWorkflows,
  getTrendingWorkflows,
  getCategoriesWithCount,
} from "@/lib/actions/workflows"
import type { Workflow, WorkflowFiltersType } from "@/types/workflow"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, ChevronRight, Sparkles, TrendingUp, Grid3X3 } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

export default function MarketplacePage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Parse search params for initial filters
  const initialCategory = searchParams.get("category")
  const initialSearchTerm = searchParams.get("search")
  const initialSortBy = (searchParams.get("sort") as WorkflowFiltersType["sortBy"]) || "newest"

  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [featuredWorkflows, setFeaturedWorkflows] = useState<Workflow[]>([])
  const [trendingWorkflows, setTrendingWorkflows] = useState<Workflow[]>([])
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([])
  const [integrations, setIntegrations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState<Partial<WorkflowFiltersType>>({
    searchTerm: initialSearchTerm || "",
    categories: initialCategory ? [initialCategory] : [],
    integrations: [],
    sortBy: initialSortBy,
    pricingFilter: "all",
    setupTime: [],
    featured: false,
    page: 1,
    limit: 12,
  })

  // Fetch all data
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true)
      try {
        // Fetch categories and integrations first
        const categoriesData = await getCategoriesWithCount()
        setCategories(categoriesData)

        // For integrations, we'll extract them from workflows for now
        const featuredData = await getFeaturedWorkflows(4)
        setFeaturedWorkflows(featuredData)

        const trendingData = await getTrendingWorkflows(4)
        setTrendingWorkflows(trendingData)

        // Extract unique integrations from featured and trending workflows
        const allIntegrations = [...featuredData, ...trendingData].flatMap((w) => w.integrations)
        const uniqueIntegrations = [...new Set(allIntegrations)].sort()
        setIntegrations(uniqueIntegrations)

        // Now fetch workflows with filters
        await fetchWorkflows()
      } catch (error) {
        console.error("Error fetching marketplace data:", error)
      }
    }

    fetchAllData()
  }, [])

  // Fetch workflows with filters
  const fetchWorkflows = async () => {
    setIsLoading(true)
    try {
      const workflowsData = await getWorkflows(filters)
      setWorkflows(workflowsData)

      // In a real implementation, you would get the total count from the server
      // For now, we'll just simulate pagination
      setTotalPages(Math.ceil(workflowsData.length / (filters.limit || 12)))
    } catch (error) {
      console.error("Error fetching workflows:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<WorkflowFiltersType>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)

    // Update URL with filters
    const params = new URLSearchParams()
    if (updatedFilters.searchTerm) params.set("search", updatedFilters.searchTerm)
    if (updatedFilters.categories && updatedFilters.categories.length === 1) {
      params.set("category", updatedFilters.categories[0])
    }
    if (updatedFilters.sortBy) params.set("sort", updatedFilters.sortBy)

    // Update the URL without refreshing the page
    const url = `/marketplace${params.toString() ? `?${params.toString()}` : ""}`
    router.push(url, { scroll: false })

    // Fetch workflows with new filters
    fetchWorkflows()
  }

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    handleFilterChange({
      categories: [category],
      page: 1,
    })
  }

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    handleFilterChange({ page })

    // Scroll to the top of the results
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">AI Agents Marketplace</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Browse our collection of pre-built AI agents to automate your workflows and boost productivity.
        </p>
      </motion.div>

      {/* Featured Agents Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-16"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
            Featured Agents
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <a href="/marketplace?featured=true">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredWorkflows.map((workflow, index) => (
            <FeaturedAgentCard key={workflow.id} workflow={workflow} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Browse by Category Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-16"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Grid3X3 className="h-5 w-5 mr-2 text-primary" />
            Browse by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.slice(0, 10).map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              count={category.count}
              onClick={() => handleCategorySelect(category.name)}
            />
          ))}
        </div>
      </motion.section>

      {/* Trending Agents Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-16"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
            Trending Agents
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <a href="/marketplace?sort=popular">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingWorkflows.map((workflow, index) => (
            <WorkflowCardAnimated key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </motion.section>

      {/* Main Marketplace Section */}
      <motion.section
        id="results"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">All Agents</h2>

          <WorkflowFilters
            categories={categories}
            integrations={integrations}
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Agents</TabsTrigger>
              <TabsTrigger value="free">Free</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading agents...</p>
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workflows.map((workflow, index) => (
                    <motion.div
                      key={workflow.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <WorkflowCardAnimated workflow={workflow} featured={workflow.featured} />
                    </motion.div>
                  ))}
                </div>

                {workflows.length === 0 && (
                  <motion.div
                    className="text-center py-12 border rounded-lg bg-muted/30"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">No agents found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleFilterChange({
                          searchTerm: "",
                          categories: [],
                          integrations: [],
                          sortBy: "newest",
                          pricingFilter: "all",
                          setupTime: [],
                          featured: false,
                          page: 1,
                          limit: 12,
                        })
                      }
                    >
                      Reset Filters
                    </Button>
                  </motion.div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </motion.section>

      {/* Custom Agent CTA */}
      <motion.div
        className="mt-16 bg-muted/30 rounded-lg p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Request a custom AI agent tailored to your specific business needs.
        </p>
        <motion.a
          href="/request-custom"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Request Custom Agent
        </motion.a>
      </motion.div>
    </div>
  )
}
