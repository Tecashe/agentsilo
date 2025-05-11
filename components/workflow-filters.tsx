// "use client"

// import { Badge } from "@/components/ui/badge"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Search, SlidersHorizontal, X } from "lucide-react"
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"

// interface WorkflowFiltersProps {
//   categories: string[]
//   integrations: string[]
//   onFilterChange: (filters: any) => void
// }

// export function WorkflowFilters({ categories, integrations, onFilterChange }: WorkflowFiltersProps) {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
//   const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([])
//   const [sortBy, setSortBy] = useState("newest")
//   const [isOpen, setIsOpen] = useState(false)

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     applyFilters()
//   }

//   const handleCategoryChange = (category: string, checked: boolean) => {
//     setSelectedCategories((prev) => (checked ? [...prev, category] : prev.filter((c) => c !== category)))
//   }

//   const handleIntegrationChange = (integration: string, checked: boolean) => {
//     setSelectedIntegrations((prev) => (checked ? [...prev, integration] : prev.filter((i) => i !== integration)))
//   }

//   const applyFilters = () => {
//     onFilterChange({
//       searchTerm,
//       categories: selectedCategories,
//       integrations: selectedIntegrations,
//       sortBy,
//     })
//     setIsOpen(false)
//   }

//   const resetFilters = () => {
//     setSearchTerm("")
//     setSelectedCategories([])
//     setSelectedIntegrations([])
//     setSortBy("newest")
//     onFilterChange({
//       searchTerm: "",
//       categories: [],
//       integrations: [],
//       sortBy: "newest",
//     })
//   }

//   return (
//     <div className="mb-8 space-y-4">
//       <form onSubmit={handleSearch} className="flex gap-2">
//         <div className="relative flex-grow">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search agents..."
//             className="pl-8"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <Sheet open={isOpen} onOpenChange={setIsOpen}>
//           <SheetTrigger asChild>
//             <Button variant="outline" type="button">
//               <SlidersHorizontal className="h-4 w-4 mr-2" />
//               Filters
//             </Button>
//           </SheetTrigger>
//           <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto">
//             <SheetHeader>
//               <SheetTitle>Filter Agents</SheetTitle>
//             </SheetHeader>
//             <div className="py-4 space-y-6">
//               <div className="space-y-4">
//                 <h3 className="font-medium">Categories</h3>
//                 <div className="grid grid-cols-2 gap-2">
//                   {categories.map((category) => (
//                     <div key={category} className="flex items-center space-x-2">
//                       <Checkbox
//                         id={`category-${category}`}
//                         checked={selectedCategories.includes(category)}
//                         onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
//                       />
//                       <Label htmlFor={`category-${category}`} className="capitalize">
//                         {category}
//                       </Label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="font-medium">Integrations</h3>
//                 <div className="grid grid-cols-2 gap-2">
//                   {integrations.map((integration) => (
//                     <div key={integration} className="flex items-center space-x-2">
//                       <Checkbox
//                         id={`integration-${integration}`}
//                         checked={selectedIntegrations.includes(integration)}
//                         onCheckedChange={(checked) => handleIntegrationChange(integration, checked as boolean)}
//                       />
//                       <Label htmlFor={`integration-${integration}`}>{integration}</Label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="sort-by">Sort By</Label>
//                 <Select value={sortBy} onValueChange={setSortBy}>
//                   <SelectTrigger id="sort-by">
//                     <SelectValue placeholder="Sort by" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="newest">Newest</SelectItem>
//                     <SelectItem value="popular">Most Popular</SelectItem>
//                     <SelectItem value="rating">Highest Rated</SelectItem>
//                     <SelectItem value="price-low">Price: Low to High</SelectItem>
//                     <SelectItem value="price-high">Price: High to Low</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <SheetFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between pt-2">
//               <Button variant="outline" onClick={resetFilters} type="button" className="w-full sm:w-auto">
//                 <X className="h-4 w-4 mr-2" />
//                 Reset Filters
//               </Button>
//               <Button onClick={applyFilters} type="button" className="w-full sm:w-auto">
//                 Apply Filters
//               </Button>
//             </SheetFooter>
//           </SheetContent>
//         </Sheet>
//         <Button type="submit">Search</Button>
//       </form>

