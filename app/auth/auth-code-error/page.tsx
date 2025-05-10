import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white p-4">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Authentication Error</CardTitle>
            <CardDescription className="text-center">
              There was a problem processing your authentication request
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              This could be due to an expired or invalid authentication link, or a technical issue with our
              authentication service.
            </p>
            <p className="text-gray-600">Please try logging in again or contact support if the problem persists.</p>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pb-6 pt-2">
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
              <Link href="/login">Return to Login</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/forgot-password">Reset Password</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
