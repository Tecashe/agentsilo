"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Bot,
  BarChart,
  Mail,
  ShoppingCart,
  FileText,
  MessageSquare,
  CreditCard,
  Users,
  Database,
  Zap,
} from "lucide-react"

interface CategoryCardProps {
  name: string
  count: number
  onClick?: () => void
}

// Map of category names to their respective icons
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  automation: Bot,
  "data processing": Database,
  communication: Mail,
  marketing: ShoppingCart,
  analytics: BarChart,
  productivity: FileText,
  finance: CreditCard,
  "social media": Users,
  "customer support": MessageSquare,
  development: Zap,
}

// Map of category names to their respective colors
const CATEGORY_COLORS: Record<string, string> = {
  automation: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "data processing": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  communication: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  marketing: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  analytics: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  productivity: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300",
  finance: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  "social media": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "customer support": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  development: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
}

export function CategoryCard({ name, count, onClick }: CategoryCardProps) {
  const IconComponent = CATEGORY_ICONS[name.toLowerCase()] || Bot
  const colorClass =
    CATEGORY_COLORS[name.toLowerCase()] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"

  return (
    <Link
      href={`/marketplace?category=${encodeURIComponent(name)}`}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Card className="overflow-hidden h-full cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className={cn("p-3 rounded-full mb-4", colorClass)}>
              <IconComponent className="h-6 w-6" />
            </div>
            <h3 className="font-medium capitalize mb-2">{name}</h3>
            <Badge variant="secondary">
              {count} agent{count !== 1 ? "s" : ""}
            </Badge>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
