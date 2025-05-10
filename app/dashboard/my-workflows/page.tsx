import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Play, Pause, Plus } from "lucide-react"
import { getUserWorkflows } from "@/lib/actions/workflows"

export default async function MyWorkflowsPage() {
  const userWorkflows = await getUserWorkflows()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Workflows</h1>
        <Button asChild>
          <Link href="/marketplace">
            <Plus className="mr-2 h-4 w-4" /> Add New Workflow
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userWorkflows.map((userWorkflow) => (
          <Card key={userWorkflow.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{userWorkflow.name}</CardTitle>
                  <CardDescription>{userWorkflow.description}</CardDescription>
                </div>
                <Badge variant={userWorkflow.status === "active" ? "default" : "secondary"}>
                  {userWorkflow.status === "active" ? "Active" : "Paused"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="capitalize">{userWorkflow.workflow.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span>{new Date(userWorkflow.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <form
                action={async () => {
                  "use server"
                  // This would be implemented in a real app
                  // await updateUserWorkflow(userWorkflow.id, { status: userWorkflow.status === 'active' ? 'paused' : 'active' })
                }}
              >
                <Button type="submit" variant="outline" size="icon">
                  {userWorkflow.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </form>
              <Button variant="outline" size="icon" asChild>
                <Link href={`/dashboard/my-workflows/${userWorkflow.id}/settings`}>
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
