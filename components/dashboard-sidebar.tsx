"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Settings, HelpCircle, LogOut, LayoutDashboard, Bot, Zap, History } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useAuth()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "My Agents",
      href: "/dashboard/my-agents",
      icon: <Bot className="h-5 w-5" />,
    },
    {
      title: "Marketplace",
      href: "/marketplace",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "Integrations",
      href: "/dashboard/integrations",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      title: "Activity",
      href: "/dashboard/activity",
      icon: <History className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "Help & Support",
      href: "/dashboard/support",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ]

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="w-64 bg-white border-r h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-purple-600">AI Agents</span>
        </Link>
      </div>
      <div className="px-3 py-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive(item.href) ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="px-6 py-4 mt-auto border-t">
        <Button
          variant="outline"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Log out
        </Button>
      </div>
    </div>
  )
}
