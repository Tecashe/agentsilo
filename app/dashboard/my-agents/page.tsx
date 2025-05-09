import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Settings, Play, Pause, ArrowRight, Plus } from "lucide-react"
import { getUserAgents } from "@/lib/actions/agents"

export default async function MyAgentsPage() {
  const userAgents = await getUserAgents()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Agents</h1>
        <Button asChild>
          <Link href="/marketplace">
            <Plus className="mr-2 h-4 w-4" /> Add New Agent
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userAgents.map((userAgent) => (
          <Card key={userAgent.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{userAgent.name}</CardTitle>
                  <CardDescription>{userAgent.description}</CardDescription>
                </div>
                <Badge variant={userAgent.status === "active" ? "default" : "secondary"}>
                  {userAgent.status === "active" ? "Active" : "Paused"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category</span>
                  <span>{userAgent.agent.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Created</span>
                  <span>{new Date(userAgent.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <form
                action={async () => {
                  "use server"
                  // This would be implemented in a real app
                  // await updateUserAgent(userAgent.id, { status: userAgent.status === 'active' ? 'paused' : 'active' })
                }}
              >
                <Button type="submit" variant="outline" size="icon">
                  {userAgent.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </form>
              <Button variant="outline" size="icon" asChild>
                <Link href={`/dashboard/my-agents/${userAgent.id}/settings`}>
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild>
                <Link href={`/dashboard/my-agents/${userAgent.id}`}>
                  Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {userAgents.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No agents found</h3>
          <p className="text-gray-600 mb-6">You haven't added any agents yet</p>
          <Button asChild>
            <Link href="/marketplace">Browse Marketplace</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
