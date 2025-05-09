import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot } from "lucide-react"
import { getUserActivityLogs } from "@/lib/actions/activity"

export default async function ActivityPage() {
  const activityLogs = await getUserActivityLogs()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Activity Log</h1>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityLogs.length > 0 ? (
              activityLogs.map((log) => (
                <div key={log.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      log.status === "success" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <Bot className={`h-5 w-5 ${log.status === "success" ? "text-green-600" : "text-red-600"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-medium">{log.action}</p>
                        <p className="text-sm text-gray-500">{formatDate(log.created_at)}</p>
                      </div>
                      <Badge
                        className={`mt-2 md:mt-0 ${
                          log.status === "success"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }`}
                      >
                        {log.status === "success" ? "Success" : "Error"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No activity found</h3>
                <p className="text-gray-600">There is no recent activity to display</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
