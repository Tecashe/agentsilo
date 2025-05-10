"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Settings, HelpCircle, LogOut, LayoutDashboard, Bot, Zap, History, Menu, X } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMobile } from "@/hooks/use-mobile"

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useAuth()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [pathname, isMobile])

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

  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-primary">AI Agents</span>
        </Link>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="px-3 py-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="px-6 py-4 mt-auto border-t dark:border-gray-800 flex items-center justify-between">
        <Button
          variant="outline"
          className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Log out
        </Button>
        <ThemeToggle />
      </div>
    </>
  )

  if (isMobile) {
    return (
      <>
        <div className="h-16 border-b dark:border-gray-800 flex items-center justify-between px-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <div className="flex flex-col h-full">
                <SidebarContent />
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">AI Agents</span>
          </Link>
          <ThemeToggle />
        </div>
      </>
    )
  }

  return (
    <div className="w-64 border-r dark:border-gray-800 h-screen sticky top-0 overflow-y-auto flex flex-col">
      <SidebarContent />
    </div>
  )
}