//       <div className="flex flex-wrap gap-2">
//         {selectedCategories.length > 0 && (
//           <div className="flex items-center">
//             <span className="text-sm text-muted-foreground mr-2">Categories:</span>
//             <div className="flex flex-wrap gap-1">
//               {selectedCategories.map((category) => (
//                 <Badge key={category} variant="secondary" className="capitalize">
//                   {category}
//                   <button className="ml-1 hover:text-destructive" onClick={() => handleCategoryChange(category, false)}>
//                     <X className="h-3 w-3" />
//                   </button>
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         )}

//         {selectedIntegrations.length > 0 && (
//           <div className="flex items-center ml-2">
//             <span className="text-sm text-muted-foreground mr-2">Integrations:</span>
//             <div className="flex flex-wrap gap-1">
//               {selectedIntegrations.map((integration) => (
//                 <Badge key={integration} variant="secondary">
//                   {integration}
//                   <button
//                     className="ml-1 hover:text-destructive"
//                     onClick={() => handleIntegrationChange(integration, false)}
//                   >
//                     <X className="h-3 w-3" />
//                   </button>
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// "use client"

// import type React from "react"

// import { Badge } from "@/components/ui/badge"
// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Search, SlidersHorizontal, X, Tag, Clock, Zap, DollarSign, Star } from "lucide-react"
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { motion } from "framer-motion"
// import type { WorkflowFiltersType } from "@/types/workflow"
// import { IntegrationIcon } from "@/components/icon/integration-icons"

// interface WorkflowFiltersProps {
//   categories: { name: string; count: number }[]
//   integrations: string[]
//   onFilterChange: (filters: Partial<WorkflowFiltersType>) => void
//   initialFilters?: Partial<WorkflowFiltersType>
// }

// export function WorkflowFilters({
//   categories,
//   integrations,
//   onFilterChange,
//   initialFilters = {},
// }: WorkflowFiltersProps) {
//   const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || "")
//   const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters.categories || [])
//   const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(initialFilters.integrations || [])
//   const [sortBy, setSortBy] = useState(initialFilters.sortBy || "newest")
//   const [pricingFilter, setPricingFilter] = useState(initialFilters.pricingFilter || "all")
//   const [setupTimeFilter, setSetupTimeFilter] = useState<string[]>(initialFilters.setupTime || [])
//   const [featuredOnly, setFeaturedOnly] = useState(initialFilters.featured || false)
//   const [isOpen, setIsOpen] = useState(false)
//   const [activeTab, setActiveTab] = useState("categories")

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     applyFilters()
//   }

//   const handleCategoryChange = (category: string, checked: boolean) => {
//     setSelectedCategories((prev) => (checked ? [...prev, category] : prev.filter((c) => c !== category)))
//   }

//   const handleIntegrationChange = (integration: string, checked: boolean) => {
//     setSelectedIntegrations((prev) => (checked ? [...prev, integration] : prev.filter((i) => i !== integration)))
//   }

//   const handleSetupTimeChange = (time: string, checked: boolean) => {
//     setSetupTimeFilter((prev) => (checked ? [...prev, time] : prev.filter((t) => t !== time)))
//   }

//   const applyFilters = () => {
//     onFilterChange({
//       searchTerm,
//       categories: selectedCategories,
//       integrations: selectedIntegrations,
//       sortBy: sortBy as WorkflowFiltersType["sortBy"],
//       pricingFilter: pricingFilter as "all" | "free" | "paid",
//       setupTime: setupTimeFilter,
//       featured: featuredOnly,
//       page: 1, // Reset to first page when filters change
//       limit: 12,
//     })
//     setIsOpen(false)
//   }

