import type { ReactNode } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { requireAuth } from "@/lib/auth"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // This will redirect to login if the user is not authenticated
  await requireAuth()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}
