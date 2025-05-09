import { getAgents } from "@/lib/actions/agents"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Zap, ArrowRight } from "lucide-react"

export default async function MarketplacePage() {
  const agents = await getAgents()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">AI Agents Marketplace</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse our collection of pre-built AI agents to automate your workflows and boost productivity.
        </p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
              <Bot className="h-16 w-16 text-white" />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{agent.name}</CardTitle>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{agent.category}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{agent.description}</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Zap className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-sm">
                    {agent.integrations.length} Integration{agent.integrations.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {agent.integrations.map((integration, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button asChild variant="outline">
                <Link href={`/marketplace/${agent.id}`}>Details</Link>
              </Button>
              <Button asChild>
                <Link href={`/marketplace/${agent.id}/deploy`}>
                  Deploy <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {agents.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No agents found</h3>
          <p className="text-gray-600 mb-6">There are no agents available at the moment</p>
        </div>
      )}

      {/* Custom Agent CTA */}
      <div className="mt-16 bg-purple-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Request a custom AI agent tailored to your specific business needs.
        </p>
        <Button asChild size="lg">
          <Link href="/request-custom">Request Custom Agent</Link>
        </Button>
      </div>
    </div>
  )
}