//   const resetFilters = () => {
//     setSearchTerm("")
//     setSelectedCategories([])
//     setSelectedIntegrations([])
//     setSortBy("newest")
//     setPricingFilter("all")
//     setSetupTimeFilter([])
//     setFeaturedOnly(false)
//     onFilterChange({
//       searchTerm: "",
//       categories: [],
//       integrations: [],
//       sortBy: "newest",
//       pricingFilter: "all",
//       setupTime: [],
//       featured: false,
//       page: 1,
//       limit: 12,
//     })
//   }

//   // Apply filters when component mounts with initial filters
//   useEffect(() => {
//     if (Object.keys(initialFilters).length > 0) {
//       applyFilters()
//     }
//   }, [])

//   return (
//     <div className="mb-8 space-y-4">
//       <form onSubmit={handleSearch} className="flex gap-2">
//         <div className="relative flex-grow">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search agents..."
//             className="pl-8"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <Sheet open={isOpen} onOpenChange={setIsOpen}>
//           <SheetTrigger asChild>
//             <Button variant="outline" type="button">
//               <SlidersHorizontal className="h-4 w-4 mr-2" />
//               Filters
//               {(selectedCategories.length > 0 ||
//                 selectedIntegrations.length > 0 ||
//                 pricingFilter !== "all" ||
//                 setupTimeFilter.length > 0 ||
//                 featuredOnly) && (
//                 <Badge variant="secondary" className="ml-2 px-1 min-w-5 text-center">
//                   {selectedCategories.length +
//                     selectedIntegrations.length +
//                     (pricingFilter !== "all" ? 1 : 0) +
//                     setupTimeFilter.length +
//                     (featuredOnly ? 1 : 0)}
//                 </Badge>
//               )}
//             </Button>
//           </SheetTrigger>
//           <SheetContent className="w-[350px] sm:w-[450px] overflow-y-auto">
//             <SheetHeader>
//               <SheetTitle>Filter Agents</SheetTitle>
//             </SheetHeader>

//             <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
//               <TabsList className="grid grid-cols-4 mb-4">
//                 <TabsTrigger value="categories" className="flex items-center">
//                   <Tag className="h-4 w-4 mr-2" />
//                   <span className="hidden sm:inline">Categories</span>
//                 </TabsTrigger>
//                 <TabsTrigger value="integrations" className="flex items-center">
//                   <Zap className="h-4 w-4 mr-2" />
//                   <span className="hidden sm:inline">Integrations</span>
//                 </TabsTrigger>
//                 <TabsTrigger value="pricing" className="flex items-center">
//                   <DollarSign className="h-4 w-4 mr-2" />
//                   <span className="hidden sm:inline">Pricing</span>
//                 </TabsTrigger>
//                 <TabsTrigger value="other" className="flex items-center">
//                   <Clock className="h-4 w-4 mr-2" />
//                   <span className="hidden sm:inline">Other</span>
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="categories" className="space-y-4">
//                 <h3 className="font-medium">Categories</h3>
//                 <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
//                   {categories.map((category) => (
//                     <div
//                       key={category.name}
//                       className="flex items-center justify-between space-x-2 rounded-md border p-2"
//                     >
//                       <div className="flex items-center space-x-2">
//                         <Checkbox
//                           id={`category-${category.name}`}
//                           checked={selectedCategories.includes(category.name)}
//                           onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
//                         />
//                         <Label htmlFor={`category-${category.name}`} className="capitalize">
//                           {category.name}
//                         </Label>
//                       </div>
//                       <Badge variant="secondary">{category.count}</Badge>
//                     </div>
//                   ))}
//                 </div>
//               </TabsContent>

