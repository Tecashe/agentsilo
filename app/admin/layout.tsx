import type React from "react"
import { AdminSidebarLayout } from "@/components/admin/sidebar"
import { requireAdmin } from "@/lib/auth"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Verify user is an admin on the server side
  await requireAdmin()

  return <AdminSidebarLayout>{children}</AdminSidebarLayout>
}
