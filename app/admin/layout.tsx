import type React from "react"
import { redirect } from "next/navigation"
import { getUserDetails } from "@/lib/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUserDetails()

  if (!user || user.profile?.role !== "admin") {
    redirect("/dashboard")
  }

  return children
}