//               <TabsContent value="integrations" className="space-y-4">
//                 <h3 className="font-medium">Integrations</h3>
//                 <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
//                   {integrations.map((integration) => (
//                     <div
//                       key={integration}
//                       className="flex items-center justify-between space-x-2 rounded-md border p-2"
//                     >
//                       <div className="flex items-center space-x-2">
//                         <Checkbox
//                           id={`integration-${integration}`}
//                           checked={selectedIntegrations.includes(integration)}
//                           onCheckedChange={(checked) => handleIntegrationChange(integration, checked as boolean)}
//                         />
//                         <Label htmlFor={`integration-${integration}`} className="flex items-center">
//                           <IntegrationIcon name={integration} className="mr-2" />
//                           {integration}
//                         </Label>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </TabsContent>

//               <TabsContent value="pricing" className="space-y-4">
//                 <h3 className="font-medium">Pricing</h3>
//                 <RadioGroup value={pricingFilter} onValueChange={setPricingFilter}>
//                   <div className="flex items-center space-x-2 rounded-md border p-2">
//                     <RadioGroupItem value="all" id="pricing-all" />
//                     <Label htmlFor="pricing-all">All Pricing</Label>
//                   </div>
//                   <div className="flex items-center space-x-2 rounded-md border p-2">
//                     <RadioGroupItem value="free" id="pricing-free" />
//                     <Label htmlFor="pricing-free">Free Only</Label>
//                   </div>
//                   <div className="flex items-center space-x-2 rounded-md border p-2">
//                     <RadioGroupItem value="paid" id="pricing-paid" />
//                     <Label htmlFor="pricing-paid">Paid Only</Label>
//                   </div>
//                 </RadioGroup>
//               </TabsContent>

//               <TabsContent value="other" className="space-y-4">
//                 <div className="space-y-4">
//                   <h3 className="font-medium">Setup Time</h3>
//                   <div className="grid grid-cols-1 gap-2">
//                     {["< 5 min", "5-15 min", "15-30 min", "> 30 min"].map((time) => (
//                       <div key={time} className="flex items-center space-x-2 rounded-md border p-2">
//                         <Checkbox
//                           id={`setup-${time}`}
//                           checked={setupTimeFilter.includes(time)}
//                           onCheckedChange={(checked) => handleSetupTimeChange(time, checked as boolean)}
//                         />
//                         <Label htmlFor={`setup-${time}`}>{time}</Label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="space-y-2 pt-4">
//                   <div className="flex items-center space-x-2 rounded-md border p-2">
//                     <Checkbox
//                       id="featured-only"
//                       checked={featuredOnly}
//                       onCheckedChange={(checked) => setFeaturedOnly(checked as boolean)}
//                     />
//                     <Label htmlFor="featured-only">Featured Agents Only</Label>
//                   </div>
//                 </div>
//               </TabsContent>
//             </Tabs>

//             <div className="space-y-2 pt-6">
//               <Label htmlFor="sort-by">Sort By</Label>
//               <Select value={sortBy} onValueChange={setSortBy}>
//                 <SelectTrigger id="sort-by">
//                   <SelectValue placeholder="Sort by" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="newest">Newest</SelectItem>
//                   <SelectItem value="popular">Most Popular</SelectItem>
//                   <SelectItem value="rating">Highest Rated</SelectItem>
//                   <SelectItem value="price-low">Price: Low to High</SelectItem>
//                   <SelectItem value="price-high">Price: High to Low</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <SheetFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between pt-6">
//               <Button variant="outline" onClick={resetFilters} type="button" className="w-full sm:w-auto">
//                 <X className="h-4 w-4 mr-2" />
//                 Reset Filters
//               </Button>
//               <Button onClick={applyFilters} type="button" className="w-full sm:w-auto">
//                 Apply Filters
//               </Button>
//             </SheetFooter>
//           </SheetContent>
//         </Sheet>
//         <Button type="submit">Search</Button>
//       </form>

