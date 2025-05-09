"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Bot, Zap, Clock, ArrowRight, Activity } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/marketplace">Browse Marketplace</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold">3</div>
              <Bot className="ml-2 h-5 w-5 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Connected Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold">5</div>
              <Zap className="ml-2 h-5 w-5 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold">127</div>
              <Activity className="ml-2 h-5 w-5 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Agents */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Active Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Automation</CardTitle>
              <CardDescription>Manages customer inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Tasks today</span>
                  <span>24</span>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full mt-2">
                  <Link href="/dashboard/my-agents/email-automation">
                    Manage <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>CRM Assistant</CardTitle>
              <CardDescription>Updates customer records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Tasks today</span>
                  <span>18</span>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full mt-2">
                  <Link href="/dashboard/my-agents/crm-assistant">
                    Manage <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Social Media Manager</CardTitle>
              <CardDescription>Schedules and posts content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Tasks today</span>
                  <span>7</span>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full mt-2">
                  <Link href="/dashboard/my-agents/social-media-manager">
                    Manage <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center p-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {i === 1
                        ? "Email Automation processed 5 new inquiries"
                        : i === 2
                          ? "CRM Assistant updated 3 customer records"
                          : i === 3
                            ? "Social Media Manager posted to Twitter"
                            : i === 4
                              ? "Email Automation sent 10 follow-up emails"
                              : "CRM Assistant created 2 new leads"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {i === 1
                        ? "10 minutes ago"
                        : i === 2
                          ? "25 minutes ago"
                          : i === 3
                            ? "1 hour ago"
                            : i === 4
                              ? "2 hours ago"
                              : "3 hours ago"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="mt-4 text-center">
          <Button asChild variant="outline">
            <Link href="/dashboard/activity">View All Activity</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
