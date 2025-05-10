"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"

interface WorkflowFiltersProps {
  categories: string[]
  integrations: string[]
  onFilterChange: (filters: any) => void
}

export function WorkflowFilters({ categories, integrations, onFilterChange }: WorkflowFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [isOpen, setIsOpen] = useState(false)

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

  const applyFilters = () => {
    onFilterChange({
      searchTerm,
      categories: selectedCategories,
      integrations: selectedIntegrations,
      sortBy,
    })
    setIsOpen(false)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedIntegrations([])
    setSortBy("newest")
    onFilterChange({
      searchTerm: "",
      categories: [],
      integrations: [],
      sortBy: "newest",
    })
  }

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
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Agents</SheetTitle>
            </SheetHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <Label htmlFor={`category-${category}`} className="capitalize">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Integrations</h3>
                <div className="grid grid-cols-2 gap-2">
                  {integrations.map((integration) => (
                    <div key={integration} className="flex items-center space-x-2">
                      <Checkbox
                        id={`integration-${integration}`}
                        checked={selectedIntegrations.includes(integration)}
                        onCheckedChange={(checked) => handleIntegrationChange(integration, checked as boolean)}
                      />
                      <Label htmlFor={`integration-${integration}`}>{integration}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sort-by">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
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
            </div>
            <SheetFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between pt-2">
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

      <div className="flex flex-wrap gap-2">
        {selectedCategories.length > 0 && (
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-2">Categories:</span>
            <div className="flex flex-wrap gap-1">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="capitalize">
                  {category}
                  <button className="ml-1 hover:text-destructive" onClick={() => handleCategoryChange(category, false)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {selectedIntegrations.length > 0 && (
          <div className="flex items-center ml-2">
            <span className="text-sm text-muted-foreground mr-2">Integrations:</span>
            <div className="flex flex-wrap gap-1">
              {selectedIntegrations.map((integration) => (
                <Badge key={integration} variant="secondary">
                  {integration}
                  <button
                    className="ml-1 hover:text-destructive"
                    onClick={() => handleIntegrationChange(integration, false)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