//       {/* Active Filters Display */}
//       <div className="flex flex-wrap gap-2">
//         {selectedCategories.length > 0 && (
//           <div className="flex items-center flex-wrap gap-1">
//             <span className="text-sm text-muted-foreground mr-1">Categories:</span>
//             {selectedCategories.map((category) => (
//               <motion.div
//                 key={category}
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <Badge variant="secondary" className="capitalize group">
//                   {category}
//                   <button
//                     className="ml-1 group-hover:text-destructive transition-colors"
//                     onClick={() => handleCategoryChange(category, false)}
//                     aria-label={`Remove ${category} filter`}
//                   >
//                     <X className="h-3 w-3" />
//                   </button>
//                 </Badge>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {selectedIntegrations.length > 0 && (
//           <div className="flex items-center flex-wrap gap-1">
//             <span className="text-sm text-muted-foreground mr-1">Integrations:</span>
//             {selectedIntegrations.map((integration) => (
//               <motion.div
//                 key={integration}
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <Badge variant="secondary" className="group">
//                   <IntegrationIcon name={integration} size={12} className="mr-1" />
//                   {integration}
//                   <button
//                     className="ml-1 group-hover:text-destructive transition-colors"
//                     onClick={() => handleIntegrationChange(integration, false)}
//                     aria-label={`Remove ${integration} filter`}
//                   >
//                     <X className="h-3 w-3" />
//                   </button>
//                 </Badge>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {pricingFilter !== "all" && (
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             <Badge variant="secondary" className="group">
//               <DollarSign className="h-3 w-3 mr-1" />
//               {pricingFilter === "free" ? "Free Only" : "Paid Only"}
//               <button
//                 className="ml-1 group-hover:text-destructive transition-colors"
//                 onClick={() => setPricingFilter("all")}
//                 aria-label="Remove pricing filter"
//               >
//                 <X className="h-3 w-3" />
//               </button>
//             </Badge>
//           </motion.div>
//         )}

//         {setupTimeFilter.length > 0 && (
//           <div className="flex items-center flex-wrap gap-1">
//             <span className="text-sm text-muted-foreground mr-1">Setup:</span>
//             {setupTimeFilter.map((time) => (
//               <motion.div
//                 key={time}
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <Badge variant="secondary" className="group">
//                   <Clock className="h-3 w-3 mr-1" />
//                   {time}
//                   <button
//                     className="ml-1 group-hover:text-destructive transition-colors"
//                     onClick={() => handleSetupTimeChange(time, false)}
//                     aria-label={`Remove ${time} setup time filter`}
//                   >
//                     <X className="h-3 w-3" />
//                   </button>
//                 </Badge>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {featuredOnly && (
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             <Badge variant="secondary" className="group">
//               <Star className="h-3 w-3 mr-1 text-yellow-500" />
//               Featured Only
//               <button
//                 className="ml-1 group-hover:text-destructive transition-colors"
//                 onClick={() => setFeaturedOnly(false)}
//                 aria-label="Remove featured filter"
//               >
//                 <X className="h-3 w-3" />
//               </button>
//             </Badge>
//           </motion.div>
//         )}

//         {(selectedCategories.length > 0 ||
//           selectedIntegrations.length > 0 ||
//           pricingFilter !== "all" ||
//           setupTimeFilter.length > 0 ||
//           featuredOnly) && (
//           <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 px-2 text-xs">
//             Clear All
//           </Button>
//         )}
//       </div>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, X, Tag, Clock, Zap, DollarSign, Star } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import type { WorkflowFiltersType } from "@/types/workflow"
import { IntegrationIcon } from "@/components/icon/integration-icons"

interface WorkflowFiltersProps {
  categories: { name: string; count: number }[]
  integrations: string[]
  onFilterChange: (filters: Partial<WorkflowFiltersType>) => void
  initialFilters?: Partial<WorkflowFiltersType>
}

