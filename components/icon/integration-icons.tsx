// import type React from "react"
// import {
//   Mail,
//   MessageSquare,
//   FileText,
//   Droplet,
//   PenTool,
//   TrelloIcon,
//   CheckSquare,
//   Github,
//   Database,
//   Zap,
//   CreditCard,
//   BarChart2,
//   Users,
//   Twitter,
//   Linkedin,
//   Instagram,
//   Facebook,
//   Video,
//   UsersIcon,
//   Calendar,
//   DollarSign,
//   ShoppingCart,
//   Globe,
//   Send,
//   HelpCircle,
//   FileCode,
//   Layers,
//   Phone,
// } from "lucide-react"
// import { cn } from "@/lib/utils"

// interface IntegrationIconProps {
//   name: string
//   className?: string
//   size?: number
// }

// export function IntegrationIcon({ name, className, size = 24 }: IntegrationIconProps) {
//   const normalizedName = name.toLowerCase().trim()

//   // Map integration names to their respective icons
//   const iconMap: Record<string, React.ReactNode> = {
//     gmail: <Mail size={size} className={cn("text-red-500", className)} />,
//     slack: <MessageSquare size={size} className={cn("text-purple-500", className)} />,
//     "google drive": <FileText size={size} className={cn("text-blue-500", className)} />,
//     dropbox: <Droplet size={size} className={cn("text-blue-400", className)} />,
//     notion: <PenTool size={size} className={cn("text-gray-800 dark:text-gray-200", className)} />,
//     trello: <TrelloIcon size={size} className={cn("text-blue-500", className)} />,
//     asana: <CheckSquare size={size} className={cn("text-orange-500", className)} />,
//     github: <Github size={size} className={cn("text-gray-800 dark:text-gray-200", className)} />,
//     airtable: <Database size={size} className={cn("text-green-500", className)} />,
//     zapier: <Zap size={size} className={cn("text-orange-500", className)} />,
//     stripe: <CreditCard size={size} className={cn("text-purple-600", className)} />,
//     hubspot: <BarChart2 size={size} className={cn("text-orange-500", className)} />,
//     salesforce: <Users size={size} className={cn("text-blue-600", className)} />,
//     twitter: <Twitter size={size} className={cn("text-blue-400", className)} />,
//     linkedin: <Linkedin size={size} className={cn("text-blue-700", className)} />,
//     instagram: <Instagram size={size} className={cn("text-pink-500", className)} />,
//     facebook: <Facebook size={size} className={cn("text-blue-600", className)} />,
//     zoom: <Video size={size} className={cn("text-blue-500", className)} />,
//     "microsoft teams": <UsersIcon size={size} className={cn("text-purple-600", className)} />,
//     "google calendar": <Calendar size={size} className={cn("text-green-500", className)} />,
//     quickbooks: <DollarSign size={size} className={cn("text-green-600", className)} />,
//     shopify: <ShoppingCart size={size} className={cn("text-green-500", className)} />,
//     wordpress: <Globe size={size} className={cn("text-blue-500", className)} />,
//     mailchimp: <Send size={size} className={cn("text-yellow-500", className)} />,
//     zendesk: <HelpCircle size={size} className={cn("text-green-500", className)} />,
//     jira: <FileCode size={size} className={cn("text-blue-500", className)} />,
//     "monday.com": <Layers size={size} className={cn("text-blue-500", className)} />,
//     twilio: <Phone size={size} className={cn("text-red-500", className)} />,
//     "google sheets": <FileText size={size} className={cn("text-green-600", className)} />,
//     "microsoft excel": <FileText size={size} className={cn("text-green-700", className)} />,
//   }

//   // Return the mapped icon or a default icon
//   return (
//     <div className="transition-all duration-300 hover:scale-110">
//       {iconMap[normalizedName] || <Zap size={size} className={className} />}
//     </div>
//   )
// }

import type React from "react"
import {
  Mail,
  Github,
  Twitter,
  Slack,
  Database,
  FileText,
  Calendar,
  MessageSquare,
  Trello,
  Figma,
  Chrome,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  DropletIcon as Dropbox,
  Cloud,
  CreditCard,
  ShoppingCart,
  BarChart,
  PieChart,
  Bot,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Map of integration names to their respective icons and colors
const INTEGRATION_ICONS: Record<string, { icon: React.ElementType; color: string }> = {
  gmail: { icon: Mail, color: "text-red-500" },
  "google mail": { icon: Mail, color: "text-red-500" },
  github: { icon: Github, color: "text-gray-900 dark:text-white" },
  twitter: { icon: Twitter, color: "text-blue-400" },
  slack: { icon: Slack, color: "text-purple-500" },
  postgresql: { icon: Database, color: "text-blue-600" },
  mysql: { icon: Database, color: "text-orange-500" },
  mongodb: { icon: Database, color: "text-green-600" },
  "google docs": { icon: FileText, color: "text-blue-500" },
  "google calendar": { icon: Calendar, color: "text-green-500" },
  discord: { icon: MessageSquare, color: "text-indigo-500" },
  trello: { icon: Trello, color: "text-blue-400" },
  figma: { icon: Figma, color: "text-purple-600" },
  chrome: { icon: Chrome, color: "text-blue-500" },
  linkedin: { icon: Linkedin, color: "text-blue-700" },
  instagram: { icon: Instagram, color: "text-pink-600" },
  youtube: { icon: Youtube, color: "text-red-600" },
  facebook: { icon: Facebook, color: "text-blue-600" },
  dropbox: { icon: Dropbox, color: "text-blue-500" },
  aws: { icon: Cloud, color: "text-orange-500" },
  stripe: { icon: CreditCard, color: "text-purple-500" },
  shopify: { icon: ShoppingCart, color: "text-green-600" },
  "google analytics": { icon: BarChart, color: "text-yellow-500" },
  tableau: { icon: PieChart, color: "text-blue-500" },
  openai: { icon: Bot, color: "text-green-500" },
}

interface IntegrationIconProps {
  name: string
  size?: number
  className?: string
}

export function IntegrationIcon({ name, size = 16, className }: IntegrationIconProps) {
  // Normalize the name to lowercase for matching
  const normalizedName = name.toLowerCase()

  // Find the icon configuration or use a default
  const iconConfig = INTEGRATION_ICONS[normalizedName] || { icon: Cloud, color: "text-gray-500" }

  const IconComponent = iconConfig.icon

  return <IconComponent className={cn(iconConfig.color, className)} size={size} aria-label={`${name} icon`} />
}
