import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Plus } from "lucide-react"
import { getUserIntegrations } from "@/lib/actions/integrations"
import { IntegrationActions } from "@/components/integration-actions"

export default async function IntegrationsPage() {
  const integrations = await getUserIntegrations()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Integrations</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Integration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>{integration.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {integration.category}
                    </Badge>
                  </div>
                </div>
                {integration.connected ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
                ) : (
                  <Badge variant="outline">Not Connected</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{integration.description}</p>
              {integration.connected && (
                <div className="text-sm text-gray-500">
                  Last updated: {new Date(integration.updated_at).toLocaleDateString()}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <IntegrationActions integration={integration} />
            </CardFooter>
          </Card>
        ))}
      </div>

      {integrations.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No integrations found</h3>
          <p className="text-gray-600 mb-6">You haven't added any integrations yet</p>
          <Button>Add Your First Integration</Button>
        </div>
      )}
    </div>
  )
}