export function WorkflowFilters({
  categories,
  integrations,
  onFilterChange,
  initialFilters = {},
}: WorkflowFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || "")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters.categories || [])
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(initialFilters.integrations || [])
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "rating" | "price-low" | "price-high">(
    initialFilters.sortBy as any || "newest"
  )
  const [pricingFilter, setPricingFilter] = useState<"all" | "free" | "paid">(
    initialFilters.pricingFilter as any || "all"
  )
  const [setupTimeFilter, setSetupTimeFilter] = useState<string[]>(initialFilters.setupTime || [])
  const [featuredOnly, setFeaturedOnly] = useState(initialFilters.featured || false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("categories")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    applyFilters()
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) => (checked ? [...prev, category] : prev.filter((c) => c !== category)))
  }

  const handleIntegrationChange = (integration: string, checked: boolean) => {
    setSelectedIntegrations((prev) => (checked ? [...prev, integration] : prev.filter((i) => i !== integration)))
  }

  const handleSetupTimeChange = (time: string, checked: boolean) => {
    setSetupTimeFilter((prev) => (checked ? [...prev, time] : prev.filter((t) => t !== time)))
  }

  const applyFilters = () => {
    onFilterChange({
      searchTerm,
      categories: selectedCategories,
      integrations: selectedIntegrations,
      sortBy,
      pricingFilter,
      setupTime: setupTimeFilter,
      featured: featuredOnly,
      page: 1, // Reset to first page when filters change
      limit: 12,
    })
    setIsOpen(false)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedIntegrations([])
    setSortBy("newest")
    setPricingFilter("all")
    setSetupTimeFilter([])
    setFeaturedOnly(false)
    onFilterChange({
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

  // Apply filters when component mounts with initial filters
  useEffect(() => {
    if (Object.keys(initialFilters).length > 0) {
      applyFilters()
    }
  }, [])

  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search agents..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" type="button">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {(selectedCategories.length > 0 ||
                selectedIntegrations.length > 0 ||
                pricingFilter !== "all" ||
                setupTimeFilter.length > 0 ||
                featuredOnly) && (
                <Badge variant="secondary" className="ml-2 px-1 min-w-5 text-center">
                  {selectedCategories.length +
                    selectedIntegrations.length +
                    (pricingFilter !== "all" ? 1 : 0) +
                    setupTimeFilter.length +
                    (featuredOnly ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[350px] sm:w-[450px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Agents</SheetTitle>
            </SheetHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="categories" className="flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Categories</span>
                </TabsTrigger>
                <TabsTrigger value="integrations" className="flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Integrations</span>
                </TabsTrigger>
                <TabsTrigger value="pricing" className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Pricing</span>
                </TabsTrigger>
                <TabsTrigger value="other" className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Other</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="categories" className="space-y-4">
                <h3 className="font-medium">Categories</h3>
                <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between space-x-2 rounded-md border p-2"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.name}`}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
                        />
                        <Label htmlFor={`category-${category.name}`} className="capitalize">
                          {category.name}
                        </Label>
                      </div>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-4">
                <h3 className="font-medium">Integrations</h3>
                <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
                  {integrations.map((integration) => (
                    <div
                      key={integration}
                      className="flex items-center justify-between space-x-2 rounded-md border p-2"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`integration-${integration}`}
                          checked={selectedIntegrations.includes(integration)}
                          onCheckedChange={(checked) => handleIntegrationChange(integration, checked as boolean)}
                        />
                        <Label htmlFor={`integration-${integration}`} className="flex items-center">
                          <IntegrationIcon name={integration} className="mr-2" />
                          {integration}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4">
                <h3 className="font-medium">Pricing</h3>
                <RadioGroup 
                  value={pricingFilter} 
                  onValueChange={(value) => setPricingFilter(value as "all" | "free" | "paid")}
                >
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="all" id="pricing-all" />
                    <Label htmlFor="pricing-all">All Pricing</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="free" id="pricing-free" />
                    <Label htmlFor="pricing-free">Free Only</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="paid" id="pricing-paid" />
                    <Label htmlFor="pricing-paid">Paid Only</Label>
                  </div>
                </RadioGroup>
              </TabsContent>

              <TabsContent value="other" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Setup Time</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {["< 5 min", "5-15 min", "15-30 min", "> 30 min"].map((time) => (
                      <div key={time} className="flex items-center space-x-2 rounded-md border p-2">
                        <Checkbox
                          id={`setup-${time}`}
                          checked={setupTimeFilter.includes(time)}
                          onCheckedChange={(checked) => handleSetupTimeChange(time, checked as boolean)}
                        />
                        <Label htmlFor={`setup-${time}`}>{time}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <Checkbox
                      id="featured-only"
                      checked={featuredOnly}
                      onCheckedChange={(checked) => setFeaturedOnly(checked as boolean)}
                    />
                    <Label htmlFor="featured-only">Featured Agents Only</Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2 pt-6">
              <Label htmlFor="sort-by">Sort By</Label>
              <Select 
                value={sortBy} 
                onValueChange={(value) => setSortBy(value as "newest" | "popular" | "rating" | "price-low" | "price-high")}
              >
                <SelectTrigger id="sort-by">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <SheetFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between pt-6">
              <Button variant="outline" onClick={resetFilters} type="button" className="w-full sm:w-auto">
                <X className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
              <Button onClick={applyFilters} type="button" className="w-full sm:w-auto">
                Apply Filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Button type="submit">Search</Button>
      </form>

      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2">
        {selectedCategories.length > 0 && (
          <div className="flex items-center flex-wrap gap-1">
            <span className="text-sm text-muted-foreground mr-1">Categories:</span>
            {selectedCategories.map((category) => (
              <motion.div
                key={category}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="secondary" className="capitalize group">
                  {category}
                  <button
                    className="ml-1 group-hover:text-destructive transition-colors"
                    onClick={() => handleCategoryChange(category, false)}
                    aria-label={`Remove ${category} filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </motion.div>
            ))}
          </div>
        )}

        {selectedIntegrations.length > 0 && (
          <div className="flex items-center flex-wrap gap-1">
            <span className="text-sm text-muted-foreground mr-1">Integrations:</span>
            {selectedIntegrations.map((integration) => (
              <motion.div
                key={integration}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="secondary" className="group">
                  <IntegrationIcon name={integration} size={12} className="mr-1" />
                  {integration}
                  <button
                    className="ml-1 group-hover:text-destructive transition-colors"
                    onClick={() => handleIntegrationChange(integration, false)}
                    aria-label={`Remove ${integration} filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </motion.div>
            ))}
          </div>
        )}

        {pricingFilter !== "all" && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Badge variant="secondary" className="group">
              <DollarSign className="h-3 w-3 mr-1" />
              {pricingFilter === "free" ? "Free Only" : "Paid Only"}
              <button
                className="ml-1 group-hover:text-destructive transition-colors"
                onClick={() => setPricingFilter("all")}
                aria-label="Remove pricing filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          </motion.div>
        )}

        {setupTimeFilter.length > 0 && (
          <div className="flex items-center flex-wrap gap-1">
            <span className="text-sm text-muted-foreground mr-1">Setup:</span>
            {setupTimeFilter.map((time) => (
              <motion.div
                key={time}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="secondary" className="group">
                  <Clock className="h-3 w-3 mr-1" />
                  {time}
                  <button
                    className="ml-1 group-hover:text-destructive transition-colors"
                    onClick={() => handleSetupTimeChange(time, false)}
                    aria-label={`Remove ${time} setup time filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </motion.div>
            ))}
          </div>
        )}

        {featuredOnly && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Badge variant="secondary" className="group">
              <Star className="h-3 w-3 mr-1 text-yellow-500" />
              Featured Only
              <button
                className="ml-1 group-hover:text-destructive transition-colors"
                onClick={() => setFeaturedOnly(false)}
                aria-label="Remove featured filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          </motion.div>
        )}

        {(selectedCategories.length > 0 ||
          selectedIntegrations.length > 0 ||
          pricingFilter !== "all" ||
          setupTimeFilter.length > 0 ||
          featuredOnly) && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 px-2 text-xs">
            Clear All
          </Button>
        )}
      </div>
    </div>
  )
}